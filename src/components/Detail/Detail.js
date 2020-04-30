import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import Icons, { jia, jian, shanchu, home } from '../Icon';
import { Modal, Picker, Toast, List, InputItem, WingBlank, Icon, Button } from 'antd-mobile';
import { createForm } from 'rc-form';
import { isLoginOrAuth } from '../../utils/auth';
import TemplateModal from '../TemplateModal';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';

import { Link } from "dva/router";
import parse from 'url-parse';
import './less/detail.less'
import mathManage from '../../utils/mathManage';
const prompt = Modal.prompt;

class Detail extends React.Component {

	constructor(props) {
		super(props);
		const url = parse(props.location.search, true);
		const { gid, pid } = url.query;  // 获取二级分类id// 获取商户信息 
		const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
		this.state = {
			gid,
			pid,
			typeDetail: {},
			ChargeNum: '1',
			goodsDetail: {},
			hasError: false,
			postData: {
				childCategoryId: gid,
			},
			shopInfo,
			extractCode: '',
			userInfo,
			passCodeStatus: {},
			showMallLoginModal: false,
			// showLoginPageModal: false,
			formData: {},
			showquanList: false,
		},
			this.xInteval = null;
	}
	componentWillMount() {
		scrollTo(0, 0);
		let payment = this.isAlipayOrWechat();
		this.setState({
			payment
		}, () => {
			this.init();
		})
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) {
				this.setState({
					windowShow: false
				})
			} else {
				this.setState({
					windowShow: true
				}, () => {
					const { windowShow } = this.state;
					if (windowShow) {
						// 页面呼出
						this.init()
					}
				})
			}
		});
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { detail: { getGoodsList, sendCardOrder, sendOrder, GetPassCodeStatus, GetPassCode }, coupons: { GetProInfoDetailCouponList, ObtainCard } } = nextProps;
		const { pid, userInfo, shopInfo } = this.state;
		const { login: { fuluusertoken } } = nextProps;
		if (nextProps.detail.focusInputGuid !== props.detail.focusInputGuid) {
			console.log('进入详情组件')
			document.getElementById('charge-input') && document.getElementById('charge-input').focus();
		}
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
				setTimeout(() => {
					this.getCoupothis()
				}, 300)
				this.setState({
					getQuan: false
				})
				Toast.info('领取成功');
			} else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			} else {
				Toast.info(message);
			}
		}
		if (getGoodsList !== props.detail.getGoodsList) {
			const { code, data, message } = getGoodsList;
			if (code === '1000') {
				let obj = {}
				data.productList && data.productList[0] && data.productList.map((v, i) => {
					v.active = false;
					if (!pid) {
						// 默认第一个商品选中
						if (i === 0) {
							v.active = true;
							obj = v;
						}
					} else {
						if (pid === v.productId) {
							v.active = true;
							obj = v;
						}
					}
				})
				this.setState({
					typeDetail: data,
					goodsDetail: obj
				}, () => {
					if (obj.startSecound) {
						this.settime(obj.startSecound, 'startSecound', 0); // 
					}
					if (obj.surplusTime) {
						this.settime(obj.surplusTime, 'surplusTime', 1); // 
					}
					if (obj.isActivity) {
						// 如果已经登录，就直接获取资格
						this.getPassCodeStatus()
					}
					// 获取优惠券
					this.getCoupothis()
				});
			} else if (code === '-1') {
				Toast.info('商品不存在');
				this.props.history.push(`/`);
			} else {
				Toast.info(message);
			}
		}
		// 直充
		if (sendOrder !== props.detail.sendOrder) {
			const { code, data } = sendOrder;
			if (code === '1000') {
				// 成功跳转
				window.location.href = `${configs.commonUrl}/orderSure?oid=${data}&codeKey=${shopInfo.codeKey}&fuluToken=${userInfo.fuluToken}&fuluId=${userInfo.fuluId}`;
			}
			else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			}
			else {
				Toast.info(sendOrder.message);
			}
		}
		// 卡密
		if (sendCardOrder !== props.detail.sendCardOrder) {
			let { code, data } = sendCardOrder;
			if (code === '1000') {
				// 成功跳转到
				window.location.href = `${configs.commonUrl}/orderSure?oid=${data}&codeKey=${shopInfo.codeKey}&fuluToken=${userInfo.fuluToken}&fuluId=${userInfo.fuluId}`;
			}
			else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			} else {
				Toast.info(sendCardOrder.message);
			}
		}
		if (GetPassCodeStatus !== props.detail.GetPassCodeStatus) {
			const { code, data } = GetPassCodeStatus;
			if (code === '1000') {
				this.setState({
					isLoading: false,
					passCodeStatus: data
				})
			}
			else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			} else {
				Toast.info(GetPassCodeStatus.message);
			}
		}
		if (GetPassCode !== props.detail.GetPassCode) {
			let { code, data } = GetPassCode;
			code = '1000';
			if (code === '1000') {
				Toast.success('恭喜您，已获得活动名额');
				console.log(333444)
				this.setState({
					isLoading: false,
					passCodeStatus: {
						orderNo: '',
						userPassCodeStatus: 4
					}
				}, () => {
					setTimeout(() => {
						console.log(222)
						this.props.dispatch({ type: 'detail/commonDispatch', payload: { focusInputGuid: Math.random() } });
					}, 1000);

				})
			}
			else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				// 授权失效
				this.authorizationFailure();
			} else {
				Toast.info(GetPassCode.message);
			}
		}
		if (GetProInfoDetailCouponList !== props.coupons.GetProInfoDetailCouponList) {
			const { code, data, message } = GetProInfoDetailCouponList;
			if (code === '1000') {
				this.setState({
					couponList: data.list,
					getQuanList: false
				})
			} else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
				this.setState({
					getQuanList: true
				})
				// 授权失效
				this.authorizationFailure();
			}
			else {
				Toast.info(sendOrder.message);
			}
		}
	}
	getCoupothis = () => {
		const { goodsDetail } = this.state;
		this.props.dispatch({
			type: 'coupons/GetProInfoDetailCouponList',
			payload: {
				productId: goodsDetail.productId,
				PageIndex: 1,
				PageSize: 99999,
			}
		})
	}
	loginSuccess = (data) => {
		this.hideLoginModal();
		const { formData, goodsDetail, passCodeStatus, getQuan, getQuanList } = this.state;
		this.setState({
			userInfo: data
		}, () => {
			if (getQuanList) {
				return this.getCoupothis()
			}
			if (getQuan) {
				return this.getQuan()
			}
			// 如果是活动商品需要获取资格码
			if (goodsDetail.isActivity) {
				// 如果是马上抢，则先获取资格码，在进行马上抢
				if (passCodeStatus.userPassCodeStatus === 3) {
					this.props.dispatch({
						type: 'detail/GetPassCodeStatus',
						payload: {
							productId: goodsDetail.productId
						}
					}).then(() => {
						this.GetPassCode();
					});
				} else {
					// 否则获取资格码
					this.props.dispatch({
						type: 'detail/GetPassCodeStatus',
						payload: {
							productId: goodsDetail.productId
						}
					})
				}
			} else {
				this.toPay(formData);
			}
		})
	}
	getPassCodeStatus = () => {
		const { goodsDetail, shopInfo } = this.state;
		this.props.dispatch({
			type: 'detail/GetPassCodeStatus',
			payload: {
				productId: goodsDetail.productId
			}
		})
	}
	onRef = (ref) => {
		this.child = ref
	}
	GetPassCode = () => {
		const { goodsDetail, shopInfo } = this.state;
		this.setState({
			isLoading: true
		})
		this.props.dispatch({
			type: 'detail/GetPassCode',
			payload: {
				productId: goodsDetail.productId
			}
		})
	}
	settime = (time, type, n) => {
		this.setState({
			countNum: time
		}, () => {
			let that = this;
			that.clearTimeInterval();
			this.xInteval = setInterval(function () {
				let { countNum } = that.state;
				countNum -= 1;
				if (countNum === 0) {
					that.clearTimeInterval();
					that.init();
				}
				if (countNum > 0) {
					that.setState({
						countNum,
						[type]: n ? mathManage.secondToDate1(countNum) : mathManage.secondToDate(countNum)
					})
				}
			}, 1000);
		})
	}
	clearTimeInterval = () => {
		if (this.xInteval) {
			clearInterval(this.xInteval)
			this.xInteval = null;
		}
	}
	isAlipayOrWechat = () => {
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.match(/Alipay/i) == "alipay") {
			return 1;  //1支付宝
		} else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
			return 2;  //2微信
		} else {
			return 3;  //3其他
		}
	}
	init = () => {
		const { postData } = this.state;
		this.props.dispatch({
			type: 'detail/getGoodsList',
			payload: postData
		})
	}
	changeNum = (num, type) => {
		this.setState({
			ChargeNum: num[0]
		})
	}
	choseGoods = (data) => {
		let { typeDetail, goodsDetail, userInfo } = this.state;
		if (data.isActivity) {
			window.location.href = `/detail?gid=${typeDetail.childCategoryId}&pid=${data.productId}`;
		}
		typeDetail.productList && typeDetail.productList[0] && typeDetail.productList.map((v, i) => {
			v.active = false;
			// 默认第一个商品选中
			if (v.productId === data.productId) {
				v.active = true;
				goodsDetail = typeDetail.productList[i]
			}
		})
		this.setState({
			typeDetail,
			goodsDetail,
			ChargeNum: '1'
		}, () => {
			const { goodsDetail } = this.state;
			if (goodsDetail.startSecound) {
				this.settime(goodsDetail.startSecound, 'startSecound', 0); // 
			}
			if (goodsDetail.surplusTime) {
				this.settime(goodsDetail.surplusTime, 'surplusTime', 1); // 
			}
			if (goodsDetail.isActivity) {
				// 如果已经登录，就直接获取资格
				this.getPassCodeStatus()
			}
			this.props.dispatch({
				type: 'detail/getMid',
				payload: { toOrderMid: Math.random() }
			})
			// 获取优惠券
			this.getCoupothis()
		});
	}
	// 授权失效
	authorizationFailure = () => {
		const { userInfo } = this.state;
		userInfo.fuluToken = '';
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		this.setState({
			userInfo
		}, () => {
			isLoginOrAuth(this);
		})
	}

	toPay = (val) => {
		if (val) this.setState({ formData: val })
		// 判断模式和授权
		let yes = isLoginOrAuth(this)
		console.log(yes, 'yes')
		if (yes) {
			this.sendOrder(val)
		}
	}
	sendOrder = (val) => {
		const { typeDetail, goodsDetail, ChargeNum, shopInfo, extractCode } = this.state;
		//中国银行，需要判断是不是活动商品，如果是活动商品 ibknum为46405才可购买
		if (shopInfo.codeKey.toLowerCase() === (configs.chinaBank ? configs.chinaBank.toLowerCase() : '')) {
			if (goodsDetail.isActivity) {
				//活动商品
				if (localStorage.getItem('ibknum') !== '46405') {
					this.setState({
						chinaBankModal: true
					})
					return false
				}
			}
		}
		if (typeDetail.productType === '直充' && val.ChargeNum > goodsDetail.singlePurchaseLimit) {
			return Toast.info(`购买数量不能大于${goodsDetail.singlePurchaseLimit}`);
		}
		let post = {
			productId: goodsDetail.productId,// 商品Id
			buyNum: goodsDetail.isActivity ? 1 : (typeDetail.productType === '直充' ? Number(val.ChargeNum) : Number(ChargeNum)),
			salePrice: goodsDetail.price,
			childCategoryId: typeDetail.childCategoryId
		}
		if (typeDetail.productType === '卡密') {  // 卡密
			if (shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '')) {
				if (!extractCode) {
					return Toast.info('提取码不能为空！')
				} else if (extractCode && !(/^\d{6}$/.test(extractCode))) {
					return Toast.info('提取码由6位数字组成')
				}
			}
			Object.assign(post, {
				extractCode: shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') ? extractCode : '123456',
			})
			this.props.dispatch({
				type: 'detail/sendCardOrder',
				payload: post
			})
		} else if (typeDetail.productType === '直充') {  // 直充
			Object.assign(post, {
				chargeAccount: val.ChargeAccount,
				chargePassword: val.ChargePWD,
				chargeGameName: val.ChargeGame,
				chargeGameRegion: val.ChargeRegion,
				chargeGameSrv: val.ChargeServer,
				contactTel: val.ContactType,
				contactQq: val.ContactQQ,
				chargeType: val.ChargeType,
			});
			if (!post.chargeAccount) {
				return Toast.info('充值账号不能为空')
			}
			this.props.dispatch({
				type: 'detail/sendOrder',
				payload: post
			})
		}
	}
	toUrl = (url) => {
		this.props.history.push(url);
	}
	onChange = (value) => {
		if (value.replace(/\s/g, '').length !== 6) {
			this.setState({
				hasError: true,
			});
		} else {
			this.setState({
				hasError: false,
			});
		}
		this.setState({
			extractCode: value,
		});
	}
	toOrderSure = (orderNo) => {
		const { userInfo, shopInfo } = this.state;
		window.location.href = `${configs.commonUrl}/orderSure?oid=${orderNo}&codeKey=${shopInfo.codeKey}&fuluToken=${userInfo.fuluToken}&fuluId=${userInfo.fuluId}`;
	}
	chinamodalCancel = () => {
		this.setState({
			chinaBankModal: false
		})
	}
	hideLoginModal = () => {
		this.setState({
			showMallLoginModal: false,
			// showLoginPageModal: false
		})
	}
	blurInput = () => {
		document.documentElement.scrollTop = document.documentElement.scrollTop;
	}
	showquanList = () => {
		this.setState({
			showquanList: true
		})
	}
	hidequanList = () => {
		this.setState({
			showquanList: false
		})
	}
	getQuan = (id) => {
		// 领券
		this.setState({
			quanId: id,
			getQuan: true
		}, () => {
			// 判断模式和授权
			let yes = isLoginOrAuth(this)
			console.log(yes, 'yes')
			if (yes) {
				this.getCouponFn()
			}
		})
	}
	getCouponFn = () => {
		const { quanId } = this.state;
		this.props.dispatch({
			type: 'coupons/ObtainCard',
			payload: {
				merCouponActivityId: quanId
			}
		});
	}
	jumpTo = (v) => {
		if (v.jumpType == 1) {
			this.toUrl('/')
		} else if (v.jumpType == 2) {
			this.toUrl(`/couponPage?cardId=${v.couponCode}&reachedAmount=${v.fullPrice}&reduceAmount=${v.price}`)
		} else if (v.jumpType == 3) {
			window.location.href = `/detail?gid=${v.proClassId}${v.productId ? `&pid=${v.productId}` : ''}`
		} else if (v.jumpType == 4) {
			window.location.href = v.jumpUrl
		}
	}
	render() {
		const { typeDetail, ChargeNum, goodsDetail, hasError, extractCode, couponList, passCodeStatus, isLoading, showquanList,
			startSecound, surplusTime, showMallLoginModal, chinaBankModal, shopInfo } = this.state;
		const { getFieldProps } = this.props.form;
		let arrNum = [];
		for (let i = 1; i <= 100; i++) {
			if (i <= goodsDetail.singlePurchaseLimit) {
				arrNum.push({
					label: i.toString(),
					value: i.toString(),
				})
			}

		}
		return (
			<div className="detail-bg">
				<Header
					{...this.props}
					title="充值中心"
					myLoading={!!(this.props.loading.models.detail)}  // 判断loading
				/>
				<div className="detail-con">
					<div className="goods-info-bg">
						{
							goodsDetail.productImage ?
								<img src={goodsDetail.productImage} className="goods-img" />
								:
								<div className="img-bg"></div>
						}
						{
							goodsDetail.isActivity ?
								<div className="active-info timelimit">
									<div className="left">
										<div className="price"><small>￥</small>{goodsDetail.price}<s>￥{goodsDetail.faceValue}</s><span className="limit-icon"></span></div>
										<div className="name">{goodsDetail.productName}</div>
									</div>
									<div className="timelimit-right">
										{/* <div>{goodsDetail.activityLabel ? <div className="tips">{goodsDetail.activityLabel}</div> : ''}</div> */}
										<div>
											<div className="time">
												<div className="activeTime">
													<span className="activeTime-title">
														{
															goodsDetail.activityState == 2 ? `${goodsDetail.endTime}结束` : (goodsDetail.activityState == 1 ? '距结束还剩' : `${goodsDetail.startTime}开始`)
														}
													</span>
													<span className="activeTime-time">{surplusTime ?
														<span>
															<span className="time-item">{goodsDetail.activityState == 1 ? surplusTime[0] : '0'}</span>天
																			<span className="time-item">{goodsDetail.activityState == 1 ? surplusTime[1] : '0'}</span>:
																			<span className="time-item">{goodsDetail.activityState == 1 ? surplusTime[2] : '0'}</span>:
																			<span className="time-item">{goodsDetail.activityState == 1 ? surplusTime[3] : '0'}</span>
														</span> : '--:--'}
													</span>
												</div>
											</div>
										</div>
									</div>
								</div> :
								<div className="active-info">
									<div className="left">
										<div className="price"><small>￥</small>{goodsDetail.price}<s>￥{goodsDetail.faceValue}</s></div>
										<div className="name">{goodsDetail.productName}</div>
									</div>
									<div className="right">
										<img src={typeDetail.iconPath} className="second-img" />
									</div>
								</div>
						}
					</div>
					{
						couponList && couponList[0] ?
							<div className="quan-bg" onClick={() => { this.showquanList() }}>
								{
									couponList && couponList[0] && couponList.map((v, i) => {
										if (i < 3) {
											return <div className="item font-clamp" key={i}>{v.content}</div>
										}
									})
								}
								<div className="to-list">领券<Icon type="right" /></div>
							</div> : ''
					}
					{
						showquanList && couponList && couponList[0] &&
						<div className="modal-bg">
							<div className="modal-close" onClick={this.hidequanList}></div>
							<div className="main">
								<h3>领取优惠券<span className="close-btn" onClick={this.hidequanList}><Icon type="cross" /></span></h3>
								<div className="list">
									{
										couponList && couponList[0] &&
										couponList.map((v, i) => (
											<div className={v.status != 1 ? "item" : "item unStart"} key={i}>
												<div className="left">
													<small>￥</small><strong>{v.price}</strong>
													<p>{v.content}</p>
												</div>
												<div className="line"></div>
												<div className="right">
													<div className="txt font-clamp">{v.name}</div>
													<div className="time font-clamp">{v.instructions}</div>
													<div className="use-down font-clamp">
														{v.startActiveTime} ~ {v.endActiveTime}
													</div>
													{v.status == 1 ? <p className="no-start">即将生效</p> : ''}
													{
														v.status == 1 ?
															<p className="btn-txt">已领取</p>
															:
															(
																v.status == 2 ?
																	<button className="get-btn" onClick={() => { this.getQuan(v.id) }}>领取</button>
																	:
																	<p className="btn-txt">已领取</p>
															)
													}
												</div>
											</div>
										))
									}
								</div>
							</div>
						</div>
					}
					<div className="goods-isActivity">
						<div className="d-goods">
							<ul className="clearfix">
								{
									typeDetail.productList && typeDetail.productList.length > 1 && typeDetail.productList.map((v, i) => (
										<li className={v.active ? 'active' : ''} key={i} onClick={() => { this.choseGoods(v) }}>
											<div className="g-faceValue">
												{v.productName}
											</div>
											<div className="g-price">{v.price}<small>元</small></div>
											{
												v.productLableName ? <div className={v.isActivity ? "sale-tips sale-active" : "sale-tips"}>{v.productLableName}</div> : ''
											}
										</li>
									))
								}
							</ul>
						</div>
					</div>
					{
						typeDetail.productType === '直充' &&
						<TemplateModal
							TemplateId={goodsDetail.templateId} getGameInfo={this.toPay}
							choseProduct={goodsDetail}
							payment={this.state.payment}
							validType={goodsDetail.validType}
							passCodeStatus={passCodeStatus}
							startSecound={startSecound}
							GetPassCode={this.GetPassCode}
							toOrderSure={this.toOrderSure}
							isLoading={isLoading}
						/>
					}
					{ //1话费 2流量 3卡密 4直充
						typeDetail.productType === '卡密' && shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
						<div className="d-account">
							<InputItem
								{...getFieldProps('extractCode')}
								placeholder="输入6位数字提取码"
								clear
								id="charge-input"
								className="input-bg"
								onClick={(e) => {
									e.currentTarget.focus();
								}}
								onBlur={this.blurInput}
								type="number"
								onChange={this.onChange}
								value={extractCode}
								disabled={goodsDetail.isActivity && passCodeStatus.userPassCodeStatus === 3}
							></InputItem>
							{
								hasError ?
									<p className="input-tips redfont">请输入6位数字的提取码</p>
									:
									(
										goodsDetail.isActivity && <p className="input-tips">该6位数提取码是您自定义设置，下单完成后凭此提取码兑换您的卡密信息</p>
									)
							}
						</div>
					}
					{
						typeDetail.productType === '卡密' && !goodsDetail.isActivity &&
						<div className="d-account">
							<Picker
								data={arrNum}
								cols={1}
								value={[ChargeNum]}
								onChange={this.changeNum}
								disabled={passCodeStatus.userPassCodeStatus === 3}
							>
								<List.Item arrow="horizontal">选择数量</List.Item>
							</Picker>
							{
								shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
								<p className="input-tips">该6位数提取码是您自定义设置，下单完成后凭此提取码兑换您的卡密信息</p>
							}
						</div>
					}
				</div>
				<div className="goods-info">
					<article>
						{
							goodsDetail.content && goodsDetail.content.split('|').map((v, i) => (
								<div key={i} dangerouslySetInnerHTML={{
									__html: v
								}} />
							))
						}
						{
							typeDetail.productType === '卡密' &&
							<div className="rule-bg">
								<h3>使用说明</h3>
								<div className="rule-img"></div>
							</div>
						}
					</article>
					<div className="rule-tips-bg">
						<h3>注意常见骗子手段</h3>
						<div><span>1、</span><p>以互刷信誉或兼职为借口指定账号让您购买</p></div>
						<div><span>2、</span><p>骗子盗取您的好友账号，让您帮其代充</p></div>
						<div><span>3、</span><p>低价引诱，发送链接让您购买</p></div>
						<div><span>4、</span><p>请勿相信任何非官方售后消息，如遇任何问题联系<Link to="/service" className="link">售后服务</Link></p></div>
					</div>
				</div>
				{
					typeDetail.productType === '卡密' &&
					<span>
						{
							goodsDetail.isActivity ?
								<div className="btn-bg">
									{
										goodsDetail.activityState == 0 ?
											<button className="btn-block time-btn">
												距离开抢还剩：{startSecound ? startSecound : '--:--'}
											</button>
											: ''
									}
									{
										goodsDetail.activityState == 1 ?
											<div className="active-btn">
												{
													// 马上抢 立即兑换(兑换下单)  立即兑换（直接跳订单） 正在抢购，请稍等...   您已参加
													passCodeStatus.userPassCodeStatus === 3 ?
														<button className="btn-block prim-btn" onClick={this.GetPassCode}>马上抢</button>
														: ''
												}
												{
													passCodeStatus.userPassCodeStatus === 4 && !isLoading ?
														<button className="btn-block prim-btn" onClick={this.toPay}>立即购买</button>
														: ''
												}
												{
													passCodeStatus.userPassCodeStatus === 1 && !isLoading ?
														<button className="btn-block prim-btn" onClick={() => { this.toOrderSure(passCodeStatus.orderNo) }}>立即购买</button>
														: ''
												}
												{
													passCodeStatus.userPassCodeStatus === 4 && isLoading ?
														<button disabled={true} className="btn-block disable-btn">正在抢购，请稍等...</button>
														: ''
												}
												{
													passCodeStatus.userPassCodeStatus === 2 ?
														<button disabled={true} className="btn-block disable-btn">您已参加</button>
														: ''
												}
											</div>
											: ''
									}
									{
										goodsDetail.activityState == 2 ?
											<button disabled={true} className="btn-block disable-btn">活动已结束</button>
											: ''
									}

								</div>
								:
								<div className="btn-bg">
									<button
										className="btn-block prim-btn"
										onClick={() => { this.toPay({}, 'showMallLoginModal') }}
										disabled={!!(this.props.loading && this.props.loading.effects['detail/sendCardOrder'])}
										loading={!!(this.props.loading && this.props.loading.effects['detail/sendCardOrder'])}
									>立即购买</button>
								</div>
						}
					</span>
				}
				{
					chinaBankModal &&
					<WingBlank>
						<Modal
							title="提示信息"
							transparent
							maskClosable={false}
							visible={true}
							className="chinaBankModal"
							onClose={this.chinamodalCancel}
							footer={[{ text: '确定', onPress: this.chinamodalCancel }]}
						>
							<div>
								该活动仅限湖北地区客户参加。
					</div>
						</Modal>
					</WingBlank>
				}
				{showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
				{/* {showLoginPageModal && <LoginPageModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />} */}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(createForm()(Detail));