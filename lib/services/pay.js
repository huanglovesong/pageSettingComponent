'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.recommendProduct = recommendProduct;
exports.getHotCategory = getHotCategory;

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function recommendProduct(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.recommendProduct, { params: params });
}
function getHotCategory(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getHotCategory, { params: params });
}