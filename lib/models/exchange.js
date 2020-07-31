'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _exchange = require('../services/exchange');

var exchange = _interopRequireWildcard(_exchange);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    namespace: 'exchange',
    state: {},
    effects: {
        sendCtripCardOrder: /*#__PURE__*/_regenerator2.default.mark(function sendCtripCardOrder(_ref, _ref2) {
            var payload = _ref.payload;
            var call = _ref2.call,
                put = _ref2.put;
            var result;
            return _regenerator2.default.wrap(function sendCtripCardOrder$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(exchange.sendCtripCardOrder, payload);

                        case 2:
                            result = _context.sent;
                            _context.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    sendCtripCardOrderResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, sendCtripCardOrder, this);
        }),
        getcard: /*#__PURE__*/_regenerator2.default.mark(function getcard(_ref3, _ref4) {
            var payload = _ref3.payload;
            var call = _ref4.call,
                put = _ref4.put;
            var result;
            return _regenerator2.default.wrap(function getcard$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return call(exchange.getcard, payload);

                        case 2:
                            result = _context2.sent;
                            _context2.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getcardResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, getcard, this);
        }),
        GetBanner: /*#__PURE__*/_regenerator2.default.mark(function GetBanner(_ref5, _ref6) {
            var payload = _ref5.payload;
            var call = _ref6.call,
                put = _ref6.put;
            var result;
            return _regenerator2.default.wrap(function GetBanner$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return call(exchange.GetBanner, payload);

                        case 2:
                            result = _context3.sent;
                            _context3.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    GetBannerResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, GetBanner, this);
        }),
        sendCtripOrder: /*#__PURE__*/_regenerator2.default.mark(function sendCtripOrder(_ref7, _ref8) {
            var payload = _ref7.payload;
            var call = _ref8.call,
                put = _ref8.put;
            var result;
            return _regenerator2.default.wrap(function sendCtripOrder$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return call(exchange.sendCtripOrder, payload);

                        case 2:
                            result = _context4.sent;
                            _context4.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    sendCtripOrderResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, sendCtripOrder, this);
        }),
        GetOrderDetail: /*#__PURE__*/_regenerator2.default.mark(function GetOrderDetail(_ref9, _ref10) {
            var payload = _ref9.payload;
            var call = _ref10.call,
                put = _ref10.put;
            var result;
            return _regenerator2.default.wrap(function GetOrderDetail$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return call(exchange.GetOrderDetail, payload);

                        case 2:
                            result = _context5.sent;
                            _context5.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    GetOrderDetailResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, GetOrderDetail, this);
        }),
        GetProductTemp: /*#__PURE__*/_regenerator2.default.mark(function GetProductTemp(_ref11, _ref12) {
            var payload = _ref11.payload;
            var call = _ref12.call,
                put = _ref12.put;
            var result;
            return _regenerator2.default.wrap(function GetProductTemp$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return call(exchange.GetProductTemp, payload);

                        case 2:
                            result = _context6.sent;
                            _context6.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getGameProTemp: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, GetProductTemp, this);
        }),
        GetProductList: /*#__PURE__*/_regenerator2.default.mark(function GetProductList(_ref13, _ref14) {
            var payload = _ref13.payload;
            var call = _ref14.call,
                put = _ref14.put;
            var result;
            return _regenerator2.default.wrap(function GetProductList$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return call(exchange.GetProductList, payload);

                        case 2:
                            result = _context7.sent;
                            _context7.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    GetProductListResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, GetProductList, this);
        }),
        getuserinfo: /*#__PURE__*/_regenerator2.default.mark(function getuserinfo(_ref15, _ref16) {
            var payload = _ref15.payload;
            var call = _ref16.call,
                put = _ref16.put;
            var result;
            return _regenerator2.default.wrap(function getuserinfo$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return call(exchange.getuserinfo, payload);

                        case 2:
                            result = _context8.sent;
                            _context8.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getuserinfoResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context8.stop();
                    }
                }
            }, getuserinfo, this);
        }),
        orderlist: /*#__PURE__*/_regenerator2.default.mark(function orderlist(_ref17, _ref18) {
            var payload = _ref17.payload;
            var call = _ref18.call,
                put = _ref18.put;
            var result;
            return _regenerator2.default.wrap(function orderlist$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return call(exchange.orderlist, payload);

                        case 2:
                            result = _context9.sent;
                            _context9.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    orderlistResult: result
                                }
                            });

                        case 5:
                        case 'end':
                            return _context9.stop();
                    }
                }
            }, orderlist, this);
        })
    },
    reducers: {
        success: function success(state, _ref19) {
            var payload = _ref19.payload;

            return (0, _extends3.default)({}, state, payload);
        }
    }
}; // import queryString from 'query-string';