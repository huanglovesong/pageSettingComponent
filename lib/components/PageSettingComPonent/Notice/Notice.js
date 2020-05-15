'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('antd-mobile/lib/icon/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./less/notice.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Notice = function (_React$Component) {
  (0, _inherits3.default)(Notice, _React$Component);

  function Notice(props) {
    (0, _classCallCheck3.default)(this, Notice);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notice.__proto__ || (0, _getPrototypeOf2.default)(Notice)).call(this, props));

    _this.scrollImgLeft = function () {
      var speed = 50;
      var MyMar = null;
      var scroll_begin = document.getElementById("scroll_begin");
      var scroll_end = document.getElementById("scroll_end");
      var scroll_div = document.getElementById("scroll_div");
      scroll_end.innerHTML = scroll_begin.innerHTML;
      function Marquee() {
        if (scroll_end.offsetWidth - scroll_div.scrollLeft <= 0) scroll_div.scrollLeft -= scroll_begin.offsetWidth;else scroll_div.scrollLeft++;
      }
      MyMar = setInterval(Marquee, speed);
      scroll_div.onmouseover = function () {
        clearInterval(MyMar);
      };
      scroll_div.onmouseout = function () {
        MyMar = setInterval(Marquee, speed);
      };
    };

    _this.setMarquee = function () {
      var item = _this.props.item;

      var arr = [item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData];
      return arr;
    };

    _this.clickNotice = function (e) {
      e.preventDefault();
      e.stopPropagation();
    };

    _this.state = {
      noticeArr: []
    };
    return _this;
  }

  (0, _createClass3.default)(Notice, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var item = this.props.item;

      var bgcolor = item.modelStyle.noticeStyleModel.background;
      document.getElementById('scroll_div').style.background = bgcolor;
      document.getElementById('marquee-content-id').style.background = bgcolor;
      this.scrollImgLeft();
    }
    //文字横向滚动

  }, {
    key: 'render',
    value: function render() {
      var item = this.props.item;

      var pagePadding = item.modelStyle.noticeStyleModel.pageMargin;
      var bgcolor = item.modelStyle.noticeStyleModel.background;
      var textColor = item.modelStyle.noticeStyleModel.textColor;
      var style1 = {
        paddingLeft: pagePadding / 50 + 'rem', paddingRight: pagePadding / 50 + 'rem',
        color: textColor
      };
      return _react2.default.createElement(
        'div',
        { className: 'notice-box', style: (0, _extends3.default)({}, style1) },
        _react2.default.createElement(
          'div',
          { className: 'marquee-content', id: 'marquee-content-id', onClick: this.clickNotice },
          _react2.default.createElement(
            'div',
            { className: 'notice-bar-icon' },
            _react2.default.createElement(_icon2.default, { type: 'voice' })
          ),
          _react2.default.createElement(
            'div',
            { id: 'scroll_div', style: { width: (750 - pagePadding * 4 - 50) / 100 + 'rem' } },
            _react2.default.createElement(
              'div',
              { id: 'scroll_begin' },
              this.setMarquee().map(function (item) {
                return _react2.default.createElement(
                  'span',
                  { 'class': 'pad_right' },
                  item
                );
              })
            ),
            _react2.default.createElement('div', { id: 'scroll_end' })
          )
        )
      );
    }
  }]);
  return Notice;
}(_react2.default.Component);

exports.default = Notice;