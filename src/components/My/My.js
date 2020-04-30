import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import './less/my.less';
import Header from '../Header';
import { Toast, Icon } from 'antd-mobile';
import Icons, { qbdd, shfw, user,quan } from '../Icon';
import Footer from '../Footer';
import mathManage from '../../utils/mathManage';
import { isLoginOrAuth } from '../../utils/auth';
import MallLoginModal from '../LoginModal/MallLoginModal';
import LoginPageModal from '../LoginModal/LoginPageModal';


class My extends React.Component {

  constructor(props) {
    super(props);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
    this.state = {
      userInfo,
      shopInfo,
      showMallLoginModal: false,
      showLoginPageModal: false,
      isOrderList: false,
      isQuanList: false,
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { login: { fuluusertoken } } = nextProps;
    if (fuluusertoken !== props.login.fuluusertoken) {
      const { code, data, message } = fuluusertoken;
      if (code === '1000') {
        localStorage.setItem('userInfo', JSON.stringify(data));
        this.loginSuccess(data);
      } else {
        Toast.fail(message);
      }
    }
  }
  toUrl = (url) => {
    this.props.history.push(url)
  }
  // 登录成功调用
  loginSuccess = (data) => {
    this.hideLoginModal();
    this.setState({
      userInfo: data
    });
    if (this.state.isOrderList) {
      this.toUrl('/orderList');
    } else if(this.state.isQuanList){
      this.toUrl('/mycoupons');
    }
  }
  hideLoginModal = () => {
    this.setState({
      showMallLoginModal: false,
      showLoginPageModal: false
    })
  }
  toLogin = () => {
    this.setState({
      isOrderList: false,
      isQuanList: false,
    }, () => {
      isLoginOrAuth(this);
    })
  }
  toOrderList = () => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
    if (userInfo && userInfo.fuluToken) {
      this.props.history.push('/orderList')
    }
    else {
      this.setState({
        isOrderList: true,
      }, () => {
        isLoginOrAuth(this);
      })
    }

  }
  toQuanList=()=>{
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
    if (userInfo && userInfo.fuluToken) {
      this.props.history.push('/mycoupons')
    }
    else {
      this.setState({
        isQuanList: true,
      }, () => {
        isLoginOrAuth(this);
      })
    }
  }
  render() {
    const { userInfo, shopInfo, showMallLoginModal, showLoginPageModal } = this.state;
    return (
      <div className="my-bg">
        <Header
          {...this.props}
          jump={() => { this.props.history.goBack() }}
        />
        {
          userInfo && userInfo.fuluId || shopInfo.merInfoTemplates.visitType == 3 ?
            <div className="banner">
              <div className="head_img">
                <Icons glyph={user} />
              </div>
              <div className="right-txt">
                <div className="h1">我的</div>
                <div className="h5">我的订单／售后</div>
              </div>
            </div>
            :
            <div className="banner2">
              <div className="head_img2">
                <Icons glyph={user} />
              </div>
              <div className="to-login" onClick={this.toLogin}>点击登录</div>
            </div>
        }
        <div className="list">
          {
            shopInfo.vvisitType !== 3 &&
            < div className="item"
              onClick={this.toOrderList}
            // onClick={() => { this.toUrl('/orderList') }}
            >
              <Icons glyph={qbdd} />全部订单
            <div className="right-icon">
                <Icon type="right" />
              </div>
            </div>
          }

          <div className="item" onClick={() => { this.toUrl('/service') }}>
            <Icons glyph={shfw} />售后服务
            <div className="right-icon">
              <Icon type="right" />
            </div>
          </div>
          <div className="item" onClick={this.toQuanList}>
            <Icons glyph={quan} />优惠券
            <div className="right-icon">
              <Icon type="right" />
            </div>
          </div>
        </div>
        <Footer {...this.props} />
        {showMallLoginModal && <MallLoginModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
        {showLoginPageModal && <LoginPageModal loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
      </div >
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(My);
