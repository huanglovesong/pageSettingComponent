import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import Icons, { zpbz, jstk, zxzk, shwy } from '../Icon';
import PropTypes from 'prop-types'
export default class BannerShufflingBox extends Component {
  static propTypes = {
    prop: PropTypes
  }
  toBanner = (v) => {
    debugger
    if (v.bannerType === 1) {
      window.open(v.linkurl, '_blank')
    } else if (v.bannerType === 2 && v.ifSkip === 1) {
      this.props.history.push(`/detail?gid=${v.childCategoryId}&pid=${v.productId}`)
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
      let { pageMargin = 0 } = item.modelStyle.bannerRollStyleModel;
      const style = {

        boxShadow: item.modelStyle.bannerRollStyleModel.imageStyle === 'Projection' ? 'rgba(47,54,70,0.1) 0px 0px .2rem' : '',
        padding: `0px ${pageMargin / 50}rem`
      };
      return <div className="banner-shuffling-box" style={{ ...style }}>
        <Carousel autoplay infinite>
          {item.moduleDataList.map((nowItem) => {
            return <li style={{ width: '100%', height: '2.7rem' }}>
              <a
                key={nowItem.productId}
                onClick={() => { this.toBanner(nowItem) }}
                style={{ display: 'inline-block', width: '100%', height: '2.7rem' }}
              >
                <img
                  src={nowItem.bannerUrl}
                  alt=""
                  className="banner-img"
                  style={{
                    width: '100%', verticalAlign: 'top',
                    borderRadius: item.modelStyle.bannerRollStyleModel.imageChamfer === 'fillet' ? '.16rem' : '0px',
                  }}

                />
              </a>
            </li>
          })}
        </Carousel>
        <div className="advantage">
          <span><Icons glyph={zpbz} />正品保证</span>
          <span><Icons glyph={zxzk} />专享折扣</span>
          <span><Icons glyph={jstk} />急速到账</span>
          <span><Icons glyph={shwy} />售后无忧</span>
        </div>
      </div>
    }
  }
  render() {
    return (
      this.getCom()
    )
  }
}
