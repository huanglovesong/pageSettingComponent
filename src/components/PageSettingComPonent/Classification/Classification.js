import React, { Component } from 'react';
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
  toDetail = (gid, pid) => {
    this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ''}`);
  }
  changeTabs = (activeTab) => {
    this.setState({ activeTab })
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
      margin: `${productMargin}px`,
      display: 'inline-block',
      // width: '100%'
    };
    return (<div style={{ display: 'flex' }}>
      {/* <div className="class-content" style={{ height: productHeight }}> */}
      <div className="class-content" >
        {tabsItem.dataDetailCacheModels.map((item) =>
          <div className="item" onClick={() => { this.toDetail(item.childCategoryId, item.productId) }}>
            <span style={{ ...style }}>
              <div class="img-bg">
                {item.cornerMark && <div class="right-tips" >{item.cornerMark}</div>}
                <img src={item.iconPath} />
              </div>
              <div class="name">{item.childCategoryName}</div>
              <div className="price" >
                <small>￥</small>{item.price}
                <s className="del-price">￥{item.faceValue}</s>
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
      let productMargin = item.modelStyle.classStyleModel.productMargin / 2;
      // 页面边距
      let pageMargin = item.modelStyle.classStyleModel.pageMargin;
      const style = {
        margin: `${productMargin}px`,
        display: 'inline-block',
        // width: '100%'
      };
      const style1 = {
        marginLeft: `-${productMargin}px`,
        marginRight: `-${productMargin}px`,
        paddingLeft: `${pageMargin}px`,
        paddingRight: `${pageMargin}px`
      };

      return <div class="classification-box clearfix" style={{ ...style1 }}>
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
