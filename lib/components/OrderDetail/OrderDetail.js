'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

require('antd-mobile/lib/icon/style');

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

var _Icon2 = require('../Icon');

var _Icon3 = _interopRequireDefault(_Icon2);

require('./less/orderDetail.less');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderDetail = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(OrderDetail, _React$Component);

    function OrderDetail(props) {
        (0, _classCallCheck3.default)(this, OrderDetail);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderDetail.__proto__ || (0, _getPrototypeOf2.default)(OrderDetail)).call(this, props));

        _initialiseProps.call(_this);

        var url = (0, _urlParse2.default)(props.location.search, true);
        var oid = url.query.oid; // 获取订单号
        // 获取商户信息

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            orderDetail: {},
            oid: oid,
            shopInfo: shopInfo,
            hotPro: [],
            showMallLoginModal: false,
            showLoginPageModal: false
        };
        return _this;
    }

    (0, _createClass3.default)(OrderDetail, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 判断模式和授权
            var yes = (0, _auth.isLoginOrAuth)(this);
            // 如果从来没有登录
            if (yes) {
                this.getOrderStatus();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var props = this.props;
            var getOrderDetail = nextProps.orderDetail.getOrderDetail;
            var fuluusertoken = nextProps.login.fuluusertoken;

            if (fuluusertoken !== props.login.fuluusertoken) {
                var code = fuluusertoken.code,
                    data = fuluusertoken.data,
                    message = fuluusertoken.message;

                if (code === '1000') {
                    localStorage.setItem('userInfo', (0, _stringify2.default)(data));
                    this.loginSuccess(data);
                } else {
                    _toast2.default.fail(message);
                }
            }
            if (getOrderDetail !== props.orderDetail.getOrderDetail) {
                var _code = getOrderDetail.code,
                    _data = getOrderDetail.data,
                    _message = getOrderDetail.message;

                if (_code === '1000') {
                    if (_data.orderStatus === 15 || _data.orderStatus === 51 || _data.orderStatus === 71) {} else {
                        //  当订单状态不是成功或者失败的时候继续调用接口
                        setTimeout(function () {
                            _this2.getOrderStatus();
                        }, 10000);
                    }
                    this.setState({
                        orderDetail: _data
                    });
                } else if (_code === '-3' || _code === '1013' || _code === '1014' || _code === '1015') {
                    // 授权失效
                    this.authorizationFailure();
                } else {
                    _toast2.default.info(_message);
                }
            }
        }
        // 授权失效

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                orderDetail = _state.orderDetail,
                hotPro = _state.hotPro,
                detail = _state.detail,
                showMallLoginModal = _state.showMallLoginModal,
                showLoginPageModal = _state.showLoginPageModal,
                shopInfo = _state.shopInfo;

            var orderStatustxt = '';
            // 订单外部状态：11-待付款、15-交易关闭、21-付款成功、31-待充值、41-充值中、51-充值成功、61-充值失败、71-退款成功
            switch (orderDetail.orderStatus) {
                case 11:
                    orderStatustxt = "待付款";
                    break;
                case 15:
                    orderStatustxt = "交易关闭";
                    break;
                case 21:
                    orderStatustxt = "付款成功";
                    break;
                case 31:
                    orderStatustxt = "待充值";
                    break;
                case 41:
                    orderStatustxt = "充值中...";
                    break;
                case 51:
                    orderStatustxt = "充值成功";
                    break;
                case 61:
                    orderStatustxt = "充值失败";
                    break;
                case 71:
                    orderStatustxt = "退款成功";
                    break;
            }
            return _react2.default.createElement(
                'div',
                { className: 'clearfix orderdetail-bg' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    title: '\u8BA2\u5355\u8BE6\u60C5',
                    jump: function jump() {
                        _this3.props.history.push('/');
                    },
                    myLoading: !!this.props.loading.models.orderDetail // 判断loading
                })),
                _react2.default.createElement(
                    'div',
                    { className: 'status-top' },
                    _react2.default.createElement(
                        'div',
                        { className: 'icon-center orangeBg' },
                        _react2.default.createElement('div', { className: 'img-center status' + orderDetail.orderStatus }),
                        _react2.default.createElement(
                            'span',
                            { className: 'txt-only' },
                            orderStatustxt
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'goods-info' },
                    _react2.default.createElement(
                        'div',
                        { className: 'list-item' },
                        _react2.default.createElement(
                            'div',
                            { className: 'left-img' },
                            _react2.default.createElement('img', { src: orderDetail.productImg, className: 'img' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'title' },
                            orderDetail.productName
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'num' },
                            '\uFFE5',
                            orderDetail.surePrice
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'goods-desc' },
                        orderDetail.productType === 3 ? _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5145\u503C\u7C7B\u578B'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '\u5361\u5BC6'
                            )
                        ) : _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5145\u503C\u8D26\u53F7'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                orderDetail.chargeAccount
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u8BA2\u5355\u7F16\u53F7'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                orderDetail.orderNo
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u4E0B\u5355\u65F6\u95F4'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                orderDetail.orderTime
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u652F\u4ED8\u65B9\u5F0F'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                orderDetail.payType === 1 ? '微信支付' : orderDetail.payType === 2 ? '支付宝支付' : orderDetail.payType === 4 ? '芒果支付' : orderDetail.payType === 5 ? '中国银行支付' : '未支付'
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5145\u503C\u6570\u91CF'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                'x',
                                orderDetail.buyNum
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u652F\u4ED8\u91D1\u989D'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '\uFFE5',
                                orderDetail.payPrice
                            )
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5546\u54C1\u603B\u4EF7'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '\uFFE5',
                                orderDetail.totalPrice
                            )
                        ),
                        orderDetail.merCouponAmount ? _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u4F18\u60E0\u5238'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '-\uFFE5',
                                orderDetail.merCouponAmount
                            )
                        ) : '',
                        _react2.default.createElement(
                            'div',
                            { className: 'row' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u670D\u52A1\u5546\u5BB6'
                            ),
                            _react2.default.createElement(
                                'p',
                                null,
                                '\u798F\u7984\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8'
                            )
                        ),
                        detail && orderDetail.productType === 4 && orderDetail.chargeGameName ? _react2.default.createElement(
                            'div',
                            null,
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u6E38\u620F\u7C7B\u578B'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    orderDetail.gameType
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u5145\u503C\u6E38\u620F'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    orderDetail.chargeGameName
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u5145\u503C\u533A'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    orderDetail.chargeGameRegion
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'row' },
                                _react2.default.createElement(
                                    'label',
                                    null,
                                    '\u5145\u503C\u670D'
                                ),
                                _react2.default.createElement(
                                    'p',
                                    null,
                                    orderDetail.chargeGameSrv
                                )
                            )
                        ) : '',
                        orderDetail.productType === 4 && orderDetail.chargeGameName && _react2.default.createElement(
                            'div',
                            { className: 'row', onClick: this.show },
                            _react2.default.createElement(
                                'a',
                                { className: 'link' },
                                detail ? _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u6536\u8D77\u8BE6\u60C5',
                                    _react2.default.createElement(_icon2.default, { type: 'down' })
                                ) : _react2.default.createElement(
                                    'span',
                                    null,
                                    '\u67E5\u770B\u8BE6\u60C5',
                                    _react2.default.createElement(_icon2.default, { type: 'right' })
                                )
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'btn-bg' },
                    shopInfo.codeKey.toLowerCase() !== (configs.tencentSH ? configs.tencentSH.toLowerCase() : '') && _react2.default.createElement(
                        'button',
                        { className: 'toOrder', onClick: function onClick() {
                                _this3.toUrl('/');
                            } },
                        '\u8FD4\u56DE\u9996\u9875'
                    ),
                    _react2.default.createElement(
                        'button',
                        { className: 'toIndex', onClick: function onClick() {
                                _this3.toUrl('/detail?gid=' + orderDetail.childCategoryId + '&pid=' + orderDetail.productId);
                            } },
                        '\u518D\u6765\u4E00\u5355'
                    )
                ),
                showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal }),
                showLoginPageModal && _react2.default.createElement(_LoginPageModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
            );
        }
    }]);
    return OrderDetail;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.loginSuccess = function (data) {
        _this4.hideLoginModal();
        _this4.getOrderStatus();
    };

    this.hideLoginModal = function () {
        _this4.setState({
            showMallLoginModal: false,
            showLoginPageModal: false
        });
    };

    this.authorizationFailure = function () {
        var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.fuluToken = '';
        localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
        (0, _auth.isLoginOrAuth)(_this4);
    };

    this.getOrderStatus = function () {
        var oid = _this4.state.oid;

        _this4.props.dispatch({
            type: 'orderDetail/getOrderDetail',
            payload: {
                OrderNo: oid
            }
        });
    };

    this.toUrl = function (url) {
        _this4.props.history.push(url);
    };

    this.show = function () {
        var detail = _this4.state.detail;

        _this4.setState({
            detail: !detail
        });
    };
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(OrderDetail);