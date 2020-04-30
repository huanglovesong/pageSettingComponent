import React from 'react';
import { connect } from 'dva';
import PropTypes, { number } from 'prop-types';
import './less/kaishichouj.less';
import Header from '../Header';
import { Toast, Icon, Modal, Carousel } from 'antd-mobile';
import { isLoginOrAuth } from '../../utils/auth';
import erricon from './images/err-icon.png';
import filedicon from './images/filed-icon.png';
import parse from 'url-parse';
import Clipboard from 'clipboard';
import MallLoginModal from '../LoginModal/MallLoginModal';

class KaiShiChouJ extends React.Component {

  constructor(props) {
    super(props);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
    const userid = localStorage.getItem('userid');
    const orderNo = localStorage.getItem('orderNo');
    const eventId = localStorage.getItem('eventId');
    const url = parse(props.location.search, true);
    this.timer;
    this.state = {
      eventId: eventId === 'null' ? null : eventId,
      userInfo,
      shopInfo,
      userid,
      activeId: '',
      orderNo,
      dataSource: [{ isActive: true, index: 's0', classText: 'p0', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's1', classText: 'p1', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's2', classText: 'p2', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's7', classText: 'p3', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's3', classText: 'p4', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's6', classText: 'p5', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's5', classText: 'p6', proName: '百度网盘 会员30天' },
      { isActive: false, index: 's4', classText: 'p7', proName: '百度网盘 会员30天' }],
      showModal: false,
      prizeNum: 0,
      errModal: false,
      filedModal: false,
      entityModal: false,
      drawnCount: 0,
      thisindex: 0,
      userlist: [],
      refreshNum: 0,
      ifopen: false,
      showMallLoginModal: false,
      showLoginPageModal: false,
      myprizelist: 0,
    }
  }
  componentDidMount() {
    //1.进来先走游客模式登录
    let yes = isLoginOrAuth(this);
    if (yes) {
      this.init();
    }
    new Clipboard('.gotoexchange');

    _czc.push(["_setAutoPageview", false]);
    _czc.push(["_trackPageview", '/kaishichouj']);
  }
  init() {
    //2.登录成功之后，判断活动是否开启
    this.props.dispatch({
      type: 'prize/activeOpen', payload: {
        eventId: this.state.eventId || configs.eventId
      }
    })
    //请求的有用户中奖内容
    this.userPrizeList();
  }
  userPrizeList = () => {
    this.props.dispatch({
      type: 'prize/userPrizeList', payload: {
        eventId: this.state.eventId || configs.eventId
      }
    })
  }
  proList = () => {
    //奖品列表接口
    this.props.dispatch({
      type: 'prize/prizeProList', payload: {
        id: this.state.activeId
      }
    })
  }
  myPrize = () => {
    this.props.history.push('./prizelist')
  }
  getUserPriceNum = () => {
    //判断是否拥有抽奖次数
    this.props.dispatch({
      type: 'prize/getPrizeNum', payload: {
        userId: this.state.userInfo.fuluId,
        eventId: this.state.eventId || configs.eventId,
        id: this.state.activeId
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { login: { fuluusertoken } } = nextProps;
    const { prize: { getPrizeNumRes, prizeResultRes, handlePrizeRes, prizeProListRes, userPrizeListRes, activeOpenRes, addPrizeNumRes } } = nextProps;
    if (addPrizeNumRes !== props.prize.addPrizeNumRes) {
      this.getUserPriceNum();
    }
    if (activeOpenRes !== props.prize.activeOpenRes) {
      if (activeOpenRes.code === '1000') {
        const { userInfo } = this.state;
        if (activeOpenRes.data.enable === 1) {
          //给用户添加抽奖次数
          this.props.dispatch({
            type: 'prize/addPrizeNum', payload: {
              id: activeOpenRes.data.id,
              eventId: this.state.eventId || configs.eventId,
              userId: userInfo.fuluId,
              mobile: userInfo.fuluId,
            }
          })
          this.setState({
            activeId: activeOpenRes.data.id,
            ifopen: true,
            eventDesc: activeOpenRes.data.eventDesc,
            eventAnnouncement: activeOpenRes.data.eventAnnouncement,
            startTime: activeOpenRes.data.eventStartTime.split(" ")[0],
            endTime: activeOpenRes.data.eventEndTime.split(" ")[0],
          }, () => {
            //请求奖品列表
            this.proList()
          })
          //3.如果开启，给用户添加抽奖次数
        } else if (activeOpenRes.data.enable === 2) {
          //禁用逻辑
          this.setState({
            ifopen: false
          })
          Toast.fail('活动未开启')
        }
      } else if (activeOpenRes.code === '-3' || activeOpenRes.code === '1013' || activeOpenRes.code === '1014' || activeOpenRes.code === '1015') {
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.fuluToken = '';
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        isLoginOrAuth(this)
      }
    }
    if (userPrizeListRes !== props.prize.userPrizeListRes) {
      if (userPrizeListRes.code === '1000') {
        this.setState({
          drawnCount: userPrizeListRes.data.drawnCount,
          userlist: userPrizeListRes.data.outDtos
        })
      }
    }
    if (prizeProListRes !== props.prize.prizeProListRes) {
      if (prizeProListRes.code === '1000') {
        prizeProListRes.data.list.length > 0 && prizeProListRes.data.list.map((item, index) => {
          if (index === 0) item.isActive = true;
          item.isActive = false
        })
        this.setState({
          dataSource: prizeProListRes.data.list
        })
      }
    }
    if (handlePrizeRes !== props.prize.handlePrizeRes) {
      if (handlePrizeRes.code === '1000') {
        const { dataSource } = this.state;
        //将内容展示在弹框中
        clearInterval(this.timer)
        dataSource.map((item, index) => {
          item.isActive = false;
          if (item.id === handlePrizeRes.data.producId) {
            item.isActive = true
          }
        })
        //prizetype为4 为谢谢回顾 其它为抽中
        if (handlePrizeRes.data.prizeType == 4) {
          this.setState({
            filedModal: true,
            errModal: false,
            showModal: false,
            entityModal: false,
          })
        } else if (handlePrizeRes.data.prizeType == 5) {
          //实体
          this.setState({
            filedModal: false,
            errModal: false,
            showModal: false,
            entityModal: true,
            modalData: handlePrizeRes.data
          })
        } else {
          //非实体
          this.setState({
            filedModal: false,
            errModal: false,
            showModal: true,
            entityModal: false,
            modalData: handlePrizeRes.data
          })
        }
        this.setState({
          dataSource
        })
        //刷新抽奖次数
        this.getUserPriceNum();
        //请求的有用户中奖内容
        this.userPrizeList();
      } else if (handlePrizeRes.code === '-3' || handlePrizeRes.code === '1013' || handlePrizeRes.code === '1014' || handlePrizeRes.code === '1015') {
        let userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.fuluToken = '';
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        isLoginOrAuth(this)
      }else if(handlePrizeRes.code === '1020'){
        Toast.fail('抽奖已达上限');
        clearInterval(this.timer)
      }else if(handlePrizeRes.code === '1021'){
        Toast.fail('今日抽奖已达上限');
        clearInterval(this.timer)
      } else {
        clearInterval(this.timer)
        //刷新抽奖次数
        this.getUserPriceNum();
        this.setState({
          filedModal: false,
          errModal: true,
          showModal: false,
          entityModal: false,
        })
      }
    }
    if (getPrizeNumRes !== props.prize.getPrizeNumRes) {
      if (getPrizeNumRes.code === '1000') {
        this.setState({
          prizeNum: getPrizeNumRes.data.prizeNum
        })
      }
      // let timer = null;
      // clearInterval(timer)
      // if (getPrizeNumRes.code === '1000') {
      //   this.setState({
      //     prizeNum: getPrizeNumRes.data.prizeNum
      //   })
      // } else if (getPrizeNumRes.code === '1001') {
      //   const { refreshNum } = this.state;
      //   if(refreshNum < 4 ){
      //     timer = setInterval(() => {
      //       this.getUserPriceNum()
      //     }, 12000);
      //   }else{
      //     clearInterval(timer)
      //   }
      //   this.setState({
      //     refreshNum: refreshNum + 1
      //   })
      // }
    }
    if (fuluusertoken !== props.login.fuluusertoken) {
      const { code, data, message } = fuluusertoken;
      if (code === '1000') {
        console.log('走了授权')
        localStorage.setItem('userInfo', JSON.stringify(data));
        this.loginSuccess();
        this.init()
      } else {
        Toast.fail(message);
      }
    }
  }
  loginSuccess = () => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    this.setState({
      userInfo
    }, () => {
      this.init();
    })
    this.hideLoginModal();
  }
  hideLoginModal = () => {
    this.setState({
      showMallLoginModal: false,
      showLoginPageModal: false
    })
  }
  toUrl = (url) => {
    this.props.history.push(url)
  }
  toLogin = () => {
    this.setState({
      isOrderList: false,
    }, () => {
      isLoginOrAuth(this);
    })
  }
  againprize = () => {
    this.hiddenModal('errModal');
    this.handleClick()
  }
  handleClick = () => {
    const { userInfo, activeId, prizeNum, ifopen } = this.state;
    //活动是否开启 ifopen true
    //抽奖次数是否大于0 prizeNum > 0
    if (ifopen) {
      if (prizeNum > 0) {
        clearInterval(this.timer);
        this.start(0, 999999, 50);
        //抽奖接口
        this.props.dispatch({
          type: 'prize/handlePrize', payload: {
            id: activeId,
            eventId: this.state.eventId || configs.eventId,
            userId: userInfo.fuluId,
            mobile: userInfo.fuluId
          }
        })
      } else {
        Toast.fail('您的抽奖次数已用完')
      }
    } else {
      Toast.fail('活动未开始')
    }
  }
  start = (position, result, speed) => {
    // position-起始序号  result-结果序号  speed-速度
    this.round = 0;   // 总次数
    this.active = position; // 起始位置
    const { dataSource } = this.state;
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
  hiddenModal = (modal) => {
    this.setState({
      [modal]: false
    })
  }
  exchange = (url, card, type) => {
    // 1满减券 2折扣券 3 兑换劵
    if (type !== '3') {
      this.props.history.push('./mycoupons');
    } else {
      //将card复制到剪切板
      Toast.success('券码复制成功，请在页面跳转后粘贴使用。',3)
      setTimeout(() => {
        window.location.href = url
      }, 3000);
    }
  }
  entityexchange = () => {
    this.hiddenModal('entityModal')
    Toast.show('稍后会有客服人员联系您，请保持手机畅通。')
  }
  render() {
    const { startTime, endTime, entityModal, eventAnnouncement, eventDesc, prizeList, dataSource, showModal, prizeNum, errModal, filedModal, drawnCount, userlist, modalData, showMallLoginModal, showLoginPageModal } = this.state;
    return (
      <div className="kaishichouj-bg">
        <Header
          {...this.props}
          jump={() => { this.props.history.goBack() }}
        />
        <div className="pagetitle"></div>
        <div className="prize-body">
          <p className="prize-usernum">已有：{drawnCount}人参与抽奖</p>
          <div className="prize-roll">
            <div className="draw-section">
              {dataSource &&
                dataSource.map((v, i) => (
                  <div
                    key={i}
                    className={v.isActive ? `draw-item active p${i}` : `draw-item p${i}`}
                  >
                    {v.prizeImageUrl && <img src={v.prizeImageUrl} alt="" />}
                    <p className='item-prize-name'>{v.prizeName}</p>
                  </div>
                ))
              }
              <div className="draw-item draw-btn" onClick={() => { this.handleClick() }}>
                <button className="btn"></button>
                <p className='draw-times'>抽奖次数*{this.state.prizeNum}</p>
              </div>
            </div>
          </div>
          <div className="prize-notice">
            {
              userlist.length > 0 &&
              <Carousel className="my-carousel"
                vertical
                dots={false}
                dragging={false}
                swiping={false}
                autoplay
                infinite
              >
                {
                  userlist.map((item, index) => (
                    <div key={index} className="v-item">用户: { `${item.mobile.substring(0, 3)}*****${item.mobile.substring(8, 11)}`} 抽中{ item.prizeName}</div>
                  ))
                }
                {/* <div className="v-item">11111</div>
              <div className="v-item">2222</div>
              <div className="v-item">333</div> */}
              </Carousel>
            }
          </div>
          <div className="prize-rule">
            <h1>活动规则</h1>
            <p><span>活动时间</span> {startTime} 至 {endTime}</p>
            <p><span>活动说明</span> {eventDesc && eventDesc}</p>
            <p><span>注意事项</span> {eventAnnouncement && eventAnnouncement}</p>
            {/* <p>本充值服务由“武汉福禄网络科技有限公司”提供。 备注：本权益支持大陆地区用户使用，不支持港澳台地区，还望理解！</p> */}
          </div>
        </div>
        <div onClick={this.myPrize} className="myprize"></div>
        {
          showModal &&
          <Modal
            visible={true}
            transparent
            maskClosable={false}
            transparent
            className="choujiangmodal"
          >
            {
              modalData &&
              <div>
                <h1></h1>
                <img src={modalData.prizeImageUrl}></img>
                <p className="proname">{modalData.prizeName}</p>
                <p className="pro-notice">关闭页面后可以通过活动页面下方 我的奖品查看中奖情况</p>
                <button className="gotoexchange" data-clipboard-text={modalData.cards} onClick={() => { this.exchange(modalData.exchangeUrl, modalData.cards, modalData.batchType) }}>立即兑换</button>
                <span className="close" onClick={() => { this.hiddenModal('showModal') }}></span>
              </div>
            }
          </Modal>
        }
        {
          filedModal &&
          <Modal
            visible={true}
            transparent
            maskClosable={false}
            transparent
            className="choujiangmodal"
          >
            <div>
              <h1 className="filedmodal-title"></h1>
              <img src={filedicon}></img>
              <p className="proname">谢谢参与</p>
              <p className="pro-notice">关闭页面后可以通过活动页面下方 我的奖品查看中奖情况</p>
              <button className="gotoexchange" onClick={() => { this.hiddenModal('filedModal') }}>知道了</button>
              <span className="close" onClick={() => { this.hiddenModal('filedModal') }}></span>
            </div>
          </Modal>
        }
        {
          errModal &&
          <Modal
            visible={true}
            transparent
            maskClosable={false}
            transparent
            className="choujiangmodal"
          >
            <div>
              <h1 className="errmodal-title"></h1>
              <img src={erricon}></img>
              <p className="err-mes">系统异常</p>
              <p className="err-mes">点击重新抽奖</p>
              <button className="gotoexchange" onClick={this.againprize}>重新抽奖</button>
              <span className="close" onClick={() => { this.hiddenModal('errModal') }}></span>
            </div>
          </Modal>
        }
        {
          entityModal &&
          <Modal
            visible={true}
            transparent
            maskClosable={false}
            transparent
            className="choujiangmodal"
          >
            {
              modalData &&
              <div>
                <h1></h1>
                <img src={modalData.prizeImageUrl}></img>
                <p className="proname">{modalData.prizeName}</p>
                <p className="pro-notice">后续会有工作人员和您联系，核对中奖信息，请保持手机畅通</p>
                <button className="gotoexchange" data-clipboard-text={modalData.cards} onClick={this.entityexchange}>立即兑换</button>
                <span className="close" onClick={() => { this.hiddenModal('entityModal') }}></span>
              </div>
            }
          </Modal>
        }
        {showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(KaiShiChouJ);
