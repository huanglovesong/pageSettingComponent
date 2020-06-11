'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCode = getCode;
exports.touristlogin = touristlogin;
exports.fuluusertoken = fuluusertoken;

var _axiosPageSetting = require('../utils/axiosPageSetting');

var _axiosPageSetting2 = _interopRequireDefault(_axiosPageSetting);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCode(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.getCode, params);
}
function touristlogin(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.touristlogin, params);
}

function fuluusertoken(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.fuluusertoken, params);
}