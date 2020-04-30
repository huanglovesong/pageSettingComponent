import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import './less/choujiang.less';
import Header from '../Header';
import { Toast, Icon } from 'antd-mobile';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
class ChouJiang extends React.Component {

  constructor(props) {
    super(props);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
    const userid = localStorage.getItem('userid');
    this.state = {
      userInfo,
      shopInfo,
      userid,
      isprizeright: false,
      showMallLoginModal: false
    }
  }
  componentDidMount() {
    //授权
    let yes = isLoginOrAuth(this);
    if (yes) {
      //已成功登录授权
      this.props.dispatch({ type: 'prize/activeOpen' })
    }
  }
  chinapay(data) {
    try {
      window.c_plugins.merchantBridge.callPaymentControl(function (result) {
        // 下述内容为点击左上角<后执行
        //alert('已调起支付控件');
        if (result.isCancelPay === '1') {
          // 客户取消了支付
        } else {
          if (result.orderStatus === '1') {
            // 支付成功的回调方法，可写返回后逻辑
            //支付成功后,直接跳抽奖页面,并带一个参数,证明该用户支付了,如果支付完成,就可以确定该用户是新用户
            this.props.history.push('./kaishichouj');
          } else {
            // 支付失败的回调方法 ，可写返回后逻辑1
          }
        }
      }, function (err) {
        alert(err.message || err || '网络错误，请检查网络连接');
      }, JSON.parse(data))
      //JSON.parse(data) 下单接口成功得到的数据
    } catch (error) {
      alert(error);
    }
  }
  getUserPriceNum = () => {
    //判断是否拥有抽奖次数
    this.props.dispatch({
      type: 'prize/getPrizeNum', payload: {
        userId: this.state.userid
      }
    })
  }
  sendOrder = () => {
    //下单
    //this.props.history.push('./kaishichouj')
    const { isprizeright, prizeNum } = this.state;
    if (isprizeright === 0) {
      //下单
      this.props.dispatch({ type: 'prize/prizeSendOrder' })
    } else if (isprizeright === 1) {
      this.props.history.push(`./kaishichouj`)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { login: { fuluusertoken } } = nextProps;
    const { prize: { getPrizeNumRes, isPrizeRight, prizeSendOrderRes, saveUserDataRes, activeOpenRes, payInfoRes } } = nextProps;
    if (fuluusertoken !== props.login.fuluusertoken) {
      const { code, data, message } = fuluusertoken;
      if (code === '1000') {
        localStorage.setItem('userInfo', JSON.stringify(data));
        this.loginSuccess(data);
      } else {
        Toast.fail(message);
      }
    }
    if (activeOpenRes !== props.prize.activeOpenRes) {
      if (activeOpenRes.code === '1000') {
        if (activeOpenRes.data.list[0].enable === 1) {
          //开启,判断是否拥有抽奖次数
          this.getUserPriceNum()
          localStorage.setItem('activeId', activeOpenRes.data.list.length > 0 && activeOpenRes.data.list[0].id)
        } else if (activeOpenRes.data.list[0].enable === 2) {
          //禁用逻辑
          this.setState({
            isprizeright: 2 //0,未购买,显示去支付1.已支付,显示去抽奖2.活动结束
          })
        }
      }
    }
    if (saveUserDataRes !== props.prize.saveUserDataRes) {
      if (saveUserDataRes.code === '1000') {

      }
    }
    if (prizeSendOrderRes !== props.prize.prizeSendOrderRes) {
      if (prizeSendOrderRes.code === '1000') {
        //下单成功返回，orderNo，productId,同时请求保存用户信息,以及请求支付接口
        this.props.dispatch({
          type: 'prize/saveUserData', payload: {
            orderNo: prizeSendOrderRes.data.orderNo,
            productId: prizeSendOrderRes.data.productId,
            userId: this.state.userid,
            mobile: this.state.mobile || '13036163226',
          }
        })
        this.props.dispatch({
          type: 'prize/payInfo', payload: {
            ProductName: '中国银行抽奖',
            OrderNo: prizeSendOrderRes.data.orderNo,
            PayAmount: 0.01
          }
        })
      }
    }
    if (payInfoRes !== props.prize.payInfoRes) {
      if (payInfoRes.code === '0') {
        //请求支付接口,成功后,直接调中国银行支付面版
        this.chinapay(payInfoRes.data);
      }
    }
    if (getPrizeNumRes !== props.prize.getPrizeNumRes) {
      const { mobile, orderNo, prizeNum } = getPrizeNumRes.data;
      if (getPrizeNumRes.code === '1000') {
        this.setState({
          isprizeright: 1,
          prizeNum,
        })
      } else if (getPrizeNumRes.code === '1001') {
        //拥有抽奖资格
        this.setState({
          isprizeright: 0
        })
      }
      this.setState({
        mobile,
        orderNo,
        prizeNum,
      })
      localStorage.setItem('orderNo', orderNo)
    }
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
  loginSuccess = (data) => {
    this.hideLoginModal();
    this.setState({
      userInfo: data
    }, () => {
      this.props.dispatch({ type: 'prize/activeOpen' })
    })
  }
  hideLoginModal = () => {
    this.setState({
      showMallLoginModal: false
    })
  }
  render() {
    const { userInfo, shopInfo, isprizeright, btntxt, showMallLoginModal } = this.state;
    return (
      <div className="choujiang-bg">
        <Header
          {...this.props}
          jump={() => { this.props.history.goBack() }}
        />
        <div className="prizeList">
        </div>
        {
          isprizeright && <div onClick={this.sendOrder} className="cj-btn">{isprizeright === 0 ? '支付0.01参与抽奖' : isprizeright === 1 ? '立即抽奖' : isprizeright === 2 ? '活动已结束' : ''}</div>
        }
        {/* <div className="cj-btn">立即抽奖</div>
        <div className="cj-btn">活动已结束</div> */}
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
export default connect(mapStateToProps)(ChouJiang);
