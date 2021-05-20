import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './less/richText.less';
export default class RichText extends Component {
  static propTypes = {
    prop: PropTypes
  }
  getCom = () => {
    const { item, componentIndex } = this.props;
    console.log(componentIndex, 222)
    let content = item.moduleDataList[0].textDataLong;
    const { pageMargin, topMargin, bottomMargin } = item.modelStyle.richTextStyleModel;
    const style1 = {
      paddingLeft: `${pageMargin / 50}rem`, paddingRight: `${pageMargin / 50}rem`,
      paddingTop: `${topMargin / 50}rem`, paddingBottom: `${bottomMargin / 50}rem`,
    };
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
