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

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

require('./less/service.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Service = function (_React$Component) {
    (0, _inherits3.default)(Service, _React$Component);

    function Service(props) {
        (0, _classCallCheck3.default)(this, Service);

        // 获取商户信息
        var _this = (0, _possibleConstructorReturn3.default)(this, (Service.__proto__ || (0, _getPrototypeOf2.default)(Service)).call(this, props));

        _this.onCopy = function (text, result) {
            _this.setState({ copied: true });
            if (result) {
                _toast2.default.info('复制成功');
            }
        };

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            shopInfo: shopInfo,
            copied: false
        };
        return _this;
    }

    (0, _createClass3.default)(Service, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var shopInfo = this.state.shopInfo;

            return _react2.default.createElement(
                'div',
                { className: 'service-bg clearfix' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    jump: function jump() {
                        return _this2.props.history.goBack();
                    }
                })),
                _react2.default.createElement(
                    'div',
                    { className: 'service-con' },
                    _react2.default.createElement(
                        'div',
                        { className: 'service-top' },
                        _react2.default.createElement(
                            'div',
                            { className: 'ser-txt' },
                            _react2.default.createElement(
                                'div',
                                { className: 'header' },
                                _react2.default.createElement(_Icon2.default, { glyph: _Icon.user })
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'h1' },
                                '\u552E\u540E\u670D\u52A1'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'h5' },
                                '7*24\u5C0F\u65F6\u4E3A\u60A8\u670D\u52A1'
                            )
                        )
                    ),
                    shopInfo && shopInfo.merInfoTemplates.merTemplatesMobile ? _react2.default.createElement(
                        'div',
                        { className: 's-call' },
                        _react2.default.createElement(
                            'div',
                            { className: 'call-txt' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5168\u56FD\u514D\u8D39\u7535\u8BDD'
                            ),
                            _react2.default.createElement(
                                'a',
                                { href: 'tel:' + shopInfo.merInfoTemplates.merTemplatesMobile },
                                shopInfo.merInfoTemplates.merTemplatesMobile
                            )
                        )
                    ) : '',
                    shopInfo && shopInfo.merInfoTemplates.merTemplatesQq ? _react2.default.createElement(
                        'div',
                        { className: 's-call' },
                        _react2.default.createElement(
                            'div',
                            { className: 'call-txt' },
                            _react2.default.createElement(
                                'label',
                                null,
                                '\u5BA2\u670D / \u552E\u540E\u5B98\u65B9QQ'
                            ),
                            _react2.default.createElement(
                                _reactCopyToClipboard.CopyToClipboard,
                                {
                                    text: shopInfo.merInfoTemplates.merTemplatesQq,
                                    onCopy: this.onCopy
                                },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    shopInfo.merInfoTemplates.merTemplatesQq
                                )
                            )
                        )
                    ) : ''
                )
            );
        }
    }]);
    return Service;
}(_react2.default.Component);

exports.default = Service;