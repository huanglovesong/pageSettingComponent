import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import { authorizationFailurePageSetting } from '../../../utils/auth';
import MallLoginModalPageSetting from '../../LoginModal/MallLoginModalPageSetting';

import './less/coupons.less';

class Coupons extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        this.state = {
            merCouponId: '',
        };
    }
    componentWillReceiveProps(nextProps) {
        const { merCouponId } = this.state;
        // 如果是登录成功，找到对应组件authKey进行接下来的步骤
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && merCouponId === nextProps.pageSetting.authKey) {
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
                this.props.authorizationFailurePageSetting(merCouponId);
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
    getCom = () => {
        const { item, isChoose, index } = this.props;
        let len = item.moduleDataList.length;
        let margin = item.modelStyle.couponStyleModel.imageClearance / 2;
        // 判断是否选中的是当前组件
        if (len) {
            let customEle = [];
            const template = item.modelStyle.couponStyleModel.template;
            let margin = item.modelStyle.couponStyleModel.imageClearance / 2;
            let pagePadding = item.modelStyle.couponStyleModel.pageMargin || 0;
            let nowStyle = item.modelStyle.couponStyleModel.displayStyle;
            const style = {
                margin: `${margin}px`,
                display: 'inline-block',
            };
            const style1 = {
                // marginLeft: `-${margin}px`,
                // marginRight: `-${margin}px`,
                paddingLeft: `18px`,
                paddingRight: `18px`,

            };
            if (template === 'one') {
                customEle = item.moduleDataList.map((item) =>
                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`}
                        onClick={() => this.cardActivityOvered(item.relationId)}>
                        <div className="price-content-one">
                            <span className="small-font">￥</span>
                            <span className="big-font">{item.couponData.reduceAmount}</span>
                        </div>
                    </div>
                )
            } else if (template === 'two') {
                customEle = item.moduleDataList.map((item) =>
                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`}
                        onClick={() => this.cardActivityOvered(item.relationId)}>
                        <div className="price-content">
                            <span className="small-font">￥</span>
                            <span className="big-font">{item.couponData.reduceAmount}</span>
                        </div>
                    </div>
                )
            }
            // 一行多个
            else if (template === 'three') {
                let oneWidth = (375 - pagePadding + margin * 2) / 3;
                console.log(oneWidth, 2222)
                customEle =
                    <div style={{ overflowX: template === 'three' ? 'scroll' : 'inherit' }}>
                        <div className="coupons-box-content clearfix" style={{ width: `${115.5 * len - 8}px` }}>
                            {
                                item.moduleDataList.map((item) =>
                                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`}
                                        style={{ width: `${107.5}px` }} onClick={() => this.cardActivityOvered(item.relationId)}>
                                        <div className="price-content">
                                            <span className="small-font">￥</span>
                                            <span className="big-font">{item.couponData.reduceAmount}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
            }
            return <div className='coupons-box clearfix' style={style1}>
                {customEle}
            </div>
        }
    }
    render() {
        const { showMallLoginModal } = this.state;
        return (
            <div>
                {this.getCom()}
                {showMallLoginModal && <MallLoginModalPageSetting loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}

            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(Coupons);