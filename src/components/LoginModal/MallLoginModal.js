import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, InputItem, Toast, Button, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import Icons, { shouji, user } from '../Icon';
import './less/mallLoginModal.less';
import Header from '../Header';
import parse from 'url-parse';
import Footer from '../Footer';

const RegTel = /^1(3|4|5|6|7|8|9)\d{9}$/;
let timer = null;

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        // const url = parse(props.location.search, true);
        // const { uri } = url.query;
        this.state = {
            mobile: '',
            code: '',
            sendCodeTime: 0,
            // uri
        }
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { login: { touristlogin, getCode } } = nextProps;
        if (getCode !== props.login.getCode) {
            const { code, message } = getCode;
            if (code === '1000') {
                this.sendCode();
                Toast.info(`验证码已发送至${this.state.mobile}`);
            } else {
                Toast.fail(message);
            }
        }
        // 登录成功
        if (touristlogin !== this.props.login.touristlogin) {
            const { code, message, data } = touristlogin;
            if (code === '1000') {
                Toast.success('登录成功！');
                localStorage.setItem('userInfo', JSON.stringify(data));
                this.props.loginSuccess(data);
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
            return Toast.info('请输入正确的手机号码！');
        if (!code)
            return Toast.info('请输入验证码！');
        const postD = {
            mobile: mobile.replace(/\s/g, ''),
            verCode: code,
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
            return Toast.info('请输入正确的手机号码！');
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
    onClose = () => {

    }
    render() {
        const { getFieldProps } = this.props.form;
        const { mobile, code, sendCodeTime } = this.state;
        return (
            <Modal
                className="mall-login-modal"
                visible
                transparent
                width="6.16rem"
                maskClosable={false}
                closable
                onClose={this.props.hideLoginModal}
                title="短信验证码登录"

                footer={[]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { alert('afterClose'); }}
            >
                <div className="login-bg">
                    <InputItem
                        {...getFieldProps('mobile')}
                        placeholder="请输入手机号"
                        onChange={(val) => { this.changeInput(val, 'mobile') }}
                        value={mobile}
                        onClick={(e) => {
                            e.currentTarget.focus();
                        }}
                        maxLength="11"
                    ></InputItem>
                    <InputItem
                        {...getFieldProps('code')}
                        placeholder="输入手机验证码"
                        type="number"
                        maxLength="4"
                        onChange={(val) => { this.changeInput(val, 'code') }}
                        value={code}
                        onClick={(e) => {
                            e.currentTarget.focus();
                        }}
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
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}
export default connect(mapStateToProps)(createForm()(LoginModal));
