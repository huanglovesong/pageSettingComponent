'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decryptInfo = decryptInfo;
exports.phoneDecrypt = phoneDecrypt;
exports.flowDecrypt = flowDecrypt;
exports.getCode = getCode;
exports.touristlogin = touristlogin;
exports.fuluusertoken = fuluusertoken;
exports.getUnionOpenId = getUnionOpenId;
exports.pinanLogin = pinanLogin;
exports.ablogin = ablogin;
exports.panlogin = panlogin;

var _axiosPageSetting = require('../utils/axiosPageSetting');

var _axiosPageSetting2 = _interopRequireDefault(_axiosPageSetting);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function decryptInfo(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.decryptInfo, { params: params });
}
function phoneDecrypt(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.phoneDecrypt, { params: params });
}

function flowDecrypt(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.flowDecrypt, { params: params });
}

function getCode(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.getCode, params);
}
function touristlogin(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.touristlogin, params);
}

function fuluusertoken(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.fuluusertoken, params);
}

function getUnionOpenId(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.getUnionOpenId, params);
}

function pinanLogin(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.pinanLogin, { params: params });
}
function ablogin(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.ablogin, { params: params });
}

function panlogin(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.panlogin, { params: params });
}