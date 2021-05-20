import React, { Component } from 'react'
import PropTypes from 'prop-types'
import erricon from './images/err-icon.png';
import filedicon from './images/filed-icon.png';
import Clipboard from 'clipboard';
import './less/prizeModal.less'
import { Fragment } from 'react';
export default class PrizeModal extends Component {
    static propTypes = {
        prop: PropTypes
    }
    constructor(props) {
        super(props);
        this.state = {
            drawInfo: props.drawInfo || {},
            prizeData: props.prizeData || {}
        };
    }
    componentDidMount() {
        new Clipboard('.gotoexchange');
    }

    drawAgain = () => {
        const { drawInfo } = this.state;
        this.props.hidePrizeModal();
        // 九宫格
        if (drawInfo.eventTemplate === 1) {
            this.props.drawScratchableLatex();
        }
        // 大转盘
        else if (drawInfo.eventTemplate === 2) {
            this.props.drawBigWheel();
        }
    }
    exchange = () => {
        const { prizeData } = this.state;
        if (prizeData.prizeType === '5') {
            this.props.hidePrizeModal();
            Toast.show('稍后会有客服人员联系您，请保持手机畅通。')
        } else {
            // 1满减券 2折扣券 3 兑换劵
            if (prizeData.batchType !== '3') {
                this.props.history.push('./mycoupons');
            } else {
                //将card复制到剪切板
                Toast.success('券码复制成功，请在页面跳转后粘贴使用。', 3)
                setTimeout(() => {
                    window.location.href = prizeData.exchangeUrl
                }, 3000);
            }
        }

    }
    render() {
        const { prizeData } = this.state;
        console.log(prizeData, 2222)
        return (
            <div className="draw-square-prize-modal">
                <div className="draw-square-prize-modal-container">
                    <div className="close-btn" onClick={this.props.hidePrizeModal}></div>
                    <div className="title">
                        {prizeData.prizeType === '4' && '很遗憾'}
                        {prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' && '恭喜你抽中'}
                    </div>
                    {/*很遗憾*/}
                    {prizeData.prizeType === '4' &&
                        <Fragment>
                            <div className="prize-img" style={{
                                backgroundImage: `url(${filedicon})`,
                                backgroundSize: 'cover'
                            }}>
                            </div>
                            <div className="prize-name">
                                谢谢参与
                            </div>
                        </Fragment>
                    }
                    {/*恭喜你抽中 5 实物商品 else 其他*/}
                    {prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' &&
                        <Fragment><div className="prize-img" style={{
                            backgroundImage: `url(${prizeData.prizeImageUrl})`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                            <div className="prize-name">
                                {prizeData.prizeName}
                            </div>
                        </Fragment>}
                    {/*系统开小差*/}
                    {prizeData.prizeType === '-1' && <Fragment>
                        <div className="prize-img" style={{
                            backgroundImage: `url(${erricon})`,
                            backgroundSize: 'cover'
                        }}>
                        </div>
                        <div className="prize-name">
                            <div className="error-text">
                                系统异常
                        </div>
                            <div className="error-text">
                                点击重新抽奖
                        </div>
                        </div>
                    </Fragment>}
                    {prizeData.prizeType !== '-1' && <div className="prize-text">后续会有工作人员和您联系，核对中奖信息，请保持手机畅通</div>}
                    {/*系统异常*/}
                    {prizeData.prizeType === '-1' && <div className="prize-btn" onClick={this.drawAgain}>重新抽奖</div>}

                    {/*很遗憾*/}
                    {prizeData.prizeType === '4' && <div className="prize-btn" onClick={this.props.hidePrizeModal}>我知道了</div>}
                    {/*5 实物商品   else 其他商品*/}
                    {prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' &&
                        <div className="prize-btn gotoexchange" data-clipboard-text={prizeData.cards}
                            onClick={this.exchange}>立即兑换</div>}

                </div>
            </div>
        )
    }
}
