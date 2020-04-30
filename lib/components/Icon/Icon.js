'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/icon.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Icon = function Icon(_ref) {
  var glyph = _ref.glyph,
      className = _ref.className,
      width = _ref.width,
      height = _ref.height;
  return _react2.default.createElement(
    'svg',
    { className: className, width: width, height: height, viewBox: glyph.viewBox },
    _react2.default.createElement('use', { xlinkHref: '#' + glyph.id })
  );
};

Icon.propTypes = {
  glyph: _propTypes2.default.shape().isRequired,
  className: _propTypes2.default.string,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number
};

Icon.defaultProps = {
  glyph: {},
  className: 'icon',
  width: 1,
  height: 1
};

exports.default = Icon;