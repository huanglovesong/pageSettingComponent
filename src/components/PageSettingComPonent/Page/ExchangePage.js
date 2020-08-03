import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import BannerShuffling from '../BannerShuffling';
import BannerAdvertising from '../BannerAdvertising';
import Classification from '../Classification';
import FlashSale from '../FlashSale';
import ImageText from '../ImageText';
import Notice from '../Notice';
import Coupons from '../Coupons';
import RichText from '../RichText';

// 业务组件
import Exchange from '../BusinessComponent/Exchange';
import TouristLogin from '../BusinessComponent/TouristLogin';

import ActiveModalCom from '../ActiveModalCom';
import ActiveModal from '../ActiveModalCom/ActiveModal';

// 登录弹框
import MallLoginModalPageSetting from '../../LoginModal/MallLoginModalPageSetting';

import Loading from '../../Loading';

// 用户授权失败调用函数
import { authorizationFailurePageSetting } from '../../../utils/auth';
import mathManage from '../../../utils/mathManage';


import '../less/pageSetting.less';
import './less/exchangePage.less';

class ExchangePage extends React.Component {

    constructor(props) {
        super(props);

        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            allInfo: {
                pageModuleList: [],
                showMallLoginModal: false,
                // 授权的组件索引
                componentIndex: '',
            },
            shopInfo,
            pageId: mathManage.getParam('pageId')
        }
    }
    // componentWillMount() {

    // }
    // componentWillReceiveProps(nextProps) {
    //     const { allInfo } = this.state;
    //     if (allInfo !== nextProps.allInfo) {
    //         this.setState({
    //             allInfo: nextProps.allInfo
    //         })
    //     }
    // }
    componentWillMount() {
        this.getPage();
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { pageSetting: { getPageResult } } = nextProps;
        let pageId = mathManage.getParam('pageId');
        // 如果路由的pageId发生变化则重新请求页面信息
        if (pageId !== this.state.pageId) {
            this.setState({
                pageId
            }, () => {
                this.getPage();
            })
        }
        if (getPageResult !== props.pageSetting.getPageResult) {
            const { code, data, message } = getPageResult;
            if (code === '0') {
                return this.setState({
                    allInfo: data
                })
            } else {
                Toast.info(message);
            }
        }
        const { loginPageSetting: { fuluusertoken } } = nextProps;
        if (fuluusertoken !== props.loginPageSetting.fuluusertoken) {
            const { code, data, message } = fuluusertoken;
            if (code === '1000') {
                this.loginSuccess(data);
            } else {
                Toast.fail(message);
            }
        }
    }
    getPage = () => {
        const { pageId } = this.state;
        const { pageType } = this.props;
        this.props.dispatch({
            type: 'pageSetting/getPage',
            payload: {
                pageType,
                pageId
            }
        });
    }
    getCom = () => {
        const { allInfo } = this.state;
        let arr = [];
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        const { visitType } = shopInfo.merInfoTemplates;
        allInfo.pageModuleList.map((item, index) => {
            // banner轮播
            if (item.moduleType === 'bannerRoll') {
                arr.push(<BannerShuffling item={item} history={this.props.history} />)
            }
            // banner广告
            else if (item.moduleType === 'banner') {
                arr.push(<BannerAdvertising item={item} history={this.props.history} />)
            }
            // 分类
            else if (item.moduleType === 'class') {
                arr.push(<Classification item={item} history={this.props.history} />)
            }
            // 限时抢购
            else if (item.moduleType === 'flashSale') {
                arr.push(<FlashSale item={item} history={this.props.history} />)
            }
            // 图文导航
            else if (item.moduleType === 'imageText') {
                arr.push(<ImageText item={item} history={this.props.history} />)
            }
            // 图文导航
            else if (item.moduleType === 'notice') {
                arr.push(<Notice item={item} history={this.props.history} />)
            }
            // 优惠券
            else if (item.moduleType === 'coupon') {
                arr.push(<Coupons item={item} history={this.props.history} componentIndex={index}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} />)
            }
            // 兑换
            else if (item.moduleType === 'exchange') {
                arr.push(<Exchange item={item} history={this.props.history} componentIndex={index}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} />)
            }
            // 登录并且不是游客
            else if (item.moduleType === 'touristLogin' && visitType !== 3) {
                arr.push(<TouristLogin item={item} history={this.props.history} componentIndex={index}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} />)
            }
            // 富文本编辑
            else if (item.moduleType === 'richText') {
                arr.push(<RichText item={item} history={this.props.history} componentIndex={index} />)
            }

        });
        return arr;
    }
    // 用于设置组件唯一标识，便于后续寻找组件
    authorizationFailurePageSetting = (componentIndex) => {
        this.setState({
            componentIndex,
        }, () => {
            authorizationFailurePageSetting(this);
        })
    }
    hideModal = () => {
        const { allInfo } = this.state;
        allInfo.isPopup = false;
        this.setState({ allInfo })
    }

    // 登录成功调用
    loginSuccess = (data) => {
        const { componentIndex } = this.state;
        this.hideLoginModal();
        localStorage.setItem("fuluToken", data.fuluToken);
        localStorage.setItem("fuluId", data.fuluId);
        localStorage.setItem('userInfo', JSON.stringify(data));
        // 防止数据发送太快导致会多次进入子组件的判断
        // setTimeout(() => {
        this.props.dispatch({ type: 'pageSetting/commonRequest', payload: { guid: Math.random(), componentIndex } });
        // }, 1000);
    }
    hideLoginModal = () => {
        this.setState({
            showMallLoginModal: false,
        })
    }
    render() {
        const { allInfo, showMallLoginModal, componentIndex, shopInfo } = this.state;
        const { disableClick } = this.props;
        return (
            <div className={`main-bg ${disableClick && 'point-events-none'}`}>
                <div className="page-setting-content" style={{ background: allInfo.backgroud }}>
                    {this.getCom()}
                </div>
                {allInfo.isPopup && <ActiveModal history={this.props.history} allInfo={allInfo} disableClick={disableClick} hideModal={this.hideModal} />}
                {allInfo.isSidebar && <ActiveModalCom history={this.props.history} allInfo={allInfo} />}
                {showMallLoginModal && <MallLoginModalPageSetting
                    loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
                {
                    !!this.props.loading.models.pageSetting &&
                    <Loading />
                }
                {shopInfo.merInfoTemplates.visitType != 3 && <div className="listicon" onClick={() => { this.props.history.push('./orderlist') }}></div>}
                <div className="serviceicon" onClick={() => { this.props.history.push('./service') }}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(ExchangePage);