import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import './less/drawUserInfo.less';
import { Toast } from 'antd-mobile';
const comModelStyle = 'drawUserInfoStyleModel';
class DrawUserInfo extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        this.state = {
            drawInfo: props.item.moduleDataList[0] || {},
            userData: {

            }
        };
    }
    componentWillReceiveProps(nextProps) {
        const { pageSetting: { getPrizeNumRes } } = nextProps;
        if (getPrizeNumRes !== this.props.prize.getPrizeNumRes) {
            const { code, data } = getPrizeNumRes;
            const { drawInfo } = this.state;
            // 同一个抽奖活动
            if (getPrizeNumRes.code === '1000' && drawInfo.relationId === data.lotteryId) {
                drawInfo.userIntegral = data.integral;
                drawInfo.prizeNum = data.prizeNum;
                return this.setState({
                    drawInfo
                })
            }
        }
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
            const { bottomMargin, topMargin, imageClearance, pageMargin, backImage } = item.modelStyle[comModelStyle];
            let customEle = [];
            const style1 = {
                paddingTop: `${topMargin / 50}rem`, paddingBottom: `${bottomMargin / 50}rem`,
            };
            const { drawInfo } = this.state;
            customEle = <div className={`draw-user-info-box-img float-left`} style={{ backgroundImage: `url(${backImage})` }}>
                <div className="my-point">
                    <span className="title">我的积分</span>
                    <span className="point">{drawInfo.userIntegral || 0}</span>
                </div>
                <div className="remain-num">今天可抽 {drawInfo.prizeNum || 0} 次</div>
            </div>
            return <div className="draw-user-info-box clearfix" style={{ ...style1 }}>
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

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(DrawUserInfo);