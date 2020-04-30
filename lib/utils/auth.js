'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoginOrAuth = exports.authorizationFailure = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _mathManage = require('./mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 授权失效
function authorizationFailure(that) {
  var userInfo = that.state.userInfo;

  userInfo.fuluToken = '';
  localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
  that.setState({
    userInfo: userInfo
  }, function () {
    isLoginOrAuth(that);
  });
}
// 详情页针对授权失效单独处理
function isLoginOrAuth(that) {
  var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
  var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : '';
  // 游客模式、联登模式 并且没有登陆
  if (!(userInfo && userInfo.fuluToken) && shopInfo.merInfoTemplates.visitType != 3) {
    var payType = _mathManage2.default.isAlipayOrWechat();
    console.log(payType);
    var backUrl = window.location.pathname + window.location.search;
    console.log(backUrl);
    if (payType === 0 || payType === 1) {
      // 微信/支付宝授权
      window.location.href = configs.commonUrl + '?codeKey=' + shopInfo.codeKey + '&backUrl=' + encodeURIComponent(backUrl);
      return false;
    } else {
      // 浏览器环境 游客模式
      if (shopInfo.merInfoTemplates.visitType === 2) {
        console.log('userInfo', userInfo);
        // 用户已经登录但是授权失效
        if (userInfo.fuluId && !userInfo.fuluToken) {
          that.props.dispatch({
            type: 'login/fuluusertoken',
            payload: {
              code: userInfo.fuluId,
              env: 3, // 支付类型 1支付宝 2微信 3自有系统用户
              type: true // 是否userid
            }
          });
        }
        // 用户没有登录，则要进行弹框
        else {
            that.setState({
              showMallLoginModal: true
              //showLoginPageModal: true
            });
          }
        return false;
      } else {
        // 第三方登录
        var userid = localStorage.getItem('userid');
        var accesstoken = localStorage.getItem('accesstoken');
        var uur = configs.commonUrl + '?codeKey=' + shopInfo.codeKey + '&backUrl=' + encodeURIComponent(backUrl);
        if (userid) {
          uur = uur + ('&userid=' + userid);
        }
        if (accesstoken) {
          uur = uur + ('&accesstoken=' + accesstoken);
        }
        window.location.href = uur;
        return false;
      }
    }
  } else {
    return true;
  }
}
exports.authorizationFailure = authorizationFailure;
exports.isLoginOrAuth = isLoginOrAuth;