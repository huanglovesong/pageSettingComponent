import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, InputItem, Toast, Button, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import Icons, { shouji,user } from '../Icon';
import './less/loginModal.less';
import Header from '../Header';
import parse from 'url-parse';
import Footer from '../Footer';

const RegTel = /^1(3|4|5|6|7|8|9)\d{9}$/;
let timer = null;

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    const url = parse(props.location.search, true);
    const { uri } = url.query; 
    this.state = {
      mobile: '',
      code: '',
      sendCodeTime: 0,
      uri
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { login } = nextProps;
    if (login.getCode !== props.login.getCode) {
      const { code, message } = login.getCode;
      if (code === '1000') {
        this.sendCode();
        Toast.info(`验证码已发送至${this.state.mobile}`);
      } else {
        Toast.fail(message);
      }
    }
    if (login.touristlogin !== props.login.touristlogin) {
      const { code, message, data } = login.touristlogin;
      if (code === '1000') {
        Toast.success('登录成功！');
        localStorage.setItem('userInfo', JSON.stringify(data));
        window.location.href = decodeURI(this.state.uri);
      } else {
        Toast.fail(message);
      }
    }
  }
  changeInput = (val, type) => {
    this.setState({
      [type]: val
    })
  }
  onLogin = () => {
    const { mobile, code } = this.state;
    if (!RegTel.test(mobile))
      return alert('请输入正确的手机号码！');
    const postD = {
      mobile: mobile.replace(/\s/g, ''),
      verCode:code,
    }
    const { props: { dispatch } } = this;
    dispatch({ type: 'login/touristlogin', payload: postD });
  }
  sendCode = () => {
    const self = this;
    this.setState({
      sendCodeTime: 60
    })
    timer = setInterval(() => {
      let { sendCodeTime } = this.state;
      if (sendCodeTime === 1) {
        clearInterval(timer)
      }
      sendCodeTime -= 1
      self.setState({
        sendCodeTime
      })
    }, 1000);
  }
  sendSmsCode = () => {
    const { mobile } = this.state;
    if (!RegTel.test(mobile)) {
      alert('请输入正确的手机号码！');
      return;
    }
    const { props: { dispatch } } = this;
    const postD = {
      mobile: mobile.replace(/\s/g, ''),
      loginKey: 'login'
    }
    dispatch({ type: 'login/getCode', payload: postD });
  }
  componentWillUnmount() {
    clearInterval(timer);
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { mobile, code, sendCodeTime } = this.state;
    return (
      <div className="login-modal">
        <Header
          {...this.props}
          jump={() => this.props.history.push('/')}
          title="短信验证"
          myLoading={!!(this.props.loading.effects.login)}  // 判断loading
        />
        <div className="banner">
        <div className="head_img">
                <Icons glyph={user} />
              </div>
          <div className="right-txt">
            <div className="h1">登录</div>
            <div className="h5">请输入手机号登录</div>
          </div>
        </div>
        <div className="login-bg">
          <InputItem
            {...getFieldProps('mobile') }
            placeholder="输入11位手机号"
            onChange={(val) => { this.changeInput(val, 'mobile') }}
            value={mobile}
            maxLength="11"
          ></InputItem>
          <InputItem
            {...getFieldProps('code') }
            placeholder="输入手机验证码"
            type="number"
            maxLength="4"
            onChange={(val) => { this.changeInput(val, 'code') }}
            value={code}
            extra={
              <Button
                className="link"
                onClick={this.sendSmsCode}
                disabled={(!RegTel.test(mobile)) || (RegTel.test(mobile) && sendCodeTime > 1)}
              >
                {sendCodeTime > 1 ? <span>重新获取({sendCodeTime}s)</span> : <span>获取验证码</span>}
              </Button>
            }
          ></InputItem>
          <div className="btn-bg">
            <button className="btn" onClick={this.onLogin}>登录</button>
          </div>
        </div>
				<Footer {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(createForm()(LoginModal));
