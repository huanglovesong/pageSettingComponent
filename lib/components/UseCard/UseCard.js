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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/useCard.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UseCard = function (_React$Component) {
    (0, _inherits3.default)(UseCard, _React$Component);

    function UseCard(props) {
        (0, _classCallCheck3.default)(this, UseCard);

        var _this = (0, _possibleConstructorReturn3.default)(this, (UseCard.__proto__ || (0, _getPrototypeOf2.default)(UseCard)).call(this, props));

        _this.state = {};
        return _this;
    }

    (0, _createClass3.default)(UseCard, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'use-card clearfix' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({
                    title: '\u63D0\u53D6\u5361\u5BC6\u6B65\u9AA4'
                }, this.props, {
                    jump: function jump() {
                        return _this2.props.history.goBack();
                    }
                }))
            );
        }
    }]);
    return UseCard;
}(_react2.default.Component);

exports.default = UseCard;