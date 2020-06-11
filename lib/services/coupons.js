'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardActivityOvered = CardActivityOvered;
exports.ObtainCard = ObtainCard;
exports.GetProInfoDetailCouponList = GetProInfoDetailCouponList;
exports.GetUserCouponList = GetUserCouponList;
exports.GetOrderDetailsCouponList = GetOrderDetailsCouponList;
exports.GetCouponProductList = GetCouponProductList;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CardActivityOvered(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.CardActivityOvered, { params: params });
}
function ObtainCard(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.ObtainCard, params);
}
function GetProInfoDetailCouponList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.GetProInfoDetailCouponList, { params: params });
}
function GetUserCouponList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.GetUserCouponList, { params: params });
}
function GetOrderDetailsCouponList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.GetOrderDetailsCouponList, { params: params });
}

function GetCouponProductList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.GetCouponProductList, { params: params });
}