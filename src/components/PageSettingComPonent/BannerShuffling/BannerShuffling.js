import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import Icons, { zpbz, jstk, zxzk, shwy } from '../Icon';
import PropTypes from 'prop-types'
import './less/bannerShuffling.less';
export default class BannerShufflingBox extends Component {
  static propTypes = {
    prop: PropTypes
  }
  toBanner = (v) => {
    // 友盟埋点banner位点击
    this.props.clickUmBuired('banner位');
    if (v.bannerType === 1) {
      this.toPageFuluIdAndToken(v);
      // window.open(v.linkurl, '_blank')
    } else if (v.bannerType === 2 && v.ifSkip === 1) {
      this.props.history.push(`/detail?gid=${v.childCategoryId}&pid=${v.productId}`)
    }
  }
  toPageFuluIdAndToken = (v) => {
    let shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    let { fuluId, fuluToken } = userInfo;
    // 如果需要页面跳转添加fuluId和token
    let flag = configs.codeIdFuluIdAndToken ? configs.codeIdFuluIdAndToken.some(item => item.toLowerCase() === shopInfo.codeKey.toLowerCase()) : false;
    let { linkurl } = v;
    if (linkurl) {
      if (flag) {
        // 如果存在?符号
        if (linkurl.indexOf('?') !== -1) {
          linkurl = `${linkurl}${fuluId ? '&fuluId=' + fuluId : ''}${fuluToken ? '&fuluToken=' + fuluToken : ''}`;
        }
        // 如果不存在
        else {
          linkurl = `${linkurl}${fuluId ? '?fuluId=' + fuluId : ''}${fuluToken ? '&fuluToken=' + fuluToken : ''}`;
        }
      }
      window.location.href = linkurl;
    }
  }
  getCom = () => {
    const { item } = this.props;
    if (!item.moduleDataList.length) {
      return <div className="banner-shuffling-box">
        <Carousel autoplay>
          <div>
            <img className="banner-img" src={'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png'} />
          </div>
        </Carousel>
      </div>
    }
    else {
      let { pageMargin = 0, isHideText, topMargin = 0, bottomMargin = 0, imageChamfer, borderRadius } = item.modelStyle.bannerRollStyleModel;
      const style = {

        boxShadow: item.modelStyle.bannerRollStyleModel.imageStyle === 'Projection' ? 'rgba(47,54,70,0.1) 0px 0px .2rem' : '',
        padding: `${topMargin / 50}rem ${pageMargin / 50}rem ${bottomMargin / 50}rem`,
      };
      return <div className="banner-shuffling-box clearfix" style={{ ...style }}>
        <Carousel autoplay infinite >
          {item.moduleDataList.map((nowItem) => {
            return <li style={{ width: '100%' }}>
              <a
                key={nowItem.productId}
                onClick={() => { this.toBanner(nowItem) }}
                style={{ display: 'inline-block', width: '100%' }}
              >
                <img
                  src={nowItem.bannerUrl}
                  alt=""
                  className="banner-shuffling-box-img"
                  style={{
                    width: '100%', verticalAlign: 'top',
                    borderRadius: borderRadius === null ? '.16rem' : `${borderRadius / 50}rem`,
                  }}

                />
              </a>
            </li>
          })}
        </Carousel>
        {!isHideText && <div className="advantage">
          <span><Icons glyph={zpbz} />正品保证</span>
          <span><Icons glyph={zxzk} />专享折扣</span>
          <span><Icons glyph={jstk} />急速到账</span>
          <span><Icons glyph={shwy} />售后无忧</span>
        </div>}
      </div>
    }
  }
  render() {
    return (
      this.getCom()
    )
  }
}
