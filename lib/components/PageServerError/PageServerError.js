'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./less/pageServerError.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageServerError = function PageServerError(props) {
  return _react2.default.createElement(Placeholder, {
    className: 'placeholder-500',
    slogan: '\u542C\u7237\u7237\u6211\u5531\u5B8C\u4E00\u66F2\uFF0C\u5DE5\u7A0B\u72EE\u5C31\u56DE\u6765\u4E86\uFF01',
    extra: _react2.default.createElement(
      'a',
      { href: '/' },
      '\u8FD4\u56DE\u9996\u9875'
    )
  });
};

exports.default = PageServerError;