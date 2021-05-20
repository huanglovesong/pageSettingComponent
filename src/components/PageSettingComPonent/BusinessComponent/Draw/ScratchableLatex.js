import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import './less/scratchableLatex.less';

class ScratchableLatex extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.timer;
    const { item } = props;
    this.isDisabled = false;
    this.state = {
      lotteryPrizeList: [],
      boxId: props.boxId,
      total: 10,
      balance: '',
      drawInfo: props.drawInfo || {},
      prizeData: props.prizeData || {}
    }
  }

  componentWillMount() {
  }
  componentDidMount() {
    this.props.onRef && this.props.onRef(this);
    const { item } = this.props;
    const { drawInfo } = this.state;
    drawInfo.lotteryPrizeList.map(item => item.isActive = false);
    this.setState({
      lotteryPrizeList: drawInfo.lotteryPrizeList
    })
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    const { props } = this;
    const { openBox, ScratchableLatexIndex } = nextProps;

  }
  getScratchableLatexInfo = (resultIndex) => {
    const { activeIndex } = this.state;
    // 清除定时器
    clearInterval(this.timer);
    // 获取清除上一次定时器时停在的activeIndex为开启下一个定时器起始位置，并补上未转一整圈的个数，
    this.start(activeIndex, (8 - activeIndex) + resultIndex, 400);
  }
  handleClick = () => {
    const { total, drawInfo } = this.state;
    if (!this.isDisabled) {
      this.isDisabled = true;
      // (如果是无门槛抽奖并且次数小于1)     (不是无门槛抽奖并且抽奖次数小于1并且可用积分小于抽奖积分）
      if ((drawInfo.lotteryType === 0 && drawInfo.prizeNum < 1) ||
        (drawInfo.lotteryType === 1 && drawInfo.prizeNum < 1 && drawInfo.userIntegral < drawInfo.consumeIntegral)) {
        return false;
      } else {
        const { drawInfo } = this.state;
        this.start(0, 999999, 50);
        this.props.draw();// 获取抽奖返回数据
      }
    }
  }


  start = (position, result, speed) => {
    // position-起始序号  result-结果序号  speed-速度
    this.round = 0;   // 总次数
    this.active = position; // 起始位置
    const { lotteryPrizeList } = this.state;
    // console.log('lotteryPrizeList', lotteryPrizeList);
    this.timer = setInterval(() => {
      if (this.round < result) {
        if (this.active === 7) {
          this.active = 0;
        } else {
          this.active += 1;
        }
        this.round += 1;
        for (let i = 0, l = lotteryPrizeList.length; i < l; i += 1) {
          if (i === this.active) {
            lotteryPrizeList[i].isActive = true;
          } else {
            lotteryPrizeList[i].isActive = false;
          }
        }
        this.setState({ lotteryPrizeList, activeIndex: this.active });
      } else {
        setTimeout(() => {
          // 刷新抽奖次数
          this.props.getPrizeNum();
          // 打开抽奖弹窗
          this.props.showPrizeModal();
          this.isDisabled = false;
        }, 1000);
        clearInterval(this.timer);
      }
    }, speed);
  }

  render() {
    const { lotteryPrizeList, drawInfo } = this.state;
    console.log(drawInfo, 88888)
    const { item, index } = this.props;
    const body = document.body;
    const { backImage, selectImage, prizeBackImage, borderRadius, integralTextColor, buttonImage, prizeTextColor, prizeData } = item.modelStyle.drawStyleModel;

    let style = {
      backgroundImage: `url(${backImage})`,
      backgroundSize: 'cover'
    };
    console.log(style, 223311)
    return (
      <div className="draw-square" style={style}>
        <div className="draw-section">
          {lotteryPrizeList &&
            lotteryPrizeList.map((v, i) => (
              <div
                key={v.id}
                style={{
                  backgroundImage: `url('${v.isActive ? selectImage : prizeBackImage}')`,
                  backgroundSize: 'cover',
                  borderRadius: `${borderRadius || 0}px`
                }}
                className={`draw-item p${i}`}
              >
                <img src={v.prizeImageUrl} />
                <div className='item-prize-name no-wrap-2' style={{ color: prizeTextColor }}>{v.prizeName}</div>
              </div>
            ))
          }
          <div className="draw-item draw-btn" onClick={this.handleClick} style={{
            backgroundImage: `url(${buttonImage})`,
            backgroundSize: 'cover'
          }}>
            <div className="draw-times" style={{ color: integralTextColor }}>
              {/*如果是无门槛抽奖或者是积分抽奖并且，无门槛有数据展示免费抽奖次数*/}
              {(drawInfo.lotteryType === 0 || (drawInfo.lotteryType === 1 && item.prizeNum !== 0)) ?
                `抽奖次数*${drawInfo.prizeNum || 0}` : `${drawInfo.consumeIntegral}积分/次`}</div>
          </div>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(ScratchableLatex);
