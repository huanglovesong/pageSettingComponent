import axios from "axios";
import { Toast } from "antd-mobile";
import { findIndex } from "lodash";
import { debug } from "util";
import mathManage from "./mathManage";

// axios.defaults.baseURL = '';  API 域。默认值：当前域
axios.defaults.withCredentials = true; // 允许跨域且携带 Cookie（或自定义头）。默认值：false
axios.defaults.timeout = 30000; // 设置请求超时时间（ms）不超过半分钟
axios.defaults.headers.post["Content-Type"] = "application/json"; // 设置请求提内容类型，其他可选值：application/x-www-form-urlencoded

let fromPlatform = mathManage.getDeviceType();

function getUrl(config) {
  config.headers.fromPlatform = mathManage.getDeviceType();
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : {};
  const shopInfo = localStorage.getItem("shopInfo")
    ? JSON.parse(localStorage.getItem("shopInfo"))
    : {};
  const commonApiUrl = [];
  const openApiUrl = [
    "/api/Advertisement/GetBanner",
    "/api/Category/GetCategory",
    "/api/Category/GetChildCategory",
    "/api/Product/GetProductList",
    "/api/Product/GetProductTemp",
    "/api/Other/Verificationcode",
    "/api/Other/Touristlogincode",
    "/api/Product/GetProductTemp",
    "/api/Product/GetProductActivity",
    "/api/Order/SendOrder",
    "/api/Order/SendCardOrder",
    "/api/Order/GetOrderList",
    "/api/Order/GetOrderDetail",
    "/api/Order/ExtractCard",
    "/api/Product/GetPassCode",
    "/api/Product/GetPassCodeStatus",
    "/api/Category/RecommendCategory",
    "/api/Product/GetProductInfo",
    "/api/Category/GetHotCategory",
    "/api/Mi/GetLuckDrawOrder",
    "/api/Mi/PrizeNum",
    "/api/Mi/PostLuckDrawOrder",
    "/api/Mi/GetPrizeList",
    "/api/Mi/MerDrawnList",
    "/api/Mi/DrawnList",
    "/api/Mi/GetEventList",
    "/api/Mi/PostDraw",
    "/api/Mi/DrawnList",
    "/api/Mi/PostDrawnWinning",
    "/api/Mi/QueryDrawnWinning",
    "/api/Mi/AddDrawCout",
    "/api/Category/GetHotCategory",
    "/api/Page/GetPage",
    "/api/MerCouponActivity/CardActivityOvered",
    "/api/MerCouponActivity/ObtainCard",
    "/api/MerCouponActivity/GetProInfoDetailCouponList",
    "/api/MerCouponActivity/GetUserCouponList",
    "/api/MerCouponActivity/GetOrderDetailsCouponList",
    "/api/MerCouponActivity/GetCouponProductList",
    "/api/authorize/fuluusertoken",
    "/api/Other/Verificationcode",
  ];
  // 获取数组是否在url里有
  const openUrl = findIndex(openApiUrl, function (item) {
    return config["url"].indexOf(item) !== -1;
  });
  if (openUrl !== -1) {
    console.log(userInfo, "userInfo");
    if (userInfo.fuluId && userInfo.fuluToken) {
      config.headers.fuluId = userInfo.fuluId;
      config.headers.fuluToken = userInfo.fuluToken;
    }
    if (shopInfo.merInfoTemplates.visitType !== 3) {
      config.headers.codeKey = shopInfo.codeKey;
      config.headers.merchantId = shopInfo.id;
    }
  }
  const commonUrl = findIndex(commonApiUrl, function (item) {
    return config["url"].indexOf(item) !== -1;
  });
  if (commonUrl !== -1) {
    if (userInfo.fuluId && userInfo.fuluToken) {
      config.headers.token = userInfo.fuluId;
      config.headers.account = userInfo.fuluToken;
    }
    if (shopInfo.merInfoTemplates.visitType !== 3) {
      config.headers.codeKey = shopInfo.codeKey;
    }
  }
  return config;
}

axios.interceptors.request.use(
  (config) => {
    let { params, method } = config;
    const shopInfo = localStorage.getItem("shopInfo")
      ? JSON.parse(localStorage.getItem("shopInfo"))
      : {};
    if (params) {
      if (method === "get") {
        params.timeStr = new Date().getTime();
      }
      if (shopInfo.merInfoId) {
        params.merInfoId = shopInfo.merInfoId;
      }
    }
    return getUrl(config);
  },
  (error) => {
    // console.log('【request error】', error);
    return Promise.reject(error);
  }
);

