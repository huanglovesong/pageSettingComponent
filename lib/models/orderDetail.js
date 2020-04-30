'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _orderDetail = require('../services/orderDetail');

var orderDetail = _interopRequireWildcard(_orderDetail);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'orderDetail',
  state: {},
  effects: {
    getOrderDetail: /*#__PURE__*/_regenerator2.default.mark(function getOrderDetail(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function getOrderDetail$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(orderDetail.getOrderDetail, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  getOrderDetail: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, getOrderDetail, this);
    })
  },
  reducers: {
    success: function success(state, _ref3) {
      var payload = _ref3.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};