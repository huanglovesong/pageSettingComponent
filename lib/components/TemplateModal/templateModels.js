'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _templateServices = require('./templateServices');

var template = _interopRequireWildcard(_templateServices);

var _antd = require('antd');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    namespace: 'template',
    state: {},
    effects: {
        GetTemplate: /*#__PURE__*/_regenerator2.default.mark(function GetTemplate(_ref, _ref2) {
            var payload = _ref.payload;
            var call = _ref2.call,
                put = _ref2.put;
            var regRes;
            return _regenerator2.default.wrap(function GetTemplate$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(template.GetTemplate, payload);

                        case 2:
                            regRes = _context.sent;

                            if (!(regRes.code == '0')) {
                                _context.next = 8;
                                break;
                            }

                            _context.next = 6;
                            return put({
                                type: 'success',
                                GetTemplate: regRes
                            });

                        case 6:
                            _context.next = 10;
                            break;

                        case 8:
                            _antd.message.destroy();
                            _antd.message.warning(regRes.message);

                        case 10:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, GetTemplate, this);
        })
    },
    reducers: {
        success: function success(state, payload) {
            return (0, _extends3.default)({}, state, payload);
        }
    }
};