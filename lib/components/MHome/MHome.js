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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _PageSettingComPonent = require('../PageSettingComPonent');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function (_React$Component) {
   (0, _inherits3.default)(Home, _React$Component);

   function Home(props) {
      (0, _classCallCheck3.default)(this, Home);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

      _this.state = {
         allInfo: {
            pageModuleList: []
         }
      };
      return _this;
   }

   (0, _createClass3.default)(Home, [{
      key: 'render',
      value: function render() {
         var _this2 = this;

         return _react2.default.createElement(_PageSettingComPonent.Home, { history: this.props.history, pageType: 1, isSelfAuth: true, onRef: function onRef(child) {
               return _this2.child = child;
            } });
      }
   }]);
   return Home;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
   return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(Home);