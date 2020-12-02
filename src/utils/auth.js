
import mathManage from './mathManage';
import { Toast } from "antd-mobile";

// 授权失效
function authorizationFailure(that) {
  const { userInfo } = that.state;
  userInfo.fuluToken = '';
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  localStorage.setItem("fuluToken", '');
  that.setState({
    userInfo
  }, () => {
    isLoginOrAuth(that);
  })
}
// 详情页针对授权失效单独处理
function isLoginOrAuth(that) {
  let userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
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
  isLoginOrAuthPageSetting(that);
}

function fuluusertoken(that, userInfo) {
  that.props.dispatch({
    type: 'loginPageSetting/fuluusertoken',
    payload: {
      code: userInfo.fuluId,
      env: 3, // 支付类型 1支付宝 2微信 3自有系统用户
      type: true,  // 是否userid
    }
  })
}

var loginType = {
  // 农行
  agriculturalBank() {

  },
  // 云闪付
  unionPay() {

  }
};

// 详情页针对授权失效单独处理,authKey用于标识唯一组件
function isLoginOrAuthPageSetting(that) {
  // 获取localStorage和sessionStorage，因为有的项目用的localStorage，有的项目用的sessionStorage
  let userInfoStr = localStorage.getItem('userInfo');
  const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
  // 云闪付、平安app、农行使用的sessionStorage
  if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '') ||
    shopInfo.codeKey.toLowerCase() === (configs.pingAn ? configs.pingAn.toLowerCase() : '') ||
    shopInfo.codeKey.toLowerCase() === (configs.CloudPan ? configs.CloudPan.toLowerCase() : '') ||
    shopInfo.codeKey.toLowerCase() === (configs.aqiy ? configs.aqiy.toLowerCase() : '')) {
    userInfoStr = sessionStorage.getItem('userInfo');
  }
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {}
  userInfo.fuluToken = '';
  localStorage.setItem("fuluToken", '');
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
        // 用户已经登录但是授权失效
        if (userInfo.fuluId && !userInfo.fuluToken) {
          fuluusertoken(that, userInfo);
        }
        // 用户没有登录，则要进行弹框
        else {
          that.setState({
            showMallLoginModal: true,
          })
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
            }).then((resOpenId) => {
              const { code, data, message } = resOpenId;
              if (code === '1000') {
                sessionStorage.setItem('userInfo', JSON.stringify(data));
                sessionStorage.setItem('UnionPayCode', '');
                //window.history.back();
                that.props.dispatch({
                  type: 'loginPageSetting/getUnionConfig', payload: {
                    debug: false,
                    url: window.location.href
                  }
                }).then((res) => {
                  const { code, data, message } = res;
                  if (code === '1000') {
                    // 成功调用成功操作
                    that.loginSuccess(resOpenId.data);
                    //初始化支付config
                    upsdk.config({
                      appId: data.appId,
                      nonceStr: data.nonceStr,
                      signature: data.signature,
                      timestamp: data.timestamp,//必填，生成签名的摘要，参见附录一、附录二
                      debug: false   //开发阶段可打开此标记，云闪付APP会将调试信息toast出来
                    });
                    upsdk.ready(function () {
                      //设置标题
                      upsdk.setNavigationBarTitle({
                        title: shopInfo.merInfoTemplates.infoTitle
                      });
                    });
                    upsdk.error(function (err) {
                      //config信息验证失败会执行error方法
                      Toast.fail(err)
                    });
                  } else {
                    Toast.fail(message);
                  }
                })
              } else {
                Toast.fail(message);
              }
            })
          }
          // 否则进行联登
          else {
            //联登方法
            var REDIRECTURI = `${window.location.href.split('?')[0]}?codeid*${shopInfo.codeKey}|${window.location.href.split('?')[1] && window.location.href.split('?')[1].replace(/\&/g, '|').replace(/\=/g, '*')}`;
            const phonetype = mathManage.getPhoneType();
            window.location.href = `https://open.95516.com/s/open/html/oauth.html?appId=${configs.UnionPayAppId}&redirectUri=${phonetype === '1' ? REDIRECTURI : encodeURI(REDIRECTURI)}&responseType=code&scope=upapi_base`
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
          const { isSelfAuth } = that.props;
          if (!isSelfAuth) {
            var state = mathManage.randomString(32);
            //进行第三方授权
            pabank.login({
              bizContent: {
                state: state
              }, success: function (res) {
                //alert(JSON.stringify(res))
                that.props.dispatch({
                  type: 'loginPageSetting/pinanLogin',
                  payload: {
                    authCode: res.authCode,
                    state: state
                  }
                }).then((res) => {
                  const { code, data, message } = res;
                  if (code === '1000') {
                    // 使用登录成功后续动作
                    that.loginSuccess(data);
                  } else {
                    Toast.fail(message);
                  }
                })
              }
            })
          }
        }
        //农业银行
        else if (configs.CloudPan && shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() ||
          configs.aqiy && codeid.toLowerCase() === configs.aqiy.toLowerCase()) {
          // 是否是自己授权
          const { isSelfAuth } = that.props;
          // 如果当前页面不是自己授权，则走我的授权逻辑
          if (!isSelfAuth) {
            let panCode = GetQueryString('code');
            // 如果有code值，说明是农业银行登录链接跳转过来返回的code，直接去换fuluId和fuluToken
            if (panCode) {
              // 区分爱奇艺和网盘调用对应的授权接口
              let type = shopInfo.codeKey.toLowerCase() === configs.aqiy.toLowerCase() ? 'loginPageSetting/ablogin' : 'loginPageSetting/panlogin';
              that.props.dispatch({
                type: type, payload: {
                  Aabccode: panCode,
                  redirectUri: shopInfo.merInfoTemplates.urlAddress
                }
              }).then((res) => {
                const { code, data } = res;
                if (code === '1000') {
                  // 使用登录成功后续动作
                  that.loginSuccess(data);
                } else {
                  Toast.fail(message);
                }
              })
            }
            // 如果没有则去跳转农行登录授权
            else {
              let redirect_uri = shopInfo.merInfoTemplates.urlAddress;
              let client_id = shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() ? '9a87cdd8-a376-4110-b2a5-be69b46bb6db' : 'c21e204f-a3b8-4615-944d-00065d0dc2b1';
              let state = mathManage.randomString(6);
              let urlStr = `https://www.abchina.com/luascript/oauthLogin/{\"client_id\":\"${client_id}\",\"redirect_uri\":\"${redirect_uri}\",\"state\":\"${state}\",\"scope\":\"openid\",\"response_type\":\"code\"}`;
              window.top.location.href = urlStr;
            }
          }
        }

        // 广发银行、话费、流量
        else if (shopInfo.codeKey.toLowerCase() === (configs.CGBank ? configs.CGBank.toLowerCase() : '')
          || shopInfo.codeKey.toLowerCase() === (configs.PhoneCGBank ? configs.PhoneCGBank.toLowerCase() : '')
          || shopInfo.codeKey.toLowerCase() === (configs.FlowCGBank ? configs.FlowCGBank.toLowerCase() : '')) {
          let cgBankInfo = localStorage.getItem('cgBankInfo') ? JSON.parse(localStorage.getItem('cgBankInfo')) : '';

          //alert(localStorage.getItem('cgBankInfo') + 'cgBankInfomall');
          let codeKey = shopInfo.codeKey.toLowerCase();
          // 如果已经拿到shoppingID则去换用户信息
          if (cgBankInfo.shoppingID) {
            let type = '';
            // 广发银行
            if (codeKey === configs.CGBank.toLowerCase()) {
              type = 'loginPageSetting/decryptInfo'
            }
            // 话费
            else if (codeKey === configs.CGBank.PhoneCGBank()) {
              type = 'loginPageSetting/phoneDecrypt'
            }
            // 流量
            else if (codeKey === configs.CGBank.FlowCGBank()) {
              type = 'loginPageSetting/flowDecrypt'
            }
            that.props.dispatch({
              type, payload: cgBankInfo
            }).then((res) => {
              const { code, data } = res;
              if (code === '1000') {
                if (data.loginflag == 'no') {
                  sessionStorage.setItem('userInfo', '');
                  //判断链接中是否有?连接参数,如果没有用?则用?链接
                  let windowurl = mathManage.getwindowurl();
                  if (windowurl.split('?').length > 1) {
                    window.location.href = `${windowurl}&siteURL=${encodeURIComponent(windowurl)}&actionflag=login`
                  } else {
                    window.location.href = `${windowurl}?codeid=${shopInfo.codeKey}&siteURL=${encodeURIComponent(windowurl + '?codeid=' + shopInfo.codeKey)}&actionflag=login`
                  }
                } else if (data.loginflag == 'yes') {
                  //从广发的订单进来
                  //可能是fuluId也可能是userid
                  data.fuluId = data.fuluId || data.userid;
                  fuluusertoken(that, data);
                }
              } else {
                Toast.fail(message);
              }
            })
          } else {
            //直接去登录
            let windowurl = mathManage.getwindowurl();
            if (windowurl.split('?').length > 1) {
              window.location.href = `${windowurl}&siteURL=${encodeURIComponent(windowurl)}&actionflag=login`
            } else {
              window.location.href = `${windowurl}?codeid=${shopInfo.codeKey}&siteURL=${encodeURIComponent(windowurl + '?codeid=' + shopInfo.codeKey)}&actionflag=login`
            }
          }
        }
        else {
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
    }
  } else {
    return true;
  }
}
export { authorizationFailure, isLoginOrAuth, authorizationFailurePageSetting, isLoginOrAuthPageSetting, };