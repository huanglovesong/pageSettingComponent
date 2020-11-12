'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoginOrAuthPageSetting = exports.authorizationFailurePageSetting = exports.isLoginOrAuth = exports.authorizationFailure = undefined;

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

require('antd-mobile/lib/toast/style');

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
// 授权失效 authKey用于标识唯一组件
function authorizationFailurePageSetting(that) {
  var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
  userInfo.fuluToken = '';
  localStorage.setItem("fuluToken", '');
  isLoginOrAuthPageSetting(that);
}

function fuluusertoken(that, userInfo) {
  that.props.dispatch({
    type: 'loginPageSetting/fuluusertoken',
    payload: {
      code: userInfo.fuluId,
      env: 3, // 支付类型 1支付宝 2微信 3自有系统用户
      type: true // 是否userid
    }
  });
}

var loginType = {
  // 农行
  agriculturalBank: function agriculturalBank() {},

  // 云闪付
  unionPay: function unionPay() {}
};

// 详情页针对授权失效单独处理,authKey用于标识唯一组件
function isLoginOrAuthPageSetting(that) {
  // 获取localStorage和sessionStorage，因为有的项目用的localStorage，有的项目用的sessionStorage
  var userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  var userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
  var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
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
        // 用户已经登录但是授权失效
        if (userInfo.fuluId && !userInfo.fuluToken) {
          fuluusertoken(that, userInfo);
        }
        // 用户没有登录，则要进行弹框
        else {
            that.setState({
              showMallLoginModal: true
            });
          }
      }
      // 第三方登录
      else {
          // 用户已经登录但是授权失效统一走我们用户授权，否则走对应的第三方登录逻辑
          if (userInfo.fuluId && !userInfo.fuluToken) {
            fuluusertoken(that, userInfo);
          }
          // 平安银行
          else if (configs.pingAn && shopInfo.codeKey.toLowerCase() === configs.pingAn.toLowerCase()) {
              //alert('平安银行联登');
              var state = _mathManage2.default.randomString(32);
              //进行第三方授权
              pabank.login({
                bizContent: {
                  state: state
                }, success: function success(res) {
                  //alert(JSON.stringify(res))
                  that.props.dispatch({
                    type: 'loginPageSetting/pinanLogin',
                    payload: {
                      authCode: res.authCode,
                      state: state
                    }
                  }).then(function (res) {
                    var code = res.code,
                        data = res.data,
                        message = res.message;

                    if (code === '1000') {
                      // 使用登录成功后续动作
                      that.loginSuccess(data);
                    } else {
                      _toast2.default.fail(message);
                    }
                  });
                }
              });
            }
            //农业银行
            else if (configs.CloudPan && shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() || configs.aqiy && codeid.toLowerCase() === configs.aqiy.toLowerCase()) {
                var panCode = GetQueryString('code');
                // 如果有code值，说明是农业银行登录链接跳转过来返回的code，直接去换fuluId和fuluToken
                if (panCode) {
                  // 区分爱奇艺和网盘调用对应的授权接口
                  var type = shopInfo.codeKey.toLowerCase() === configs.aqiy.toLowerCase() ? 'loginPageSetting/ablogin' : 'loginPageSetting/panlogin';
                  that.props.dispatch({
                    type: type, payload: {
                      Aabccode: panCode,
                      redirectUri: shopInfo.merInfoTemplates.urlAddress
                    }
                  }).then(function (res) {
                    var code = res.code,
                        data = res.data;

                    if (code === '1000') {
                      // 使用登录成功后续动作
                      that.loginSuccess(data);
                    } else {
                      _toast2.default.fail(message);
                    }
                  });
                }
                // 如果没有则去跳转农行登录授权
                else {
                    //alert('农业银行联登')
                    var redirect_uri = shopInfo.merInfoTemplates.urlAddress;
                    var client_id = 'c21e204f-a3b8-4615-944d-00065d0dc2b1';
                    var _state = _mathManage2.default.randomString(6);
                    var urlStr = 'https://www.abchina.com/luascript/oauthLogin/{"client_id":"' + client_id + '","redirect_uri":"' + redirect_uri + '","state":"' + _state + '","scope":"openid","response_type":"code"}';
                    window.top.location.href = urlStr;
                  }
              }
              //('云闪付')
              else if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '')) {
                  //是否存在UnionPayCode如果存在说明是登录跳转过来的
                  if (sessionStorage.getItem('UnionPayCode') !== 'null' && sessionStorage.getItem('UnionPayCode')) {
                    //alert(sessionStorage.getItem('UnionPayCode'))
                    that.props.dispatch({
                      type: 'loginPageSetting/getUnionOpenId', payload: {
                        par: sessionStorage.getItem('UnionPayCode')
                      }
                    }).then(function (res) {
                      var code = res.code,
                          data = res.data;

                      if (code === '1000') {
                        fuluusertoken(that, data);
                      } else {
                        _toast2.default.fail(message);
                      }
                    });
                  }
                  // 否则进行联登
                  else {
                      //联登方法
                      var REDIRECTURI = window.location.href.split('?')[0] + '?codeid=' + shopInfo.codeKey + '|' + window.location.href.split('?')[1].replace('&', '|');
                      var phonetype = _mathManage2.default.getPhoneType();
                      window.location.href = 'https://open.95516.com/s/open/auth/outApp/html/outLogin.html?appId=4834a619bebc4912a63ee4145deeed4a&redirectUri=' + (phonetype === 1 ? REDIRECTURI : encodeURI(REDIRECTURI)) + '&responseType=code&scope=upapi_base';
                    }
                }
                // 广发银行、话费、流量
                else if (shopInfo.codeKey.toLowerCase() === (configs.CGBank ? configs.CGBank.toLowerCase() : '') || shopInfo.codeKey.toLowerCase() === (configs.PhoneCGBank ? configs.PhoneCGBank.toLowerCase() : '') || shopInfo.codeKey.toLowerCase() === (configs.FlowCGBank ? configs.FlowCGBank.toLowerCase() : '')) {
                    var cgBankInfo = localStorage.getItem('cgBankInfo') ? JSON.parse(localStorage.getItem('cgBankInfo')) : '';
                    //alert(localStorage.getItem('cgBankInfo') + 'cgBankInfomall');
                    var codeKey = shopInfo.codeKey.toLowerCase();
                    // 如果已经拿到shoppingID则去换用户信息
                    if (cgBankInfo.shoppingID) {
                      var _type = '';
                      // 广发银行
                      if (codeKey === configs.CGBank.toLowerCase()) {
                        _type = 'loginPageSetting/decryptInfo';
                      }
                      // 话费
                      else if (codeKey === configs.CGBank.PhoneCGBank()) {
                          _type = 'loginPageSetting/phoneDecrypt';
                        }
                        // 流量
                        else if (codeKey === configs.CGBank.FlowCGBank()) {
                            _type = 'loginPageSetting/flowDecrypt';
                          }
                      that.props.dispatch({
                        type: _type, payload: cgBankInfo
                      }).then(function (res) {
                        var code = res.code,
                            data = res.data;

                        if (code === '1000') {
                          if (data.loginflag == 'no') {
                            sessionStorage.setItem('userInfo', '');
                            //判断链接中是否有?连接参数,如果没有用?则用?链接
                            var windowurl = _mathManage2.default.getwindowurl();
                            if (windowurl.split('?').length > 1) {
                              window.location.href = windowurl + '&siteURL=' + encodeURIComponent(windowurl) + '&actionflag=login';
                            } else {
                              window.location.href = windowurl + '?codeid=' + shopInfo.codeKey + '&siteURL=' + encodeURIComponent(windowurl + '?codeid=' + shopInfo.codeKey) + '&actionflag=login';
                            }
                          } else if (data.loginflag == 'yes') {
                            //从广发的订单进来
                            //可能是fuluId也可能是userid
                            data.fuluId = data.fuluId || data.userid;
                            fuluusertoken(that, data);
                          }
                        } else {
                          _toast2.default.fail(message);
                        }
                      });
                    } else {
                      //直接去登录
                      var windowurl = _mathManage2.default.getwindowurl();
                      if (windowurl.split('?').length > 1) {
                        window.location.href = windowurl + '&siteURL=' + encodeURIComponent(windowurl) + '&actionflag=login';
                      } else {
                        window.location.href = windowurl + '?codeid=' + shopInfo.codeKey + '&siteURL=' + encodeURIComponent(windowurl + '?codeid=' + shopInfo.codeKey) + '&actionflag=login';
                      }
                    }
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
    }
  } else {
    return true;
  }
}
exports.authorizationFailure = authorizationFailure;
exports.isLoginOrAuth = isLoginOrAuth;
exports.authorizationFailurePageSetting = authorizationFailurePageSetting;
exports.isLoginOrAuthPageSetting = isLoginOrAuthPageSetting;