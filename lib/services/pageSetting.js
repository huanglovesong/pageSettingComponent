'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPage = getPage;
exports.getHomePage = getHomePage;

var _axiosPageSetting = require('../utils/axiosPageSetting');

var _axiosPageSetting2 = _interopRequireDefault(_axiosPageSetting);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPage(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.getPage, { params: params });
}
function getHomePage(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.getHomePage, { params: params });
}