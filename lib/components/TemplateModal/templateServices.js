'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetTemplate = GetTemplate;

var _axios = require('../../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GetTemplate(params) {
  return _axios2.default.get(_api2.default.GetProductTemplate, { params: params });
}