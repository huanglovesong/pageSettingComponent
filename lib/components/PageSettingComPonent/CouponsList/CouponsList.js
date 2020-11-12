'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tabs = require('antd-mobile/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

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

require('antd-mobile/lib/tabs/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dva = require('dva');

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('./less/couponsList.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponsList = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(CouponsList, _Component);

    function CouponsList(props) {
        (0, _classCallCheck3.default)(this, CouponsList);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (CouponsList.__proto__ || (0, _getPrototypeOf2.default)(CouponsList)).call(this, props));

        _this2.cardActivityOvered = function (item) {
            // 如果用户没有领取过
            if (item.isUserReceive) {
                _this2.setState({
                    merCouponId: item.merCouponId
                }, function () {
                    _this2.props.dispatch({
                        type: 'pageSetting/CardActivityOvered',
                        payload: {
                            merCouponActivityId: item.merCouponId
                        }
                    }).then(function (res) {
                        debugger;
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
            }
            // 如果用户已经领取过了
            else {
                    // const { activeInfo } = this.state;
                    // activeInfo.jumpType = item.jumpType;
                    // activeInfo.proClassId = item.proClassId;
                    // activeInfo.productId = item.productId;
                    // activeInfo.jumpUrl = item.jumpUrl;
                    // this.setState({
                    //     activeInfo
                    // }, () => {
                    //     item.discountsInfo = {
                    //         reachedAmount: item.reachedAmount,
                    //         reduceAmount: item.reduceAmount
                    //     };
                    //     this.jumpTo(item);
                    // })
                    _this2.toUrl('/mycoupons');
                }
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
                    title: _mathManage2.default.stringCutOut(item.textData, 4),
                    key: index,
                    couponDataList: item.couponDataList
                });
            });
            return tabs;
        };

        _this2.renderContentStyle1 = function (tabsItem) {
            console.log(tabsItem, 9999888);
            var item = _this2.props.item;
            // 商品间距

            var productMargin = item.modelStyle.couponsListStyleModel.productMargin / 2;
            // 页面边距
            var pageMargin = item.modelStyle.couponsListStyleModel.pageMargin;
            var couponFontColor = item.modelStyle.couponsListStyleModel.couponFontColor;
            // let productHeight = `${(len * 229) / 50}rem`;

            var style = {
                margin: productMargin / 50 + 'rem',
                display: "inline-block"
                // width: '100%'
            };
            var style1 = {
                marginLeft: '-' + productMargin / 50 + 'rem',
                marginRight: '-' + productMargin / 50 + 'rem',
                paddingLeft: pageMargin / 50 + 'rem',
                paddingRight: pageMargin / 50 + 'rem'
            };
            var clickTabBarIndex = _this2.state.clickTabBarIndex;

            console.log(clickTabBarIndex, 99999);
            var nowHtml = _react2.default.createElement(
                'div',
                { style: { display: "flex" }, className: 'content-style1' },
                _react2.default.createElement(
                    'div',
                    {
                        className: 'class-content clearfix',
                        style: (0, _extends3.default)({}, style1),
                        key: clickTabBarIndex
                    },
                    tabsItem.couponDataList.map(function (couponDataListItem, index) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'item  ' + (couponDataListItem.isReceive ? 'receieve-item' : 'disable-item') },
                            _react2.default.createElement(
                                'div',
                                { className: 'float-left item-img-content' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'title' },
                                    couponDataListItem.name
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'coupon-product' },
                                    couponDataListItem.couponProductInfoList && couponDataListItem.couponProductInfoList.map(function (item) {
                                        return _react2.default.createElement(
                                            'div',
                                            { className: 'img-content float-left' },
                                            _react2.default.createElement('img', { src: item.productImage }),
                                            _react2.default.createElement(
                                                'div',
                                                { className: 'price' },
                                                '\xA5 ',
                                                item.price
                                            )
                                        );
                                    })
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'float-left  item-price-content', style: { color: couponDataListItem.isReceive ? couponFontColor : '#999999' } },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'coupon-price' },
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'small-font' },
                                        '\xA5'
                                    ),
                                    _react2.default.createElement(
                                        'span',
                                        { className: 'big-font' },
                                        couponDataListItem.reduceAmount
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'coupon-text' },
                                    couponDataListItem.content
                                ),
                                couponDataListItem.isReceive ? couponDataListItem.isUserReceive ? _react2.default.createElement(
                                    'div',
                                    { className: "get-coupon", style: { background: couponFontColor }, onClick: function onClick() {
                                            return _this2.cardActivityOvered(couponDataListItem);
                                        } },
                                    '\u7ACB\u5373\u9886\u53D6'
                                ) : _react2.default.createElement(
                                    'div',
                                    { className: "use-coupon", style: { border: '2px solid ' + couponFontColor, color: couponFontColor }, onClick: function onClick() {
                                            return _this2.cardActivityOvered(couponDataListItem);
                                        } },
                                    '\u53BB\u4F7F\u7528'
                                ) : _react2.default.createElement(
                                    'div',
                                    { className: 'get-coupon-disable' },
                                    '\u5DF2\u62A2\u5B8C'
                                )
                            )
                        );
                    })
                )
            );
            return nowHtml;
        };

        _this2.state = {
            merCouponId: '',
            activeInfo: {}
        };
        return _this2;
    }

    (0, _createClass3.default)(CouponsList, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {

            // 如果是登录成功，找到对应组件authKey进行接下来的步骤
            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
                console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex);
                this.getCouponFn();
            }
        }
        // 登录成功调用

        // 样式一

    }, {
        key: 'render',
        value: function render() {
            var item = this.props.item;

            var _ref = item.modelStyle.couponsListStyleModel || {},
                couponFontColor = _ref.couponFontColor,
                navigationColor = _ref.navigationColor;

            var len = item.moduleDataList.length;
            // 如果没有moduleDataList则隐藏
            if (!len) {
                return '';
            }
            return _react2.default.createElement(
                'div',
                { 'class': 'coupons-list-box clearfix' },
                _react2.default.createElement(
                    _tabs2.default,
                    {
                        swipeable: false,
                        tabs: this.getTabs(),
                        tabBarStyle: { paddingLeft: 0, paddingRight: 0 },
                        tabBarUnderlineStyle: { border: '.04rem solid red' },
                        tabBarBackgroundColor: navigationColor,
                        tabBarActiveTextColor: couponFontColor,
                        tabBarInactiveTextColor: '#999999'

                    },
                    this.renderContentStyle1
                )
            );
        }
    }]);
    return CouponsList;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(CouponsList);