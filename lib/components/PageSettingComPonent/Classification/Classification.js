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
      margin: productMargin + 'px',
      display: 'inline-block'
      // width: '100%'
    };
    return _react2.default.createElement(
      'div',
      { style: { display: 'flex' } },
      _react2.default.createElement(
        'div',
        { className: 'class-content' },
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
                { className: 'price' },
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
      var productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距
      var pageMargin = item.modelStyle.classStyleModel.pageMargin;
      var style = {
        margin: productMargin + 'px',
        display: 'inline-block'
        // width: '100%'
      };
      var style1 = {
        marginLeft: '-' + productMargin + 'px',
        marginRight: '-' + productMargin + 'px',
        paddingLeft: pageMargin + 'px',
        paddingRight: pageMargin + 'px'
      };

      return _react2.default.createElement(
        'div',
        { 'class': 'classification-box clearfix', style: (0, _extends3.default)({}, style1) },
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