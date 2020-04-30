'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _prize = require('../services/prize');

var prize = _interopRequireWildcard(_prize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  namespace: 'prize',
  state: {},
  effects: {
    addPrizeNum: /*#__PURE__*/_regenerator2.default.mark(function addPrizeNum(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var result;
      return _regenerator2.default.wrap(function addPrizeNum$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(prize.addPrizeNum, payload);

            case 2:
              result = _context.sent;
              _context.next = 5;
              return put({
                type: 'success',
                payload: {
                  addPrizeNumRes: result
                }
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, addPrizeNum, this);
    }),
    getAddress: /*#__PURE__*/_regenerator2.default.mark(function getAddress(_ref3, _ref4) {
      var payload = _ref3.payload;
      var call = _ref4.call,
          put = _ref4.put;
      var result;
      return _regenerator2.default.wrap(function getAddress$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return call(prize.getAddress, payload);

            case 2:
              result = _context2.sent;
              _context2.next = 5;
              return put({
                type: 'success',
                payload: {
                  getAddressRes: result
                }
              });

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, getAddress, this);
    }),
    saveAddress: /*#__PURE__*/_regenerator2.default.mark(function saveAddress(_ref5, _ref6) {
      var payload = _ref5.payload;
      var call = _ref6.call,
          put = _ref6.put;
      var result;
      return _regenerator2.default.wrap(function saveAddress$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return call(prize.saveAddress, payload);

            case 2:
              result = _context3.sent;
              _context3.next = 5;
              return put({
                type: 'success',
                payload: {
                  saveAddressRes: result
                }
              });

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, saveAddress, this);
    }),
    userPrizeList: /*#__PURE__*/_regenerator2.default.mark(function userPrizeList(_ref7, _ref8) {
      var payload = _ref7.payload;
      var call = _ref8.call,
          put = _ref8.put;
      var result;
      return _regenerator2.default.wrap(function userPrizeList$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return call(prize.userPrizeList, payload);

            case 2:
              result = _context4.sent;
              _context4.next = 5;
              return put({
                type: 'success',
                payload: {
                  userPrizeListRes: result
                }
              });

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, userPrizeList, this);
    }),
    payInfo: /*#__PURE__*/_regenerator2.default.mark(function payInfo(_ref9, _ref10) {
      var payload = _ref9.payload;
      var call = _ref10.call,
          put = _ref10.put;
      var result;
      return _regenerator2.default.wrap(function payInfo$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return call(prize.payInfo, payload);

            case 2:
              result = _context5.sent;
              _context5.next = 5;
              return put({
                type: 'success',
                payload: {
                  payInfoRes: result
                }
              });

            case 5:
            case 'end':
              return _context5.stop();
          }
        }
      }, payInfo, this);
    }),
    prizeProList: /*#__PURE__*/_regenerator2.default.mark(function prizeProList(_ref11, _ref12) {
      var payload = _ref11.payload;
      var call = _ref12.call,
          put = _ref12.put;
      var result;
      return _regenerator2.default.wrap(function prizeProList$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return call(prize.prizeProList, payload);

            case 2:
              result = _context6.sent;
              _context6.next = 5;
              return put({
                type: 'success',
                payload: {
                  prizeProListRes: result
                }
              });

            case 5:
            case 'end':
              return _context6.stop();
          }
        }
      }, prizeProList, this);
    }),
    activeOpen: /*#__PURE__*/_regenerator2.default.mark(function activeOpen(_ref13, _ref14) {
      var payload = _ref13.payload;
      var call = _ref14.call,
          put = _ref14.put;
      var result;
      return _regenerator2.default.wrap(function activeOpen$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return call(prize.activeOpen, payload);

            case 2:
              result = _context7.sent;
              _context7.next = 5;
              return put({
                type: 'success',
                payload: {
                  activeOpenRes: result
                }
              });

            case 5:
            case 'end':
              return _context7.stop();
          }
        }
      }, activeOpen, this);
    }),
    handlePrize: /*#__PURE__*/_regenerator2.default.mark(function handlePrize(_ref15, _ref16) {
      var payload = _ref15.payload;
      var call = _ref16.call,
          put = _ref16.put;
      var result;
      return _regenerator2.default.wrap(function handlePrize$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return call(prize.handlePrize, payload);

            case 2:
              result = _context8.sent;
              _context8.next = 5;
              return put({
                type: 'success',
                payload: {
                  handlePrizeRes: result
                }
              });

            case 5:
            case 'end':
              return _context8.stop();
          }
        }
      }, handlePrize, this);
    }),
    prizeResult: /*#__PURE__*/_regenerator2.default.mark(function prizeResult(_ref17, _ref18) {
      var payload = _ref17.payload;
      var call = _ref18.call,
          put = _ref18.put;
      var result;
      return _regenerator2.default.wrap(function prizeResult$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return call(prize.prizeResult, payload);

            case 2:
              result = _context9.sent;
              _context9.next = 5;
              return put({
                type: 'success',
                payload: {
                  prizeResultRes: result
                }
              });

            case 5:
            case 'end':
              return _context9.stop();
          }
        }
      }, prizeResult, this);
    }),
    saveUserData: /*#__PURE__*/_regenerator2.default.mark(function saveUserData(_ref19, _ref20) {
      var payload = _ref19.payload;
      var call = _ref20.call,
          put = _ref20.put;
      var result;
      return _regenerator2.default.wrap(function saveUserData$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return call(prize.saveUserData, payload);

            case 2:
              result = _context10.sent;
              _context10.next = 5;
              return put({
                type: 'success',
                payload: {
                  saveUserDataRes: result
                }
              });

            case 5:
            case 'end':
              return _context10.stop();
          }
        }
      }, saveUserData, this);
    }),
    getPrizeNum: /*#__PURE__*/_regenerator2.default.mark(function getPrizeNum(_ref21, _ref22) {
      var payload = _ref21.payload;
      var call = _ref22.call,
          put = _ref22.put;
      var result;
      return _regenerator2.default.wrap(function getPrizeNum$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return call(prize.getPrizeNum, payload);

            case 2:
              result = _context11.sent;
              _context11.next = 5;
              return put({
                type: 'success',
                payload: {
                  getPrizeNumRes: result
                }
              });

            case 5:
            case 'end':
              return _context11.stop();
          }
        }
      }, getPrizeNum, this);
    }),
    prizeSendOrder: /*#__PURE__*/_regenerator2.default.mark(function prizeSendOrder(_ref23, _ref24) {
      var payload = _ref23.payload;
      var call = _ref24.call,
          put = _ref24.put;
      var result;
      return _regenerator2.default.wrap(function prizeSendOrder$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return call(prize.prizeSendOrder, payload);

            case 2:
              result = _context12.sent;
              _context12.next = 5;
              return put({
                type: 'success',
                payload: {
                  prizeSendOrderRes: result
                }
              });

            case 5:
            case 'end':
              return _context12.stop();
          }
        }
      }, prizeSendOrder, this);
    }),
    isPrizeRight: /*#__PURE__*/_regenerator2.default.mark(function isPrizeRight(_ref25, _ref26) {
      var payload = _ref25.payload;
      var call = _ref26.call,
          put = _ref26.put;
      var result;
      return _regenerator2.default.wrap(function isPrizeRight$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return call(prize.isPrizeRight, payload);

            case 2:
              result = _context13.sent;
              _context13.next = 5;
              return put({
                type: 'success',
                payload: {
                  isPrizeRightRes: result
                }
              });

            case 5:
            case 'end':
              return _context13.stop();
          }
        }
      }, isPrizeRight, this);
    })
  },
  reducers: {
    success: function success(state, _ref27) {
      var payload = _ref27.payload;

      return (0, _extends3.default)({}, state, payload);
    }
  }
};