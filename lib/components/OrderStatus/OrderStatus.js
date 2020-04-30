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

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/orderStatus.less');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderStatus = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(OrderStatus, _React$Component);

    function OrderStatus(props) {
        (0, _classCallCheck3.default)(this, OrderStatus);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderStatus.__proto__ || (0, _getPrototypeOf2.default)(OrderStatus)).call(this, props));

        _initialiseProps.call(_this);

        var url = (0, _urlParse2.default)(props.location.search, true);
        var oid = url.query.oid; // 获取订单号
        // 获取商户信息

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            orderDetail: {},
            oid: oid,
            shopInfo: shopInfo,
            hotPro: []
        };
        return _this;
    }

    (0, _createClass3.default)(OrderStatus, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getHotCategory();
            this.init();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var props = this.props;
            var getOrderDetail = nextProps.orderDetail.getOrderDetail,
                getHotCategory = nextProps.pay.getHotCategory;

            if (getOrderDetail !== props.orderDetail.getOrderDetail) {
                var code = getOrderDetail.code,
                    data = getOrderDetail.data,
                    message = getOrderDetail.message;

                if (code === '1000') {
                    this.setState({
                        orderDetail: data
                    });
                } else {
                    _toast2.default.info(message);
                }
            }
            if (getHotCategory !== props.pay.getHotCategory) {
                var _code = getHotCategory.code,
                    _data = getHotCategory.data,
                    _message = getHotCategory.message;

                if (_code === '1000') {
                    this.setState({
                        hotPro: _data.list
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                orderDetail = _state.orderDetail,
                hotPro = _state.hotPro,
                oid = _state.oid,
                shopInfo = _state.shopInfo;

            return _react2.default.createElement(
                'div',
                { className: 'order-status' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    title: '\u652F\u4ED8\u6210\u529F',
                    jump: function jump() {
                        _this2.props.history.push('/');
                    },
                    myLoading: !!this.props.loading.models.pay // 判断loading
                })),
                _react2.default.createElement(
                    'div',
                    { className: 'top' },
                    orderDetail.orderStatus === 11 ? _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', { className: 'succ-icon pay-icon' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'txt' },
                            '\u5F85\u652F\u4ED8'
                        )
                    ) : _react2.default.createElement(
                        'div',
                        null,
                        _react2.default.createElement('div', { className: 'succ-icon' }),
                        _react2.default.createElement(
                            'div',
                            { className: 'txt' },
                            '\u652F\u4ED8\u6210\u529F'
                        )
                    ),
                    shopInfo.codeKey.toLowerCase() !== (configs.tencentSH ? configs.tencentSH.toLowerCase() : '') && _react2.default.createElement(
                        'button',
                        { type: 'primary', className: 'primary-btn', onClick: function onClick() {
                                _this2.toUrl('/');
                            } },
                        '\u8FD4\u56DE\u9996\u9875'
                    ),
                    _react2.default.createElement(
                        'button',
                        { type: 'ghost', className: 'ghost-btn', onClick: function onClick() {
                                _this2.toUrl('/orderDetail?oid=' + oid);
                            } },
                        '\u67E5\u770B\u8BA2\u5355'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'more-bg' },
                    _react2.default.createElement(
                        'div',
                        { className: 'more-txt' },
                        '\u4E3A\u4F60\u7CBE\u9009\u66F4\u591A\u6743\u76CA'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'more-pro' },
                        hotPro && hotPro[0] && hotPro.map(function (item) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'item', onClick: function onClick() {
                                        _this2.toUrl('/detail?gid=' + item.childCategoryId);
                                    } },
                                _react2.default.createElement('img', { src: item.iconPath }),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'name' },
                                    item.childCategoryName
                                ),
                                _react2.default.createElement(
                                    'span',
                                    { className: 'price' },
                                    item.price,
                                    _react2.default.createElement(
                                        'small',
                                        null,
                                        '\u5143\u8D77'
                                    )
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);
    return OrderStatus;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.init = function () {
        var oid = _this3.state.oid;

        _this3.props.dispatch({
            type: 'orderDetail/getOrderDetail',
            payload: {
                OrderNo: oid
            }
        });
    };

    this.getHotCategory = function () {
        var _state2 = _this3.state,
            oid = _state2.oid,
            shopInfo = _state2.shopInfo;

        _this3.props.dispatch({
            type: 'pay/getHotCategory',
            payload: {
                merchantId: shopInfo.merInfoId
            }
        });
    };

    this.toUrl = function (url) {
        _this3.props.history.push(url);
    };
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(OrderStatus);