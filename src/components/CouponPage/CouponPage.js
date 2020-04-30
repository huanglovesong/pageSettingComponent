import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import { Toast, Button, ListView } from 'antd-mobile';
import parse from 'url-parse';
import './less/couponPage.less'

class CouponPage extends React.Component {

	constructor(props) {
		super(props);
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
		const url = parse(props.location.search, true);
		const { cardId, reachedAmount, reduceAmount } = url.query;  // 获取二级分类id// 获取商户信息 
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
			secondMenu: [],
			goodsList: [],
			secondTotal: -1,
			shopInfo,
			banner: [],
			cardId,
			reachedAmount,
			reduceAmount,
			postData: {
				couponCode: cardId,
				pageIndex: 1,
				pageSize: 9
			}
		}
	}
	componentWillMount() {
		scrollTo(0, 0);
		if (this.state.cardId) {
			this.getCouponsGoods()
		} else {
			this.props.history.push('/')
		}
	}
	componentWillReceiveProps(nextProps) {
		const { props } = this;
		const { coupons: { GetCouponProductList } } = nextProps;
		if (GetCouponProductList !== props.coupons.GetCouponProductList) {
			const { code, data, message } = GetCouponProductList;
			if (code === '1000') {
				if (data && data.list) {
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
			} else {
				Toast.info(message);
			}
		}
	}

	getCouponsGoods = () => {
		const { postData } = this.state;
		this.props.dispatch({
			type: 'coupons/GetCouponProductList',
			payload: postData
		})
	}

	toDetail = (gid, pid) => {
		this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ''}`);
	}

	renderRow = (rowData, sectionID, rowID) => {
		return (
			<li key={rowID} onClick={() => { this.toDetail(rowData.childCategoryId) }}>
				<div className="left">
					<img src={rowData.iconPath} />
					{rowData.cornerMark ? <div className="sale-tips">
						{rowData.cornerMark}
					</div> : ''}
				</div>
				<div className="center">
					<div className="name">{rowData.productName}</div>
					<div className="price">
						{rowData.price}
						<span className="small">元起</span>
						<s className="del-price">{rowData.faceValue}元起</s>
					</div>
					{
						rowData.couponContent && rowData.couponContent[0] ?
							<div className="label-bg">
								{
									rowData.couponContent.map((m,n) => {
										if(n<2){
											return <span>{m}</span>
										}
									})
								}
							</div> : ''
					}
				</div>
				<Button className="right">购买</Button>
			</li>
		)
	}
	onEndReached = () => {
		const { postData, isSearchFinish, isSearchAll } = this.state;
		this.setState({ isLoadScroll: true });
		// 当前请求完成，才去请求下一页
		if (isSearchFinish && !isSearchAll) {
			postData.pageIndex++;
			this.setState({ postData }, () => {
				this.getCouponsGoods();
			})
		}
	}
	render() {
		const { manageDataSource, secondTotal, postData, isSearchAll, reachedAmount, reduceAmount } = this.state;
		return (
			<div className="couPage-bg">
				<Header
					{...this.props}
					myLoading={!!(this.props.loading.models.coupons)}  // 判断loading
				/>
				<div className="two-list">
					{
						reduceAmount && reduceAmount &&
						<div className="tips">以下商品可使用<span className="redfont">
							{
								reachedAmount > 0 ? `每满${reachedAmount}减${reduceAmount}` : `${reduceAmount}元无门槛`
							}</span>优惠券</div>
					}
					<ul>
						{
							secondTotal !== 0 ?
								<ListView
									className="list-view"
									dataSource={manageDataSource}
									renderRow={this.renderRow}
									initialListSize={postData.pageSize}
									pageSize={postData.pageSize}
									onEndReachedThreshold={80}
									onEndReached={this.onEndReached}
									renderFooter={isSearchAll && (() => (
										<div className="no-more">--我是有底线的--</div>
									))}
								/>
								: ''
						}
					</ul>
				</div>
				{
					secondTotal === 0 ? <div className="noting"><span></span>暂无数据</div> : ''
				}
				<div className="cover-icon" onClick={()=>{this.props.history.push('/mycoupons')}}></div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state,
	};
}

export default connect(mapStateToProps)(CouponPage);