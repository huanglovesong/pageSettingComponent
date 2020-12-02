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
  sessionStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
  localStorage.setItem("fuluToken", '');
  that.setState({
    userInfo: userInfo
  }, function () {
    isLoginOrAuth(that);
  });
}
// 详情页针对授权失效单独处理
function isLoginOrAuth(that) {
  var userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  var userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
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
  var userInfoStr = localStorage.getItem('userInfo');
  var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
  // 云闪付、平安app、农行使用的sessionStorage
  if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '') || shopInfo.codeKey.toLowerCase() === (configs.pingAn ? configs.pingAn.toLowerCase() : '') || shopInfo.codeKey.toLowerCase() === (configs.CloudPan ? configs.CloudPan.toLowerCase() : '') || shopInfo.codeKey.toLowerCase() === (configs.aqiy ? configs.aqiy.toLowerCase() : '')) {
    userInfoStr = sessionStorage.getItem('userInfo');
  }
  var userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
  userInfo.fuluToken = '';
  localStorage.setItem("fuluToken", '');
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
          //('云闪付需要通过UnionPayCode获取用户信息所以代码提前')
          if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '')) {
            //是否存在UnionPayCode如果存在说明是登录跳转过来的
            if (sessionStorage.getItem('UnionPayCode') !== 'null' && sessionStorage.getItem('UnionPayCode')) {
              //alert(sessionStorage.getItem('UnionPayCode'))
              that.props.dispatch({
                type: 'loginPageSetting/getUnionOpenId', payload: {
                  par: sessionStorage.getItem('UnionPayCode').replace(/\+/g, "%2B")
                }
              }).then(function (resOpenId) {
                var code = resOpenId.code,
                    data = resOpenId.data,
                    message = resOpenId.message;

                if (code === '1000') {
                  sessionStorage.setItem('userInfo', (0, _stringify2.default)(data));
                  sessionStorage.setItem('UnionPayCode', '');
                  //window.history.back();
                  that.props.dispatch({
                    type: 'loginPageSetting/getUnionConfig', payload: {
                      debug: false,
                      url: window.location.href
                    }
                  }).then(function (res) {
                    var code = res.code,
                        data = res.data,
                        message = res.message;

                    if (code === '1000') {
                      // 成功调用成功操作
                      that.loginSuccess(resOpenId.data);
                      //初始化支付config
                      upsdk.config({
                        appId: data.appId,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        timestamp: data.timestamp, //必填，生成签名的摘要，参见附录一、附录二
                        debug: false //开发阶段可打开此标记，云闪付APP会将调试信息toast出来
                      });
                      upsdk.ready(function () {
                        //设置标题
                        upsdk.setNavigationBarTitle({
                          title: shopInfo.merInfoTemplates.infoTitle
                        });
                      });
                      upsdk.error(function (err) {
                        //config信息验证失败会执行error方法
                        _toast2.default.fail(err);
                      });
                    } else {
                      _toast2.default.fail(message);
                    }
                  });
                } else {
                  _toast2.default.fail(message);
                }
              });
            }
            // 否则进行联登
            else {
                //联登方法
                var REDIRECTURI = window.location.href.split('?')[0] + '?codeid*' + shopInfo.codeKey + '|' + (window.location.href.split('?')[1] && window.location.href.split('?')[1].replace(/\&/g, '|').replace(/\=/g, '*'));
                var phonetype = _mathManage2.default.getPhoneType();
                window.location.href = 'https://open.95516.com/s/open/html/oauth.html?appId=' + configs.UnionPayAppId + '&redirectUri=' + (phonetype === '1' ? REDIRECTURI : encodeURI(REDIRECTURI)) + '&responseType=code&scope=upapi_base';
              }
          }
          // 用户已经登录但是授权失效统一走我们用户授权，否则走对应的第三方登录逻辑
          else if (userInfo.fuluId && !userInfo.fuluToken) {
              fuluusertoken(that, userInfo);
            }
            // 平安银行
            else if (configs.pingAn && shopInfo.codeKey.toLowerCase() === configs.pingAn.toLowerCase()) {
                //alert('平安银行联登');
                // 如果当前页面不是自己授权，则走我的授权逻辑
                var isSelfAuth = that.props.isSelfAuth;

                if (!isSelfAuth) {
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
              }
              //农业银行
              else if (configs.CloudPan && shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() || configs.aqiy && codeid.toLowerCase() === configs.aqiy.toLowerCase()) {
                  // 是否是自己授权
                  var _isSelfAuth = that.props.isSelfAuth;
                  // 如果当前页面不是自己授权，则走我的授权逻辑

                  if (!_isSelfAuth) {
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
                        var redirect_uri = shopInfo.merInfoTemplates.urlAddress;
                        var client_id = shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() ? '9a87cdd8-a376-4110-b2a5-be69b46bb6db' : 'c21e204f-a3b8-4615-944d-00065d0dc2b1';
                        var _state = _mathManage2.default.randomString(6);
                        var urlStr = 'https://www.abchina.com/luascript/oauthLogin/{"client_id":"' + client_id + '","redirect_uri":"' + redirect_uri + '","state":"' + _state + '","scope":"openid","response_type":"code"}';
                        window.top.location.href = urlStr;
                      }
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