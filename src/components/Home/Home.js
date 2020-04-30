import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Icons, { arrowRight, zpbz, jstk, zxzk, shwy, back } from '../Icon';
import { Carousel, Toast, Modal, Button, Tabs } from 'antd-mobile';
import parse from 'url-parse';
import './less/home.less'

class Home extends React.Component {

	constructor(props) {
		super(props);
		// 获取商户信息
		const url = parse(props.location.search, true);
		const { codeid } = url.query;  // 获取二级分类id// 获取商户信息 
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		// if (shopInfo.codeKey === configs.xiaomi) {
		// 	this.props.history.push('/mHome');
		// }
		this.state = {
			banner: [],
			firstMenu: [],
			shopInfo,
			secondMenu: [],
			hotPro: [],
			backshow: false
		}
	}
	componentWillMount() {
		const { shopInfo } = this.state;
		this.props.dispatch({
			type: 'home/getBanner',
			payload: {
				sysTemplateId: shopInfo.merInfoTemplates.templateId,
				locationType: 'home',
				MerTemplateId: shopInfo.merInfoTemplates.id
			}   // 获取首页的banner
		});
		// 获取首页一级类目
		this.props.dispatch({
			type: 'list/getFirstMenu'
		})
		this.getHotPro();
		//判断是否是中国银行,如果是显示头部返回
		var codeKey = this.state.codeid || shopInfo.codeKey;
		if (codeKey) {
			if (codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
				if (window.terminal) {
					var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision)
					this.setState({
						backshow: codeKey.toLowerCase() === configs.chinaBank.toLowerCase() && bankVision == '-1' ? true : false
					})
				}
			}
		}
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { home: { getBanner }, list: { getFirstMenu, getsecondMenu, getHotPro } } = nextProps;
		if (getBanner !== props.home.getBanner) {
			const { code, data, message } = getBanner;
			if (code === '1000') {
				this.setState({
					banner: data.list
				});
			} else {
				Toast.info(message);
			}
		}
		if (getFirstMenu !== props.list.getFirstMenu) {
			const { code, data, message } = getFirstMenu;
			if (code === '1000') {
				data.list.map(v => {
					v.title = v.className;
				})
				this.setState({
					firstMenu: data.list
				}, () => {
					if (data.list && data.list[0]) {
						this.getsecondMenu(data.list[0].id)
					}
				});
			} else {
				Toast.info(message);
			}
		}
		if (getsecondMenu !== props.home.getsecondMenu) {
			const { code, data, message } = getsecondMenu;
			if (code === '1000') {
				this.setState({
					secondMenu: data.list
				});
			} else {
				Toast.info(message);
			}
		}
		if (getHotPro !== props.home.getHotPro) {
			const { code, data, message } = getHotPro;
			if (code === '1000') {
				this.setState({
					hotPro: data.list
				});
			} else {
				Toast.info(message);
			}
		}
	}
	// 获取二级分类
	getsecondMenu = (mid) => {
		this.setState({
			mid
		}, () => {
			this.props.dispatch({
				type: 'list/getsecondMenu',
				payload: {
					categoryId: mid
				}
			})
		})
	}
	toList = (mid) => {
		this.props.history.push(`/list?mid=${mid}`);
	}
	toDetail = (gid, pid) => {
		this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ''}`);
	}
	toBanner = (v) => {
		if (v.bannerType === 1) {
			window.location.href = v.linkurl
		} else if (v.bannerType === 2 && v.ifSkip === 1) {
			this.props.history.push(`/detail?gid=${v.childCategoryId}&pid=${v.productId}`)
		}
	}
	getHotPro = () => {
		const { shopInfo } = this.state;
		this.props.dispatch({
			type: 'list/getHotPro',
			payload: {
				merInfoId: shopInfo.merInfoId,
				count: 5
			}
		})
	}
	backbank = () => {
		try {
			document.addEventListener('deviceready', function () {
				window.c_plugins.merchantBridge.goToNative(function () {
				}, function (err) {
					alert(err.message || err || '网络错误，请检查网络连接');
				}, { page: '0' })
			})
		} catch (error) {
			alert(error)
		}
	}
	render() {
		const { firstMenu, banner, shopInfo, hotPro, secondMenu, mid, backshow } = this.state;
		let MenuCarousel = []
		for (var i = 0, len = firstMenu.length; i < len; i += 5) {
			MenuCarousel.push(firstMenu.slice(i, i + 5));
		}
		return (
			<div className="mian-bg">
				<Header
					{...this.props}
					myLoading={!!(this.props.loading.models.home || this.props.loading.models.list)}  // 判断loading
				/>
				{
					backshow &&
					<div className="backtobank">
						<button
							className="header-left"
							onClick={this.backbank}
						>
							<Icons glyph={back} />返回</button>
					</div>
				}
				<div className="banner-bg">
					{
						banner && banner[0] ?
							<Carousel
								autoplay={true}
								infinite
							>
								{
									banner.map((v, i) => (
										<li style={{ width: '100%', height: '4.26rem' }}>
											<a
												key={i}
												onClick={() => { this.toBanner(v) }}
												style={{ display: 'inline-block', width: '100%', height: '4.26rem' }}
											>
												<img
													src={v.bannerUrl}
													alt=""
													className="banner-img"
													style={{ width: '100%', verticalAlign: 'top' }}
													onLoad={() => {
														window.dispatchEvent(new Event('resize'));
													}}
												/>
											</a>
										</li>
									))
								}
							</Carousel>
							:
							<div className="no-banner">暂无广告图片</div>
					}
				</div>
				<div className="advantage">
					<span><Icons glyph={zpbz} />正品保证</span>
					<span><Icons glyph={zxzk} />专享折扣</span>
					<span><Icons glyph={jstk} />急速到账</span>
					<span><Icons glyph={shwy} />售后无忧</span>
				</div>
				<div className="first-bg">
					{MenuCarousel.length > 0 &&
						<Carousel
							autoplay={true}
							infinite
						>
							{
								MenuCarousel.map((item, data) => (
									<ul className="menu-ul clearfix">
										{
											item[0] && item.map((v, i) => {
												if (i < 5) {
													return <li key={i} onClick={() => { this.toList(v.id) }} style={{ height: '1.3rem' }}>
														<div className="menu-img"><img src={v.iconPath} /></div>
														<div className="menu-t">{v.className}</div>
													</li>
												}
											})
										}
									</ul>
								))
							}
						</Carousel>
					}
				</div>
				{
					hotPro[0] &&
					<div className="hot-pro">
						<div className="title">
							<span className="left">限时抢购</span>
							<span className="right" onClick={() => { this.toList('active') }}>更多<Icons glyph={arrowRight} /></span>
						</div>
						<div className="con clearfix">
							<ul
								style={{ width: hotPro.length > 2 ? `${hotPro.length * 2.6}rem` : '100%', height: '3.1rem' }}>
								{
									hotPro.map((item, m) => (
										<li key={m} onClick={() => { this.toDetail(item.childCategoryId, item.productId) }}>
											<div className="menu-img">
												<img src={item.iconPath} />
											</div>
											<div className="name">{item.productName}</div>
											<div className="price">
												<small>￥</small>{item.price}
												<s className="del-price">￥{item.faceValue}</s>
											</div>
										</li>
									))
								}
							</ul>
						</div>
					</div>
				}
				<div className="home-g-title">
					<Tabs tabs={firstMenu} onChange={(tab) => { this.getsecondMenu(tab.id) }} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}></Tabs>
				</div>
				<div className="goods-main">
					<div className="g-con">
						<ul>
							{
								secondMenu && secondMenu[0] ? secondMenu.map((v, i) => (
									<li key={i} onClick={() => { this.toDetail(v.childCategoryId) }}>
										<div className="left">
											<img src={v.iconPath} />
											{v.cornerMark ? <div className="sale-tips">
												{v.cornerMark}
											</div> : ''}
										</div>
										<div className="center">
											<div className="name">{v.childCategoryName}</div>
											<div className="price">
												{v.price}
												<span className="small">元起</span>
												<s className="del-price">{v.faceValue}元起</s>
											</div>
										</div>
										<Button className="right">购买</Button>
									</li>
								)) :
									<div className="no-data">暂无数据</div>
							}
						</ul>
					</div>
				</div>
				{/* <div className="last-gray">
					<div className="logo-s" />福禄
      				<div className="line">|</div>
					本服务由福禄开放平台提供技术支持
	  			</div> */}
				<Footer {...this.props} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(Home);