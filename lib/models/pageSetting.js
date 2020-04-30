'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _pageSetting = require('../services/pageSetting');

var pageSettingService = _interopRequireWildcard(_pageSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    namespace: 'pageSetting',
    state: {},
    effects: {
        getPage: /*#__PURE__*/_regenerator2.default.mark(function getPage(_ref, _ref2) {
            var payload = _ref.payload,
                callback = _ref.callback;
            var call = _ref2.call,
                put = _ref2.put;
            var testRes;
            return _regenerator2.default.wrap(function getPage$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(pageSettingService.getPage, payload);

                        case 2:
                            testRes = _context.sent;
                            _context.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getPageResult: testRes
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
            }, getPage, this);
        })
    },
    reducers: {
        success: function success(state, _ref3) {
            var payload = _ref3.payload;

            return (0, _extends3.default)({}, state, payload);
        }
    }
};