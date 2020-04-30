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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/flashSale.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlashSale = function (_React$Component) {
  (0, _inherits3.default)(FlashSale, _React$Component);

  function FlashSale() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, FlashSale);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = FlashSale.__proto__ || (0, _getPrototypeOf2.default)(FlashSale)).call.apply(_ref, [this].concat(args))), _this), _this.toList = function (mid) {
      _this.props.history.push('/list?mid=' + mid);
    }, _this.toDetail = function (gid, pid) {
      _this.props.history.push('/detail?gid=' + gid + (pid ? '&pid=' + pid : ''));
    }, _this.getCom = function () {
      var item = _this.props.item;

      if (!item.moduleDataList.length) {
        return '';
      } else {
        var _item$modelStyle$flas = item.modelStyle.flashSaleStyleModel,
            isCountDown = _item$modelStyle$flas.isCountDown,
            titleStyle = _item$modelStyle$flas.titleStyle,
            nameColor = _item$modelStyle$flas.nameColor,
            priceColor = _item$modelStyle$flas.priceColor,
            isSmallImage = _item$modelStyle$flas.isSmallImage;

        var nameStyle = {
          color: nameColor
        };
        var priceStyle = {
          color: priceColor
        };
        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        return _react2.default.createElement(
          'div',
          { className: 'flash-sale-box clearfix' },
          _react2.default.createElement(
            'div',
            { className: 'goods-bg' },
            _react2.default.createElement(
              'div',
              { className: 'pro-list' },
              _react2.default.createElement(
                'div',
                { className: 'title' },
                _react2.default.createElement(
                  'span',
                  { className: 'flash-sale-name', style: { color: titleStyle } },
                  shopInfo.codeKey === configs.xiaomi ? '小米10周年庆' : '限时抢购'
                )
              ),
              _react2.default.createElement(
                'span',
                { 'class': 'go-more' },
                _react2.default.createElement(
                  'span',
                  { onClick: function onClick() {
                      _this.toList('active');
                    } },
                  item.moduleDataList[0].textData
                ),
                _react2.default.createElement(_Icon2.default, { glyph: _Icon.arrowRight })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'page-section' },
              item.moduleDataList[0] && _react2.default.createElement(
                'div',
                { className: 'list list1',
                  style: { width: item.moduleDataList[0].dataDetailCacheModels.length * 130 / 50 + 'rem' } },
                item.moduleDataList[0].dataDetailCacheModels.map(function (item) {
                  return _react2.default.createElement(
                    'div',
                    { className: 'scroll-div-item_H item', onClick: function onClick() {
                        _this.toDetail(item.childCategoryId, item.productId);
                      } },
                    _react2.default.createElement('img', { className: 'pro-img', src: item.produuctIconPath }),
                    _react2.default.createElement(
                      'div',
                      { className: 'info' },
                      _react2.default.createElement(
                        'div',
                        { className: 'g-info' },
                        _react2.default.createElement(
                          'div',
                          { className: 'name', style: (0, _extends3.default)({}, nameStyle) },
                          item.productName
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'price', style: (0, _extends3.default)({}, priceStyle) },
                          _react2.default.createElement(
                            'small',
                            null,
                            '\uFFE5'
                          ),
                          item.price,
                          _react2.default.createElement(
                            's',
                            { className: 'del-price' },
                            '\uFFE5',
                            item.faceValue
                          )
                        )
                      )
                    )
                  );
                })
              )
            )
          )
        );
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(FlashSale, [{
    key: 'render',
    value: function render() {
      return this.getCom();
    }
  }]);
  return FlashSale;
}(_react2.default.Component);

exports.default = FlashSale;