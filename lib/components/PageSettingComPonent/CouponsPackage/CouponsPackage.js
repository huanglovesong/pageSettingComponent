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

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _CouponsPackagePopup = require('./CouponsPackagePopup');

var _CouponsPackagePopup2 = _interopRequireDefault(_CouponsPackagePopup);

require('./less/couponsPackage.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponsPackage = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(CouponsPackage, _Component);

    function CouponsPackage(props) {
        (0, _classCallCheck3.default)(this, CouponsPackage);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (CouponsPackage.__proto__ || (0, _getPrototypeOf2.default)(CouponsPackage)).call(this, props));

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

        _this2.getTabs = function () {
            var item = _this2.props.item;

            var tabs = [];
            item.moduleDataList.map(function (item, index) {
                tabs.push({
                    title: item.textData,
                    key: index,
                    couponDataList: item.couponDataList
                });
            });
            return tabs;
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

        _this2.showPopUp = function () {
            _this2.setState({
                showCouponsPackagePopup: true
            });
        };

        _this2.hidePopUp = function () {
            _this2.setState({
                showCouponsPackagePopup: false
            });
        };

        _this2.state = {
            merCouponId: '',
            showCouponsPackagePopup: false
        };
        return _this2;
    }

    (0, _createClass3.default)(CouponsPackage, [{
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
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            // 如果是登录成功，找到对应组件authKey进行接下来的步骤
            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
                console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex);
                this.getCouponFn();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var item = this.props.item;

            var _ref = item.modelStyle.couponsPackageStyleModel || {},
                couponsPackageImage = _ref.couponsPackageImage,
                pageMargin = _ref.pageMargin,
                imageClearance = _ref.imageClearance;

            var showCouponsPackagePopup = this.state.showCouponsPackagePopup;

            var pagePadding = pageMargin || 0;
            var margin = imageClearance / 2;
            var style = {
                margin: margin + 'px',
                display: 'inline-block'
            };
            var style1 = {
                // marginLeft: `-${margin}px`,
                // marginRight: `-${margin}px`,
                paddingLeft: pagePadding + 'px',
                paddingRight: pagePadding + 'px'

            };
            return _react2.default.createElement(
                'div',
                { 'class': 'coupons-package-box clearfix', style: style1 },
                _react2.default.createElement(
                    'div',
                    { className: 'coupons-package-box-img', onClick: this.showPopUp },
                    _react2.default.createElement(
                        'a',
                        { style: (0, _extends3.default)({}, style) },
                        _react2.default.createElement('img', { src: couponsPackageImage })
                    )
                ),
                showCouponsPackagePopup && _react2.default.createElement(_CouponsPackagePopup2.default, { item: item, hideModal: this.hidePopUp })
            );
        }
    }]);
    return CouponsPackage;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(CouponsPackage);