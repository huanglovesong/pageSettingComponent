import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Icons, { time, timeBlue, timeBlueO, cuoRedO, dui, duiBlue, duiBlueO } from '../Icon';
import './less/orderStatus.less';
import { Toast, Icon } from 'antd-mobile';
import parse from 'url-parse';
import mathManage from '../../utils/mathManage';

class OrderStatus extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { oid } = url.query;  // 获取订单号
        // 获取商户信息
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            orderDetail: {},
            oid,
            shopInfo,
            hotPro: []
        }
    }
    componentWillMount() {
        this.getHotCategory()
        this.init()
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { orderDetail: { getOrderDetail }, pay: { getHotCategory } } = nextProps;
        if (getOrderDetail !== props.orderDetail.getOrderDetail) {
            const { code, data, message } = getOrderDetail;
            if (code === '1000') {
                this.setState({
                    orderDetail: data,
                });
            } else {
                Toast.info(message);
            }
        }
        if (getHotCategory !== props.pay.getHotCategory) {
            const { code, data, message } = getHotCategory;
            if (code === '1000') {
                this.setState({
                    hotPro: data.list
                })
            }
        }
    }
    init = () => {
        const { oid } = this.state;
        this.props.dispatch({
            type: 'orderDetail/getOrderDetail',
            payload: {
                OrderNo: oid
            }
        })
    }
    getHotCategory = () => {
        const { oid, shopInfo } = this.state;
        this.props.dispatch({
            type: 'pay/getHotCategory',
            payload: {
                merchantId: shopInfo.merInfoId
            }
        })
    }
    toUrl = (url) => {
        this.props.history.push(url)
    }
    render() {
        const { orderDetail, hotPro, oid, shopInfo } = this.state;
        return (
            <div className="order-status">
                <Header
                    {...this.props}
                    title="支付成功"
                    jump={() => { this.props.history.push('/') }}
                    myLoading={!!this.props.loading.models.pay}  // 判断loading
                />
                <div className="top">
                    {
                        orderDetail.orderStatus === 11 ?
                            <div>
                                <div className="succ-icon pay-icon" />
                                <div className="txt">待支付</div>
                            </div>
                            :
                            <div>
                                <div className="succ-icon" />
                                <div className="txt">支付成功</div>
                            </div>
                    }
                    {
                       shopInfo.codeKey.toLowerCase() !== (configs.tencentSH ? configs.tencentSH.toLowerCase() : '') && 
                       <button type="primary" className="primary-btn" onClick={() => { this.toUrl('/') }}>返回首页</button>
                    }
                    <button type="ghost" className="ghost-btn" onClick={() => { this.toUrl(`/orderDetail?oid=${oid}`) }}>查看订单</button>
                </div>
                <div className="more-bg">
                    <div className="more-txt">为你精选更多权益</div>
                    <div className="more-pro">
                        {
                            hotPro && hotPro[0] && hotPro.map(item => (
                                <div className="item" onClick={() => { this.toUrl(`/detail?gid=${item.childCategoryId}`) }}>
                                    <img src={item.iconPath} />
                                    <span className="name">{item.childCategoryName}</span>
                                    <span className="price">{item.price}<small>元起</small></span>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* <div className="last-gray">
					<div className="logo-s" />福禄
      				<div className="line">|</div>
					本服务由福禄开放平台提供技术支持
	  			</div> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(OrderStatus);