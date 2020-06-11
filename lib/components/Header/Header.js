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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Loading = require('../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

require('./less/header.less');

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header(props) {
        (0, _classCallCheck3.default)(this, Header);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).call(this, props));

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        _this.state = {
            hasHead: false,
            shopInfo: shopInfo
        };
        return _this;
    }

    (0, _createClass3.default)(Header, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 获取商户信息
            var shopInfo = this.state.shopInfo;

            if (shopInfo.infoState === 0) {
                return location.href = "/nothing";
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _state = this.state,
                hasHead = _state.hasHead,
                shopInfo = _state.shopInfo;

            if (shopInfo.codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
                var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision);
                if (bankVision === -1) {
                    hasHead = true;
                } else {
                    hasHead = false;
                }
            } else {
                hasHead = false;
            }
            this.setState({
                hasHead: hasHead
            }, function () {
                if (hasHead) {
                    $("#app").css('paddingTop', '.88rem');
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state2 = this.state,
                shopInfo = _state2.shopInfo,
                hasHead = _state2.hasHead;

            return _react2.default.createElement(
                'div',
                null,
                hasHead ? _react2.default.createElement(
                    'div',
                    { className: 'header-bg clearfix' },
                    this.props.location.pathname !== '/' ? _react2.default.createElement(
                        'button',
                        {
                            className: 'header-left',
                            onClick: function onClick() {
                                return _this2.props.jump ? _this2.props.jump() : _this2.props.history.goBack(-1);
                            }
                        },
                        _react2.default.createElement(_Icon2.default, { glyph: _Icon.back }),
                        '\u8FD4\u56DE'
                    ) : _react2.default.createElement('button', {
                        className: 'header-left'
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'header-center' },
                        shopInfo.merInfoTemplates.infoTitle
                    ),
                    _react2.default.createElement('div', { className: 'header-right' })
                ) : '',
                this.props.myLoading && _react2.default.createElement(_Loading2.default, null)
            );
        }
    }]);
    return Header;
}(_react2.default.Component);

exports.default = Header;