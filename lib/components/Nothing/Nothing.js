'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/nothing.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nothing = function Nothing(props) {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'div',
      { className: 'nothing' },
      _react2.default.createElement('div', { className: 'no-bg' }),
      '\u8BE5\u9875\u9762\u8BBF\u95EE\u5730\u5740\u65E0\u6548~'
    )
  );
};

exports.default = Nothing;