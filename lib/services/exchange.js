'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.orderlist = orderlist;
exports.getuserinfo = getuserinfo;
exports.GetProductList = GetProductList;
exports.GetProductTemp = GetProductTemp;
exports.GetOrderDetail = GetOrderDetail;
exports.sendCtripOrder = sendCtripOrder;
exports.GetBanner = GetBanner;
exports.getcard = getcard;
exports.sendCtripCardOrder = sendCtripCardOrder;

var _axiosPageSetting = require('../utils/axiosPageSetting');

var _axiosPageSetting2 = _interopRequireDefault(_axiosPageSetting);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function orderlist(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.orderlist, { 'params': params });
}

function getuserinfo(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.getuserinfo, { 'params': params });
}

function GetProductList(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.GetProductList, { 'params': params });
}

function GetProductTemp(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.GetProductTemp, { 'params': params });
}

function GetOrderDetail(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.GetOrderDetail, { 'params': params });
}

function sendCtripOrder(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.sendCtripOrder, params);
}

function GetBanner(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.GetBanner, { 'params': params });
}

function getcard(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.getcard, params);
}

function sendCtripCardOrder(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.sendCtripCardOrder, params);
}