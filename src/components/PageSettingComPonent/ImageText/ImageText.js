import React, { Component } from 'react';
import PropTypes from 'prop-types';
import mathManage from '../../../utils/mathManage';
import './less/imageText.less';
export default class ImageTextBox extends Component {
    static propTypes = {
        prop: PropTypes
    }
    toBanner = (v) => {
        // 友盟埋点图文导航点击
        this.props.clickUmBuired('icon位');
        if (v.bannerType === 1) {
            this.toPageFuluIdAndToken(v);
            // window.open(v.linkurl, '_blank')
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
        if (linkurl) {
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
            window.location.href = linkurl;
        }
    }
    getCom = () => {
        const { item } = this.props;
        let len = item.moduleDataList.length;
        if (!len) {
            return <div className="banner-advertising-box clearfix" style={{ background: item.modelStyle.imageTextStyleModel.background }}>
                <div className="banner-advertising-box-img float-left">
                    <img src={'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png'} />
                </div>
            </div>
        }
        else {
            const { background, textColor, rowNum, isSlide, topMargin, bottomMargin } = item.modelStyle.imageTextStyleModel;
            // 金刚区间距
            let obj = { 3: 72, 4: 36, 5: 18 };
            let allWidth = mathManage.Subtr(375, obj[rowNum] * 2);
            let nowWidth = allWidth / rowNum;
            const style = {
                background: background, overflowX: isSlide ? 'scroll' : 'inherit',
                padding: `0px ${(obj[rowNum]) / 50}rem`,
                paddingTop: `${topMargin / 50}rem`, paddingBottom: `${bottomMargin / 50}rem`,
            };
            return <div className="image-text-box clearfix" style={style}>
                <div className="image-text-box-content clearfix" style={{ width: isSlide ? `${(nowWidth * len + 10) / 50}rem` : '7.3rem' }}>
                    {item.moduleDataList.map((item) =>
                        <div class="item" style={{ width: `${nowWidth / 50}rem` }} onClick={() => this.toBanner(item)}>
                            <img src={item.bannerUrl} />
                            <div class="name font-clamp" style={{ color: textColor }}>{item.textData}</div>
                        </div>
                    )}
                </div>
            </div >
        }
    }
    render() {
        return (
            this.getCom()
        )
    }
}
