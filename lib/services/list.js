'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFirstMenu = getFirstMenu;
exports.getsecondMenu = getsecondMenu;
exports.getHotPro = getHotPro;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFirstMenu(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getFirstMenu, { params: params ? params : {} });
}
function getsecondMenu(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getsecondMenu, { params: params ? params : {} });
}

function getHotPro(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getHotPro, { params: params ? params : {} });
}