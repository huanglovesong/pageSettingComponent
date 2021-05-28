import React, { Component, createRef } from 'react'
import { connect } from 'dva';
import PropTypes from 'prop-types'
import PrizeModal from './PrizeModal'
import BigWheel from './BigWheel';
import ScratchableLatex from './ScratchableLatex';
import { Toast } from 'antd-mobile';

class DrawBox extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        let userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
        const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
        this.state = {
            drawInfo: props.item.moduleDataList[0] || {},
            userInfo,
            BigWheelIndex: '',
            ScratchableLatexIndex: '',
            prizeData: {},
            prizeModal: false,
        };
    }
    componentWillMount() {
        const { userInfo } = this.state;
        if (userInfo && userInfo.fuluToken) {
            // 添加奖品
            this.addPrize();
        }
    }
    componentWillReceiveProps(nextProps) {
        const { pageSetting: { getPageResult, getPrizeNumRes } } = nextProps;
        // 如果是登录成功，找到对应组件authKey进行接下来的步骤
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && (nextProps.pageSetting.componentIndex || nextProps.pageSetting.componentIndex === 0)) {
            // 如果是点击立即领取
            if (this.props.componentIndex === nextProps.pageSetting.componentIndex) {
                // 添加奖品
                this.setComUserInfo(this.draw);
            }
        }
        // 自定义页面授权成功,还需要添加获取奖品
        if (nextProps.pageSetting.guid !== this.props.pageSetting.guid &&
            nextProps.pageSetting.componentIndex === 1000) {
            // 如果是自定义页面授权成功（例如优惠券需要做用户联登）1000是标识，成功之后重新获取页面信息
            // 添加奖品
            this.setComUserInfo(this.addPrize);
        }
        if (getPrizeNumRes !== this.props.pageSetting.getPrizeNumRes) {
            const { code, data } = getPrizeNumRes;
            const { drawInfo } = this.state;
            // 同一个抽奖活动
            if (getPrizeNumRes.code === '1000' && drawInfo.relationId === data.lotteryId) {
                drawInfo.userIntegral = data.integral;
                drawInfo.prizeNum = data.prizeNum;
                drawInfo.daySurplusNum = data.daySurplusNum;
                drawInfo.totalSurplusNum = data.totalSurplusNum;
                drawInfo.wechartClink = data.wechartClink;
                drawInfo.androidGuideUrl = data.androidGuideUrl;
                drawInfo.iosGuideUrl = data.iosGuideUrl;
                return this.setState({
                    drawInfo
                })
            }
        }
    }
    // 重置页面授权
    setComUserInfo = (callback) => {
        let userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
        const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
        this.setState({
            userInfo
        }, () => {
            callback();
        })
    }
    addPrize = () => {
        const { drawInfo, userInfo } = this.state;
        //给用户添加抽奖次数
        return this.props.dispatch({
            type: 'pageSetting/addPrizeNum', payload: {
                id: drawInfo.relationId,
                eventId: drawInfo.eventId,
                userId: userInfo.fuluId,
                mobile: userInfo.fuluId,
            }
        }).then((res) => {
            if (res.code === '-3') {
                return Toast.info(res.message);
            }
            this.getPrizeNum();
        })
    }
    getPrizeNum = () => {
        const { drawInfo, userInfo } = this.state;
        return this.props.dispatch({
            type: 'pageSetting/getPrizeNum', payload: {
                userId: userInfo.fuluId,
                id: drawInfo.relationId,
                eventId: drawInfo.eventId,
            }
        }).then((res) => {
            const { code, data } = res;
            if (code === '1000') {
                const { drawInfo } = this.state;
                drawInfo.prizeNum = data.prizeNum;
                // drawInfo.consumeIntegral = data.integral;
                return this.setState({ drawInfo })
            }
        })
    }
    // 开始抽奖
    draw = () => {
        const { userInfo, drawInfo } = this.state;
        this.props.dispatch({
            type: 'pageSetting/handlePrize', payload: {
                id: drawInfo.relationId,
                eventId: drawInfo.eventId,
                userId: userInfo.fuluId,
                mobile: userInfo.fuluId
            }
        }).then((res) => {
            const { code, data } = res;
            if (code === '1000') {
                // 查询抽中的奖品索引
                let index = drawInfo.lotteryPrizeList.findIndex(item => item.id === data.producId);
                if (index !== -1) {
                    console.log('抽中奖品' + index, 88779900)
                    this.setState({
                        prizeData: data
                    });
                    if (drawInfo.eventTemplate === 1) {
                        return this.scratchableLatexRef.getScratchableLatexInfo(index);
                    } else {
                        return this.bigWheelRef.getBigWheelInfo(index);
                    }
                } else {
                    this.setError();
                }

            } else if (code === '1020') {
                Toast.fail('抽奖已达上限');
                this.setError();
            } else if (code === '1021') {
                Toast.fail('今日抽奖已达上限');
                this.setError();
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                const { componentIndex } = this.props;
                this.props.authorizationFailurePageSetting(componentIndex);
            } else {
                this.setError();
            }
        })
    }
    setError = () => {
        const { drawInfo } = this.state;
        // 系统异常
        this.setState({ prizeData: { prizeType: '-1' } })
        // 九宫格
        if (drawInfo.eventTemplate === 1) {
            return this.scratchableLatexRef.getScratchableLatexInfo(0);
        }
        // 大转盘
        else if (drawInfo.eventTemplate === 2) {
            return this.bigWheelRef.getBigWheelInfo(0);
        }
    }
    showPrizeModal = () => {
        this.setState({ prizeModal: true, isDisabled: false });
    }
    hidePrizeModal = () => {
        this.setState({ prizeModal: false })
    }
    render() {
        const { item, index } = this.props;
        const { drawInfo, prizeData, prizeModal } = this.state;
        return (
            <div className="draw-box">
                {drawInfo.eventTemplate === 1 && <ScratchableLatex drawInfo={drawInfo} item={item} index={index} prizeData={prizeData}
                    onRef={(ref) => { this.scratchableLatexRef = ref }} draw={this.draw}
                    getPrizeNum={this.getPrizeNum} showPrizeModal={this.showPrizeModal} />}
                {drawInfo.eventTemplate === 2 && <BigWheel drawInfo={drawInfo} item={item} index={index} prizeData={prizeData}
                    onRef={(ref) => { this.bigWheelRef = ref }} draw={this.draw} getPrizeNum={this.getPrizeNum}
                    showPrizeModal={this.showPrizeModal} />}
                {prizeModal &&
                    <PrizeModal hidePrizeModal={this.hidePrizeModal} prizeData={prizeData} drawInfo={drawInfo}
                        draw={this.draw} showPrizeModal={this.showPrizeModal} />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(DrawBox);