import React, { Component, Fragment } from 'react';
import { Tabs, } from 'antd-mobile';
import PropTypes from 'prop-types';
import './less/classification.less';
import mathManage from '../../../utils/mathManage';

export default class ClassificationBox extends Component {
  static propTypes = {
    prop: PropTypes
  }
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      goodList: [],
      tabs: []
    }
  }
  componentDidMount() {
    const { item } = this.props;
    // 页面边距
    let pageMargin = item.modelStyle.classStyleModel.pageMargin;
    let tabBarEle = document.querySelector('.am-tabs-tab-bar-wrap');
    tabBarEle.style.paddingLeft = `${pageMargin / 50}rem`;
    tabBarEle.style.paddingRight = `${pageMargin / 50}rem`;
  }

  toDetail = (gid, pid) => {
    // 友盟埋点二级分类点击
    this.props.clickUmBuired('二级分类');

    this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ''}`);
  }
  changeTabs = (activeTab) => {
    this.setState({ activeTab })
  }
  getPrice = (item) => {
    let price = item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price;
    let priceArr = price ? price.toString().split('.') : [];
    return <Fragment>
      <span className="big-font">{priceArr[0]}</span>
      {priceArr.length === 2 ? <span className="middle-font">.{priceArr[1]}</span> : ''}
    </Fragment>
  }
  getDelPrice = (item) => {
    let price = item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price;
    let { faceValue } = item;
    // 如果销售价大于划线价,则不展示划线价
    if (price > faceValue) {
      return ''
    }
    return <s className="del-price">￥{item.faceValue}</s>
  }
  renderContent = (tabsItem) => {
    const { item } = this.props;
    // 商品间距
    let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
    // 页面边距
    let pageMargin = item.modelStyle.classStyleModel.pageMargin;

    // 商品高度
    let len = tabsItem.dataDetailCacheModels.length % 2 === 0 ? tabsItem.dataDetailCacheModels.length / 2 :
      parseInt(tabsItem.dataDetailCacheModels.length / 2) + 1;
    // let productHeight = `${(len * 229) / 50}rem`;
    const style = {
      margin: `${productMargin / 50}rem`,
      display: 'inline-block',
      // width: '100%'
    };
    const style1 = {
      marginLeft: `-${productMargin / 50}rem`,
      marginRight: `-${productMargin / 50}rem`,
      paddingLeft: `${pageMargin / 50}rem`,
      paddingRight: `${pageMargin / 50}rem`
    };
    return (<div style={{ display: 'flex' }}>
      {/* <div className="class-content" style={{ height: productHeight }}> */}
      <div className="class-content" style={{ ...style1 }}>
        {tabsItem.dataDetailCacheModels.map((item) =>
          <div className="item" onClick={() => { this.toDetail(item.childCategoryId, item.productId) }}>
            <span style={{ ...style }}>
              <div class="img-bg">
                {item.cornerMark && <div class="right-tips" >{item.cornerMark}</div>}
                <img src={item.iconPath} />
              </div>
              <div class="name">{item.childCategoryName}</div>
              <div className="status-content">
                {item.isCouponAfterPrice && item.couponBatchid && <div className="discount-price-img"></div>}
              </div>
              <div className="price" >
                {item.integral && <span>{item.integral}积分+</span>}<span className="middle-font">￥</span>
                {this.getPrice(item)}
                {/* {item.isCouponAfterPrice && item.couponBatchid ? item.couponAfterPrice : item.price} */}
                {this.getDelPrice(item)}
              </div>
            </span>
          </div>
        )}
      </div>
    </div>);
  }
  getTabs = () => {
    const { item } = this.props;
    const tabs = [];
    item.moduleDataList.map((item, index) => {
      tabs.push({ title: mathManage.stringCutOut(item.textData, 4), key: index, dataDetailCacheModels: item.dataDetailCacheModels });
    });
    console.log(tabs, 2222)
    return tabs;
  }
  getCom = () => {
    const { item } = this.props;
    let len = item.moduleDataList.length;
    if (!len) {
      return '';
    }
    else {
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
      return <div class="classification-box clearfix">
        <Tabs tabs={this.getTabs()} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}>
          {this.renderContent}
        </Tabs>
      </div >
    }
  }
  render() {
    return (
      this.getCom()
    )
  }
}
