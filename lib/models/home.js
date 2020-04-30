'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _home = require('../services/home');

var home = _interopRequireWildcard(_home);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'home',
  state: {},
  effects: {
    getBanner: /*#__PURE__*/_regenerator2.default.mark(function getBanner(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function getBanner$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(home.getBanner, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  getBanner: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, getBanner, this);
    }),
    getIndexMenu: /*#__PURE__*/_regenerator2.default.mark(function getIndexMenu(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function getIndexMenu$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(home.getIndexMenu, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  getIndexMenu: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, getIndexMenu, this);
    })
  },
  reducers: {
    success: function success(state, _ref5) {
      var payload = _ref5.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};