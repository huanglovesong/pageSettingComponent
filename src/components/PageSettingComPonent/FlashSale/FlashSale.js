import React, { Fragment } from 'react';
import { Icon } from 'antd-mobile';
import './less/flashSale.less';

class FlashSale extends React.Component {
  toList = (mid) => {
    // 友盟埋点限时抢购点击
    this.props.clickUmBuired('组件-限时抢购', '更多');
    this.props.history.push(`/list?mid=${mid}`);
  }
  toDetail = (gid, pid, pname) => {
    // 友盟埋点限时抢购点击
    this.props.clickUmBuired('组件-限时抢购', pname);
    this.props.history.push(`/detail?gid=${gid}${pid ? `&pid=${pid}` : ''}`);
  }
  getPrice = (item) => {
    let priceArr = item.price ? item.price.toString().split(".") : [];
    return (
      <Fragment>
        <span className="big-font">{priceArr[0]}</span>
        {priceArr.length === 2 ? (
          <span className="middle-font">.{priceArr[1]}</span>
        ) : (
            ""
          )}
      </Fragment>
    );
  }
  getCom = () => {
    const { item } = this.props;
    if (!item.moduleDataList.length) {
      return '';
    }
    else {
      let { isCountDown, titleStyle, nameColor, priceColor, isSmallImage, topMargin, bottomMargin, borderRadius } = item.modelStyle.flashSaleStyleModel;
      const nameStyle = {
        color: nameColor
      };
      const priceStyle = {
        color: priceColor
      };
      const style = { paddingTop: `${topMargin / 50}rem`, paddingBottom: `${(bottomMargin === null ? 5 : bottomMargin) / 50}rem` }
      const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
      return <div className="flash-sale-box clearfix" style={style}>
        <div className="goods-bg">
          <div className="pro-list">
            <div className="title">
              <span className="flash-sale-name" style={{ color: titleStyle }}>{shopInfo.codeKey === configs.xiaomi ? '小米10周年庆' : '限时抢购'}</span>
            </div>
            <span class="go-more">
              <span onClick={() => { this.toList('active') }}>{item.moduleDataList[0].textData}</span>
              <Icon type="right" />
            </span>
          </div>
          <div className="page-section">
            {item.moduleDataList[0] && <div className="list list1"
              style={{ width: `${(item.moduleDataList[0].dataDetailCacheModels.length * 130) / 50}rem` }}>
              {item.moduleDataList[0].dataDetailCacheModels.map((item) =>
                <div className="scroll-div-item_H item" style={{ borderRadius: `${(borderRadius === null ? 8 : borderRadius) / 50}rem` }}
                  onClick={() => { this.toDetail(item.childCategoryId, item.productId, item.productName) }}>
                  <img className="pro-img" src={item.produuctIconPath}
                    style={{ borderRadius: borderRadius === null ? `0.16rem 0.16rem 0 0` : `${borderRadius / 50}rem ${borderRadius / 50}rem 0 0` }} />
                  <div className="info">
                    {/* {isSmallImage && <img src={item.iconPath} />} */}
                    <div className="g-info">
                      <div className="name" style={{ ...nameStyle }}>{item.productName}
                      </div>
                      <div className="price" style={{ ...priceStyle }}>
                        <small>￥</small>{this.getPrice(item)}
                        <s className="del-price">￥{item.faceValue}</s>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div>}
          </div>
        </div>
      </div>
    }
  }
  render() {
    return (
      this.getCom()
    );
  }
}

export default FlashSale;
