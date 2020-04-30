'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPrizeNum = getPrizeNum;
exports.prizeSendOrder = prizeSendOrder;
exports.isPrizeRight = isPrizeRight;
exports.saveUserData = saveUserData;
exports.prizeResult = prizeResult;
exports.handlePrize = handlePrize;
exports.activeOpen = activeOpen;
exports.prizeProList = prizeProList;
exports.payInfo = payInfo;
exports.userPrizeList = userPrizeList;
exports.saveAddress = saveAddress;
exports.getAddress = getAddress;
exports.addPrizeNum = addPrizeNum;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPrizeNum(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.getPrizeNum, params);
}
function prizeSendOrder(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.prizeSendOrder, { params: params });
}
function isPrizeRight(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.isPrizeRight, params);
}
function saveUserData(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.saveUserData, params);
}
function prizeResult(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.prizeResult, { params: params });
}
function handlePrize(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.handlePrize, params);
}
function activeOpen(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.activeOpen, { params: params });
}
function prizeProList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.prizeProList, { params: params });
}
function payInfo(params) {
    return _axios2.default.post(configs.payment + _api2.default.payInfo, params);
}
function userPrizeList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.userPrizeList, { params: params });
}
function saveAddress(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.saveAddress, params);
}
function getAddress(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getAddress, { params: params });
}
function addPrizeNum(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.addPrizeNum, params);
}