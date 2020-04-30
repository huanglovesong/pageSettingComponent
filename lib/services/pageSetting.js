'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPage = getPage;
exports.getHomePage = getHomePage;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPage(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getPage, { params: params });
}
function getHomePage(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getHomePage, { params: params });
}