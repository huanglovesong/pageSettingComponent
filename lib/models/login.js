'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _login = require('../services/login');

var login = _interopRequireWildcard(_login);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'login',
  state: {},
  effects: {
    fuluusertoken: /*#__PURE__*/_regenerator2.default.mark(function fuluusertoken(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function fuluusertoken$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(login.fuluusertoken, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  fuluusertoken: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, fuluusertoken, this);
    }),
    getCode: /*#__PURE__*/_regenerator2.default.mark(function getCode(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function getCode$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(login.getCode, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  getCode: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, getCode, this);
    }),
    touristlogin: /*#__PURE__*/_regenerator2.default.mark(function touristlogin(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function touristlogin$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(login.touristlogin, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  touristlogin: result
                }
              });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, touristlogin, this);
    })
  },
  reducers: {
    success: function success(state, _ref7) {
      var payload = _ref7.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};