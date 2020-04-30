import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import Icons, { search } from '../Icon';
import { Toast, Button } from 'antd-mobile';
import parse from 'url-parse';
import './less/list.less'

class List extends React.Component {

	constructor(props) {
		super(props);
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
		const url = parse(props.location.search, true);
		const { mid } = url.query;  // 获取一级分类id
		this.state = {
			mid,
			secondMenu: [],
			hotPro: [],
			secondTotal: -1,
			shopInfo,
			banner: []
		}
	}
	componentWillMount() {
		scrollTo(0, 0);
		const { mid } = this.state;
		if (mid) {
			if (mid === 'active') {
				this.getHotPro()
			} else {
				this.getsecondMenu(mid)
				this.getBanner(mid)
			}
		} else {
			this.props.history.push('/')
		}
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { home: { getBanner }, list: { getsecondMenu, getHotPro } } = nextProps;
		if (getsecondMenu !== props.list.getsecondMenu) {
			const { code, data, message } = getsecondMenu;
			if (code === '1000') {
				this.setState({
					secondMenu: data.list,
					secondTotal: data.list.length,
				});
			} else {
				Toast.info(message);
			}
		}
		if (getHotPro !== props.list.getHotPro) {
			const { code, data, message } = getHotPro;
			if (code === '1000') {
				this.setState({
					hotPro: data.list,
				});
			} else {
				Toast.info(message);
			}
		}
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
	}
	getBanner = () => {
		const { shopInfo, mid } = this.state;
		this.props.dispatch({
			type: 'home/getBanner',
			payload: {
				sysTemplateId: shopInfo.merInfoTemplates.templateId,
				locationType: 'list',
				MerTemplateId: shopInfo.merInfoTemplates.id,
				categoryId: mid
			}   // 获取首页的banner
		});
	}
	getHotPro = () => {
		const { shopInfo } = this.state;
		this.props.dispatch({
			type: 'list/getHotPro',
			payload: {
				merInfoId: shopInfo.merInfoId,
				count: 999
			}
		})
	}
	getsecondMenu = (mid) => {
		this.props.dispatch({
			type: 'list/getsecondMenu',
			payload: {
				categoryId: mid,
			}   // 获取二级分类
		})
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
	render() {
		const { secondMenu, hotPro, mid, secondTotal, banner } = this.state;
		return (
			<div className="list-bg">
				<Header
					{...this.props}
					myLoading={!!(this.props.loading.models.list)}  // 判断loading
				/>
				{
					banner.length ?
						<div className="list-banner" onClick={() => { this.toBanner(banner[0]) }}><img src={banner[0].bannerUrl} /></div>
						: ''
				}
				{
					mid === 'active' ?
						<div className="hot-list">
							<ul>
								{
									hotPro && hotPro[0] ? hotPro.map((v, i) => (
										<li key={i} onClick={() => { this.toDetail(v.childCategoryId, v.productId) }}>
											<div className="left">
												<img src={v.iconPath} />
											</div>
											<div className="center">
												<div className="name">{v.productName}</div>
												<div className="price">
													{v.price}
													<span className="small">元</span>
													<s className="del-price">{v.faceValue}元</s>
												</div>
											</div>
											<Button className="right">马上抢</Button>
										</li>
									)) : ''
								}
							</ul>
						</div>
						:
						<div className="two-list">
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
									)) : ''
								}
							</ul>
						</div>
				}
				{
					secondTotal === 0 ? <div className="noting"><span></span>暂无数据</div> : ''
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(List);