
import mathManage from './mathManage';
// 授权失效
function authorizationFailure(that) {
  const { userInfo } = that.state;
  userInfo.fuluToken = '';
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  that.setState({
    userInfo
  }, () => {
    isLoginOrAuth(that);
  })
}
// 详情页针对授权失效单独处理
function isLoginOrAuth(that) {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
  const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : ''
  // 游客模式、联登模式 并且没有登陆
  if (!(userInfo && userInfo.fuluToken) && shopInfo.merInfoTemplates.visitType != 3) {
    let payType = mathManage.isAlipayOrWechat();
    console.log(payType)
    var backUrl = window.location.pathname + window.location.search;
    console.log(backUrl)
    if (payType === 0 || payType === 1) {
      // 微信/支付宝授权
      window.location.href = configs.commonUrl + '?codeKey=' + shopInfo.codeKey + '&backUrl=' + encodeURIComponent(backUrl);
      return false;
    } else {
      // 浏览器环境 游客模式
      if (shopInfo.merInfoTemplates.visitType === 2) {
        console.log('userInfo', userInfo)
        // 用户已经登录但是授权失效
        if (userInfo.fuluId && !userInfo.fuluToken) {
          that.props.dispatch({
            type: 'login/fuluusertoken',
            payload: {
              code: userInfo.fuluId,
              env: 3, // 支付类型 1支付宝 2微信 3自有系统用户
              type: true,  // 是否userid
            }
          })
        }
        // 用户没有登录，则要进行弹框
        else {
          that.setState({
            showMallLoginModal: true,
            //showLoginPageModal: true
          })
        }
        return false;
      } else {
        // 第三方登录
        let userid = localStorage.getItem('userid')
        let accesstoken = localStorage.getItem('accesstoken')
        let uur = `${configs.commonUrl}?codeKey=${shopInfo.codeKey}&backUrl=${encodeURIComponent(backUrl)}`;
        if (userid) {
          uur = uur + `&userid=${userid}`;
        }
        if (accesstoken) {
          uur = uur + `&accesstoken=${accesstoken}`;
        }
        window.location.href = uur;
        return false;
      }
    }
  } else {
    return true;
  }
}
// 授权失效 authKey用于标识唯一组件
function authorizationFailurePageSetting(that) {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
  userInfo.fuluToken = '';
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  isLoginOrAuthPageSetting(that);
}
// 详情页针对授权失效单独处理,authKey用于标识唯一组件
function isLoginOrAuthPageSetting(that) {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''
  const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : ''
  // 游客模式、联登模式 并且没有登陆
  if (!(userInfo && userInfo.fuluToken) && shopInfo.merInfoTemplates.visitType != 3) {
    let payType = mathManage.isAlipayOrWechat();
    console.log(payType)
    var backUrl = window.location.pathname + window.location.search;
    console.log(backUrl)
    if (payType === 0 || payType === 1) {
      // 微信/支付宝授权
      window.location.href = configs.commonUrl + '?codeKey=' + shopInfo.codeKey + '&backUrl=' + encodeURIComponent(backUrl);
      return false;
    } else {
      // 浏览器环境 游客模式
      if (shopInfo.merInfoTemplates.visitType === 2) {
        console.log('userInfo', userInfo)
        // 用户已经登录但是授权失效
        if (userInfo.fuluId && !userInfo.fuluToken) {

          that.props.dispatch({
            type: 'loginPageSetting/fuluusertoken',
            payload: {
              code: userInfo.fuluId,
              env: 3, // 支付类型 1支付宝 2微信 3自有系统用户
              type: true,  // 是否userid
            }
          })

        }
        // 用户没有登录，则要进行弹框
        else {
          that.setState({
            showMallLoginModal: true,
          })
        }
        return false;
      } else {
        // 第三方登录
        let userid = localStorage.getItem('userid')
        let accesstoken = localStorage.getItem('accesstoken')
        let uur = `${configs.commonUrl}?codeKey=${shopInfo.codeKey}&backUrl=${encodeURIComponent(backUrl)}`;
        if (userid) {
          uur = uur + `&userid=${userid}`;
        }
        if (accesstoken) {
          uur = uur + `&accesstoken=${accesstoken}`;
        }
        window.location.href = uur;
        return false;
      }
    }
  } else {
    return true;
  }
}
export { authorizationFailure, isLoginOrAuth, authorizationFailurePageSetting, isLoginOrAuthPageSetting, };