'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPage = getPage;
exports.getHomePage = getHomePage;
exports.CardActivityOvered = CardActivityOvered;
exports.ObtainCard = ObtainCard;
exports.getPrizeNum = getPrizeNum;
exports.addPrizeNum = addPrizeNum;
exports.handlePrize = handlePrize;

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
function CardActivityOvered(params) {
    return _axiosPageSetting2.default.get(configs.openAPI + _api2.default.CardActivityOvered, { params: params });
}
function ObtainCard(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.ObtainCard, params);
}

function getPrizeNum(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.getPrizeNum, params);
}

function addPrizeNum(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.addPrizeNum, params);
}
function handlePrize(params) {
    return _axiosPageSetting2.default.post(configs.openAPI + _api2.default.handlePrize, params);
}