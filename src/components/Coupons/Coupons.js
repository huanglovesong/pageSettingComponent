import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import { Toast, Carousel } from 'antd-mobile';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';
import parse from 'url-parse';
import './less/coupons.less';
import mathManage from '../../utils/mathManage';
import moment from 'moment';
let xInteval = null;
class Coupons extends React.Component {

	constructor(props) {
		super(props);
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
		const url = parse(props.location.search, true);
		const { couponId } = url.query;  // 获取二级分类id// 获取商户信息 
		this.state = {
			userInfo,
			shopInfo,
			couponId,
			activeInfo: {}
		}
	}
	componentWillMount() {
		this.cardActivityOvered()
	}

	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { home: { getBanner }, coupons: { ObtainCard, CardActivityOvered } } = nextProps;
		const { login: { fuluusertoken } } = nextProps;
		if (fuluusertoken !== props.login.fuluusertoken) {
			const { code, data, message } = fuluusertoken;
			if (code === '1000') {
				localStorage.setItem('userInfo', JSON.stringify(data));

				this.loginSuccess(data);
			} else {
				Toast.fail(message);
			}
		}
		if (ObtainCard !== props.coupons.ObtainCard) {
			const { code, data, message } = ObtainCard;
			if (code === '1000') {
				Toast.info('领取成功',2);
				const _this = this;
				setTimeout(()=>{
					_this.jumpTo(data) 
				},1500)
			} else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				this.setState({
					clickCoupon: true,
				}, () => {
					isLoginOrAuth(this);
				})
			} else {
				Toast.info(message);
			}
		}
		if (CardActivityOvered !== props.coupons.CardActivityOvered) {
			const { code, data, message } = CardActivityOvered;
			if (code === '1000') {
				this.setState({
					activeInfo: data
				}, () => {
					const { activeInfo } = this.state
					// 倒计时
					const time = moment(activeInfo.startCouponTime).format('X') - moment().format('X')
					this.settime(time)
				})
			} else {
				Toast.info(message);
			}
		}
	}
	cardActivityOvered = () => {
		const { couponId } = this.state;
		this.props.dispatch({
			type: 'coupons/CardActivityOvered',
			payload: {
				merCouponActivityId: couponId
			}
		});
	}
	clearDetailTimeInterval = () => {
		if (xInteval) {
			clearInterval(xInteval)
			xInteval = null;
		}
	}
	settime = (time) => {
		this.setState({
			countNum: time
		}, () => {
			this.clearDetailTimeInterval();
			let that = this;
			xInteval = setInterval(function () {
				let { countNum } = that.state;
				countNum -= 1;
				if (countNum === 0) {
					that.clearDetailTimeInterval();
					that.cardActivityOvered();
				}
				if (countNum > 0) {
					that.setState({
						countNum,
						startTime: mathManage.secondToDate(countNum)
					})
				}
			}, 1000);
		})
	}
	// 登录成功调用
	loginSuccess = (data) => {
		this.hideLoginModal();
		this.setState({
			userInfo: data
		});
		if (this.state.clickCoupon) {
			this.getCouponFn();
		}
	}
	hideLoginModal = () => {
		this.setState({
			showMallLoginModal: false,
			showLoginPageModal: false
		})
	}
	toLogin = () => {
		this.setState({
			clickCoupon: false,
		}, () => {
			isLoginOrAuth(this);
		})
	}
	getCoupon = () => {
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
		if (userInfo && userInfo.fuluToken) {
			this.getCouponFn()
		}
		else {
			this.setState({
				clickCoupon: true,
			}, () => {
				isLoginOrAuth(this);
			})
		}
	}
	getCouponFn = () => {
		const { couponId } = this.state;
		this.props.dispatch({
			type: 'coupons/ObtainCard',
			payload: {
				merCouponActivityId: couponId
			}
		});
	}
	jumpTo = (data) => {
		const { activeInfo } = this.state;
		if (activeInfo.jumpType == 1) {
			this.toUrl('/')
		} else if (activeInfo.jumpType == 2) {
			this.toUrl(`/couponPage?cardId=${data.card}&reachedAmount=${data.discountsInfo.reachedAmount}&reduceAmount=${data.discountsInfo.reduceAmount}`)
		} else if (activeInfo.jumpType == 3) {
			window.location.href = `/detail?gid=${activeInfo.proClassId}${activeInfo.productId ? `&pid=${activeInfo.productId}` : ''}`
		} else if (activeInfo.jumpType == 4) {
			window.location.href = activeInfo.jumpUrl
		}
	}
	toUrl = (url) => {
		this.props.history.push(url);
	}
	componentWillUnmount() {
		this.clearDetailTimeInterval()
	}
	render() {
		const { shopInfo, showMallLoginModal, showLoginPageModal, activeInfo, startTime } = this.state;
		return (
			<div className="coupons-bg">
				<Header
					{...this.props}
					jump={() => { this.props.history.goBack() }}
				/>
				<div className="main-bg">
					<div className="head-bg">
						<div className="img" ></div>
						<h3>{shopInfo.merInfoTemplates.infoTitle}</h3>
						<p className="text">送您一张优惠券</p>
						{
							activeInfo.status == 1 ? <div className="s-time">活动即将开始，倒计时：<span className="redfont">{startTime ? startTime : '00:00:00'}</span></div> : ''
						}
						<div className="item">
							<div className="left">
								<small>￥</small><strong>{activeInfo.price}</strong>
								<p>{activeInfo.content}</p>
							</div>
							<div className="line"></div>
							<div className="right">
								<div className="txt font-clamp">{activeInfo.name}</div>
								<div className="time font-clamp">{activeInfo.instructions}</div>
								<div className="use-down font-clamp">
									{activeInfo.startCouponTime} ~ {activeInfo.endCouponTime}
								</div>
							</div>
						</div>
						{
							activeInfo.status != 2 ? <div className="get-coupons disabled">{
								activeInfo.status == 1 ? '抱歉，未到领取时间' : '活动已结束'}</div> :
								<button className="get-coupons" onClick={this.getCoupon}>点击领取优惠券</button>
						}
					</div>
				</div>
				{
					activeInfo.status != 2 ? <div className="banner-bg">
						<h2>其他活动</h2>
						<div className="img-bg" onClick={() => { this.props.history.push('/') }}></div>
					</div>
						: ''
				}
				{showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
				{showLoginPageModal && <LoginPageModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
			</div >
		)
	}
}
const mapStateToProps = (state) => {
	return {
		...state,
	};
}
export default connect(mapStateToProps)(Coupons);
