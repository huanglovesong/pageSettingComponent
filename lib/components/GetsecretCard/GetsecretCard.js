'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inputItem = require('antd-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

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

require('antd-mobile/lib/input-item/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/getsecretCard.less');

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _rcForm = require('rc-form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GetsecretCard = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(GetsecretCard, _React$Component);

    function GetsecretCard(props) {
        (0, _classCallCheck3.default)(this, GetsecretCard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GetsecretCard.__proto__ || (0, _getPrototypeOf2.default)(GetsecretCard)).call(this, props));

        _initialiseProps.call(_this);

        var url = (0, _urlParse2.default)(props.location.search, true);
        var _url$query = url.query,
            oid = _url$query.oid,
            pid = _url$query.pid,
            mid = _url$query.mid;

        var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            oid: oid,
            pid: pid,
            mid: mid,
            copied: false,
            card: [],
            goodsDetail: {},
            hasError: false,
            extractCode: '',
            shopInfo: shopInfo,
            isPatchCard: false,
            hotPro: []
        };
        return _this;
    }

    (0, _createClass3.default)(GetsecretCard, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _state = this.state,
                pid = _state.pid,
                mid = _state.mid,
                shopInfo = _state.shopInfo;

            this.props.dispatch({
                type: 'detail/getProductById',
                payload: {
                    productId: pid,
                    childCategoryId: mid
                }
            });
            this.getHotCategory();
            if (shopInfo.codeKey.toLowerCase() === (configs.xiaomi ? configs.xiaomi.toLowerCase() : '')) {
                this.getsecretCard();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var props = this.props;
            var _nextProps$detail = nextProps.detail,
                getProductById = _nextProps$detail.getProductById,
                getSecretCard = _nextProps$detail.getSecretCard;
            var getHotCategory = nextProps.pay.getHotCategory;

            if (getHotCategory !== props.pay.getHotCategory) {
                var code = getHotCategory.code,
                    data = getHotCategory.data,
                    message = getHotCategory.message;

                if (code === '1000') {
                    this.setState({
                        hotPro: data.list
                    });
                }
            }
            if (getProductById !== props.detail.getProductById) {
                var _code = getProductById.code,
                    _data = getProductById.data,
                    _message = getProductById.message;

                if (_code === '1000') {
                    this.setState({
                        goodsDetail: _data ? _data : {}
                    });
                } else {
                    _toast2.default.info(_message);
                }
            }
            if (getSecretCard !== props.detail.getSecretCard) {
                var _code2 = getSecretCard.code,
                    _data2 = getSecretCard.data,
                    _message2 = getSecretCard.message;

                if (_code2 === '1000') {
                    if (_data2 && _data2.list) {
                        this.setState({
                            card: _data2.list
                        });
                    } else {
                        this.setState({
                            card: []
                        });
                        _toast2.default.info(getSecretCard.message);
                    }
                } else {
                    _toast2.default.info(_message2);
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state2 = this.state,
                goodsDetail = _state2.goodsDetail,
                extractCode = _state2.extractCode,
                hasError = _state2.hasError,
                card = _state2.card,
                isPatchCard = _state2.isPatchCard,
                shopInfo = _state2.shopInfo,
                hotPro = _state2.hotPro;
            var getFieldProps = this.props.form.getFieldProps;

            return _react2.default.createElement(
                'div',
                { className: 'secret-card clearfix' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({
                    title: '\u63D0\u53D6\u5361\u5BC6'
                }, this.props, {
                    jump: function jump() {
                        return _this2.props.history.goBack();
                    },
                    myLoading: !!(this.props.loading && this.props.loading.effects['detail/getProductById']) // 判断loading
                })),
                _react2.default.createElement(
                    'div',
                    { className: 'secret-con' },
                    _react2.default.createElement(
                        'div',
                        { className: 'd-info' },
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-img' },
                            _react2.default.createElement('img', { src: goodsDetail.iconPath })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'menu-t' },
                            _react2.default.createElement(
                                'div',
                                { className: 'name' },
                                goodsDetail.productName
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'price' },
                                goodsDetail.price,
                                _react2.default.createElement(
                                    'small',
                                    null,
                                    '\u5143'
                                ),
                                _react2.default.createElement(
                                    's',
                                    null,
                                    goodsDetail.faceValue,
                                    '\u5143'
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'secret-account' },
                        shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
                            'div',
                            { className: 'line d-account' },
                            _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps('extractCode'), {
                                placeholder: '\u8F93\u51656\u4F4D\u6570\u5B57\u63D0\u53D6\u7801',
                                clear: true,
                                className: 'input-bg',
                                type: 'number',
                                value: extractCode,
                                onChange: this.onChange
                            })),
                            hasError ? _react2.default.createElement(
                                'p',
                                { className: 'input-tips redfont' },
                                '\u8BF7\u8F93\u51656\u4F4D\u6570\u5B57\u7684\u63D0\u53D6\u7801'
                            ) : _react2.default.createElement(
                                'p',
                                { className: 'input-tips' },
                                '\u8BF7\u8F93\u5165\u60A8\u5728\u8D2D\u4E70\u5546\u54C1\u65F6\u586B\u5199\u76846\u4F4D\u6570\u5B57\u5361\u5BC6\u63D0\u53D6\u7801'
                            )
                        ),
                        shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
                            'button',
                            { disabled: !extractCode || extractCode.length !== 6 || !!this.props.loading.models.detail, className: 'btn-theme get-btn', onClick: this.getsecretCard },
                            '\u7ACB\u5373\u63D0\u53D6'
                        )
                    ),
                    card && card.length ? _react2.default.createElement(
                        'div',
                        { className: 'card-info' },
                        _react2.default.createElement(
                            'h2',
                            null,
                            '\u5361\u5BC6\u4FE1\u606F'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'crad-con' },
                            card.map(function (v, i) {
                                return _react2.default.createElement(
                                    'div',
                                    { className: 'card-line', key: i },
                                    shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
                                        'p',
                                        null,
                                        '\u5361\u53F7\uFF1A',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            v.cardNumber
                                        ),
                                        _react2.default.createElement(
                                            _reactCopyToClipboard.CopyToClipboard,
                                            {
                                                text: v.cardNumber,
                                                onCopy: _this2.onCopy
                                            },
                                            _react2.default.createElement(
                                                'button',
                                                null,
                                                '\u590D\u5236'
                                            )
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'p',
                                        null,
                                        '\u5BC6\u7801\uFF1A',
                                        _react2.default.createElement(
                                            'span',
                                            null,
                                            v.cardPwd
                                        ),
                                        _react2.default.createElement(
                                            _reactCopyToClipboard.CopyToClipboard,
                                            {
                                                text: v.cardPwd,
                                                onCopy: _this2.onCopy
                                            },
                                            _react2.default.createElement(
                                                'button',
                                                null,
                                                '\u590D\u5236'
                                            )
                                        )
                                    )
                                );
                            }),
                            _react2.default.createElement(
                                'div',
                                { className: 'tips' },
                                '\u8BF7\u5728',
                                _react2.default.createElement(
                                    'span',
                                    { className: 'themefont' },
                                    '\u5B98\u65B9\u6307\u5B9A\u5145\u503C\u6E20\u9053'
                                ),
                                '\u5904\u5145\u503C\uFF0C\u5207\u52FF\u901A\u8FC7\u4ED6\u4EBA\u63D0\u4F9B\u7684\u7F51\u7AD9\u6216\u5145\u503C\u6E20\u9053\u8FDB\u884C\u5145\u503C\u64CD\u4F5C'
                            )
                        )
                    ) : '',
                    _react2.default.createElement(
                        'div',
                        { className: 'use-info' },
                        _react2.default.createElement(
                            'p',
                            null,
                            goodsDetail.content && goodsDetail.content.split('|').map(function (v, i) {
                                return _react2.default.createElement('div', { key: i, dangerouslySetInnerHTML: {
                                        __html: v
                                    } });
                            })
                        )
                    ),
                    shopInfo.codeKey.toLowerCase() === (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
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
                            hotPro && hotPro[0] && hotPro.map(function (item, index) {
                                return index < 3 && _react2.default.createElement(
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
                )
            );
        }
    }]);
    return GetsecretCard;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getHotCategory = function () {
        var _state3 = _this3.state,
            oid = _state3.oid,
            shopInfo = _state3.shopInfo;

        _this3.props.dispatch({
            type: 'pay/getHotCategory',
            payload: {
                merchantId: shopInfo.merInfoId
            }
        });
    };

    this.onChange = function (value) {
        if (value.replace(/\s/g, '').length !== 6) {
            _this3.setState({
                hasError: true
            });
        } else {
            _this3.setState({
                hasError: false
            });
        }
        _this3.setState({
            extractCode: value
        });
    };

    this.onCopy = function (text, result) {
        _this3.setState({ copied: true });
        if (result) {
            _toast2.default.success('已复制');
        }
    };

    this.getsecretCard = function () {
        var _state4 = _this3.state,
            oid = _state4.oid,
            extractCode = _state4.extractCode,
            shopInfo = _state4.shopInfo;

        _this3.props.dispatch({
            type: 'detail/getSecretCard',
            payload: {
                orderNo: oid,
                extractCode: shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') ? extractCode : '123456'
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

exports.default = (0, _dva.connect)(mapStateToProps)((0, _rcForm.createForm)()(GetsecretCard));