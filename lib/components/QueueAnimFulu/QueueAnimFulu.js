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

var _rcQueueAnim = require('rc-queue-anim');

var _rcQueueAnim2 = _interopRequireDefault(_rcQueueAnim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QueueAnimFulu = function (_React$Component) {
  (0, _inherits3.default)(QueueAnimFulu, _React$Component);

  function QueueAnimFulu() {
    (0, _classCallCheck3.default)(this, QueueAnimFulu);
    return (0, _possibleConstructorReturn3.default)(this, (QueueAnimFulu.__proto__ || (0, _getPrototypeOf2.default)(QueueAnimFulu)).apply(this, arguments));
  }

  (0, _createClass3.default)(QueueAnimFulu, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _rcQueueAnim2.default,
        { duration: 200, type: this.props.type || 'bottom' },
        this.props.children
      );
    }
  }]);
  return QueueAnimFulu;
}(_react2.default.Component);

exports.default = QueueAnimFulu;