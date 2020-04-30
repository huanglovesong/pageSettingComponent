import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Icons, { time, timeBlue, timeBlueO, cuoRedO, dui, duiBlue, duiBlueO } from '../Icon';
import './less/orderDetail.less';
import { Toast, Icon } from 'antd-mobile';
import parse from 'url-parse';
import mathManage from '../../utils/mathManage';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';

class OrderDetail extends React.Component {

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
            hotPro: [],
            showMallLoginModal: false,
            showLoginPageModal: false,
        }
    }
    componentWillMount() {
        // 判断模式和授权
        let yes = isLoginOrAuth(this);
        // 如果从来没有登录
        if (yes) {
            this.getOrderStatus()
        }
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { orderDetail: { getOrderDetail } } = nextProps;
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
        if (getOrderDetail !== props.orderDetail.getOrderDetail) {
            const { code, data, message } = getOrderDetail;
            if (code === '1000') {
                if (data.orderStatus === 15 || data.orderStatus === 51 || data.orderStatus === 71) {
                } else {
                    //  当订单状态不是成功或者失败的时候继续调用接口
                    setTimeout(() => {
                        this.getOrderStatus();
                    }, 10000)
                }
                this.setState({
                    orderDetail: data,
                });
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                // 授权失效
                this.authorizationFailure();
            }
            else {
                Toast.info(message);
            }
        }
    }
    loginSuccess = (data) => {
        this.hideLoginModal();
        this.getOrderStatus()
    }
    hideLoginModal = () => {
        this.setState({
            showMallLoginModal: false,
            showLoginPageModal: false
        })
    }
    // 授权失效
    authorizationFailure = () => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.fuluToken = '';
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        isLoginOrAuth(this);
    }
    getOrderStatus = () => {
        const { oid } = this.state;
        this.props.dispatch({
            type: 'orderDetail/getOrderDetail',
            payload: {
                OrderNo: oid
            }
        })
    }
    toUrl = (url) => {
        this.props.history.push(url)
    }
    show = () => {
        const { detail } = this.state;
        this.setState({
            detail: !detail
        })
    }
    render() {
        const { orderDetail, hotPro, detail, showMallLoginModal, showLoginPageModal, shopInfo } = this.state;
        let orderStatustxt = '';
        // 订单外部状态：11-待付款、15-交易关闭、21-付款成功、31-待充值、41-充值中、51-充值成功、61-充值失败、71-退款成功
        switch (orderDetail.orderStatus) {
            case 11:
                orderStatustxt = "待付款";
                break;
            case 15:
                orderStatustxt = "交易关闭";
                break;
            case 21:
                orderStatustxt = "付款成功";
                break;
            case 31:
                orderStatustxt = "待充值";
                break;
            case 41:
                orderStatustxt = "充值中...";
                break;
            case 51:
                orderStatustxt = "充值成功";
                break;
            case 61:
                orderStatustxt = "充值失败";
                break;
            case 71:
                orderStatustxt = "退款成功";
                break;
        }
        return (
            <div className="clearfix orderdetail-bg">
                <Header
                    {...this.props}
                    title="订单详情"
                    jump={() => { this.props.history.push('/') }}
                    myLoading={!!this.props.loading.models.orderDetail}  // 判断loading
                />
                <div className="status-top">
                    <div className="icon-center orangeBg">
                        <div className={`img-center status${orderDetail.orderStatus}`} />
                        <span className="txt-only">{orderStatustxt}
                        </span>
                    </div>
                </div>
                <div className="goods-info">
                    <div className="list-item">
                        <div className="left-img">
                            <img src={orderDetail.productImg} className="img" />
                        </div>
                        <div className="title">
                            {orderDetail.productName}
                        </div>
                        <div className="num">￥{orderDetail.surePrice}</div>
                    </div>
                    <div className="goods-desc">
                        {
                            orderDetail.productType === 3 ?
                                <div className="row">
                                    <label>充值类型</label>
                                    <p>卡密</p>
                                </div>
                                :
                                <div className="row">
                                    <label>充值账号</label>
                                    <p>{orderDetail.chargeAccount}</p>
                                </div>
                        }
                        <div className="row">
                            <label>订单编号</label>
                            <p>{orderDetail.orderNo}</p>
                        </div>
                        <div className="row">
                            <label>下单时间</label>
                            <p>{orderDetail.orderTime}</p>
                        </div>
                        <div className="row">
                            <label>支付方式</label>
                            <p>{orderDetail.payType === 1 ? '微信支付' : orderDetail.payType === 2 ? '支付宝支付' : orderDetail.payType === 4 ? '芒果支付' : orderDetail.payType === 5 ? '中国银行支付' : '未支付'}</p>
                        </div>
                        <div className="row">
                            <label>充值数量</label>
                            <p>x{orderDetail.buyNum}</p>
                        </div>
                        <div className="row">
                            <label>支付金额</label>
                            <p>￥{orderDetail.payPrice}</p>
                        </div>
                        <div className="row">
                            <label>商品总价</label>
                            <p>￥{orderDetail.totalPrice}</p>
                        </div>
                        {
                            orderDetail.merCouponAmount ?
                                <div className="row">
                                    <label>优惠券</label>
                                    <p>-￥{orderDetail.merCouponAmount}</p>
                                </div> : ''
                        }
                        <div className="row">
                            <label>服务商家</label>
                            <p>福禄网络科技有限公司</p>
                        </div>
                        {
                            detail && orderDetail.productType === 4 && orderDetail.chargeGameName ?
                                <div>
                                    <div className="row">
                                        <label>游戏类型</label>
                                        <p>{orderDetail.gameType}</p>
                                    </div>
                                    <div className="row">
                                        <label>充值游戏</label>
                                        <p>{orderDetail.chargeGameName}</p>
                                    </div>
                                    <div className="row">
                                        <label>充值区</label>
                                        <p>{orderDetail.chargeGameRegion}</p>
                                    </div>
                                    <div className="row">
                                        <label>充值服</label>
                                        <p>{orderDetail.chargeGameSrv}</p>
                                    </div>
                                </div>
                                : ''
                        }
                        {
                            orderDetail.productType === 4 && orderDetail.chargeGameName &&
                            <div className="row" onClick={this.show}>
                                <a className="link">{detail ? <span>收起详情<Icon type="down" /></span> : <span>查看详情<Icon type="right" /></span>}</a>
                            </div>
                        }
                    </div>
                </div>
                <div className="btn-bg">
                    {
                        shopInfo.codeKey.toLowerCase() !== (configs.tencentSH ? configs.tencentSH.toLowerCase() : '') &&
                        <button className="toOrder" onClick={() => { this.toUrl('/') }}>返回首页</button>
                    }
                    <button className="toIndex" onClick={() => { this.toUrl(`/detail?gid=${orderDetail.childCategoryId}&pid=${orderDetail.productId}`) }}>再来一单</button>
                </div>
                {showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
                {showLoginPageModal && <LoginPageModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
                {/* <div className="last-gray">
                    <div className="logo-s" />福禄
      				<div className="line">|</div>
                    本服务由福禄开放平台提供技术支持
	  			</div> */}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(OrderDetail);