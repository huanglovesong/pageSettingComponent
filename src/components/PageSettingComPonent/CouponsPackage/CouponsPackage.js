import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, Tabs } from 'antd-mobile';
import mathManage from '../../../utils/mathManage';
import CouponsPackagePopup from './CouponsPackagePopup';

import './less/couponsPackage.less';

class CouponsPackage extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        this.state = {
            merCouponId: '',
            showCouponsPackagePopup: false
        };
    }
    componentWillReceiveProps(nextProps) {

        // 如果是登录成功，找到对应组件authKey进行接下来的步骤
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
            console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex)
            this.getCouponFn();
        }
    }
    cardActivityOvered = (merCouponId) => {
        this.setState({
            merCouponId
        }, () => {
            this.props.dispatch({
                type: 'pageSetting/CardActivityOvered',
                payload: {
                    merCouponActivityId: merCouponId
                }
            }).then(res => {
                const { code, data, message } = res;
                if (code === '1000') {
                    this.setState({
                        activeInfo: data
                    }, () => {
                        this.getCouponFn();
                    });
                } else {
                    Toast.info(message);
                }
            });
        });
    }
    getCouponFn = () => {
        const { merCouponId } = this.state;
        this.props.dispatch({
            type: 'pageSetting/ObtainCard',
            payload: {
                merCouponActivityId: merCouponId
            }
        }).then((res) => {
            let { code, data, message } = res;
            if (code === '1000') {
                Toast.info('领取成功', 2);
                const _this = this;
                setTimeout(() => {
                    _this.jumpTo(data)
                }, 1500)
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                const { componentIndex } = this.props;
                this.props.authorizationFailurePageSetting(componentIndex);
            } else {
                Toast.info(message);
            }
        });
    }
    // 登录成功调用
    loginSuccess = (data) => {
        this.hideLoginModal();
        this.setState({
            userInfo: data
        });
        this.getCouponFn();
    }
    hideLoginModal = () => {
        this.setState({
            showMallLoginModal: false,
        })
    }

    jumpTo = (data) => {
        const { activeInfo } = this.state;
        if (activeInfo.jumpType == 1) {
            this.toUrl('/')
        } else if (activeInfo.jumpType == 2) {
            this.toUrl(`/couponPage?cardId=${data.card}&reachedAmount=${data.discountsInfo.reachedAmount}&reduceAmount=${data.discountsInfo.reduceAmount}`)
        } else if (activeInfo.jumpType == 3) {
            window.location.href = `/detail?gid=${activeInfo.proClassId}${activeInfo.productId ? `&pid=${activeInfo.productId}` : ''}`
        } else if (activeInfo.jumpType == 4) {
            window.location.href = activeInfo.jumpUrl
        }
    }
    toUrl = (url) => {
        this.props.history.push(url);
    }
    getTabs = () => {
        const { item } = this.props;
        const tabs = [];
        item.moduleDataList.map((item, index) => {
            tabs.push({
                title: item.textData,
                key: index,
                couponDataList: item.couponDataList,
            });
        });
        return tabs;
    };
    componentWillReceiveProps(nextProps) {

        // 如果是登录成功，找到对应组件authKey进行接下来的步骤
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
            console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex)
            this.getCouponFn();
        }
    }
    getCouponFn = () => {
        const { merCouponId } = this.state;
        this.props.dispatch({
            type: 'pageSetting/ObtainCard',
            payload: {
                merCouponActivityId: merCouponId
            }
        }).then((res) => {
            let { code, data, message } = res;
            if (code === '1000') {
                Toast.info('领取成功', 2);
                const _this = this;
                setTimeout(() => {
                    _this.jumpTo(data)
                }, 1500)
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                const { componentIndex } = this.props;
                this.props.authorizationFailurePageSetting(componentIndex);
            } else {
                Toast.info(message);
            }
        });
    }
    jumpTo = (data) => {
        const { activeInfo } = this.state;
        if (activeInfo.jumpType == 1) {
            this.toUrl('/')
        } else if (activeInfo.jumpType == 2) {
            this.toUrl(`/couponPage?cardId=${data.card}&reachedAmount=${data.discountsInfo.reachedAmount}&reduceAmount=${data.discountsInfo.reduceAmount}`)
        } else if (activeInfo.jumpType == 3) {
            window.location.href = `/detail?gid=${activeInfo.proClassId}${activeInfo.productId ? `&pid=${activeInfo.productId}` : ''}`
        } else if (activeInfo.jumpType == 4) {
            window.location.href = activeInfo.jumpUrl
        }
    }
    cardActivityOvered = (merCouponId) => {
        this.setState({
            merCouponId
        }, () => {
            this.props.dispatch({
                type: 'pageSetting/CardActivityOvered',
                payload: {
                    merCouponActivityId: merCouponId
                }
            }).then(res => {
                const { code, data, message } = res;
                if (code === '1000') {
                    this.setState({
                        activeInfo: data
                    }, () => {
                        this.getCouponFn();
                    });
                } else {
                    Toast.info(message);
                }
            });
        });
    }

    showPopUp = () => {
        this.setState({
            showCouponsPackagePopup: true
        })
    }
    hidePopUp = () => {
        this.setState({
            showCouponsPackagePopup: false
        })
    }
    render() {
        const { item } = this.props;
        let { couponsPackageImage, pageMargin, imageClearance } = item.modelStyle.couponsPackageStyleModel;
        const { showCouponsPackagePopup } = this.state;
        let pagePadding = pageMargin || 0;
        let margin = imageClearance / 2;
        const style = {
            margin: `${margin}px`,
            display: 'inline-block',
        };
        const style1 = {
            // marginLeft: `-${margin}px`,
            // marginRight: `-${margin}px`,
            paddingLeft: `${pagePadding}px`,
            paddingRight: `${pagePadding}px`,

        };
        return (
            <div class="coupons-package-box clearfix" style={style1}>
                <div className={`coupons-package-box-img`} onClick={this.showPopUp}>
                    <a style={{ ...style }}>
                        <img src={couponsPackageImage} />
                    </a>
                </div>
                {showCouponsPackagePopup && <CouponsPackagePopup item={item} hideModal={this.hidePopUp} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(CouponsPackage);