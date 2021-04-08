"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _tabs = require("antd-mobile/lib/tabs");

var _tabs2 = _interopRequireDefault(_tabs);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;

require("antd-mobile/lib/tabs/style");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

require("./less/classification.less");

var _mathManage = require("../../../utils/mathManage");

var _mathManage2 = _interopRequireDefault(_mathManage);

var _QueueAnimFulu = require("../../QueueAnimFulu");

var _QueueAnimFulu2 = _interopRequireDefault(_QueueAnimFulu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassificationBox = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ClassificationBox, _Component);

  function ClassificationBox(props) {
    (0, _classCallCheck3.default)(this, ClassificationBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClassificationBox.__proto__ || (0, _getPrototypeOf2.default)(ClassificationBox)).call(this, props));

    _initialiseProps.call(_this);

    var fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size'].replace('px', ''));
    console.log(fontSize, 888);
    _this.state = {
      activeTab: 0,
      goodList: [],
      tabs: [],
      tabsStyle2Html: [],
      clickTabBarIndex: 0,
      fontSize: fontSize
    };
    return _this;
  }

  (0, _createClass3.default)(ClassificationBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var item = this.props.item;
      // 页面边距

      var _item$modelStyle$clas = item.modelStyle.classStyleModel,
          pageMargin = _item$modelStyle$clas.pageMargin,
          displayStyle = _item$modelStyle$clas.displayStyle;

      var tabBarEle = document.querySelector(".am-tabs-tab-bar-wrap");
      if (tabBarEle) {
        tabBarEle.style.paddingLeft = pageMargin / 50 + "rem";
        tabBarEle.style.paddingRight = pageMargin / 50 + "rem";
      }
      if (displayStyle && displayStyle === 'style2') {
        item.moduleDataList[0] && this.renderContentStyle2(item.moduleDataList[0], 0);
      }
    }
    // 样式一

    // 如果是样式二

  }, {
    key: "render",
    value: function render() {
      return this.getCom();
    }
  }]);
  return ClassificationBox;
}(_react.Component), _class.propTypes = {
  prop: _propTypes2.default
}, _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.toDetail = function (gid, pid, pname) {
    // 友盟埋点二级分类点击
    _this2.props.clickUmBuired("组件-分类商品", pname);

    _this2.props.history.push("/detail?gid=" + gid + (pid ? "&pid=" + pid : ""));
  };

  this.changeTabs = function (activeTab) {
    // 友盟埋点二级分类头部点击
    _this2.props.clickUmBuired('组件-分类切换', activeTab.title);
    _this2.setState({ activeTab: activeTab });
  };

  this.getPrice = function (item) {
    var price = item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price;
    return _react2.default.createElement(
      "span",
      { className: "big-font" },
      price
    );
    // let priceArr = price ? price.toString().split(".") : [];
    // if (!priceArr.length)
    //   return <Fragment>
    //     <span className="big-font">0</span>
    //     <span className="middle-font">.00</span>
    //   </Fragment>
    // return (
    //   <Fragment>
    //     <span className="big-font">{priceArr[0]}</span>
    //     {priceArr.length === 2 ? (
    //       <span className="middle-font">.{priceArr[1]}</span>
    //     ) : (
    //         ""
    //       )}
    //   </Fragment>
    // );
  };

  this.getMarketPrice = function (item) {
    var price = item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price;
    var faceValue = item.faceValue;
    // 如果销售价大于划线价,则不展示划线价

    if (price > faceValue) {
      return "";
    }
    return _react2.default.createElement(
      "div",
      { className: "market-price" },
      _react2.default.createElement(
        "span",
        { className: "market-price-text small-font" },
        "\u5E02\u573A\u4EF7 \uFFE5",
        item.faceValue
      )
    );
  };

  this.style2TabsClick = function (item, index) {
    // 友盟埋点二级分类头部点击
    _this2.props.clickUmBuired('首页-分类切换');
    _this2.renderContentStyle2(item, index);
  };

  this.getTabsHeader = function () {
    var clickTabBarIndex = _this2.state.clickTabBarIndex;
    var item = _this2.props.item;

    var tabsStyle2HtmlArr = [];
    item.moduleDataList.map(function (item, index) {
      tabsStyle2HtmlArr.push(_react2.default.createElement(
        "div",
        {
          className: "tab-bar-item " + (clickTabBarIndex === index ? "active-color" : ""),
          onClick: function onClick() {
            return _this2.style2TabsClick(item, index);
          }
        },
        _react2.default.createElement("img", {
          src: require("./imgs/" + (index % 2 === 0 ? 0 : 1) + ".png")
        }),
        _react2.default.createElement(
          "span",
          { className: "tab-bar-item-text" },
          _mathManage2.default.stringCutOut(item.textData, 4)
        )
      ));
    });
    return tabsStyle2HtmlArr;
  };

  this.getTabs = function () {
    var item = _this2.props.item;

    var tabs = [];
    item.moduleDataList.map(function (item, index) {
      tabs.push({
        title: _mathManage2.default.stringCutOut(item.textData, 4),
        key: index,
        dataDetailCacheModels: item.dataDetailCacheModels
      });
    });
    return tabs;
  };

  this.renderContentStyle1 = function (tabsItem) {
    console.log(tabsItem, 9999888);
    var item = _this2.props.item;
    // 商品间距

    var productMargin = item.modelStyle.classStyleModel.productMargin / 2;
    // 页面边距
    var pageMargin = item.modelStyle.classStyleModel.pageMargin;
    var _item$modelStyle$clas2 = item.modelStyle.classStyleModel,
        imageSource = _item$modelStyle$clas2.imageSource,
        borderRadius = _item$modelStyle$clas2.borderRadius;

    var isClass = imageSource && imageSource === "product" ? false : true;
    // 商品高度
    var len = tabsItem.dataDetailCacheModels.length % 2 === 0 ? tabsItem.dataDetailCacheModels.length / 2 : parseInt(tabsItem.dataDetailCacheModels.length / 2) + 1;
    // let productHeight = `${(len * 229) / 50}rem`;
    var style = {
      margin: productMargin / 50 + "rem",
      display: "inline-block",
      width: '100%'
    };
    var style1 = {
      marginLeft: "-" + productMargin / 50 + "rem",
      marginRight: "-" + productMargin / 50 + "rem",
      paddingLeft: pageMargin / 50 + "rem",
      paddingRight: pageMargin / 50 + "rem"
    };
    var clickTabBarIndex = _this2.state.clickTabBarIndex;

    console.log(clickTabBarIndex, 99999);
    var nowHtml = _react2.default.createElement(
      "div",
      { style: { display: "flex" }, className: "content-style1" },
      _react2.default.createElement(
        "div",
        {
          className: "class-content clearfix",
          style: (0, _extends3.default)({}, style1),
          key: clickTabBarIndex
        },
        tabsItem.dataDetailCacheModels.map(function (item, index) {
          return _react2.default.createElement(
            "div",
            {
              className: "item",
              key: index,
              style: { borderRadius: (borderRadius === null ? 8 : borderRadius) / 50 + "rem" },
              onClick: function onClick() {
                _this2.toDetail(item.childCategoryId, item.productId, item.childCategoryName);
              }
            },
            _react2.default.createElement(
              "span",
              { style: (0, _extends3.default)({}, style) },
              _react2.default.createElement(
                "div",
                { "class": "img-bg", style: { borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : borderRadius / 50 + "rem " + borderRadius / 50 + "rem 0 0" } },
                _react2.default.createElement("img", {
                  className: isClass ? 'class-img' : 'product-img',
                  style: { borderRadius: !isClass ? borderRadius === null ? '.16rem .16rem 0 0' : borderRadius / 50 + "rem " + borderRadius / 50 + "rem 0 0" : '0px' },
                  src: isClass ? item.iconPath : item.productImage
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "name" },
                item.cornerMark && _react2.default.createElement(
                  "span",
                  { className: "corner-mark" },
                  item.cornerMark
                ),
                item.childCategoryName
              ),
              _react2.default.createElement(
                "div",
                { className: "price" },
                _react2.default.createElement(
                  "div",
                  { className: "sale-price" },
                  _react2.default.createElement(
                    "span",
                    { className: "small" },
                    "\uFFE5"
                  ),
                  _this2.getPrice(item),
                  item.isCouponAfterPrice && item.couponBatchid && _react2.default.createElement("span", { className: "discount-price-img" })
                ),
                _this2.getMarketPrice(item)
              )
            )
          );
        })
      )
    );
    return nowHtml;
  };

  this.waterFlow = function () {
    var clickTabBarIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    setTimeout(function () {
      var _props = _this2.props,
          item = _props.item,
          componentIndex = _props.index;
      var fontSize = _this2.state.fontSize;
      // 1- 确定列数  = 页面的宽度 / 图片的宽度

      var itemWidth = 164.5;
      var nowProductMargin = 10;
      // 因为下面else计算高度的地方PageMargin 需要通过rem的转换得出真正的数值
      var afterChangePageMargin = _mathManage2.default.accDiv(nowProductMargin * 2, _mathManage2.default.accDiv(100, fontSize));
      // 商品间距
      var productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距
      var pageMargin = item.modelStyle.classStyleModel.pageMargin / 2;
      console.log(productMargin, pageMargin, 222211);
      var id = "class-content" + componentIndex;
      var dom = document.getElementById(id);
      var items = dom ? dom.children : [];
      if (!items.length && dom) {
        dom.style.height = "0rem";
      }
      var columns = 2;
      var arr = [];

      for (var i = 0; i < items.length; i++) {
        if (i < columns) {
          // 2- 确定第一行
          items[i].style.top = 0;
          items[i].style.left = ((itemWidth + nowProductMargin) * i + pageMargin * 2) / 50 + "rem";
          arr.push(items[i].offsetHeight);
          dom.style.height = (items[i].offsetHeight + pageMargin) / 50 + "rem";
        } else {
          // 其他行
          // 3- 找到数组中最小高度  和 它的索引
          var minHeight = arr[0];
          var index = 0;
          for (var j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
              minHeight = arr[j];
              index = j;
            }
          }
          // 4- 设置下一行的第一个盒子位置
          // top值就是最小列的高度 + gap
          items[i].style.top = (arr[index] + afterChangePageMargin) / fontSize + "rem";
          // left值就是最小列距离左边的距离
          items[i].style.left = items[index].style.left;
          if (i === items.length - 1) {
            dom.style.height = (arr[index] + afterChangePageMargin) / fontSize + (items[i].offsetHeight + afterChangePageMargin) / fontSize + "rem";
          }
          // 5- 修改最小列的高度
          // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
          arr[index] = arr[index] + items[i].offsetHeight + nowProductMargin;
        }
      }
    }, 350);
  };

  this.getContentStyle2Dom = function (tabsItem, clickTabBarIndex) {
    console.log(tabsItem, 9999888);
    var _props2 = _this2.props,
        item = _props2.item,
        index = _props2.index;
    var _item$modelStyle$clas3 = item.modelStyle.classStyleModel,
        imageSource = _item$modelStyle$clas3.imageSource,
        borderRadius = _item$modelStyle$clas3.borderRadius;

    var isClass = imageSource && imageSource === "product" ? false : true;
    console.log(clickTabBarIndex, 99999);
    var nowHtml = _react2.default.createElement(
      "div",
      { style: { display: "flex" }, className: "content-style2" },
      _react2.default.createElement(
        _QueueAnimFulu2.default,
        { type: "left" },
        _react2.default.createElement(
          "div",
          {
            className: "class-content clearfix",
            id: "class-content" + index,
            key: clickTabBarIndex
          },
          tabsItem.dataDetailCacheModels.map(function (item, index) {
            return _react2.default.createElement(
              "div",
              {
                className: "item",
                style: { borderRadius: (borderRadius === null ? 8 : borderRadius) / 50 + "rem" },
                key: index,
                onClick: function onClick() {
                  _this2.toDetail(item.childCategoryId, item.productId, item.childCategoryName);
                }
              },
              _react2.default.createElement(
                "div",
                { "class": "img-bg", style: { borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : borderRadius / 50 + "rem " + borderRadius / 50 + "rem 0 0" } },
                _react2.default.createElement("img", {
                  style: { borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : borderRadius / 50 + "rem " + borderRadius / 50 + "rem 0 0" },
                  src: isClass ? item.iconPath : item.productImage
                })
              ),
              _react2.default.createElement(
                "div",
                { className: "name" },
                item.cornerMark && _react2.default.createElement(
                  "span",
                  { className: "corner-mark" },
                  item.cornerMark
                ),
                item.childCategoryName
              ),
              _react2.default.createElement(
                "div",
                { className: "price" },
                _react2.default.createElement(
                  "div",
                  { className: "sale-price" },
                  _react2.default.createElement(
                    "span",
                    { className: "small" },
                    "\uFFE5"
                  ),
                  _this2.getPrice(item),
                  item.isCouponAfterPrice && item.couponBatchid && _react2.default.createElement("span", { className: "discount-price-img" })
                ),
                _this2.getMarketPrice(item)
              )
            );
          })
        )
      )
    );
    return nowHtml;
  };

  this.renderContentStyle2 = function (tabsItem, clickTabBarIndex) {
    _this2.setState({
      clickTabBarIndex: clickTabBarIndex
    }, function () {
      var nowHtml = _this2.getContentStyle2Dom(tabsItem, clickTabBarIndex);
      var tabsStyle2Html = [];
      tabsStyle2Html.push(nowHtml);
      _this2.setState({ tabsStyle2Html: tabsStyle2Html }, function () {
        _this2.waterFlow();
      });
    });
  };

  this.getCom = function () {
    var item = _this2.props.item;

    var len = item.moduleDataList.length;
    if (!len) {
      return "";
    } else {
      // 商品间距
      // let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距

      var _item$modelStyle$clas4 = item.modelStyle.classStyleModel,
          pageMargin = _item$modelStyle$clas4.pageMargin,
          topMargin = _item$modelStyle$clas4.topMargin,
          bottomMargin = _item$modelStyle$clas4.bottomMargin;

      var style1 = {
        paddingLeft: pageMargin / 50 + "rem",
        paddingRight: pageMargin / 50 + "rem"
      };
      console.log(style1, 222);
      var style = { paddingTop: (topMargin === null ? 15 : topMargin) / 50 + "rem", paddingBottom: bottomMargin / 50 + "rem"
        // const style1 = {
        //   marginLeft: `-${productMargin / 50}rem`,
        //   marginRight: `-${productMargin / 50}rem`,
        //   paddingLeft: `${pageMargin / 50}rem`,
        //   paddingRight: `${pageMargin / 50}rem`
        // };
        // 由于pc端和移动端组件不同，所以代码实现方式有调整，没有直接改classification-box，而是加载页面的时候调整样式
      };var displayStyle = item.modelStyle.classStyleModel.displayStyle;
      var tabsStyle2Html = _this2.state.tabsStyle2Html;

      return _react2.default.createElement(
        "div",
        { "class": "classification-box clearfix", style: style },
        displayStyle === "style2" && _react2.default.createElement(
          "div",
          { className: "class-content2" },
          _react2.default.createElement(
            "div",
            { className: "tab-bar-header", style: (0, _extends3.default)({}, style1) },
            _react2.default.createElement(
              "div",
              {
                className: "tab-bar-header-content clearfix",
                style: { width: item.moduleDataList.length * 3.34 + "rem" }
              },
              _this2.getTabsHeader()
            )
          ),
          tabsStyle2Html
        ),
        (!displayStyle || displayStyle === "style1") && _react2.default.createElement(
          _tabs2.default,
          {
            swipeable: true,
            tabs: _this2.getTabs(),
            onChange: _this2.changeTabs,
            renderTabBar: function renderTabBar(props) {
              return _react2.default.createElement(_tabs2.default.DefaultTabBar, (0, _extends3.default)({}, props, { page: 4 }));
            }
          },
          _this2.renderContentStyle1
        )
      );
    }
  };
}, _temp);
exports.default = ClassificationBox;