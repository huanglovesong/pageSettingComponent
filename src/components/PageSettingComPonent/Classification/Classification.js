import React, { Component, Fragment } from "react";
import { Tabs } from "antd-mobile";
import PropTypes from "prop-types";
import "./less/classification.less";
import mathManage from "../../../utils/mathManage";
import QueueAnimFulu from "../../QueueAnimFulu";
export default class ClassificationBox extends Component {
  static propTypes = {
    prop: PropTypes,
  };
  constructor(props) {
    super(props);
    let fontSize = parseFloat(getComputedStyle(window.document.documentElement)['font-size'].replace('px', ''));
    console.log(fontSize, 888)
    this.state = {
      activeTab: 0,
      goodList: [],
      tabs: [],
      tabsStyle2Html: [],
      clickTabBarIndex: 0,
      fontSize,
    };
  }
  componentDidMount() {
    const { item } = this.props;
    // 页面边距
    let { pageMargin, displayStyle } = item.modelStyle.classStyleModel;
    let tabBarEle = document.querySelector(".am-tabs-tab-bar-wrap");
    if (tabBarEle) {
      tabBarEle.style.paddingLeft = `${pageMargin / 50}rem`;
      tabBarEle.style.paddingRight = `${pageMargin / 50}rem`;
    }
    if (displayStyle && displayStyle === 'style2') {
      item.moduleDataList[0] &&
        this.renderContentStyle2(item.moduleDataList[0], 0);
    }
  }

