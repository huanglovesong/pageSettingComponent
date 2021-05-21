'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _pageSetting = require('../services/pageSetting');

var pageSettingService = _interopRequireWildcard(_pageSetting);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    namespace: 'pageSetting',
    state: {},
    effects: {
        getPage: /*#__PURE__*/_regenerator2.default.mark(function getPage(_ref, _ref2) {
            var payload = _ref.payload,
                callback = _ref.callback;
            var call = _ref2.call,
                put = _ref2.put;
            var testRes;
            return _regenerator2.default.wrap(function getPage$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return call(pageSettingService.getPage, payload);

                        case 2:
                            testRes = _context.sent;
                            _context.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getPageResult: testRes
                                }
                            });

                        case 5:
                            callback && callback(testRes);
                            return _context.abrupt('return', testRes);

                        case 7:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, getPage, this);
        }),
        CardActivityOvered: /*#__PURE__*/_regenerator2.default.mark(function CardActivityOvered(_ref3, _ref4) {
            var payload = _ref3.payload;
            var call = _ref4.call,
                put = _ref4.put;
            var result;
            return _regenerator2.default.wrap(function CardActivityOvered$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return call(pageSettingService.CardActivityOvered, payload);

                        case 2:
                            result = _context2.sent;
                            _context2.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    CardActivityOvered: result
                                }
                            });

                        case 5:
                            return _context2.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, CardActivityOvered, this);
        }),
        ObtainCard: /*#__PURE__*/_regenerator2.default.mark(function ObtainCard(_ref5, _ref6) {
            var payload = _ref5.payload;
            var call = _ref6.call,
                put = _ref6.put;
            var result;
            return _regenerator2.default.wrap(function ObtainCard$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return call(pageSettingService.ObtainCard, payload);

                        case 2:
                            result = _context3.sent;
                            _context3.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    ObtainCard: result
                                }
                            });

                        case 5:
                            return _context3.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, ObtainCard, this);
        }),
        addPrizeNum: /*#__PURE__*/_regenerator2.default.mark(function addPrizeNum(_ref7, _ref8) {
            var payload = _ref7.payload;
            var call = _ref8.call,
                put = _ref8.put;
            var result;
            return _regenerator2.default.wrap(function addPrizeNum$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return call(pageSettingService.addPrizeNum, payload);

                        case 2:
                            result = _context4.sent;
                            _context4.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    addPrizeNumRes: result
                                }
                            });

                        case 5:
                            return _context4.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, addPrizeNum, this);
        }),
        getPrizeNum: /*#__PURE__*/_regenerator2.default.mark(function getPrizeNum(_ref9, _ref10) {
            var payload = _ref9.payload;
            var call = _ref10.call,
                put = _ref10.put;
            var result;
            return _regenerator2.default.wrap(function getPrizeNum$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return call(pageSettingService.getPrizeNum, payload);

                        case 2:
                            result = _context5.sent;
                            _context5.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    getPrizeNumRes: result
                                }
                            });

                        case 5:
                            return _context5.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, getPrizeNum, this);
        }),
        handlePrize: /*#__PURE__*/_regenerator2.default.mark(function handlePrize(_ref11, _ref12) {
            var payload = _ref11.payload;
            var call = _ref12.call,
                put = _ref12.put;
            var result;
            return _regenerator2.default.wrap(function handlePrize$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return call(pageSettingService.handlePrize, payload);

                        case 2:
                            result = _context6.sent;
                            _context6.next = 5;
                            return put({
                                type: 'success',
                                payload: {
                                    handlePrizeRes: result
                                }
                            });

                        case 5:
                            return _context6.abrupt('return', result);

                        case 6:
                        case 'end':
                            return _context6.stop();
                    }
                }
            }, handlePrize, this);
        })
    },
    reducers: {
        success: function success(state, _ref13) {
            var payload = _ref13.payload;

            return (0, _extends3.default)({}, state, payload);
        },
        commonRequest: function commonRequest(state, _ref14) {
            var payload = _ref14.payload;

            return (0, _extends3.default)({}, state, payload);
        }
    }
};