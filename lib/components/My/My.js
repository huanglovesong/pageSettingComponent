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

require('./less/my.less');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon2 = require('../Icon');

var _Icon3 = _interopRequireDefault(_Icon2);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var My = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(My, _React$Component);

  function My(props) {
    (0, _classCallCheck3.default)(this, My);

    var _this = (0, _possibleConstructorReturn3.default)(this, (My.__proto__ || (0, _getPrototypeOf2.default)(My)).call(this, props));

    _initialiseProps.call(_this);

    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
    _this.state = {
      userInfo: userInfo,
      shopInfo: shopInfo,
      showMallLoginModal: false,
      showLoginPageModal: false,
      isOrderList: false,
      isQuanList: false
    };
    return _this;
  }

  (0, _createClass3.default)(My, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
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
    }
    // 登录成功调用

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          userInfo = _state.userInfo,
          shopInfo = _state.shopInfo,
          showMallLoginModal = _state.showMallLoginModal,
          showLoginPageModal = _state.showLoginPageModal;

      return _react2.default.createElement(
        'div',
        { className: 'my-bg' },
        _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
          jump: function jump() {
            _this2.props.history.goBack();
          }
        })),
        userInfo && userInfo.fuluId || shopInfo.merInfoTemplates.visitType == 3 ? _react2.default.createElement(
          'div',
          { className: 'banner' },
          _react2.default.createElement(
            'div',
            { className: 'head_img' },
            _react2.default.createElement(_Icon3.default, { glyph: _Icon2.user })
          ),
          _react2.default.createElement(
            'div',
            { className: 'right-txt' },
            _react2.default.createElement(
              'div',
              { className: 'h1' },
              '\u6211\u7684'
            ),
            _react2.default.createElement(
              'div',
              { className: 'h5' },
              '\u6211\u7684\u8BA2\u5355\uFF0F\u552E\u540E'
            )
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'banner2' },
          _react2.default.createElement(
            'div',
            { className: 'head_img2' },
            _react2.default.createElement(_Icon3.default, { glyph: _Icon2.user })
          ),
          _react2.default.createElement(
            'div',
            { className: 'to-login', onClick: this.toLogin },
            '\u70B9\u51FB\u767B\u5F55'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'list' },
          shopInfo.vvisitType !== 3 && _react2.default.createElement(
            'div',
            { className: 'item',
              onClick: this.toOrderList
              // onClick={() => { this.toUrl('/orderList') }}
            },
            _react2.default.createElement(_Icon3.default, { glyph: _Icon2.qbdd }),
            '\u5168\u90E8\u8BA2\u5355',
            _react2.default.createElement(
              'div',
              { className: 'right-icon' },
              _react2.default.createElement(_icon2.default, { type: 'right' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'item', onClick: function onClick() {
                _this2.toUrl('/service');
              } },
            _react2.default.createElement(_Icon3.default, { glyph: _Icon2.shfw }),
            '\u552E\u540E\u670D\u52A1',
            _react2.default.createElement(
              'div',
              { className: 'right-icon' },
              _react2.default.createElement(_icon2.default, { type: 'right' })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'item', onClick: this.toQuanList },
            _react2.default.createElement(_Icon3.default, { glyph: _Icon2.quan }),
            '\u4F18\u60E0\u5238',
            _react2.default.createElement(
              'div',
              { className: 'right-icon' },
              _react2.default.createElement(_icon2.default, { type: 'right' })
            )
          )
        ),
        _react2.default.createElement(_Footer2.default, this.props),
        showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal }),
        showLoginPageModal && _react2.default.createElement(_LoginPageModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
      );
    }
  }]);
  return My;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.toUrl = function (url) {
    _this3.props.history.push(url);
  };

  this.loginSuccess = function (data) {
    _this3.hideLoginModal();
    _this3.setState({
      userInfo: data
    });
    if (_this3.state.isOrderList) {
      _this3.toUrl('/orderList');
    } else if (_this3.state.isQuanList) {
      _this3.toUrl('/mycoupons');
    }
  };

  this.hideLoginModal = function () {
    _this3.setState({
      showMallLoginModal: false,
      showLoginPageModal: false
    });
  };

  this.toLogin = function () {
    _this3.setState({
      isOrderList: false,
      isQuanList: false
    }, function () {
      (0, _auth.isLoginOrAuth)(_this3);
    });
  };

  this.toOrderList = function () {
    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
    if (userInfo && userInfo.fuluToken) {
      _this3.props.history.push('/orderList');
    } else {
      _this3.setState({
        isOrderList: true
      }, function () {
        (0, _auth.isLoginOrAuth)(_this3);
      });
    }
  };

  this.toQuanList = function () {
    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
    if (userInfo && userInfo.fuluToken) {
      _this3.props.history.push('/mycoupons');
    } else {
      _this3.setState({
        isQuanList: true
      }, function () {
        (0, _auth.isLoginOrAuth)(_this3);
      });
    }
  };
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(My);