'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./less/pageForbidden.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageForbidden = function PageForbidden(props) {
  return _react2.default.createElement(Placeholder, {
    className: 'placeholder-403',
    slogan: '\u5973\u6C64\u90E8\uFF0C\u4F60\u65E0\u6743\u8BBF\u95EE\u8BE5\u9875\u9762',
    extra: _react2.default.createElement(
      'a',
      { href: '/' },
      '\u8FD4\u56DE\u9996\u9875'
    )
  });
};

exports.default = PageForbidden;