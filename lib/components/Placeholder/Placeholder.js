'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/placeholder.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Placeholder = function Placeholder(props) {
  return _react2.default.createElement(
    'div',
    { className: 'placeholder ' + props.className },
    _react2.default.createElement(
      'div',
      { className: 'placeholder-inner' },
      _react2.default.createElement(
        'div',
        { className: 'placeholder-icon' },
        props.icon
      ),
      _react2.default.createElement(
        'h3',
        null,
        props.slogan
      ),
      props.description !== null ? _react2.default.createElement(
        'p',
        null,
        props.description
      ) : null,
      props.extra
    )
  );
};

Placeholder.propTypes = {
  className: _propTypes2.default.string.isRequired,
  slogan: _propTypes2.default.string.isRequired,
  icon: _propTypes2.default.string,
  description: _propTypes2.default.string,
  extra: _propTypes2.default.element
};

Placeholder.defaultProps = {
  className: 'placeholder-default',
  slogan: '占位标语',
  icon: null,
  description: null,
  extra: null
};

exports.default = Placeholder;