'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp;

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dva = require('dva');

var _auth = require('../../../utils/auth');

var _MallLoginModalPageSetting = require('../../LoginModal/MallLoginModalPageSetting');

var _MallLoginModalPageSetting2 = _interopRequireDefault(_MallLoginModalPageSetting);

require('./less/coupons.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Coupons = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(Coupons, _Component);

    function Coupons(props) {
        (0, _classCallCheck3.default)(this, Coupons);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (Coupons.__proto__ || (0, _getPrototypeOf2.default)(Coupons)).call(this, props));

        _this2.cardActivityOvered = function (merCouponId) {
            _this2.setState({
                merCouponId: merCouponId
            }, function () {
                _this2.props.dispatch({
                    type: 'pageSetting/CardActivityOvered',
                    payload: {
                        merCouponActivityId: merCouponId
                    }
                }).then(function (res) {
                    var code = res.code,
                        data = res.data,
                        message = res.message;

                    if (code === '1000') {
                        _this2.setState({
                            activeInfo: data
                        }, function () {
                            _this2.getCouponFn();
                        });
                    } else {
                        _toast2.default.info(message);
                    }
                });
            });
        };

        _this2.getCouponFn = function () {
            var merCouponId = _this2.state.merCouponId;

            _this2.props.dispatch({
                type: 'pageSetting/ObtainCard',
                payload: {
                    merCouponActivityId: merCouponId
                }
            }).then(function (res) {
                var code = res.code,
                    data = res.data,
                    message = res.message;

                if (code === '1000') {
                    _toast2.default.info('领取成功', 2);
                    var _this = _this2;
                    setTimeout(function () {
                        _this.jumpTo(data);
                    }, 1500);
                } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                    var componentIndex = _this2.props.componentIndex;

                    _this2.props.authorizationFailurePageSetting(componentIndex);
                } else {
                    _toast2.default.info(message);
                }
            });
        };

        _this2.loginSuccess = function (data) {
            _this2.hideLoginModal();
            _this2.setState({
                userInfo: data
            });
            _this2.getCouponFn();
        };

        _this2.hideLoginModal = function () {
            _this2.setState({
                showMallLoginModal: false
            });
        };

        _this2.jumpTo = function (data) {
            var activeInfo = _this2.state.activeInfo;

            if (activeInfo.jumpType == 1) {
                _this2.toUrl('/');
            } else if (activeInfo.jumpType == 2) {
                _this2.toUrl('/couponPage?cardId=' + data.card + '&reachedAmount=' + data.discountsInfo.reachedAmount + '&reduceAmount=' + data.discountsInfo.reduceAmount);
            } else if (activeInfo.jumpType == 3) {
                window.location.href = '/detail?gid=' + activeInfo.proClassId + (activeInfo.productId ? '&pid=' + activeInfo.productId : '');
            } else if (activeInfo.jumpType == 4) {
                window.location.href = activeInfo.jumpUrl;
            }
        };

        _this2.toUrl = function (url) {
            _this2.props.history.push(url);
        };

        _this2.getCom = function () {
            var _this2$props = _this2.props,
                item = _this2$props.item,
                isChoose = _this2$props.isChoose,
                componentIndex = _this2$props.componentIndex;

            console.log(componentIndex, 2222);
            var len = item.moduleDataList.length;
            var margin = item.modelStyle.couponStyleModel.imageClearance / 2;
            // 判断是否选中的是当前组件
            if (len) {
                var customEle = [];
                var template = item.modelStyle.couponStyleModel.template;
                var _margin = item.modelStyle.couponStyleModel.imageClearance / 2;
                var pagePadding = item.modelStyle.couponStyleModel.pageMargin || 0;
                var nowStyle = item.modelStyle.couponStyleModel.displayStyle;
                var style = {
                    margin: _margin + 'px',
                    display: 'inline-block'
                };
                var style1 = {
                    // marginLeft: `-${margin}px`,
                    // marginRight: `-${margin}px`,
                    paddingLeft: '18px',
                    paddingRight: '18px'

                };
                if (template === 'one') {
                    customEle = item.moduleDataList.map(function (item) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'coupons-box-img ' + template + '-module ' + template + '-module-' + nowStyle + ' float-left',
                                onClick: function onClick() {
                                    return _this2.cardActivityOvered(item.relationId);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'price-content-one' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'small-font' },
                                    '\uFFE5'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'big-font' },
                                    item.couponData.reduceAmount
                                )
                            )
                        );
                    });
                } else if (template === 'two') {
                    customEle = item.moduleDataList.map(function (item) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'coupons-box-img ' + template + '-module ' + template + '-module-' + nowStyle + ' float-left',
                                onClick: function onClick() {
                                    return _this2.cardActivityOvered(item.relationId);
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'price-content' },
                                _react2.default.createElement(
                                    'span',
                                    { className: 'small-font' },
                                    '\uFFE5'
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'big-font' },
                                    item.couponData.reduceAmount
                                )
                            )
                        );
                    });
                }
                // 一行多个
                else if (template === 'three') {
                        var oneWidth = (375 - pagePadding + _margin * 2) / 3;
                        console.log(oneWidth, 2222);
                        customEle = _react2.default.createElement(
                            'div',
                            { style: { overflowX: template === 'three' ? 'scroll' : 'inherit' } },
                            _react2.default.createElement(
                                'div',
                                { className: 'coupons-box-content clearfix', style: { width: 115.5 * len - 8 + 'px' } },
                                item.moduleDataList.map(function (item) {
                                    return _react2.default.createElement(
                                        'div',
                                        { className: 'coupons-box-img ' + template + '-module ' + template + '-module-' + nowStyle + ' float-left',
                                            style: { width: 107.5 + 'px' }, onClick: function onClick() {
                                                return _this2.cardActivityOvered(item.relationId);
                                            } },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'price-content' },
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'small-font' },
                                                '\uFFE5'
                                            ),
                                            _react2.default.createElement(
                                                'span',
                                                { className: 'big-font' },
                                                item.couponData.reduceAmount
                                            )
                                        )
                                    );
                                })
                            )
                        );
                    }
                return _react2.default.createElement(
                    'div',
                    { className: 'coupons-box clearfix', style: style1 },
                    customEle
                );
            }
        };

        _this2.state = {
            merCouponId: ''
        };
        return _this2;
    }

    (0, _createClass3.default)(Coupons, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            // 如果是登录成功，找到对应组件authKey进行接下来的步骤
            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
                console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex);
                this.getCouponFn();
            }
        }
        // 登录成功调用

    }, {
        key: 'render',
        value: function render() {
            var showMallLoginModal = this.state.showMallLoginModal;

            return _react2.default.createElement(
                'div',
                null,
                this.getCom(),
                showMallLoginModal && _react2.default.createElement(_MallLoginModalPageSetting2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
            );
        }
    }]);
    return Coupons;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(Coupons);