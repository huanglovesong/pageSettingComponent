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
      var scroll_begin = _this.refs.scroll_begin;
      var scroll_end = _this.refs.scroll_end;
      var scroll_div = _this.refs.scroll_div;
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

      var arr = [];
      if (item.moduleDataList.length) {
        arr = [item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData, item.moduleDataList[0].textData];
      }

      return arr;
    };

    _this.clickNotice = function (e) {
      // e.preventDefault();
      // e.stopPropagation()
      // 友盟埋点公告点击
      _this.props.clickUmBuired("组件-公告");
    };

    _this.deleteInfo = function () {
      _this.setState({
        showDeleteIcon: false
      });
    };

    _this.toUrl = function (linkurl) {
      linkurl && (window.location.href = linkurl);
    };

    _this.state = {
      noticeArr: [],
      showDeleteIcon: true
    };
    return _this;
  }

  (0, _createClass3.default)(Notice, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var item = this.props.item;

      var bgcolor = item.modelStyle.noticeStyleModel.background;
      this.refs.scroll_div.style.background = bgcolor;
      this.refs.marqueeContentId.style.background = bgcolor;
      this.scrollImgLeft();
    }
    //文字横向滚动

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var item = this.props.item;
      var _item$modelStyle$noti = item.modelStyle.noticeStyleModel,
          textColor = _item$modelStyle$noti.textColor,
          bottomMargin = _item$modelStyle$noti.bottomMargin,
          topMargin = _item$modelStyle$noti.topMargin,
          jumpStyle = _item$modelStyle$noti.jumpStyle,
          pageMargin = _item$modelStyle$noti.pageMargin;
      var _item$moduleDataList$ = item.moduleDataList[0],
          textDataLong = _item$moduleDataList$.textDataLong,
          linkurl = _item$moduleDataList$.linkurl;

      var style1 = {
        paddingLeft: pageMargin / 50 + 'rem', paddingRight: pageMargin / 50 + 'rem',
        color: textColor, // 兼容之前的和现在的数据。由于新增了topMargin和bottomMargin，所以进行兼容
        paddingTop: (topMargin === null ? 5 : topMargin) / 50 + 'rem', paddingBottom: (bottomMargin === null ? 5 : bottomMargin) / 50 + 'rem'
      };
      var showDeleteIcon = this.state.showDeleteIcon;

      if (!showDeleteIcon) {
        return '';
      }
      return _react2.default.createElement(
        'div',
        { className: 'notice-box clearfix', style: (0, _extends3.default)({}, style1) },
        _react2.default.createElement(
          'div',
          { className: 'marquee-content', ref: 'marqueeContentId', onClick: this.clickNotice,
            style: { paddingRight: jumpStyle === 'rightIco' || jumpStyle === 'closeIco' ? '1rem' : '' } },
          _react2.default.createElement(
            'div',
            { className: 'notice-bar-icon' },
            textDataLong ? _react2.default.createElement('img', { src: textDataLong }) : _react2.default.createElement('img', { src: require('../imgs/tips.png') }),
            jumpStyle === 'rightIco' && _react2.default.createElement('img', { src: require('../imgs/arrow.png'), style: { position: 'absolute', right: (pageMargin + 10) / 50 + 'rem', cursor: 'pointer' },
              onClick: function onClick() {
                return _this2.toUrl(linkurl);
              } }),
            jumpStyle === 'closeIco' && _react2.default.createElement('img', { src: require('../imgs/close.png'), style: { position: 'absolute', right: (pageMargin + 10) / 50 + 'rem', cursor: 'pointer' },
              onClick: this.deleteInfo })
          ),
          _react2.default.createElement(
            'div',
            { ref: 'scroll_div', className: 'scroll_div', style: {
                width: (jumpStyle === 'rightIco' || jumpStyle === 'closeIco' ? (275 - pageMargin * 2) / 50 : (325 - pageMargin * 2) / 50) + 'rem'
              } },
            _react2.default.createElement(
              'div',
              { ref: 'scroll_begin', className: 'scroll_begin' },
              this.setMarquee().map(function (item) {
                return _react2.default.createElement(
                  'span',
                  { 'class': 'pad_right' },
                  item
                );
              })
            ),
            _react2.default.createElement('div', { ref: 'scroll_end', className: 'scroll_end' })
          )
        )
      );
    }
  }]);
  return Notice;
}(_react2.default.Component);

exports.default = Notice;