import React from 'react';
import { connect } from 'dva';
import Header from '../Header';
import PropTypes from 'prop-types';
import { ListView, Toast, Modal, Button, Tabs, TextareaItem, Icon } from 'antd-mobile';
import Icons, { back, shanchu } from '../Icon';
import './less/prizelist.less';
import moment from 'moment';
import Clipboard from 'clipboard';
import mathManage from '../../utils/mathManage';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import imageurl from './images/filed-icon.png';

const alert = Modal.alert;

class PrizeList extends React.Component {

    constructor(props) {
        super(props);
        // 获取商户信息
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        const eventId = localStorage.getItem('eventId');
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.consignList = [];
        this.state = {
            eventId: eventId === 'null' ? null : eventId,
            manageDataSource: dataSource.cloneWithRows([]),
            isSearchFinish: false, // 判断当前请求是否完成
            isLoadScroll: false,
            isSearchAll: false,
            dataSource: [],
            total: -1,
            postData: {
                pageIndex: 1,
                pageSize: 10,
            },
            userInfo,
            showModal: false,
            SaleType: 11,
            lineDetail: {},
            shopInfo,
            showMallLoginModal: false,
            loading: false
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
        // // 判断模式和授权
        let yes = isLoginOrAuth(this);
        // 如果从来没有登录
        if (yes) {
            this.init();
        }
    }
    componentDidMount() {
        new Clipboard('.prize-btn');
        _czc.push(["_setAutoPageview", false]);
        _czc.push(["_trackPageview", '/prizelist']);
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { login: { fuluusertoken } } = nextProps;
        const { prize: { prizeResultRes } } = nextProps;
        if (prizeResultRes !== props.prize.prizeResultRes) {
            const { code, data, message } = prizeResultRes;
            if (code === '0') {
                if (data && data.list) {
                    data.list.map((item, index) => {
                        if (item.verificationDateEnd) {
                            item.timeout = moment(item.verificationDateEnd).valueOf() < moment(moment().format()).valueOf()
                        }
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
                        isLoadScroll: false,
                        loading: false
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
                        isLoadScroll: false,
                        loading: false
                    })
                }
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
                userInfo.fuluToken = '';
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                isLoginOrAuth(this)
            }
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
        this.setState({
            loading: true
        })
        this.props.dispatch({
            type: 'prize/prizeResult', payload: {
                userId: this.state.userInfo.fuluId,
                eventId: this.state.eventId || configs.eventId,
                ...this.state.postData
            }
        })
    }
    exchange = (url, card, type) => {
        // 1满减券 2折扣券 3 兑换劵
        if (type !== '3') {
            this.props.history.push('./mycoupons');
        } else {
            //将card复制到剪切板
            Toast.success('券码复制成功，请在页面跳转后粘贴使用。',3)
            setTimeout(() => {
               window.location.href = url
            }, 3000);
        }
    }
    entityexchange = () => {
        Toast.show('稍后会有客服人员联系您，请保持手机畅通。')
    }
    renderRow = (rowData, sectionID, rowID) => {
        return (
            <div className="prize-line" key={rowID}>
                <div className="prize-title">{rowData.prizeName}</div>
                {
                    rowData.verificationDateEnd && rowData.isUse !== 1 && <div className="prize-time">{moment(rowData.verificationDateEnd).format('YYYY.MM.DD')}过期</div>
                }
                <div className="prize-body">
                    <div className="prize-img"><img src={rowData.prizeType === 4 ? imageurl : rowData.prizeImageUrl}></img></div>
                    <div className="prize-txt">
                        <h2>{rowData.prizeName}</h2>
                        {/* <p>兑换会员VIP1个月</p> */}
                    </div>
                    {
                        rowData.prizeType === 5 ? <div onClick={() => { this.entityexchange() }} className="prize-btn">立即兑换</div>
                            : rowData.prizeType !== 4 && rowData.isUse !== 1 && (rowData.timeout ? <div className="prize-btn-timeout">已过期</div> : <div onClick={() => { this.exchange(rowData.exchangeUrl, rowData.cards, rowData.batchType) }} data-clipboard-text={rowData.cards} className="prize-btn">立即兑换</div>)
                    }
                </div>
                {
                    rowData.isUse == 1 && <div className="exchanged"></div>
                }
            </div>
        )
    }
    onEndReached = () => {
        const { postData, isSearchFinish, isSearchAll } = this.state;
        //this.setState({ isLoadScroll: true });
        // 当前请求完成，才去请求下一页
        if (isSearchFinish && !isSearchAll) {
            postData.pageIndex++;
            this.setState({ postData }, () => {
                this.init();
            })
        }
    }
    loginSuccess = () => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        this.setState({
            userInfo
        }, () => {
            this.init()
        })
        this.hideLoginModal()
    }
    hideLoginModal = () => {
        this.setState({
            showMallLoginModal: false
        })
    }
    render() {
        const { manageDataSource, total, postData, showModal, isSearchAll, SaleType, hasHead, showMallLoginModal, loading } = this.state;
        const tabs = [
            { title: '全部', sub: '0' },
            { title: '待付款', sub: '1' },
            { title: '充值成功', sub: '2' },
            { title: '充值失败', sub: '3' }
        ];
        return (
            <div className="prizelist">
                <Header
                    {...this.props}
                    jump={() => this.props.history.push('/')}
                    myLoading={loading}  // 判断loading
                />
                <div className={hasHead ? "list-con tabs-top" : "list-con"}>
                    {
                        total === 0 ?
                            <div className="noting"><span></span>还没有中奖哦～</div>
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(PrizeList);