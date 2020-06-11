'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/footer.less');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
    (0, _inherits3.default)(Footer, _React$Component);

    function Footer(props) {
        (0, _classCallCheck3.default)(this, Footer);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Footer.__proto__ || (0, _getPrototypeOf2.default)(Footer)).call(this, props));

        _this.choose = function (pathname) {
            _this.setState({
                pathname: pathname
            }, function () {
                _this.props.history.push(pathname);
            });
        };

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            pathname: props.location.pathname,
            shopInfo: shopInfo
        };
        return _this;
    }

    (0, _createClass3.default)(Footer, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                pathname = _state.pathname,
                shopInfo = _state.shopInfo;

            return _react2.default.createElement(
                'div',
                null,
                shopInfo.merInfoTemplates.visitType !== 3 ? _react2.default.createElement(
                    'div',
                    { className: 'footer-bg clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: pathname === '/' ? "item active" : "item", onClick: function onClick() {
                                _this2.choose('/');
                            } },
                        _react2.default.createElement(_Icon2.default, { glyph: _Icon.home }),
                        '\u9996\u9875'
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: pathname === '/my' ? "item active" : "item", onClick: function onClick() {
                                _this2.choose('/my');
                            } },
                        _react2.default.createElement(_Icon2.default, { glyph: _Icon.user }),
                        '\u6211\u7684'
                    )
                ) : ''
            );
        }
    }]);
    return Footer;
}(_react2.default.Component);

exports.default = Footer;