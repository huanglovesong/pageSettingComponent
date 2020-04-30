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

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

require('./less/mycoupons.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Discription = function (_React$Component) {
    (0, _inherits3.default)(Discription, _React$Component);

    function Discription() {
        (0, _classCallCheck3.default)(this, Discription);
        return (0, _possibleConstructorReturn3.default)(this, (Discription.__proto__ || (0, _getPrototypeOf2.default)(Discription)).apply(this, arguments));
    }

    (0, _createClass3.default)(Discription, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'disc-bg' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    jump: function jump() {
                        return _this2.props.history.push('/');
                    }
                })),
                _react2.default.createElement(
                    'article',
                    null,
                    '1\u3001  \u4F18\u60E0\u5238\u4E0D\u8BBE\u627E\u96F6\uFF0C\u4E0D\u53EF\u5151\u6362\u73B0\u91D1\u4E0D\u53EF\u63D0\u73B0\u3002',
                    _react2.default.createElement('br', null),
                    '2\u3001  \u4F18\u60E0\u5238\u4E00\u65E6\u6210\u529F\u4F7F\u7528\u4E0D\u518D\u8FD4\u8FD8\u3002',
                    _react2.default.createElement('br', null),
                    '3\u3001  \u4F18\u60E0\u5238\u8FC7\u671F\u4F5C\u5E9F\u3002',
                    _react2.default.createElement('br', null),
                    '4\u3001  \u4F18\u60E0\u5238\u62B5\u6263\u91D1\u989D\u4E0D\u53EF\u5F00\u5177\u53D1\u7968\u3002',
                    _react2.default.createElement('br', null),
                    '5\u3001  \u6B66\u6C49\u798F\u7984\u7F51\u7EDC\u79D1\u6280\u6709\u9650\u516C\u53F8\u5728\u6CD5\u5F8B\u8303\u56F4\u5185\u4FDD\u7559\u5BF9\u4F18\u60E0\u5238\u7684\u6700\u7EC8\u89E3\u91CA\u6743\u3002',
                    _react2.default.createElement('br', null),
                    '6\u3001  \u5982\u6709\u95EE\u9898\u8BF7\u54A8\u8BE2\u5BA2\u670D\u7535\u8BDD 400-001-2806',
                    _react2.default.createElement('br', null)
                )
            );
        }
    }]);
    return Discription;
}(_react2.default.Component);

exports.default = Discription;