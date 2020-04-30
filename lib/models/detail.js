'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _detail = require('../services/detail');

var detail = _interopRequireWildcard(_detail);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'detail',
  state: {},
  effects: {
    getGoodsList: /*#__PURE__*/_regenerator2.default.mark(function getGoodsList(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function getGoodsList$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(detail.getGoodsList, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  getGoodsList: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, getGoodsList, this);
    }),
    sendOrder: /*#__PURE__*/_regenerator2.default.mark(function sendOrder(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function sendOrder$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(detail.sendOrder, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  sendOrder: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, sendOrder, this);
    }),
    sendCardOrder: /*#__PURE__*/_regenerator2.default.mark(function sendCardOrder(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function sendCardOrder$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(detail.sendCardOrder, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  sendCardOrder: result
                }
              });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, sendCardOrder, this);
    }),
    getGameProTemp: /*#__PURE__*/_regenerator2.default.mark(function getGameProTemp(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var result;
      return _regenerator2.default.wrap(function getGameProTemp$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(detail.getGameProTemp, payload);

            case 2:
              result = _context4.sent;
              _context4.next = 5;
              return put({
                type: 'success',
                payload: {
                  getGameProTemp: result
                }
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, getGameProTemp, this);
    }),
    getProductById: /*#__PURE__*/_regenerator2.default.mark(function getProductById(_ref9, _ref10) {
      var payload = _ref9.payload;
      var call = _ref10.call,
          put = _ref10.put;
      var result;
      return _regenerator2.default.wrap(function getProductById$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return call(detail.getProductById, payload);

            case 2:
              result = _context5.sent;
              _context5.next = 5;
              return put({
                type: 'success',
                payload: {
                  getProductById: result
                }
              });

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, getProductById, this);
    }),
    getSecretCard: /*#__PURE__*/_regenerator2.default.mark(function getSecretCard(_ref11, _ref12) {
      var payload = _ref11.payload;
      var call = _ref12.call,
          put = _ref12.put;
      var result;
      return _regenerator2.default.wrap(function getSecretCard$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return call(detail.getSecretCard, payload);

            case 2:
              result = _context6.sent;
              _context6.next = 5;
              return put({
                type: 'success',
                payload: {
                  getSecretCard: result
                }
              });

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, getSecretCard, this);
    }),
    GetPassCodeStatus: /*#__PURE__*/_regenerator2.default.mark(function GetPassCodeStatus(_ref13, _ref14) {
      var payload = _ref13.payload;
      var call = _ref14.call,
          put = _ref14.put;
      var result;
      return _regenerator2.default.wrap(function GetPassCodeStatus$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return call(detail.GetPassCodeStatus, payload);

            case 2:
              result = _context7.sent;
              _context7.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetPassCodeStatus: result
                }
              });

            case 5:
              return _context7.abrupt('return', result);

            case 6:
            case 'end':
              return _context7.stop();
          }
        }
      }, GetPassCodeStatus, this);
    }),
    GetPassCode: /*#__PURE__*/_regenerator2.default.mark(function GetPassCode(_ref15, _ref16) {
      var payload = _ref15.payload;
      var call = _ref16.call,
          put = _ref16.put;
      var result;
      return _regenerator2.default.wrap(function GetPassCode$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return call(detail.GetPassCode, payload);

            case 2:
              result = _context8.sent;
              _context8.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetPassCode: result
                }
              });

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, GetPassCode, this);
    })
  },
  reducers: {
    success: function success(state, _ref17) {
      var payload = _ref17.payload;

      return (0, _extends3.default)({}, state, payload);
    },
    getMid: function getMid(state, _ref18) {
      var payload = _ref18.payload;

      return (0, _extends3.default)({}, state, payload);
    },
    commonDispatch: function commonDispatch(state, _ref19) {
      var payload = _ref19.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};