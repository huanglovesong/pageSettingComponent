'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPagePreview = exports.getPage = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _axios = require('../utils/axios');

var _axios2 = _interopRequireDefault(_axios);

var _api = require('../configs/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getPage(params) {
    console.log(_api2.default, 333333);
    console.log(_axios2.default, 444444);
    return _axios2.default.get(configs.openAPI + _api2.default.getPage, { params: params });
}
exports.getPage = _getPage;
function _getPagePreview(params) {
    return _axios2.default.get(configs.openAPI + _api2.default.getPagePreview, { params: params });
}

exports.getPagePreview = _getPagePreview;
exports.default = {
    namespace: 'test',
    state: {},
    effects: {
        getPagePreview: /*#__PURE__*/_regenerator2.default.mark(function getPagePreview(_ref, _ref2) {
            var payload = _ref.payload,
                callback = _ref.callback;
            var call = _ref2.call,
                put = _ref2.put;
            var testRes;
            return _regenerator2.default.wrap(function getPagePreview$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(_getPagePreview, payload);

                        case 2:
                            testRes = _context.sent;
                            _context.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getPagePreviewResult: testRes
                                }
                            });

                        case 5:
                            callback && callback(testRes);
                            return _context.abrupt('return', testRes);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, getPagePreview, this);
        }),
        getPage: /*#__PURE__*/_regenerator2.default.mark(function getPage(_ref3, _ref4) {
            var payload = _ref3.payload,
                callback = _ref3.callback;
            var call = _ref4.call,
                put = _ref4.put;
            var testRes;
            return _regenerator2.default.wrap(function getPage$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return call(_getPage, payload);

                        case 2:
                            testRes = _context2.sent;
                            _context2.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getPageResult: testRes
                                }
                            });

                        case 5:
                            callback && callback(testRes);
                            return _context2.abrupt('return', testRes);

                        case 7:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, getPage, this);
        })
    },
    reducers: {
        success: function success(state, _ref5) {
            var payload = _ref5.payload;

            return (0, _extends3.default)({}, state, payload);
        }
    }
};