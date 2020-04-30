'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getGoodsList = getGoodsList;
exports.getGameProTemp = getGameProTemp;
exports.sendOrder = sendOrder;
exports.sendCardOrder = sendCardOrder;
exports.getProductById = getProductById;
exports.getSecretCard = getSecretCard;
exports.GetPassCodeStatus = GetPassCodeStatus;
exports.GetPassCode = GetPassCode;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getGoodsList(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getGoodsList, { params: params });
}
function getGameProTemp(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getGameProTemp, { params: params });
}
function sendOrder(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.sendOrder, params);
}
function sendCardOrder(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.sendCardOrder, params);
}
function getProductById(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getProductById, { params: params });
}
function getSecretCard(params) {
    return _axios2.default.post(configs.openAPI + _api2.default.getSecretCard, params);
}
function GetPassCodeStatus(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getPassCodeStatus, { params: params });
}
function GetPassCode(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getPassCode, { params: params });
}