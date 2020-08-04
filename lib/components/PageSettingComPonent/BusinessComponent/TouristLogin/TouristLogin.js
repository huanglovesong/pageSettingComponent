'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/touristLogin.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouristLogin = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(TouristLogin, _Component);

  function TouristLogin() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, TouristLogin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TouristLogin.__proto__ || (0, _getPrototypeOf2.default)(TouristLogin)).call.apply(_ref, [this].concat(args))), _this), _this.login = function () {
      var componentIndex = _this.props.componentIndex;

      localStorage.setItem("fuluToken", '');
      localStorage.setItem("fuluId", '');
      localStorage.setItem('userInfo', '');
      _this.props.authorizationFailurePageSetting(componentIndex);
    }, _this.changeLogin = function () {
      var componentIndex = _this.props.componentIndex;

      _this.props.showLoginModal(componentIndex);
    }, _this.getCom = function () {
      var _this$props = _this.props,
          item = _this$props.item,
          isChoose = _this$props.isChoose;
      // let pagePadding = item.modelStyle.touristLoginStyleModel.pageMargin;

      var _item$modelStyle$logi = item.modelStyle.loginStyleModel,
          themeColor = _item$modelStyle$logi.themeColor,
          displayStyle = _item$modelStyle$logi.displayStyle;
      // const style1 = {
      //   paddingLeft: `${pagePadding}px`, paddingRight: `${pagePadding}px`
      // };

      console.log(item, 12312);
      return _react2.default.createElement(
        'div',
        { className: 'tourist-login-box clearfix' },
        displayStyle === 'style1' ? _react2.default.createElement(
          'div',
          { className: 'login-con' },
          _react2.default.createElement(
            'p',
            null,
            '\u7ACB\u5373',
            _react2.default.createElement(
              'span',
              { className: 'login-text' },
              '\u767B\u5F55'
            ),
            ',\u5373\u53EF\u5151\u6362\u66F4\u591A\u7279\u6743'
          ),
          _react2.default.createElement(
            'button',
            { onClick: _this.login, style: { background: themeColor }, className: 'login-btn' },
            '\u767B\u5F55'
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'exchange-phone-con' },
          _react2.default.createElement(
            'span',
            { className: 'bind-phone' },
            '\u7ED1\u5B9A\u624B\u673A\u53F7: ',
            localStorage.getItem("fuluId") || ''
          ),
          _react2.default.createElement(
            'span',
            { className: 'changephone', onClick: _this.changeLogin },
            '\u66F4\u6362\u624B\u673A\u53F7'
          )
        )
      );
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(TouristLogin, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // 如果是登录成功，找到对应组件authKey进行接下来的步骤
      if (nextProps.pageSetting && nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
        window.location.href = './exchange';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.getCom();
    }
  }]);
  return TouristLogin;
}(_react.Component), _class.propTypes = {
  prop: _propTypes2.default
}, _temp2);


var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(TouristLogin);