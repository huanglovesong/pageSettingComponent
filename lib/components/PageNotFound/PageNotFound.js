'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Placeholder = require('../Placeholder');

var _Placeholder2 = _interopRequireDefault(_Placeholder);

require('./less/pageNotFound.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageNotFound = function PageNotFound(props) {
  return _react2.default.createElement(_Placeholder2.default, {
    className: 'placeholder-404',
    slogan: '\u86C7\u7CBE\u51FA\u6765\u6363\u4E71\u5566\uFF01 \u5FEB\u8DD1\u5440\uFF01\uFF01',
    extra: _react2.default.createElement(
      'a',
      { href: '/' },
      '\u8FD4\u56DE\u9996\u9875'
    )
  });
};

exports.default = PageNotFound;