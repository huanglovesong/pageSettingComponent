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

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dva = require('dva');

require('./less/addressform.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressForm = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(AddressForm, _React$Component);

  function AddressForm(props) {
    (0, _classCallCheck3.default)(this, AddressForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AddressForm.__proto__ || (0, _getPrototypeOf2.default)(AddressForm)).call(this, props));

    _initialiseProps.call(_this);

    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    _this.state = {
      userInfo: userInfo
    };
    return _this;
  }

  (0, _createClass3.default)(AddressForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.dispatch({
        type: 'prize/getAddress', payload: {
          drawnId: 'd6844ca9-8087-11ea-83c4-0242ac110002'
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'addressform' },
        _react2.default.createElement(
          'button',
          { onClick: this.submitForm },
          '\u63D0\u4EA4'
        )
      );
    }
  }]);
  return AddressForm;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.submitForm = function () {
    var userInfo = _this2.state.userInfo;

    _this2.props.dispatch({
      type: 'prize/saveAddress', payload: {
        userId: userInfo.fuluId,
        mobile: '130361632256',
        receipt: '周稳',
        receiptAddress: '南极',
        eventId: 'CJ100001',
        drawnId: 'd6844ca9-8087-11ea-83c4-0242ac110002'
      }
    });
  };
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(AddressForm);