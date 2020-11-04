import React, { Component } from 'react'
import { Modal } from 'antd-mobile';
import moment from 'moment';
import './less/couponsPackagePopup.less';

export default class ActiveModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHomeModal: false
        }
    }
    componentWillMount() {
        console.log(this.props, 8888)
    }

    componentDidMount() {
        setTimeout(() => {
            let clientHeight = document.getElementById('mainBgId').clientHeight;
            if (clientHeight > 1000) {
                this.refs.couponPackageShade.style.height = clientHeight + 50 + `px`;
            }
        }, 1000);
    }
    toPage = () => {
        const { item } = this.props;
        const { linkType, linkData } = allInfo.popupDetail;
        // 如果是自定义链接
        if (linkType === 1) {
            return window.location.href = allInfo.popupDetail.linkUrl;
        }
        // 如果是内部商品
        else if (linkType === 2) {
            this.props.history.push(`/detail?gid=${allInfo.popupDetail.linkUrl}&pid=${allInfo.popupDetail.linkData}`);
        }
        // 如果是跳转分类页
        else if (linkType === 3) {
            return this.props.history.push(`/list?mid=${linkData}`);
        }
        // 如果是跳转频道页
        else if (linkType === 4) {
            return this.props.history.push(`/channel?pageId=${linkData}`);
        }
    }

    render() {
        const { item } = this.props;
        const { showHomeModal } = this.state;
        console.log(item, 9999)
        const { backgroundImage, couponsPackageImage } = item.modelStyle.couponsPackageStyleModel;
        return (
            <div className="coupon-package-modal" >
                <div class="coupon-package-shade" ref="couponPackageShade">
                </div>
                <img className="popup-com-img" src={backgroundImage} />
                <div className="coupon-package-content">
                    {item.moduleDataList.map((item) =>
                        <div className="coupon-package-content-list">
                            <div className="float-left price-content">
                                <div className="price">
                                    <span>
                                        <span className="small-font">￥</span>
                                        <span className="big-font">{item.couponData.reduceAmount}</span>
                                    </span>
                                </div>
                                <div className="price-text">
                                    {item.couponData.content}
                                </div>
                            </div>
                            <div className="float-left text-content">
                                <div className="name text-ellipsis">{item.couponData.name}</div>
                                <div className="name-description text-ellipsis">{item.couponData.instructions}</div>
                                <div className="valid-date">有效期至：{moment(item.couponData.endCouponTime).format('YYYY.MM.DD')}</div>
                            </div>
                        </div>)}
                </div>
                <div className="btn-get" onClick={this.btnGetCoupons}>立即领取</div>
                <div className="btn-coupon-package-get"></div>
                <div className="active-modal-close-bottom" onClick={this.props.hideModal}>
                    <div className="popup-close"></div>
                </div>
            </div>
        )
    }
}
