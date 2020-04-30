'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _coupons = require('../services/coupons');

var coupons = _interopRequireWildcard(_coupons);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'coupons',
  state: {},
  effects: {
    CardActivityOvered: /*#__PURE__*/_regenerator2.default.mark(function CardActivityOvered(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function CardActivityOvered$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(coupons.CardActivityOvered, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  CardActivityOvered: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, CardActivityOvered, this);
    }),
    ObtainCard: /*#__PURE__*/_regenerator2.default.mark(function ObtainCard(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function ObtainCard$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(coupons.ObtainCard, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  ObtainCard: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, ObtainCard, this);
    }),
    GetProInfoDetailCouponList: /*#__PURE__*/_regenerator2.default.mark(function GetProInfoDetailCouponList(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function GetProInfoDetailCouponList$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(coupons.GetProInfoDetailCouponList, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetProInfoDetailCouponList: result
                }
              });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, GetProInfoDetailCouponList, this);
    }),
    GetUserCouponList: /*#__PURE__*/_regenerator2.default.mark(function GetUserCouponList(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var result;
      return _regenerator2.default.wrap(function GetUserCouponList$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(coupons.GetUserCouponList, payload);

            case 2:
              result = _context4.sent;
              _context4.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetUserCouponList: result
                }
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, GetUserCouponList, this);
    }),
    GetOrderDetailsCouponList: /*#__PURE__*/_regenerator2.default.mark(function GetOrderDetailsCouponList(_ref9, _ref10) {
      var payload = _ref9.payload;
      var call = _ref10.call,
          put = _ref10.put;
      var result;
      return _regenerator2.default.wrap(function GetOrderDetailsCouponList$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return call(coupons.GetOrderDetailsCouponList, payload);

            case 2:
              result = _context5.sent;
              _context5.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetOrderDetailsCouponList: result
                }
              });

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, GetOrderDetailsCouponList, this);
    }),
    GetCouponProductList: /*#__PURE__*/_regenerator2.default.mark(function GetCouponProductList(_ref11, _ref12) {
      var payload = _ref11.payload;
      var call = _ref12.call,
          put = _ref12.put;
      var result;
      return _regenerator2.default.wrap(function GetCouponProductList$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return call(coupons.GetCouponProductList, payload);

            case 2:
              result = _context6.sent;
              _context6.next = 5;
              return put({
                type: 'success',
                payload: {
                  GetCouponProductList: result
                }
              });

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, GetCouponProductList, this);
    })
  },
  reducers: {
    success: function success(state, _ref13) {
      var payload = _ref13.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};