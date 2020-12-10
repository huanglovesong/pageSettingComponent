import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './less/richText.less';
export default class RichText extends Component {
  static propTypes = {
    prop: PropTypes
  }
  getCom = () => {
    const { item } = this.props;
    let content = item.moduleDataList[0].textDataLong;
    const { pageMargin, topMargin, bottomMargin } = item.modelStyle.richTextStyleModel;
    const style1 = {
      paddingLeft: `${pageMargin}px`, paddingRight: `${pageMargin}px`,
      paddingTop: `${topMargin / 50}rem`, paddingBottom: `${bottomMargin / 50}rem`,
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
