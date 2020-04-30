import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import PropTypes from 'prop-types';
import { ListView, Toast, Modal, Button, Tabs, TextareaItem, Icon } from 'antd-mobile';
import Icons, { back, shanchu } from '../Icon';
import './less/orderList.less';
import moment from 'moment';
import mathManage from '../../utils/mathManage';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';

const alert = Modal.alert;

class OrderList extends React.Component {

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
                pageSize: 10,
                orderStatus: '0',
            },
            userInfo,
            showModal: false,
            SaleType: 11,
            lineDetail: {},
            shopInfo,
            showMallLoginModal: false,
            showLoginPageModal: false,
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
        const { orderList: { getOrderList } } = nextProps;
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
        if (getOrderList !== props.orderList.getOrderList) {
            const { code, data, message } = getOrderList;
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
            type: 'orderList/getOrderList',
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
    
    toDetail = (oid) => {
        this.props.history.push(`/orderDetail?oid=${oid}`);
    }
    getSecretCrad = (v) => {
        this.props.history.push(`/secretCard?oid=${v.orderNo}&pid=${v.productId}&mid=${v.childCategoryId}`);
    }
    getOtherOrder = (cid, pid) => {
        this.props.history.push(`/detail?gid=${cid}&pid=${pid}`);
    }
    showModal = (type, v) => {
        this.setState({
            [type]: true
        })
        if (v) {
            this.setState({
                lineDetail: v
            })
        }
    }
    hideModal = (type) => {
        this.setState({
            [type]: false
        })
    }
    payAgain = (v) => {
        // 计算订单时间  如果订单生成时间大于15分钟  就跳转订单列表页
        const now = moment(moment().format()).valueOf();  // 当前时间
        const oTime = moment(v.orderTime).valueOf();   // 订单时间
        const time = mathManage.accDiv(mathManage.Subtr(now, oTime), 1000).toFixed(0);
        if (time > 1500) {
            Toast.info('订单已失效！');
            this.setState({
                dataSource: [],
                total: 0,
                isSearchFinish: true,
                isLoadScroll: false
            }, () => {
                this.init();
            })
            return;
        } else {
            const { userInfo, shopInfo } = this.state;
            window.location.href = `${configs.commonUrl}/orderSure?oid=${v.orderNo}&codeKey=${shopInfo.codeKey}&fuluToken=${userInfo.fuluToken}&fuluId=${userInfo.fuluId}`;
        }
    }
    toDelete = (oid) => {
        const that = this;
        alert('提示', '您确定要删除该订单信息？', [
            { text: '取消', onPress: () => console.log('取消') },
            {
                text: '确定', onPress: () => that.props.dispatch({
                    type: 'orderList/deleteOrder',
                    payload: {
                        orderId: oid,
                    }
                })
            },
        ])
    }
    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="order-line">
                <div className="o-top">
                    <span className="time">{rowData.orderTime}</span>
                    <span className={(rowData.orderStatus === 51 || rowData.orderStatus === 71) ? "o-status greenfont" : (rowData.orderStatus === 61 ? 'o-status redfont' : (rowData.orderStatus === 11 ? 'o-status orangefont' : 'o-status'))}>
                        {
                            rowData.orderStatusText
                        }
                    </span>
                </div>
                <div className="o-info" onClick={() => { this.toDetail(rowData.orderNo) }}>
                    <img src={rowData.productImg} className="logo" />
                    <span className='order-info'>
                        <span className="name">{rowData.productName}</span>
                        <span className="price">共支付：<span className="redfont">¥{rowData.payPrice}</span></span>
                    </span>
                    <div className="right">x{rowData.buyNum}<Icon type="right" /></div>

                </div>
                <div className="o-btn">
                    {
                        (rowData.orderStatus === 51 || rowData.orderStatus === 71) &&
                        <button className="btn" onClick={() => this.getOtherOrder(rowData.childCategoryId, rowData.productId)}>再来一单</button>
                    }
                    {
                        // 本期暂时不要售后
                        // rowData.orderStatus === 51 && !rowData.isAfterSale &&
                        // <button className="btn btn-theme" onClick={() => { this.showModal('showModal', rowData) }}>申请售后</button>
                    }
                    {
                        rowData.productType === 3 && rowData.orderStatus === 51 &&
                        <button className="btn btn-theme" onClick={() => this.getSecretCrad(rowData)}>提取卡密</button>
                    }
                    <button className="btn" onClick={() => { this.toDetail(rowData.orderNo) }}>查看详情</button>
                    {
                        rowData.orderStatus === 11 &&
                        <button className="btn btn-theme" onClick={() => { this.payAgain(rowData) }}>去支付</button>
                    }
                </div>
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
    render() {
        const { manageDataSource, total, postData, showModal, isSearchAll, SaleType, hasHead, showMallLoginModal, showLoginPageModal } = this.state;
        const tabs = [
            { title: '全部', sub: '0' },
            { title: '待付款', sub: '1' },
            { title: '充值成功', sub: '2' },
            { title: '充值失败', sub: '3' }
        ];
        return (
            <div className="order-list clearfix">
                <Header
                    {...this.props}
                    jump={() => this.props.history.push('/')}
                    myLoading={!!(this.props.loading.models.orderList)}  // 判断loading
                />
                <div className={hasHead ? "list-con tabs-top" : "list-con"}>
                    <Tabs tabs={tabs}
                        initialPage={postData.orderStatus}
                        onChange={(tab, index) => {
                            postData.orderStatus = tab.sub;
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
export default connect(mapStateToProps)(OrderList);