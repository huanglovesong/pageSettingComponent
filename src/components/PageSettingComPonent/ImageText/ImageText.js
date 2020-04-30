import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './less/imageText.less';
export default class ImageTextBox extends Component {
    static propTypes = {
        prop: PropTypes
    }
    toBanner = (v) => {
        if (v.bannerType === 1) {
            window.open(v.linkurl, '_blank')
        } else if (v.bannerType === 2 && v.ifSkip === 1) {
            this.props.history.push(`/detail?gid=${v.childCategoryId}&pid=${v.productId}`)
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
            const { background, textColor, rowNum, isSlide } = item.modelStyle.imageTextStyleModel;
            let width = 100 / rowNum;
            let nowWidth = 365 / rowNum;

            return <div className="image-text-box clearfix" style={{ background: background, overflowX: isSlide ? 'scroll' : 'inherit' }}>
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
