import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './less/coupons.less';
export default class Coupons extends Component {
    static propTypes = {
        prop: PropTypes
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
                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`}>
                        <div className="price-content-one">
                            <span className="small-font">￥</span>
                            <span className="big-font">{item.couponData.reduceAmount}</span>
                        </div>
                    </div>
                )
            } else if (template === 'two') {
                customEle = item.moduleDataList.map((item) =>
                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`}>
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
                        <div className="coupons-box-content clearfix" style={{ width: `${117.5 * len - 16}px` }}>
                            {
                                item.moduleDataList.map((item) =>
                                    <div className={`coupons-box-img ${template}-module ${template}-module-${nowStyle} float-left`} style={{ width: `${107.5}px` }}>
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
        return (
            this.getCom()
        )
    }
}