function isLoginOrAuth() {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : "";
  const shopInfo = localStorage.getItem("shopInfo")
    ? JSON.parse(localStorage.getItem("shopInfo"))
    : "";
  // 游客模式、联登模式 并且没有登陆
  if (
    !(userInfo && userInfo.fuluToken) &&
    shopInfo.merInfoTemplates.visitType != 3
  ) {
    let payType = mathManage.isAlipayOrWechat();
    var backUrl = window.location.pathname + window.location.search;
    if (payType === 0 || payType === 1) {
      // 微信/支付宝授权
      window.location.href =
        configs.commonUrl +
        "?codeKey=" +
        shopInfo.codeKey +
        "&backUrl=" +
        encodeURIComponent(backUrl);
      return false;
    } else {
      // 浏览器环境 游客模式
      if (shopInfo.merInfoTemplates.visitType === 2) {
        //window.location.href = `/login?uri=${encodeURI(window.location.href)}`
        return false;
      } else {
        // 第三方登录
        // let userid = localStorage.getItem("userid");
        // let accesstoken = localStorage.getItem("accesstoken");
        // let uur = `${configs.commonUrl}?codeKey=${
        //   shopInfo.codeKey
        // }&backUrl=${encodeURIComponent(backUrl)}`;
        // if (userid) {
        //   uur = uur + `&userid=${userid}`;
        // }
        // if (accesstoken) {
        //   uur = uur + `&accesstoken=${accesstoken}`;
        // }
        // window.location.href = uur;
        return false;
      }
    }
  } else {
    return true;
  }
}

axios.interceptors.response.use(
  (response) => {
    // console.log('【response】', response);
    // 2xx 进入
    const shopInfo = localStorage.getItem("shopInfo")
      ? JSON.parse(localStorage.getItem("shopInfo"))
      : "";

    if (response.data && response.data.code === "-2") {
      window.location.href = "/nothing";
    } else if (
      response.data.code === "-3" ||
      response.data.code === "1013" ||
      response.data.code === "1014" ||
      response.data.code === "1015"
    ) {
      //详情页、订单页接口单独做处理 弹窗需要添加
      const detailApiUrl = [
        "/api/Order/SendOrder",
        "/api/Order/SendCardOrder",
        "/api/Product/GetPassCode",
        "/api/Product/GetPassCodeStatus",
        "/api/Order/GetOrderList",
        "/api/Order/GetOrderDetail",
      ];
      let detailFlag = detailApiUrl.some((item) => {
        return response.config.url.indexOf(item) !== -1;
      });
      // 如果不是详情页
      if (!detailFlag) {
        let userInfo = localStorage.getItem("userInfo")
          ? JSON.parse(localStorage.getItem("userInfo"))
          : {};
        userInfo.fuluToken = "";
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    }
    return response.data;
  },
  (error) => {
    // console.log('【response error】', error);

    ///////////////////////
    // 异常-全局处理
    ///////////////////////

    // console.log('【error.response', error.response);
    // console.log('【error.request', error.request);
    // console.log('【error.message', error.message);
    // console.log('【error.config', error.config);

    if (error.response) {
      // 请求被执行，服务器以状态码进行响应

      switch (error.response.status) {
        case 400:
          // 400（Bad Request）：请求参数格式错误；提示错误消息
          return Toast.fail(
            "请求参数（data）格式错误（" +
              error.config.method +
              error.config.url +
              "）"
          );
          break;
        case 401:
        case 504:
          // 401（Unauthorized）：未身份验证或身份失效；跳转到登录页
          // 504（Gateway Timeout）：响应超时，跳转到登录页
          // TODO：在此处移除本地登录信息
          return; //window.location.href = '/account/signin';
          break;
        case 403:
          // 403（Forbidden）：已授权或不需要授权，但禁止访问；跳转到 403 页
          return (window.location.href = "/403");
          break;
        case 404:
          // 404（Not Found）：请求 URL 格式错误；提示错误消息
          return Toast.fail("请求 URL 格式错误（" + error.config.url + "）");
          break;
        case 405:
          // 405（Method Not Allowed）：请求 Method 格式错误；提示错误消息
          return Toast.fail("请求 Method 格式错误（" + error.config.url + "）");
          break;
        case 406:
          // 406（Not Acceptable）：请求 Content-Type 格式错误
          return Toast.fail(
            "请求 Content-Type 格式错误（" + error.config.url + "）"
          );
          break;
        case 408:
          // 408（Request Timeout）：请求超时
          return Toast.info("请求超时（" + error.config.url + "）");
          break;
      }

      let err = /^5\d{2}$/g;
      if (err.test(error.response.status)) {
        // 5xx：接口内部错误；跳转到 500 页
        return Toast.fail(error.response.data.message);
      }
    } else if (error.request) {
      // 请求被提出，但是没有收到任何回应
    } else {
      // 在设置请求时触发错误，发生了一些问题

      // 1）请求超过指定的时间：终止请求
      if (
        error.message ===
        "timeout of " + error.config.timeout + "ms exceeded"
      ) {
        return Toast.info("请求超时，请刷新页面重新请求！");
      }
      // 2 ）网络错误
      if (error.message === "Network Error") {
        return (window.location.href = "/error");
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
