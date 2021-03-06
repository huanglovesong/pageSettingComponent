import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import BannerShuffling from '../BannerShuffling';
import BannerAdvertising from '../BannerAdvertising';
import Classification from '../Classification';
import FlashSale from '../FlashSale';
import ImageText from '../ImageText';
import Notice from '../Notice';
import RichText from '../RichText';

import Coupons from '../Coupons';
import CouponsList from '../CouponsList';
import CouponsPackage from '../CouponsPackage';
import ActiveModalCom from '../ActiveModalCom';
import ActiveModal from '../ActiveModalCom/ActiveModal';

// 登录弹框
import MallLoginModalPageSetting from '../../LoginModal/MallLoginModalPageSetting';

import Loading from '../../Loading';

// 用户授权失败调用函数
import { authorizationFailurePageSetting } from '../../../utils/auth';

// 友盟埋点
import { homeBuriedPoin, pageLoadPoin, commonBuriedPoin } from '../../../utils/umBuriedPoint';
// 广发埋点
import gfBuriedPoint from '../../../utils/gfBuriedPoint';

import mathManage from '../../../utils/mathManage';


import '../less/pageSetting.less';

class PageSettingComPonent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allInfo: {
                pageModuleList: [],
                showMallLoginModal: false,
                // 授权的组件索引
                componentIndex: '',
            },
            pageId: this.getPageId('pageId')
        };
        this.timer = null;
    }
    getPageId = (pageId) => {
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        // 如果是云闪付
        if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '')) {
            return mathManage.geturl(window.location.href.split('?')[1], pageId);
        }
        return mathManage.getParam(pageId)
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
        // 将child传递给this.props.onRef()方法
        this.props.onRef && this.props.onRef(this);
        const { pageId } = this.state;
        this.getPage();
        // 页面加载埋点
        pageLoadPoin.pageLoad('首页');
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { pageSetting: { getPageResult } } = nextProps;
        let pageId = this.getPageId('pageId');
        console.log(props, 8888)
        // 自定义页面授权成功
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid &&
            nextProps.pageSetting.componentIndex === 1000) {
            // 如果是自定义页面授权成功（例如优惠券需要做用户联登）1000是标识，成功之后重新获取页面信息
            this.getPage();
        }
        // 如果路由的pageId发生变化则重新请求页面信息,并且是频道页才会做查询
        if (pageId !== this.state.pageId && props.history.location.pathname === '/channel') {
            this.setState({
                pageId
            }, () => {
                this.getPage();
            })
        }
        if (getPageResult !== props.pageSetting.getPageResult) {
            const { code, data, message } = getPageResult;
            if (code === '0') {
                this.pageLoadUmBuired(data, data.id);
                return this.setState({
                    allInfo: data,
                    pageId: data.id
                })
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                // true是预览页面
                const { disableClick } = this.props;
                this.pageLoadUmBuired(data, data.id);
                this.setState({
                    allInfo: data,
                    pageId: data.id
                })
                // 如果不是预览页面
                if (!disableClick) {
                    // 自定义页面接口授权失效重新授权
                    return this.authorizationFailurePageSetting(1000);
                }
            }
            else {
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

    componentWillUnmount() {
        const { pathname } = window.location;
        // 频道页
        if (pathname === '/channel') {
            localStorage.setItem('commodity_detail_souce', '频道页');
        } else {
            localStorage.setItem('commodity_detail_souce', '首页');
        }
    }
    pageLoadUmBuired = (data, pageId) => {
        // 埋点公用方法
        commonBuriedPoin.cnzzUpload('自定义页面', '页面加载', pageId);
        data.pageModuleList.map((item, index) => {
            // banner轮播
            if (item.moduleType === 'bannerRoll') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-banner轮播${index}`, '曝光', pageId);
            }
            // banner广告
            else if (item.moduleType === 'banner') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-banner广告${index}`, '曝光', pageId);
            }
            // 分类
            else if (item.moduleType === 'class') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-分类${index}`, '曝光', pageId);
            }
            // 限时抢购
            else if (item.moduleType === 'flashSale') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-限时抢购${index}`, '曝光', pageId);
            }
            // 图文导航
            else if (item.moduleType === 'imageText') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-图文导航${index}`, '曝光', pageId);
            }
            // 富文本
            else if (item.moduleType === 'richText') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-富文本${index}`, '曝光', pageId);
            }
            // 公告
            else if (item.moduleType === 'notice') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-公告${index}`, '曝光', pageId);
            }
            // 优惠券
            else if (item.moduleType === 'coupon') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-优惠券${index}`, '曝光', pageId);
            }
            // 券列表
            else if (item.moduleType === 'couponsList') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-券列表${index}`, '曝光', pageId);
            }
            // 券包
            else if (item.moduleType === 'couponsPackage') {
                // 埋点公用方法
                commonBuriedPoin.cnzzUpload(`组件-券包${index}`, '曝光', pageId);
            }
        });
    }
    // 首页运营位埋点
    clickUmBuired = (location, pname) => {
        if (location === '组件-图文导航切换') {
            // 首页-点击金刚区
            gfBuriedPoint.TDAPP('third_fulu_entertainment_07', pname);
        } else if (location === '组件-banner轮播') {
            // 首页-顶部轮播点击
            gfBuriedPoint.TDAPP('third_fulu_entertainment_06', pname);
        } else if (location === '组件-banner广告') {
            // 首页-中间位置广告位
            gfBuriedPoint.TDAPP('third_fulu_entertainment_11', pname);
        }else if (location === '组件-分类切换') {
            // 首页-tab点击
            gfBuriedPoint.TDAPP('third_fulu_entertainment_12', pname);
        }
        
        // 埋点公用方法
        const { pageId } = this.state;
        if (location === '组件-分类商品' || location === '组件-限时抢购') {
            commonBuriedPoin.cnzzUpload(location, '点击', `${pageId},${pname}`);
        } else {
            commonBuriedPoin.cnzzUpload(location, '点击', pageId);
        }
        const { pathname } = window.location;
        // 频道页
        if (pathname === '/channel') {
            commonBuriedPoin.operationBitClick('频道页', location);
        } else {
            commonBuriedPoin.operationBitClick('首页', location);
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
        const { allInfo, pageId } = this.state;
        let arr = [];
        allInfo.pageModuleList.map((item, index) => {
            // banner轮播
            if (item.moduleType === 'bannerRoll') {
                arr.push(<BannerShuffling item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // banner广告
            else if (item.moduleType === 'banner') {
                arr.push(<BannerAdvertising item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 分类
            else if (item.moduleType === 'class') {
                arr.push(<Classification item={item} index={index} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 限时抢购
            else if (item.moduleType === 'flashSale') {
                arr.push(<FlashSale item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 图文导航
            else if (item.moduleType === 'imageText') {
                arr.push(<ImageText item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 富文本
            else if (item.moduleType === 'richText') {
                arr.push(<RichText item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 公告
            else if (item.moduleType === 'notice') {
                arr.push(<Notice item={item} history={this.props.history} clickUmBuired={this.clickUmBuired} />)
            }
            // 优惠券
            else if (item.moduleType === 'coupon') {
                arr.push(<Coupons item={item} history={this.props.history} componentIndex={index}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} clickUmBuired={this.clickUmBuired} />)
            }
            // 券列表
            else if (item.moduleType === 'couponsList') {
                arr.push(<CouponsList item={item} history={this.props.history} componentIndex={index} clickUmBuired={this.clickUmBuired}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} getPage={this.getPage} />)
            }
            // 券包
            else if (item.moduleType === 'couponsPackage') {
                arr.push(<CouponsPackage item={item} history={this.props.history} componentIndex={index}
                    authorizationFailurePageSetting={this.authorizationFailurePageSetting} />)
            }
        });
        return arr;
    }

    // 用于设置组件唯一标识，便于后续寻找组件
    authorizationFailurePageSetting = (componentIndex) => {
        this.setState({
            componentIndex
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
        localStorage.setItem('userInfo', JSON.stringify(data));
        sessionStorage.setItem('userInfo', JSON.stringify(data));
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
        const { allInfo, showMallLoginModal } = this.state;
        const { disableClick } = this.props;
        return (
            <div className={`main-bg ${disableClick && 'point-events-none'}`} id="mainBgId">
                <div className="page-setting-content" style={{ background: allInfo.backgroud, minHeight: '100vh' }}>
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
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(PageSettingComPonent);