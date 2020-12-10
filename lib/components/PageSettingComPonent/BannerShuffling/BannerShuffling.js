'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _carousel = require('antd-mobile/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

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

var _class, _temp2;

require('antd-mobile/lib/carousel/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/bannerShuffling.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BannerShufflingBox = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(BannerShufflingBox, _Component);

  function BannerShufflingBox() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, BannerShufflingBox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BannerShufflingBox.__proto__ || (0, _getPrototypeOf2.default)(BannerShufflingBox)).call.apply(_ref, [this].concat(args))), _this), _this.toBanner = function (v) {
      // 友盟埋点banner位点击
      _this.props.clickUmBuired('banner位');
      if (v.bannerType === 1) {
        _this.toPageFuluIdAndToken(v);
        // window.open(v.linkurl, '_blank')
      } else if (v.bannerType === 2 && v.ifSkip === 1) {
        _this.props.history.push('/detail?gid=' + v.childCategoryId + '&pid=' + v.productId);
      }
    }, _this.toPageFuluIdAndToken = function (v) {
      var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
      var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
      var fuluId = userInfo.fuluId,
          fuluToken = userInfo.fuluToken;
      // 如果需要页面跳转添加fuluId和token

      var flag = configs.codeIdFuluIdAndToken ? configs.codeIdFuluIdAndToken.some(function (item) {
        return item.toLowerCase() === shopInfo.codeKey.toLowerCase();
      }) : false;
      var linkurl = v.linkurl;

      if (linkurl) {
        if (flag) {
          // 如果存在?符号
          if (linkurl.indexOf('?') !== -1) {
            linkurl = '' + linkurl + (fuluId ? '&fuluId=' + fuluId : '') + (fuluToken ? '&fuluToken=' + fuluToken : '');
          }
          // 如果不存在
          else {
              linkurl = '' + linkurl + (fuluId ? '?fuluId=' + fuluId : '') + (fuluToken ? '&fuluToken=' + fuluToken : '');
            }
        }
        window.location.href = linkurl;
      }
    }, _this.getCom = function () {
      var item = _this.props.item;

      if (!item.moduleDataList.length) {
        return _react2.default.createElement(
          'div',
          { className: 'banner-shuffling-box' },
          _react2.default.createElement(
            _carousel2.default,
            { autoplay: true },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement('img', { className: 'banner-img', src: 'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png' })
            )
          )
        );
      } else {
        var _item$modelStyle$bann = item.modelStyle.bannerRollStyleModel,
            _item$modelStyle$bann2 = _item$modelStyle$bann.pageMargin,
            pageMargin = _item$modelStyle$bann2 === undefined ? 0 : _item$modelStyle$bann2,
            isHideText = _item$modelStyle$bann.isHideText,
            _item$modelStyle$bann3 = _item$modelStyle$bann.topMargin,
            topMargin = _item$modelStyle$bann3 === undefined ? 0 : _item$modelStyle$bann3,
            _item$modelStyle$bann4 = _item$modelStyle$bann.bottomMargin,
            bottomMargin = _item$modelStyle$bann4 === undefined ? 0 : _item$modelStyle$bann4,
            imageChamfer = _item$modelStyle$bann.imageChamfer,
            borderRadius = _item$modelStyle$bann.borderRadius;

        var style = {

          boxShadow: item.modelStyle.bannerRollStyleModel.imageStyle === 'Projection' ? 'rgba(47,54,70,0.1) 0px 0px .2rem' : '',
          padding: '0px ' + pageMargin / 50 + 'rem',
          paddingTop: topMargin / 50 + 'rem', paddingBottom: bottomMargin / 50 + 'rem'
        };
        return _react2.default.createElement(
          'div',
          { className: 'banner-shuffling-box clearfix', style: (0, _extends3.default)({}, style) },
          _react2.default.createElement(
            _carousel2.default,
            { autoplay: true, infinite: true },
            item.moduleDataList.map(function (nowItem) {
              return _react2.default.createElement(
                'li',
                { style: { width: '100%' } },
                _react2.default.createElement(
                  'a',
                  {
                    key: nowItem.productId,
                    onClick: function onClick() {
                      _this.toBanner(nowItem);
                    },
                    style: { display: 'inline-block', width: '100%' }
                  },
                  _react2.default.createElement('img', {
                    src: nowItem.bannerUrl,
                    alt: '',
                    className: 'banner-shuffling-box-img',
                    style: {
                      width: '100%', verticalAlign: 'top',
                      borderRadius: borderRadius === null ? '.16rem' : borderRadius / 50 + 'rem'
                    }

                  })
                )
              );
            })
          ),
          !isHideText && _react2.default.createElement(
            'div',
            { className: 'advantage' },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Icon2.default, { glyph: _Icon.zpbz }),
              '\u6B63\u54C1\u4FDD\u8BC1'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Icon2.default, { glyph: _Icon.zxzk }),
              '\u4E13\u4EAB\u6298\u6263'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Icon2.default, { glyph: _Icon.jstk }),
              '\u6025\u901F\u5230\u8D26'
            ),
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(_Icon2.default, { glyph: _Icon.shwy }),
              '\u552E\u540E\u65E0\u5FE7'
            )
          )
        );
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(BannerShufflingBox, [{
    key: 'render',
    value: function render() {
      return this.getCom();
    }
  }]);
  return BannerShufflingBox;
}(_react.Component), _class.propTypes = {
  prop: _propTypes2.default
}, _temp2);
exports.default = BannerShufflingBox;