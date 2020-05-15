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

require('./less/activeModalCom.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveModalCom = function (_React$Component) {
  (0, _inherits3.default)(ActiveModalCom, _React$Component);

  function ActiveModalCom(props) {
    (0, _classCallCheck3.default)(this, ActiveModalCom);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveModalCom.__proto__ || (0, _getPrototypeOf2.default)(ActiveModalCom)).call(this, props));

    _this.toPage = function () {
      var allInfo = _this.props.allInfo;
      // 如果是自定义链接

      if (allInfo.sidebarDetail.linkType === 1) {
        return window.location.href = allInfo.sidebarDetail.linkUrl;
      }
      // 如果是内部商品
      _this.props.history.push('/detail?gid=' + allInfo.sidebarDetail.linkUrl + '&pid=' + allInfo.sidebarDetail.linkData);
    };

    _this.state = {
      showActiveModal: false
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveModalCom, [{
    key: 'render',
    value: function render() {
      var allInfo = this.props.allInfo;

      return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
          'div',
          { className: 'active-modal-com', onClick: this.toPage },
          _react2.default.createElement('img', { className: 'active-modal-com-img', src: allInfo.sidebarDetail.imagePath })
        )
      );
    }
  }]);
  return ActiveModalCom;
}(_react2.default.Component);

exports.default = ActiveModalCom;