'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _inputItem = require('antd-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

require('antd-mobile/lib/modal/style');

require('antd-mobile/lib/button/style');

require('antd-mobile/lib/input-item/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcForm = require('rc-form');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/mallLoginModal.less');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RegTel = /^1(3|4|5|6|7|8|9)\d{9}$/;
var timer = null;

var LoginModal = function (_React$Component) {
    (0, _inherits3.default)(LoginModal, _React$Component);

    function LoginModal(props) {
        (0, _classCallCheck3.default)(this, LoginModal);

        // const url = parse(props.location.search, true);
        // const { uri } = url.query;
        var _this = (0, _possibleConstructorReturn3.default)(this, (LoginModal.__proto__ || (0, _getPrototypeOf2.default)(LoginModal)).call(this, props));

        _this.changeInput = function (val, type) {
            _this.setState((0, _defineProperty3.default)({}, type, val));
        };

        _this.onLogin = function () {
            var _this$state = _this.state,
                mobile = _this$state.mobile,
                code = _this$state.code;

            if (!RegTel.test(mobile)) return _toast2.default.info('请输入正确的手机号码！');
            if (!code) return _toast2.default.info('请输入验证码！');
            var postD = {
                mobile: mobile.replace(/\s/g, ''),
                verCode: code
            };
            var dispatch = _this.props.dispatch;

            dispatch({ type: 'login/touristlogin', payload: postD });
        };

        _this.sendCode = function () {
            var self = _this;
            _this.setState({
                sendCodeTime: 60
            });
            timer = setInterval(function () {
                var sendCodeTime = _this.state.sendCodeTime;

                if (sendCodeTime === 1) {
                    clearInterval(timer);
                }
                sendCodeTime -= 1;
                self.setState({
                    sendCodeTime: sendCodeTime
                });
            }, 1000);
        };

        _this.sendSmsCode = function () {
            var mobile = _this.state.mobile;

            if (!RegTel.test(mobile)) {
                return _toast2.default.info('请输入正确的手机号码！');
            }
            var dispatch = _this.props.dispatch;

            var postD = {
                mobile: mobile.replace(/\s/g, ''),
                loginKey: 'login'
            };
            dispatch({ type: 'login/getCode', payload: postD });
        };

        _this.onClose = function () {};

        _this.state = {
            mobile: '',
            code: '',
            sendCodeTime: 0
            // uri
        };
        return _this;
    }

    (0, _createClass3.default)(LoginModal, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var props = this.props;
            var _nextProps$login = nextProps.login,
                touristlogin = _nextProps$login.touristlogin,
                getCode = _nextProps$login.getCode;

            if (getCode !== props.login.getCode) {
                var code = getCode.code,
                    message = getCode.message;

                if (code === '1000') {
                    this.sendCode();
                    _toast2.default.info('\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001\u81F3' + this.state.mobile);
                } else {
                    _toast2.default.fail(message);
                }
            }
            // 登录成功
            if (touristlogin !== this.props.login.touristlogin) {
                var _code = touristlogin.code,
                    _message = touristlogin.message,
                    data = touristlogin.data;

                if (_code === '1000') {
                    _toast2.default.success('登录成功！');
                    localStorage.setItem('userInfo', (0, _stringify2.default)(data));
                    this.props.loginSuccess(data);
                } else {
                    _toast2.default.fail(_message);
                }
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearInterval(timer);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var getFieldProps = this.props.form.getFieldProps;
            var _state = this.state,
                mobile = _state.mobile,
                code = _state.code,
                sendCodeTime = _state.sendCodeTime;

            return _react2.default.createElement(
                _modal2.default,
                {
                    className: 'mall-login-modal',
                    visible: true,
                    transparent: true,
                    width: '6.16rem',
                    maskClosable: false,
                    closable: true,
                    onClose: this.props.hideLoginModal,
                    title: '\u77ED\u4FE1\u9A8C\u8BC1\u7801\u767B\u5F55',

                    footer: [],
                    wrapProps: { onTouchStart: this.onWrapTouchStart },
                    afterClose: function afterClose() {
                        alert('afterClose');
                    }
                },
                _react2.default.createElement(
                    'div',
                    { className: 'login-bg' },
                    _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps('mobile'), {
                        placeholder: '\u8BF7\u8F93\u5165\u624B\u673A\u53F7',
                        onChange: function onChange(val) {
                            _this2.changeInput(val, 'mobile');
                        },
                        value: mobile,
                        onClick: function onClick(e) {
                            e.currentTarget.focus();
                        },
                        maxLength: '11'
                    })),
                    _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps('code'), {
                        placeholder: '\u8F93\u5165\u624B\u673A\u9A8C\u8BC1\u7801',
                        type: 'number',
                        maxLength: '4',
                        onChange: function onChange(val) {
                            _this2.changeInput(val, 'code');
                        },
                        value: code,
                        onClick: function onClick(e) {
                            e.currentTarget.focus();
                        },
                        extra: _react2.default.createElement(
                            _button2.default,
                            {
                                className: 'link',
                                onClick: this.sendSmsCode,
                                disabled: !RegTel.test(mobile) || RegTel.test(mobile) && sendCodeTime > 1
                            },
                            sendCodeTime > 1 ? _react2.default.createElement(
                                'span',
                                null,
                                '\u91CD\u65B0\u83B7\u53D6(',
                                sendCodeTime,
                                's)'
                            ) : _react2.default.createElement(
                                'span',
                                null,
                                '\u83B7\u53D6\u9A8C\u8BC1\u7801'
                            )
                        )
                    })),
                    _react2.default.createElement(
                        'div',
                        { className: 'btn-bg' },
                        _react2.default.createElement(
                            'button',
                            { className: 'btn', onClick: this.onLogin },
                            '\u767B\u5F55'
                        )
                    )
                )
            );
        }
    }]);
    return LoginModal;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)((0, _rcForm.createForm)()(LoginModal));