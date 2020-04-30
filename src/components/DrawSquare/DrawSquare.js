import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';
import Header from '../Header';
import './less/drawSquare.less';
import Icon, { close } from '../Icon';


class DrawSquare extends React.Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(props) {
    super(props);
    this.timer;
    this.state = {
      dataSource: [{ isActive: true, index: 's0', classText: 'p0' },
      { isActive: false, index: 's1', classText: 'p1' },
      { isActive: false, index: 's2', classText: 'p2' },
      { isActive: false, index: 's7', classText: 'p3' },
      { isActive: false, index: 's3', classText: 'p4' },
      { isActive: false, index: 's6', classText: 'p5' },
      { isActive: false, index: 's5', classText: 'p6' },
      { isActive: false, index: 's4', classText: 'p7' }],
      boxId: props.boxId,
      total: '',
      balance: '',
      prizeModal: true,
      isDisabled: false,
      prizeName: ''
    }
  }

  componentWillMount() {
    console.log('props', this.props)
    const token = sessionStorage.getItem('token');
    if (token) {
      this.props.getUserinfo();
      setTimeout(() => {
        this.props.getUserinfo();
      }, 1000);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    const { props } = this;
    const { openBox } = nextProps;
    if (openBox.getBoxPrizeList !== props.openBox.getBoxPrizeList) {
      const { code, data, message } = openBox.getBoxPrizeList;
      if (code === '0') {
        if (data.list && data.list.length === 8) {
          Object.assign(data.list[0], { isActive: true, index: 's0', classText: 'p0' });
          Object.assign(data.list[1], { isActive: false, index: 's1', classText: 'p1' });
          Object.assign(data.list[2], { isActive: false, index: 's2', classText: 'p2' });
          Object.assign(data.list[3], { isActive: false, index: 's7', classText: 'p3' });
          Object.assign(data.list[4], { isActive: false, index: 's3', classText: 'p4' });
          Object.assign(data.list[5], { isActive: false, index: 's6', classText: 'p5' });
          Object.assign(data.list[6], { isActive: false, index: 's5', classText: 'p6' });
          Object.assign(data.list[7], { isActive: false, index: 's4', classText: 'p7' });
          this.setState({ dataSource: data.list });
        }
      } else {
        Toast.info(message);
      }
    }

    // 获取余额和次数
    if (openBox.getTotalAndBalance !== props.openBox.getTotalAndBalance) {
      const { code, data } = openBox.getTotalAndBalance;
      if (code === '0') {
        this.setState({ total: data.total });
      } else if (code === '-100') {
        // this.props.toLogin();
        // Toast.info(message);
        sessionStorage.setItem('token', '');
      } else {
        this.props.toPay();
        // Toast.info(message);
      }
    }

    // 抽奖
    if (openBox.prize !== props.openBox.prize) {
      const { code, data, message } = openBox.prize;
      if (code === '0') {
        const result = data.prizeName;
        if (!result) {
          return false;
        }
        // 更新次数
        const { dataSource } = this.state;
        this.setState({ total: data.total });
        // 寻找奖项
        let resultIndex;
        for (let i = 0, l = dataSource.length; i < l; i += 1) {
          if (dataSource[i].prizeName === data.prizeName) {
            resultIndex = i;
            this.setState({ prizeImgUrl: dataSource[i].imgUrl });
          }
        }
        this.setState({ prizeName: data.prizeName });
        setTimeout(() => {
          const { activeIndex } = this.state;
          // 清除定时器
          clearInterval(this.timer);
          // 获取清除上一次定时器时停在的activeIndex为开启下一个定时器起始位置，并补上未转一整圈的个数，
          this.start(activeIndex, (8 - activeIndex) + resultIndex, 400);
        }, 2000);

      } else if (code === '-101') {
        // this.props.toLogin();
        // Toast.info(message);
        sessionStorage.setItem('token', '');
      } else {
        Toast.info(message);
        this.props.toPay();
        clearInterval(this.timer);
      }
    }
  }

  handleClick = () => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      this.props.toLogin();
      return false;
    }
    const { total } = this.state;
    if (total < 1) {
      this.props.toPay();
      return false;
    } else {
      this.start(0, 999999, 50);
      this.draw();  // 开始抽奖
    }
  }

  draw = () => {
    this.setState({ isDisabled: true }); // 开始抽奖禁止按钮
    const postData = {
      ChannelCode: sessionStorage.getItem('entry'),
      BoxId: this.state.boxId,
      RoomNo: ''
    };
    this.props.dispatch({ type: 'openBox/prize', payload: postData });
  }

  start = (position, result, speed) => {
    // position-起始序号  result-结果序号  speed-速度
    this.round = 0;   // 总次数
    this.active = position; // 起始位置
    const { dataSource } = this.state;
    // console.log('dataSource', dataSource);
    this.timer = setInterval(() => {
      if (this.round < result) {
        if (this.active === 7) {
          this.active = 0;
        } else {
          this.active += 1;
        }
        this.round += 1;
        for (let i = 0, l = dataSource.length; i < l; i += 1) {
          if (i === this.active) {
            dataSource[i].isActive = true;
          } else {
            dataSource[i].isActive = false;
          }
        }
        this.setState({ dataSource, activeIndex: this.active });
        // console.log('timer', this.active);
      } else {
        setTimeout(() => {
          this.setState({ prizeModal: true, isDisabled: false });
        }, 1000);
        clearInterval(this.timer);
      }
    }, speed);
  }

  render() {
    const { dataSource, prizeModal } = this.state;
    // console.log('dataSource', dataSource);
    const body = document.body;
    if (prizeModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
    return (
      <div className="draw-square">
        <div className="draw-section">
          {dataSource &&
            dataSource.map((v, i) => (
              <div
                key={v.id}
                className={v.isActive ? `draw-item active p${i}` : `draw-item p${i}`}
              >
                <img src={v.imgUrl} alt="" />
                <p className='item-prize-name'>{v.prizeName}</p>
              </div>
            ))
          }
          <div className="draw-item draw-btn">
            <input type="button" className="btn" onClick={this.handleClick} disabled={this.state.isDisabled} />
            <p className='draw-times'>抽奖次数*{this.state.total}</p>
          </div>
        </div>

        {this.state.prizeModal &&
          <div className="prize-modal">
            <div className="prize-modal-container">
              <button className="close-btn" onClick={() => { this.setState({ prizeModal: false }) }}><Icon glyph={close} /></button>
              <p className="prize-name">
                {this.state.prizeImgUrl && <img src={this.state.prizeImgUrl} className="prize-img" alt="" />}
              </p>
              <p className="prize-text">恭喜您获得{this.state.prizeName}！</p>
              <button className="prize-btn" onClick={this.props.toOrder} />
            </div>
          </div>
        }
        <button className="list-entry" onClick={this.props.toOrder}>开箱记录</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(DrawSquare);
