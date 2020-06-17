import React, { Component } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import './less/touristLogin.less';
 class TouristLogin extends Component {
  static propTypes = {
    prop: PropTypes
  }
  componentWillReceiveProps(nextProps) {
    // 如果是登录成功，找到对应组件authKey进行接下来的步骤
    if (nextProps.pageSetting && nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
      window.location.href = './exchange';
    }
  }


  login = () => {
    const { componentIndex } = this.props;
    localStorage.setItem("fuluToken", '');
    localStorage.setItem("fuluId", '');
    localStorage.setItem('userInfo', '');
    this.props.authorizationFailurePageSetting(componentIndex);
  }
  getCom = () => {
    const { item, isChoose } = this.props;
    // let pagePadding = item.modelStyle.touristLoginStyleModel.pageMargin;
    let { themeColor, displayStyle } = item.modelStyle.loginStyleModel;
    // const style1 = {
    //   paddingLeft: `${pagePadding}px`, paddingRight: `${pagePadding}px`
    // };
    console.log(item, 12312)
    return <div className="tourist-login-box clearfix">
      {displayStyle === 'style1' ?
        <div className="login-con">
          <p>立即<span className="login-text">登录</span>,即可兑换更多特权</p>
          <button onClick={this.login} style={{ background: themeColor }} className="login-btn">登录</button>
        </div> :
        <div className="exchange-phone-con">
          <span className="bind-phone">绑定手机号: {localStorage.getItem("fuluId") || ''}</span>
          <span className="changephone" onClick={this.login}>更换手机号</span>
        </div>}
    </div>

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
export default connect(mapStateToProps)(TouristLogin);
