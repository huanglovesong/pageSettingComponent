'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

require('antd-mobile/lib/toast/style');

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _lodash = require('lodash');

var _mathManage = require('./mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// axios.defaults.baseURL = '';  API 域。默认值：当前域
_axios2.default.defaults.withCredentials = true; // 允许跨域且携带 Cookie（或自定义头）。默认值：false
_axios2.default.defaults.timeout = 30000; // 设置请求超时时间（ms）不超过半分钟
_axios2.default.defaults.headers.post['Content-Type'] = 'application/json'; // 设置请求提内容类型，其他可选值：application/x-www-form-urlencoded

var fromPlatform = _mathManage2.default.getDeviceType();

function getUrl(config) {
  config.headers.fromPlatform = _mathManage2.default.getDeviceType();

  var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
  // 获取localStorage和sessionStorage，因为有的项目用的localStorage，有的项目用的sessionStorage
  var userInfoStr = localStorage.getItem('userInfo');
  var codeKey = shopInfo.codeKey ? shopInfo.codeKey.toLowerCase() : '';
  // 云闪付、平安app、农行使用的sessionStorage
  if (codeKey === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '') || codeKey === (configs.pingAn ? configs.pingAn.toLowerCase() : '') || codeKey === (configs.CloudPan ? configs.CloudPan.toLowerCase() : '') || codeKey === (configs.aqiy ? configs.aqiy.toLowerCase() : '')) {
    userInfoStr = sessionStorage.getItem('userInfo');
  }
  var userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
  var openApiUrl = ['/api/Page/GetPage', '/api/MerCouponActivity/CardActivityOvered', '/api/MerCouponActivity/ObtainCard'];
  // 获取数组是否在url里有
  var openUrl = (0, _lodash.findIndex)(openApiUrl, function (item) {
    return config["url"].indexOf(item) !== -1;
  });
  if (openUrl !== -1) {
    console.log(userInfo, 'userInfo');
    if (userInfo.fuluId && userInfo.fuluToken) {
      config.headers.fuluId = userInfo.fuluId;
      config.headers.fuluToken = userInfo.fuluToken;
    }
    // if (shopInfo.merInfoTemplates.visitType !== 3) {
    config.headers.codeKey = shopInfo.codeKey;
    config.headers.merchantId = shopInfo.id;
    // }
  }
  // 兑换页专属逻辑
  var exchangeAuthArr = ['/api/Ctrip/GetProductList', '/api/Ctrip/SendCardOrder', '/api/Ctrip/SendOrder'];
  var exchangeAuthIndex = (0, _lodash.findIndex)(exchangeAuthArr, function (item) {
    return config["url"].indexOf(item) !== -1;
  });
  if (exchangeAuthIndex !== -1) {
    config.headers["codeKey"] = shopInfo.codeKey;
    config.headers["merchantId"] = shopInfo.id;
    config.headers["fuluToken"] = localStorage.getItem("fuluToken") || '';
    config.headers["fuluId"] = shopInfo.merInfoTemplates.visitType === 3 ? '10.10.10.28' : localStorage.getItem("fuluId");
  }
  return config;
}

_axios2.default.interceptors.request.use(function (config) {
  var params = config.params,
      method = config.method;

  var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
  if (params) {
    if (method === 'get') {
      params.timeStr = new Date().getTime();
    }
    if (shopInfo.merInfoId) {
      params.merInfoId = shopInfo.merInfoId;
    }
  }
  return getUrl(config);
}, function (error) {
  // console.log('【request error】', error);
  return _promise2.default.reject(error);
});

_axios2.default.interceptors.response.use(function (response) {
  return response;
}, function (error) {
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
        return _toast2.default.fail('请求参数（data）格式错误（' + error.config.method + error.config.url + '）');
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
        return window.location.href = '/403';
        break;
      case 404:
        // 404（Not Found）：请求 URL 格式错误；提示错误消息
        return _toast2.default.fail('请求 URL 格式错误（' + error.config.url + '）');
        break;
      case 405:
        // 405（Method Not Allowed）：请求 Method 格式错误；提示错误消息
        return _toast2.default.fail('请求 Method 格式错误（' + error.config.url + '）');
        break;
      case 406:
        // 406（Not Acceptable）：请求 Content-Type 格式错误
        return _toast2.default.fail('请求 Content-Type 格式错误（' + error.config.url + '）');
        break;
      case 408:
        // 408（Request Timeout）：请求超时
        return _toast2.default.info('请求超时（' + error.config.url + '）');
        break;
    }

    var err = /^5\d{2}$/g;
    if (err.test(error.response.status)) {
      // 5xx：接口内部错误；跳转到 500 页
      return _toast2.default.fail(error.response.data.message);
    }
  } else if (error.request) {
    // 请求被提出，但是没有收到任何回应
  } else {
    // 在设置请求时触发错误，发生了一些问题

    // 1）请求超过指定的时间：终止请求
    if (error.message === 'timeout of ' + error.config.timeout + 'ms exceeded') {
      return _toast2.default.info('请求超时，请刷新页面重新请求！');
    }
    // 2 ）网络错误
    if (error.message === 'Network Error') {
      return window.location.href = '/error';
    }
  }
  return _promise2.default.reject(error);
});

exports.default = _axios2.default;