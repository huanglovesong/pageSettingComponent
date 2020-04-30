import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import { ListView, Toast, Modal, Button, Tabs, TextareaItem, Icon } from 'antd-mobile';
import './less/mycoupons.less';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const alert = Modal.alert;

class Mycoupons extends React.Component {

	constructor(props) {
		super(props);
		// 获取商户信息
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
		const dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		});
		this.consignList = [];
		this.state = {
			manageDataSource: dataSource.cloneWithRows([]),
			isSearchFinish: false, // 判断当前请求是否完成
			isLoadScroll: false,
			isSearchAll: false,
			dataSource: [],
			total: -1,
			postData: {
				pageIndex: 1,
				pageSize: 30,
				status: '1',
			},
			userInfo,
			showModal: false,
			SaleType: 11,
			lineDetail: {},
			shopInfo,
			showMallLoginModal: false,
			showLoginPageModal: false
		}
	}
	componentWillMount() {
		let { hasHead, shopInfo } = this.state;
		if (shopInfo.codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
			if (window.terminal.appVersion && configs.chinaBankVision) {
				var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision)
				if (bankVision === -1) {
					hasHead = true
				} else {
					hasHead = false
				}
			} else {
				hasHead = false
			}
		} else {
			hasHead = false
		}
		this.setState({
			hasHead
		})
		// 判断模式和授权
		let yes = isLoginOrAuth(this);
		// 如果从来没有登录
		if (yes) {
			this.init();
		}
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { coupons: { GetUserCouponList } } = nextProps;
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
		if (GetUserCouponList !== props.coupons.GetUserCouponList) {
			const { code, data, message } = GetUserCouponList;
			if (code === '1000') {
				if (data && data.list && data.list[0]) {
					data.list.map((v, i) => {
						v.key = (data.current - 1) * data.pageSize + i
					})
					this.consignList.push(...data.list);
					if (data.current >= data.pageTotal) {
						this.setState({
							isSearchAll: true
						})
					}
					this.setState({
						dataSource: [...this.consignList],
						total: data.total,
						isSearchFinish: true,
						isLoadScroll: false
					}, () => {
						this.setState({
							manageDataSource: this.state.manageDataSource.cloneWithRows(this.state.dataSource),
						})
					});
				} else {
					this.setState({
						dataSource: [],
						total: 0,
						isSearchFinish: true,
						isLoadScroll: false
					})
				}
			}
			else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			} else {
				Toast.info(message);
			}
		}
	}
	loginSuccess = (data) => {
		this.hideLoginModal();
		this.setState({
			userInfo: data
		}, () => {
			this.init();
		})
	}
	init = () => {
		const { postData } = this.state;
		this.props.dispatch({
			type: 'coupons/GetUserCouponList',
			payload: postData
		})
	}
	// 授权失效
	authorizationFailure = () => {
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
		userInfo.fuluToken = '';
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		isLoginOrAuth(this);
	}
	toUrl = (url) => {
		this.props.history.push(url);
	}
	showDown = (key) => {
		let { manageDataSource } = this.state;
		manageDataSource._dataBlob.s1[key].show = !manageDataSource._dataBlob.s1[key].show
		this.setState({
			manageDataSource
		})
	}
	onCopy = (text, result, rowData) => {
		if (result) {
			Toast.success('券码复制成功，请在页面跳转后粘贴使用。');
			this.jumpTo(rowData)
		}
	}
	renderRow = (rowData, sectionID, rowID) => {
		return (
			<div className="order-line">
				<div className={rowData.status == 1 ? "item" : "item unStart"}>
					{
						rowData.type == 3 ?
							<div className="left">
								<span className="l-txt">兑换券</span>
							</div>
							:
							<div className="left">
								<small>￥</small><strong>{rowData.price}</strong>
								<p>{rowData.content}</p>
							</div>
					}
					<div className="line"></div>
					<div className="right">
						<div className="txt font-clamp">{rowData.name}</div>
						<div className="time font-clamp">{rowData.startActiveTime} ~ {rowData.endActiveTime}</div>
						{
							rowData.status == 1 ?
								(
									rowData.type == 1 ?
										<button className="get-btn btn-border" onClick={() => { this.jumpTo(rowData) }}>去使用</button>
										:
										<CopyToClipboard
											text={rowData.couponCode}
											onCopy={(text, result) => { this.onCopy(text, result, rowData) }}
										>
											<button className="get-btn btn-border">去使用</button>
										</CopyToClipboard>
								) :
								(

									rowData.status == 2 ? <p className="btn-txt">已使用</p> : <p className="btn-txt">已使用</p>
								)
						}
						<div className="use-down" onClick={() => { this.showDown(rowData.key) }}>
							使用说明<Icon type="down" />
						</div>
					</div>
				</div>
				{
					!!rowData.show ?
						<div className={rowData.status == 1 ? "down-bg" : "down-bg unStart"}>
							{rowData.instructions || ''}
							<span className="more" onClick={() => { this.toUrl('/discription') }}>详细说明<Icon type="right" /></span>
						</div> : ''
				}
			</div>
		)
	}
	onEndReached = () => {
		const { postData, isSearchFinish, isSearchAll } = this.state;
		this.setState({ isLoadScroll: true });
		// 当前请求完成，才去请求下一页
		if (isSearchFinish && !isSearchAll) {
			postData.pageIndex++;
			this.setState({ postData }, () => {
				this.init();
			})
		}
	}
	changeVal = (type, val) => {
		this.setState({
			[type]: val
		})
	}
	hideLoginModal = () => {
		this.setState({
			showMallLoginModal: false,
			showLoginPageModal: false
		})
	}

	jumpTo = (v) => {
		if (v.jumpType == 1) {
			this.toUrl('/')
		} else if (v.jumpType == 2) {
			this.toUrl(`/couponPage?cardId=${v.couponCode}&reachedAmount=${v.fullPrice}&reduceAmount=${v.price}`)
		} else if (v.jumpType == 3) {
			window.location.href = `/detail?gid=${v.proClassId}${v.productId ? `&pid=${v.productId}` : ''}`
		} else if (v.jumpType == 4) {
			// 1满减 2折扣 3兑换
			if (v.type == 3) {
				setTimeout(() => {
					window.location.href = v.jumpUrl
				}, 1000)
			} else {
				window.location.href = v.jumpUrl
			}
		}
	}
	render() {
		const { manageDataSource, total, postData, showModal, isSearchAll, SaleType, hasHead, showMallLoginModal, showLoginPageModal } = this.state;
		const tabs = [
			{ title: '未使用', sub: '1' },
			{ title: '已使用', sub: '2' },
			{ title: '已过期', sub: '3' }
		];
		return (
			<div className="mycoupons-list clearfix">
				<Header
					{...this.props}
					jump={() => this.props.history.push('/')}
					myLoading={!!(this.props.loading.models.coupons)}  // 判断loading
				/>
				<div className={hasHead ? "list-con tabs-top" : "list-con"}>
					<Tabs tabs={tabs}
						initialPage={postData.status}
						onChange={(tab, index) => {
							postData.status = tab.sub;
							postData.pageIndex = 1;
							this.consignList = [];
							this.setState({
								postData
							}, () => {
								this.init();
							})
						}}
					/>
					{
						total === 0 ?
							<div className="noting"><span></span>暂无数据</div>
							:
							<ListView
								className="list-view"
								dataSource={manageDataSource}
								renderRow={this.renderRow}
								initialListSize={postData.pageSize}
								pageSize={postData.pageSize}
								onEndReachedThreshold={10}
								onEndReached={this.onEndReached}
								renderFooter={isSearchAll && (() => (
									<div className="no-more">--我是有底线的--</div>
								))}
							/>
					}
				</div>
				{showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
				{showLoginPageModal && <LoginPageModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
			</div>
		)
	}
}
const mapStateToProps = (state) => {
	return {
		...state,
	};
}
export default connect(mapStateToProps)(Mycoupons);