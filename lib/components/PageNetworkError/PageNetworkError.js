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

require('./less/pageNetworkError.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageNetworkError = function PageNetworkError(props) {
  return _react2.default.createElement(_Placeholder2.default, {
    className: 'placeholder-network-error',
    slogan: '\u770B\u4E0D\u89C1\u6211\u4E86\u5427\uFF01\u70B9\u51FB\u5237\u65B0\u8BD5\u8BD5\uFF01',
    extra: _react2.default.createElement(
      'a',
      { href: 'javascript:;', onClick: function onClick() {
          return window.location.reload();
        } },
      '\u5237\u65B0'
    )
  });
};

exports.default = PageNetworkError;