  toDetail = (gid, pid, pname) => {
    // 友盟埋点二级分类点击
    this.props.clickUmBuired("组件-分类商品", pname);

    this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ""}`);
  };
  changeTabs = (activeTab) => {
    // 友盟埋点二级分类头部点击
    this.props.clickUmBuired('组件-分类切换');
    this.setState({ activeTab });
  };
  getPrice = (item) => {
    let price =
      item.isCouponAfterPrice && item.couponBatchid
        ? item.couponAfterPrice
        : item.price;
    return <span className="big-font">{price}</span>
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
  getMarketPrice = (item) => {
    let price =
      item.isCouponAfterPrice && item.couponBatchid
        ? item.couponAfterPrice
        : item.price;
    let { faceValue } = item;
    // 如果销售价大于划线价,则不展示划线价
    if (price > faceValue) {
      return "";
    }
    return <div className="market-price">
      <span className="market-price-text small-font">市场价 ￥{item.faceValue}</span>
    </div>;
  }
  style2TabsClick = (item, index) => {
    // 友盟埋点二级分类头部点击
    this.props.clickUmBuired('首页-分类切换');
    this.renderContentStyle2(item, index)
  }
  getTabsHeader = () => {
    const { clickTabBarIndex } = this.state;
    const { item } = this.props;
    const tabsStyle2HtmlArr = [];
    item.moduleDataList.map((item, index) => {
      tabsStyle2HtmlArr.push(
        <div
          className={`tab-bar-item ${clickTabBarIndex === index ? "active-color" : ""
            }`}
          onClick={() => this.style2TabsClick(item, index)}
        >
          <img
            src={require(`./imgs/${index % 2 === 0 ? 0 : 1}.png`)}
          />
          <span className="tab-bar-item-text">
            {mathManage.stringCutOut(item.textData, 4)}
          </span>
        </div>
      );
    });
    return tabsStyle2HtmlArr;
  };
  getTabs = () => {
    const { item } = this.props;
    const tabs = [];
    item.moduleDataList.map((item, index) => {
      tabs.push({
        title: mathManage.stringCutOut(item.textData, 4),
        key: index,
        dataDetailCacheModels: item.dataDetailCacheModels,
      });
    });
    return tabs;
  };
  // 样式一
  renderContentStyle1 = (tabsItem) => {
    console.log(tabsItem, 9999888);
    const { item } = this.props;
    // 商品间距
    let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
    // 页面边距
    let pageMargin = item.modelStyle.classStyleModel.pageMargin;
    let { imageSource, borderRadius } = item.modelStyle.classStyleModel;
    const isClass = imageSource && imageSource === "product" ? false : true;
    // 商品高度
    let len =
      tabsItem.dataDetailCacheModels.length % 2 === 0
        ? tabsItem.dataDetailCacheModels.length / 2
        : parseInt(tabsItem.dataDetailCacheModels.length / 2) + 1;
    // let productHeight = `${(len * 229) / 50}rem`;
    const style = {
      margin: `${productMargin / 50}rem`,
      display: "inline-block",
      width: '100%'
    };
    const style1 = {
      marginLeft: `-${productMargin / 50}rem`,
      marginRight: `-${productMargin / 50}rem`,
      paddingLeft: `${pageMargin / 50}rem`,
      paddingRight: `${pageMargin / 50}rem`,
    };
    const { clickTabBarIndex } = this.state;
    console.log(clickTabBarIndex, 99999);
    let nowHtml = (
      <div style={{ display: "flex" }} className="content-style1">
        <div
          className="class-content clearfix"
          style={{ ...style1 }}
          key={clickTabBarIndex}
        >
          {tabsItem.dataDetailCacheModels.map((item, index) => (
            <div
              className="item"
              key={index}
              style={{ borderRadius: `${(borderRadius === null ? 8 : borderRadius) / 50}rem` }}
              onClick={() => {
                this.toDetail(item.childCategoryId, item.productId, item.childCategoryName);
              }}
            >
              <span style={{ ...style }}>
                <div class="img-bg" style={{ borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : `${borderRadius / 50}rem ${borderRadius / 50}rem 0 0` }}>
                  <img
                    className={isClass ? 'class-img' : 'product-img'}
                    style={{ borderRadius: !isClass ? borderRadius === null ? '.16rem .16rem 0 0' : `${borderRadius / 50}rem ${borderRadius / 50}rem 0 0` : '0px' }}
                    src={
                      isClass ? item.iconPath : item.productImage
                    }
                  />
                </div>
                <div className="name">
                  {item.cornerMark && <span className="corner-mark">{item.cornerMark}</span>}
                  {item.childCategoryName}
                </div>
                <div className="price">
                  <div className="sale-price">
                    {/* {item.integral && <span>{item.integral}积分+</span>} */}
                    <span className="small">￥</span>
                    {/* {item.price} */}
                    {this.getPrice(item)}
                    {item.isCouponAfterPrice && item.couponBatchid && (
                      <span className="discount-price-img"></span>
                    )}
                  </div>
                  {this.getMarketPrice(item)}
                </div>
              </span>
            </div>
          ))}
        </div>
      </div>
    );
    return nowHtml;
  };
  waterFlow = (clickTabBarIndex = '') => {
    setTimeout(() => {
      const { item, index: componentIndex } = this.props;
      const { fontSize } = this.state;
      // 1- 确定列数  = 页面的宽度 / 图片的宽度
      var itemWidth = 164.5;
      const nowProductMargin = 10;
      // 因为下面else计算高度的地方PageMargin 需要通过rem的转换得出真正的数值
      let afterChangePageMargin = mathManage.accDiv(nowProductMargin * 2, mathManage.accDiv(100, fontSize));
      // 商品间距
      let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距
      let pageMargin = item.modelStyle.classStyleModel.pageMargin / 2;
      console.log(productMargin, pageMargin, 222211);
      let id = `class-content${componentIndex}`;
      let dom = document.getElementById(id);
      var items = dom ? dom.children : [];
      if (!items.length && dom) {
        dom.style.height = "0rem";
      }
      var columns = 2;
      var arr = [];

      for (let i = 0; i < items.length; i++) {
        if (i < columns) {
          // 2- 确定第一行
          items[i].style.top = 0;
          items[i].style.left = ((itemWidth + nowProductMargin) * i + pageMargin * 2) / 50 + "rem";
          arr.push(items[i].offsetHeight);
          dom.style.height =
            (items[i].offsetHeight + pageMargin) / 50 + "rem";
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
            dom.style.height =
              (arr[index] + afterChangePageMargin) / fontSize + (items[i].offsetHeight + afterChangePageMargin) / fontSize + "rem";
          }
          // 5- 修改最小列的高度
          // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
          arr[index] = arr[index] + items[i].offsetHeight + nowProductMargin;
        }
      }
    }, 350);

  }
  getContentStyle2Dom = (tabsItem, clickTabBarIndex) => {
    console.log(tabsItem, 9999888);
    const { item, index } = this.props;
    let { imageSource, borderRadius } = item.modelStyle.classStyleModel;
    const isClass = imageSource && imageSource === "product" ? false : true;
    console.log(clickTabBarIndex, 99999);
    let nowHtml = (
      <div style={{ display: "flex" }} className="content-style2">
        <QueueAnimFulu type="left">
          <div
            className="class-content clearfix"
            id={`class-content${index}`}
            key={clickTabBarIndex}
          >
            {tabsItem.dataDetailCacheModels.map((item, index) => (
              <div
                className="item"
                style={{ borderRadius: `${(borderRadius === null ? 8 : borderRadius) / 50}rem` }}
                key={index}
                onClick={() => {
                  this.toDetail(item.childCategoryId, item.productId, item.childCategoryName);
                }}
              >
                <div class="img-bg" style={{ borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : `${borderRadius / 50}rem ${borderRadius / 50}rem 0 0` }}>
                  <img
                    style={{ borderRadius: borderRadius === null ? '.16rem .16rem 0 0' : `${borderRadius / 50}rem ${borderRadius / 50}rem 0 0` }}
                    src={
                      isClass ? item.iconPath : item.productImage
                    }
                  />
                </div>
                <div className="name">
                  {item.cornerMark && <span className="corner-mark">{item.cornerMark}</span>}
                  {item.childCategoryName}
                </div>
                <div className="price">
                  <div className="sale-price">
                    {/* {item.integral && <span>{item.integral}积分+</span>} */}
                    <span className="small">￥</span>
                    {/* {item.price} */}
                    {this.getPrice(item)}
                    {item.isCouponAfterPrice && item.couponBatchid && (
                      <span className="discount-price-img"></span>
                    )}
                  </div>
                  {this.getMarketPrice(item)}
                </div>
              </div>
            ))}
          </div>
        </QueueAnimFulu>
      </div>
    );
    return nowHtml;
  }
  // 如果是样式二
  renderContentStyle2 = (tabsItem, clickTabBarIndex) => {
    this.setState(
      {
        clickTabBarIndex,
      },
      () => {
        let nowHtml = this.getContentStyle2Dom(tabsItem, clickTabBarIndex);
        let tabsStyle2Html = [];
        tabsStyle2Html.push(nowHtml);
        this.setState({ tabsStyle2Html }, () => {
          this.waterFlow();
        });
      }
    );
  };
  getCom = () => {
    const { item } = this.props;
    let len = item.moduleDataList.length;
    if (!len) {
      return "";
    } else {
      // 商品间距
      // let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距

      const { pageMargin, topMargin, bottomMargin } = item.modelStyle.classStyleModel;
      const style1 = {
        paddingLeft: `${pageMargin / 50}rem`,
        paddingRight: `${pageMargin / 50}rem`,
      };
      console.log(style1, 222)
      const style = { paddingTop: `${(topMargin === null ? 15 : topMargin) / 50}rem`, paddingBottom: `${bottomMargin / 50}rem` }
      // const style1 = {
      //   marginLeft: `-${productMargin / 50}rem`,
      //   marginRight: `-${productMargin / 50}rem`,
      //   paddingLeft: `${pageMargin / 50}rem`,
      //   paddingRight: `${pageMargin / 50}rem`
      // };
      // 由于pc端和移动端组件不同，所以代码实现方式有调整，没有直接改classification-box，而是加载页面的时候调整样式
      const { displayStyle } = item.modelStyle.classStyleModel;
      const { tabsStyle2Html } = this.state;
      return (
        <div class="classification-box clearfix" style={style}>
          {displayStyle === "style2" && (
            <div className="class-content2">
              <div className="tab-bar-header" style={{ ...style1 }}>
                <div
                  className="tab-bar-header-content clearfix"
                  style={{ width: `${item.moduleDataList.length * 3.34}rem` }}
                >
                  {this.getTabsHeader()}
                </div>
              </div>
              {tabsStyle2Html}
            </div>
          )}
          {(!displayStyle || displayStyle === "style1") && (

            <Tabs
              swipeable={true}
              tabs={this.getTabs()}
              onChange={this.changeTabs}
              renderTabBar={(props) => (
                <Tabs.DefaultTabBar {...props} page={4} />
              )}
            >
              {/* <div className="content-style1"> */}
              {this.renderContentStyle1}
              {/* </div> */}
            </Tabs>
          )}
        </div>
      );
    }
  };
  render() {
    return this.getCom();
  }
}
