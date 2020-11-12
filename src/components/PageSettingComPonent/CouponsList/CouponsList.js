import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, Tabs } from 'antd-mobile';
import mathManage from '../../../utils/mathManage';

import './less/couponsList.less';

class CouponsList extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        this.state = {
            merCouponId: '',
            activeInfo: {}
        };
    }
    componentWillReceiveProps(nextProps) {

        // 如果是登录成功，找到对应组件authKey进行接下来的步骤
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
            console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex)
            this.getCouponFn();
        }
    }
    cardActivityOvered = (item) => {
        // 如果用户没有领取过
        if (item.isUserReceive) {
            this.setState({
                merCouponId: item.merCouponId
            }, () => {
                this.props.dispatch({
                    type: 'pageSetting/CardActivityOvered',
                    payload: {
                        merCouponActivityId: item.merCouponId
                    }
                }).then(res => {
                    debugger
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
        // 如果用户已经领取过了
        else {
            // const { activeInfo } = this.state;
            // activeInfo.jumpType = item.jumpType;
            // activeInfo.proClassId = item.proClassId;
            // activeInfo.productId = item.productId;
            // activeInfo.jumpUrl = item.jumpUrl;
            // this.setState({
            //     activeInfo
            // }, () => {
            //     item.discountsInfo = {
            //         reachedAmount: item.reachedAmount,
            //         reduceAmount: item.reduceAmount
            //     };
            //     this.jumpTo(item);
            // })
            this.toUrl('/mycoupons');
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
                title: mathManage.stringCutOut(item.textData, 4),
                key: index,
                couponDataList: item.couponDataList,
            });
        });
        return tabs;
    };
    // 样式一
    renderContentStyle1 = (tabsItem) => {
        console.log(tabsItem, 9999888);
        const { item } = this.props;
        // 商品间距
        let productMargin = item.modelStyle.couponsListStyleModel.productMargin / 2;
        // 页面边距
        let pageMargin = item.modelStyle.couponsListStyleModel.pageMargin;
        let { couponFontColor } = item.modelStyle.couponsListStyleModel;
        // let productHeight = `${(len * 229) / 50}rem`;
        const style = {
            margin: `${productMargin / 50}rem`,
            display: "inline-block",
            // width: '100%'
        };
        const style1 = {
            marginLeft: `-${productMargin / 50}rem`,
            marginRight: `-${productMargin / 50}rem`,
            paddingLeft: `${pageMargin / 50}rem`,
            paddingRight: `${pageMargin / 50}rem`,
        };
        const { clickTabBarIndex } = this.state;
        console.log(clickTabBarIndex, 99999);
        let nowHtml = (
            <div style={{ display: "flex" }} className="content-style1">
                <div
                    className="class-content clearfix"
                    style={{ ...style1 }}
                    key={clickTabBarIndex}
                >
                    {tabsItem.couponDataList.map((couponDataListItem, index) => (
                        <div className={`item  ${couponDataListItem.isReceive ? 'receieve-item' : 'disable-item'}`}>
                            <div className="float-left item-img-content">
                                <div className="title">{couponDataListItem.name}</div>
                                <div className="coupon-product">
                                    {couponDataListItem.couponProductInfoList && couponDataListItem.couponProductInfoList.map((item) => (
                                        <div className="img-content float-left">
                                            <img src={item.productImage} />
                                            <div className="price">¥ {item.price}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="float-left  item-price-content" style={{ color: couponDataListItem.isReceive ? couponFontColor : '#999999' }}>
                                <div className="coupon-price">
                                    <span className="small-font">¥</span>
                                    <span className="big-font">{couponDataListItem.reduceAmount}</span>
                                </div>
                                <div className="coupon-text">
                                    {couponDataListItem.content}
                                </div>
                                {/*isReceive:true:还有库存 isUserReceive:true:用户未领取*/}
                                {couponDataListItem.isReceive ?
                                    couponDataListItem.isUserReceive ? <div className={"get-coupon"} style={{ background: couponFontColor }} onClick={() => this.cardActivityOvered(couponDataListItem)}>
                                        立即领取</div> :
                                        <div className={"use-coupon"} style={{ border: `2px solid ${couponFontColor}`, color: couponFontColor }} onClick={() => this.cardActivityOvered(couponDataListItem)}>
                                            去使用
                                        </div>
                                    :
                                    <div className="get-coupon-disable"  >已抢完</div>}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
        return nowHtml;
    };
    render() {
        const { item } = this.props;
        let { couponFontColor, navigationColor } = item.modelStyle.couponsListStyleModel || {};
        let len = item.moduleDataList.length;
        // 如果没有moduleDataList则隐藏
        if (!len) {
            return ''
        }
        return (
            <div class="coupons-list-box clearfix">
                <Tabs
                    swipeable={false}
                    tabs={this.getTabs()}
                    tabBarStyle={{ paddingLeft: 0, paddingRight: 0 }}
                    tabBarUnderlineStyle={{ border: '.04rem solid red' }}
                    tabBarBackgroundColor={navigationColor}
                    tabBarActiveTextColor={couponFontColor}
                    tabBarInactiveTextColor={'#999999'}

                >
                    {this.renderContentStyle1}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(CouponsList);