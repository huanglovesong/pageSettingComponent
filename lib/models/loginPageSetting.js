'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _loginPageSetting = require('../services/loginPageSetting');

var loginPageSetting = _interopRequireWildcard(_loginPageSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'loginPageSetting',
  state: {},
  effects: {
    // 广发银行
    decryptInfo: /*#__PURE__*/_regenerator2.default.mark(function decryptInfo(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function decryptInfo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(loginPageSetting.decryptInfo, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  decryptInfoRes: result
                }
              });

            case 5:
              return _context.abrupt('return', result);

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, decryptInfo, this);
    }),
    phoneDecrypt: /*#__PURE__*/_regenerator2.default.mark(function phoneDecrypt(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function phoneDecrypt$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(loginPageSetting.phoneDecrypt, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  phoneDecryptRes: result
                }
              });

            case 5:
              return _context2.abrupt('return', result);

            case 6:
            case 'end':
              return _context2.stop();
          }
        }
      }, phoneDecrypt, this);
    }),
    flowDecrypt: /*#__PURE__*/_regenerator2.default.mark(function flowDecrypt(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function flowDecrypt$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(loginPageSetting.flowDecrypt, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  flowDecryptRes: result
                }
              });

            case 5:
              return _context3.abrupt('return', result);

            case 6:
            case 'end':
              return _context3.stop();
          }
        }
      }, flowDecrypt, this);
    }),

    // 云盘登录
    panlogin: /*#__PURE__*/_regenerator2.default.mark(function panlogin(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var result;
      return _regenerator2.default.wrap(function panlogin$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(loginPageSetting.panlogin, payload);

            case 2:
              result = _context4.sent;
              _context4.next = 5;
              return put({
                type: 'success',
                payload: {
                  panloginRes: result
                }
              });

            case 5:
              return _context4.abrupt('return', result);

            case 6:
            case 'end':
              return _context4.stop();
          }
        }
      }, panlogin, this);
    }),
    ablogin: /*#__PURE__*/_regenerator2.default.mark(function ablogin(_ref9, _ref10) {
      var payload = _ref9.payload;
      var call = _ref10.call,
          put = _ref10.put;
      var result;
      return _regenerator2.default.wrap(function ablogin$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return call(loginPageSetting.ablogin, payload);

            case 2:
              result = _context5.sent;
              _context5.next = 5;
              return put({
                type: 'success',
                payload: {
                  abloginRes: result
                }
              });

            case 5:
              return _context5.abrupt('return', result);

            case 6:
            case 'end':
              return _context5.stop();
          }
        }
      }, ablogin, this);
    }),
    pinanLogin: /*#__PURE__*/_regenerator2.default.mark(function pinanLogin(_ref11, _ref12) {
      var payload = _ref11.payload;
      var call = _ref12.call,
          put = _ref12.put;
      var result;
      return _regenerator2.default.wrap(function pinanLogin$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return call(loginPageSetting.pinanLogin, payload);

            case 2:
              result = _context6.sent;
              _context6.next = 5;
              return put({
                type: 'success',
                payload: {
                  pinanLoginRes: result
                }
              });

            case 5:
              return _context6.abrupt('return', result);

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, pinanLogin, this);
    }),
    getUnionOpenId: /*#__PURE__*/_regenerator2.default.mark(function getUnionOpenId(_ref13, _ref14) {
      var payload = _ref13.payload;
      var call = _ref14.call,
          put = _ref14.put;
      var result;
      return _regenerator2.default.wrap(function getUnionOpenId$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return call(loginPageSetting.getUnionOpenId, payload);

            case 2:
              result = _context7.sent;
              _context7.next = 5;
              return put({
                type: 'success',
                payload: {
                  getUnionOpenIdRes: result
                }
              });

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, getUnionOpenId, this);
    }),
    fuluusertoken: /*#__PURE__*/_regenerator2.default.mark(function fuluusertoken(_ref15, _ref16) {
      var payload = _ref15.payload;
      var call = _ref16.call,
          put = _ref16.put;
      var result;
      return _regenerator2.default.wrap(function fuluusertoken$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return call(loginPageSetting.fuluusertoken, payload);

            case 2:
              result = _context8.sent;
              _context8.next = 5;
              return put({
                type: 'success',
                payload: {
                  fuluusertoken: result
                }
              });

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, fuluusertoken, this);
    }),
    getCode: /*#__PURE__*/_regenerator2.default.mark(function getCode(_ref17, _ref18) {
      var payload = _ref17.payload;
      var call = _ref18.call,
          put = _ref18.put;
      var result;
      return _regenerator2.default.wrap(function getCode$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return call(loginPageSetting.getCode, payload);

            case 2:
              result = _context9.sent;
              _context9.next = 5;
              return put({
                type: 'success',
                payload: {
                  getCode: result
                }
              });

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, getCode, this);
    }),
    touristlogin: /*#__PURE__*/_regenerator2.default.mark(function touristlogin(_ref19, _ref20) {
      var payload = _ref19.payload;
      var call = _ref20.call,
          put = _ref20.put;
      var result;
      return _regenerator2.default.wrap(function touristlogin$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return call(loginPageSetting.touristlogin, payload);

            case 2:
              result = _context10.sent;
              _context10.next = 5;
              return put({
                type: 'success',
                payload: {
                  touristlogin: result
                }
              });

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, touristlogin, this);
    })
  },
  reducers: {
    success: function success(state, _ref21) {
      var payload = _ref21.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};