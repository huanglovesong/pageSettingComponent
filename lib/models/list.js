'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _list = require('../services/list');

var list = _interopRequireWildcard(_list);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'list',
  state: {},
  effects: {
    getFirstMenu: /*#__PURE__*/_regenerator2.default.mark(function getFirstMenu(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function getFirstMenu$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(list.getFirstMenu, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  getFirstMenu: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, getFirstMenu, this);
    }),
    getsecondMenu: /*#__PURE__*/_regenerator2.default.mark(function getsecondMenu(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function getsecondMenu$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(list.getsecondMenu, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  getsecondMenu: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, getsecondMenu, this);
    }),
    getHotPro: /*#__PURE__*/_regenerator2.default.mark(function getHotPro(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function getHotPro$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(list.getHotPro, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  getHotPro: result
                }
              });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, getHotPro, this);
    })
  },
  reducers: {
    success: function success(state, _ref7) {
      var payload = _ref7.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};