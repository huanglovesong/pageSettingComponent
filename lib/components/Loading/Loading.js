'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd-mobile/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/loading.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_React$Component) {
  (0, _inherits3.default)(Loading, _React$Component);

  function Loading() {
    (0, _classCallCheck3.default)(this, Loading);
    return (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || (0, _getPrototypeOf2.default)(Loading)).apply(this, arguments));
  }

  (0, _createClass3.default)(Loading, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'load-bg' },
        _react2.default.createElement(
          'div',
          { className: 'load-img' },
          _react2.default.createElement(_icon2.default, { type: 'loading', style: { width: '0.72rem', height: '0.72rem' } })
        ),
        '\u52A0\u8F7D\u4E2D...'
      );
    }
  }]);
  return Loading;
}(_react2.default.Component);

exports.default = Loading;