import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './less/bannerAdvertising.less';
export default class BannerAdvertisingBox extends Component {
    static propTypes = {
        prop: PropTypes
    }
    toBanner = (v) => {
        if (v.bannerType === 1) {
            this.toPageFuluIdAndToken(v);
            // 	window.location.href = v.linkurl
        } else if (v.bannerType === 2 && v.ifSkip === 1) {
            this.props.history.push(`/detail?gid=${v.childCategoryId}&pid=${v.productId}`)
        }
    }
    toPageFuluIdAndToken = (v) => {
        let shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        let { fuluId, fuluToken } = userInfo;
        // 如果需要页面跳转添加fuluId和token
        let flag = configs.codeIdFuluIdAndToken ? configs.codeIdFuluIdAndToken.some(item => item.toLowerCase() === shopInfo.codeKey.toLowerCase()) : false;
        let { linkurl } = v;
        if (flag) {
            // 如果存在?符号
            if (linkurl.indexOf('?') !== -1) {
                linkurl = `${linkurl}${fuluId ? '&fuluId=' + fuluId : ''}${fuluToken ? '&fuluToken=' + fuluToken : ''}`;
            }
            // 如果不存在
            else {
                linkurl = `${linkurl}${fuluId ? '?fuluId=' + fuluId : ''}${fuluToken ? '&fuluToken=' + fuluToken : ''}`;
            }
        }
        window.open(linkurl, '_blank')
    }
    getCom = () => {
        const { item } = this.props;
        let len = item.moduleDataList.length;
        if (!len) {
            return <div className="banner-advertising-box clearfix">
                <div className="banner-advertising-box-img float-left">
                    <img src={'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png'} />
                </div>
            </div>
        }
        else {
            let customEle = [];
            const template = item.modelStyle.bannerStyleModel.template;
            let margin = item.modelStyle.bannerStyleModel.imageClearance / 2;
            let pagePadding = item.modelStyle.bannerStyleModel.pageMargin;
            const style = {
                margin: `${margin / 50}rem`,
                display: 'inline-block',
            };
            const style1 = {
                marginLeft: `-${margin / 50}rem`, marginRight: `-${margin / 50}rem`, paddingLeft: `${pagePadding / 50}rem`, paddingRight: `${pagePadding / 50}rem`
            };
            if (template === 'one' || template === 'two' || template === 'three') {
                customEle = item.moduleDataList.map((item) =>
                    <div className={`banner-advertising-box-img ${template}-module float-left`} onClick={() => { this.toBanner(item) }}>
                        <a style={{ ...style }} >
                            <img src={item.bannerUrl.replace('http://fulu-mall.oss-cn-hangzhou.aliyuncs.com', 'http://tu.mall.fulu.com')} />
                        </a>
                    </div>
                )
            }
            // 一大二小
            else if (template === 'onetwo') {
                let nowLen = len % 3 === 0 ? len / 3 : parseInt(len / 3) + 1;

                const marginTopZero = { margin: `${margin / 50}rem ${margin / 50}rem 0px ${margin / 50}rem`, display: 'inline-block' };
                const marginBottomZero = { margin: `0px ${margin / 50}rem ${margin / 50}rem ${margin / 50}rem`, display: 'inline-block' };
                for (let index = 0; index < nowLen; index++) {
                    customEle.push(<div className="one-two">
                        <div className="row">
                            <div className="top-item" onClick={() => { this.toBanner(item) }}>
                                <a style={{ ...style }}>
                                    <img className="common-img-css" src={item.moduleDataList[index * 3].bannerUrl} />
                                </a>
                            </div>
                            <div className="top-item">
                                <div className="row">
                                    {item.moduleDataList[index * 3 + 1] && <div className="item"
                                        onClick={() => {
                                            this.toBanner(item.moduleDataList[index * 3 + 1])
                                        }}>
                                        <a style={{ ...marginTopZero }}>
                                            <img className="common-img-css" src={item.moduleDataList[index * 3 + 1].bannerUrl}
                                            />
                                        </a>
                                    </div>}
                                    {item.moduleDataList[index * 3 + 2] && <div className="item" onClick={() => {
                                        this.toBanner(item.moduleDataList[index * 3 + 2])
                                    }}>
                                        <a style={{ ...style }}>
                                            <img className="common-img-css" src={item.moduleDataList[index * 3 + 2].bannerUrl}
                                            />
                                        </a>
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </div>)
                }
            }
            return <div className="banner-advertising-box clearfix" style={{ ...style1 }}>
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
