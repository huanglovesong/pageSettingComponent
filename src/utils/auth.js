
import mathManage from './mathManage';
import { Toast } from "antd-mobile";

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
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
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
  let userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : {}
  const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
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
        // 用户已经登录但是授权失效统一走我们用户授权，否则走对应的第三方登录逻辑
        if (userInfo.fuluId && !userInfo.fuluToken) {
          fuluusertoken(that, userInfo);
        }
        // 平安银行
        else if (configs.pingAn && shopInfo.codeKey.toLowerCase() === configs.pingAn.toLowerCase()) {
          //alert('平安银行联登');
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
        //农业银行
        else if (configs.CloudPan && shopInfo.codeKey.toLowerCase() === configs.CloudPan.toLowerCase() ||
          configs.aqiy && codeid.toLowerCase() === configs.aqiy.toLowerCase()) {
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
            //alert('农业银行联登')
            let redirect_uri = shopInfo.merInfoTemplates.urlAddress;
            let client_id = 'c21e204f-a3b8-4615-944d-00065d0dc2b1';
            let state = mathManage.randomString(6);
            let urlStr = `https://www.abchina.com/luascript/oauthLogin/{\"client_id\":\"${client_id}\",\"redirect_uri\":\"${redirect_uri}\",\"state\":\"${state}\",\"scope\":\"openid\",\"response_type\":\"code\"}`;
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
            }).then((res) => {
              const { code, data } = res;
              if (code === '1000') {
                fuluusertoken(that, data);
              } else {
                Toast.fail(message);
              }
            })
          }
          // 否则进行联登
          else {
            //联登方法
            var REDIRECTURI = `${window.location.href.split('?')[0]}?codeid=${shopInfo.codeKey}|${window.location.href.split('?')[1].replace('&', '|')}`;
            const phonetype = mathManage.getPhoneType();
            window.location.href = `https://open.95516.com/s/open/auth/outApp/html/outLogin.html?appId=4834a619bebc4912a63ee4145deeed4a&redirectUri=${phonetype === 1 ? REDIRECTURI : encodeURI(REDIRECTURI)}&responseType=code&scope=upapi_base`
          }
        }
        // 广发银行、话费、流量
        else if (shopInfo.codeKey.toLowerCase() === (configs.CGBank ? configs.CGBank.toLowerCase() : '')
          || shopInfo.codeKey.toLowerCase() === (configs.PhoneCGBank ? configs.PhoneCGBank.toLowerCase() : '')
          || shopInfo.codeKey.toLowerCase() === (configs.FlowCGBank ? configs.FlowCGBank.toLowerCase() : '')) {
          let cgBankInfo = localStorage.getItem('cgBankInfo') ? JSON.parse(localStorage.getItem('cgBankInfo')) : ''
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