import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './less/richText.less';
export default class RichText extends Component {
  static propTypes = {
    prop: PropTypes
  }
  getCom = () => {
    const { item } = this.props;
    let pagePadding = item.modelStyle.richTextStyleModel.pageMargin;
    let content = item.moduleDataList[0].textDataLong;
    const style1 = {
      paddingLeft: `${pagePadding}px`, paddingRight: `${pagePadding}px`
    };
    console.log(item, 12312)
    return <div className="rich-text-box clearfix" style={{ ...style1 }}>
      <div className="rich-text-con">
        {content ? <div dangerouslySetInnerHTML={{ __html: content }}></div> : '请选择富文本编辑'}
      </div>
    </div>

  }
  render() {
    return (
      this.getCom()
    )
  }
}
