import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import PropTypes from 'prop-types';
import './less/drawWinRecord.less';

const comModelStyle = 'drawWinRecordStyleModel';
export default class DrawWinRecord extends Component {
    static propTypes = {
        prop: PropTypes
    }
    getCom = () => {
        const { item } = this.props;
        let len = item.moduleDataList.length;
        if (!len) {
            return <div className="draw-win-record-box clearfix">
                <div className="draw-win-record-box-img float-left">
                    <img src={'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png'} />
                </div>
            </div>
        }
        else {
            if (!item.moduleDataList[0].lotteryRecordList.length) {
                return '';
            }
            let customEle = [];
            const { bottomMargin, topMargin, borderRadius, imageClearance, pageMargin, backImage } = item.modelStyle[comModelStyle];
            let margin = imageClearance / 2;
            let pagePadding = pageMargin;
            const style = {
                margin: `${margin / 50}rem`,
                display: 'inline-block',
            };
            const style1 = {
                paddingTop: `${topMargin / 50}rem`, paddingBottom: `${bottomMargin / 50}rem`,
                marginLeft: `-${margin / 50}rem`, marginRight: `-${margin / 50}rem`, paddingLeft: `${pagePadding / 50}rem`, paddingRight: `${pagePadding / 50}rem`
            };
            const nowItem = item.moduleDataList[0] || {};
            customEle = <div className={`draw-win-record-box-img float-left`} style={{ backgroundImage: `url(${backImage})` }}>
                <Carousel vertical autoplay dots={false} infinite>
                    {nowItem.lotteryRecordList.map((dataItem) => <div className="win-record-info">用户 {`${dataItem.mobile.substring(0, 3)}*****${dataItem.mobile.substring(8, 11)}`} 抽中{dataItem.prizeName}</div>)}
                </Carousel>
            </div>
            return <div className="draw-win-record-box clearfix" style={{ ...style1 }}>
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
