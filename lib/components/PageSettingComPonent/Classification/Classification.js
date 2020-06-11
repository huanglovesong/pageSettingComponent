'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _tabs = require('antd-mobile/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

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

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/tabs/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/classification.less');

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassificationBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ClassificationBox, _Component);

  function ClassificationBox(props) {
    (0, _classCallCheck3.default)(this, ClassificationBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClassificationBox.__proto__ || (0, _getPrototypeOf2.default)(ClassificationBox)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      activeTab: 0,
      goodList: [],
      tabs: []
    };
    return _this;
  }

  (0, _createClass3.default)(ClassificationBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var item = this.props.item;
      // 页面边距

      var pageMargin = item.modelStyle.classStyleModel.pageMargin;
      var tabBarEle = document.querySelector('.am-tabs-tab-bar-wrap');
      tabBarEle.style.paddingLeft = pageMargin / 50 + 'rem';
      tabBarEle.style.paddingRight = pageMargin / 50 + 'rem';
    }
  }, {
    key: 'render',
    value: function render() {
      return this.getCom();
    }
  }]);
  return ClassificationBox;
}(_react.Component), _class.propTypes = {
  prop: _propTypes2.default
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.toDetail = function (gid, pid) {
    _this2.props.history.push('/detail?gid=' + gid + (pid ? '&pid=' + pid : ''));
  };

  this.changeTabs = function (activeTab) {
    _this2.setState({ activeTab: activeTab });
  };

  this.getPrice = function (item) {
    var price = item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price;
    var priceArr = price ? price.toString().split('.') : [];
    return _react2.default.createElement(
      _react.Fragment,
      null,
      _react2.default.createElement(
        'span',
        { className: 'big-font' },
        priceArr[0]
      ),
      priceArr.length === 2 ? _react2.default.createElement(
        'span',
        { className: 'middle-font' },
        '.',
        priceArr[1]
      ) : ''
    );
  };

  this.renderContent = function (tabsItem) {
    var item = _this2.props.item;
    // 商品间距

    var productMargin = item.modelStyle.classStyleModel.productMargin / 2;
    // 页面边距
    var pageMargin = item.modelStyle.classStyleModel.pageMargin;

    // 商品高度
    var len = tabsItem.dataDetailCacheModels.length % 2 === 0 ? tabsItem.dataDetailCacheModels.length / 2 : parseInt(tabsItem.dataDetailCacheModels.length / 2) + 1;
    // let productHeight = `${(len * 229) / 50}rem`;
    var style = {
      margin: productMargin / 50 + 'rem',
      display: 'inline-block'
      // width: '100%'
    };
    var style1 = {
      marginLeft: '-' + productMargin / 50 + 'rem',
      marginRight: '-' + productMargin / 50 + 'rem',
      paddingLeft: pageMargin / 50 + 'rem',
      paddingRight: pageMargin / 50 + 'rem'
    };
    return _react2.default.createElement(
      'div',
      { style: { display: 'flex' } },
      _react2.default.createElement(
        'div',
        { className: 'class-content', style: (0, _extends3.default)({}, style1) },
        tabsItem.dataDetailCacheModels.map(function (item) {
          return _react2.default.createElement(
            'div',
            { className: 'item', onClick: function onClick() {
                _this2.toDetail(item.childCategoryId, item.productId);
              } },
            _react2.default.createElement(
              'span',
              { style: (0, _extends3.default)({}, style) },
              _react2.default.createElement(
                'div',
                { 'class': 'img-bg' },
                item.cornerMark && _react2.default.createElement(
                  'div',
                  { 'class': 'right-tips' },
                  item.cornerMark
                ),
                _react2.default.createElement('img', { src: item.iconPath })
              ),
              _react2.default.createElement(
                'div',
                { 'class': 'name' },
                item.childCategoryName
              ),
              _react2.default.createElement(
                'div',
                { className: 'status-content' },
                item.isCouponAfterPrice && item.couponBatchid && _react2.default.createElement('div', { className: 'discount-price-img' })
              ),
              _react2.default.createElement(
                'div',
                { className: 'price' },
                item.integral && _react2.default.createElement(
                  'span',
                  null,
                  item.integral,
                  '\u79EF\u5206+'
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'middle-font' },
                  '\uFFE5'
                ),
                _this2.getPrice(item),
                _react2.default.createElement(
                  's',
                  { className: 'del-price' },
                  '\uFFE5',
                  item.faceValue
                )
              )
            )
          );
        })
      )
    );
  };

  this.getTabs = function () {
    var item = _this2.props.item;

    var tabs = [];
    item.moduleDataList.map(function (item, index) {
      tabs.push({ title: _mathManage2.default.stringCutOut(item.textData, 4), key: index, dataDetailCacheModels: item.dataDetailCacheModels });
    });
    console.log(tabs, 2222);
    return tabs;
  };

  this.getCom = function () {
    var item = _this2.props.item;

    var len = item.moduleDataList.length;
    if (!len) {
      return '';
    } else {
      // 商品间距
      // let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // // 页面边距
      // let pageMargin = item.modelStyle.classStyleModel.pageMargin;
      // const style1 = {
      //   marginLeft: `-${productMargin / 50}rem`,
      //   marginRight: `-${productMargin / 50}rem`,
      //   paddingLeft: `${pageMargin / 50}rem`,
      //   paddingRight: `${pageMargin / 50}rem`
      // };
      // 由于pc端和移动端组件不同，所以代码实现方式有调整，没有直接改classification-box，而是加载页面的时候调整样式
      return _react2.default.createElement(
        'div',
        { 'class': 'classification-box clearfix' },
        _react2.default.createElement(
          _tabs2.default,
          { tabs: _this2.getTabs(), renderTabBar: function renderTabBar(props) {
              return _react2.default.createElement(_tabs2.default.DefaultTabBar, (0, _extends3.default)({}, props, { page: 4 }));
            } },
          _this2.renderContent
        )
      );
    }
  };
}, _temp);
exports.default = ClassificationBox;