import React, { Fragment } from 'react';
import './less/activeModalCom.less';

class ActiveModalCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showActiveModal: false
    }
  }
  toPage = () => {
    const { allInfo } = this.props;
    const { linkType, linkData } = allInfo.sidebarDetail;
    // 如果是自定义链接
    if (linkType === 1) {
      return window.location.href = allInfo.sidebarDetail.linkUrl;
    }
    // 如果是内部商品
    else if (linkType === 2) {
      this.props.history.push(`/detail?gid=${allInfo.sidebarDetail.linkUrl}&pid=${allInfo.sidebarDetail.linkData}`);
    }
    // 如果是跳转分类页
    else if (linkType === 3) {
      return this.props.history.push(`/list?mid=${linkData}`);
    }
    // 如果是跳转频道页
    else if (linkType === 4) {
      return this.props.history.push(`/channel?pageId=${linkData}`);
    }
  }
  render() {
    const { allInfo } = this.props;
    return (
      <Fragment>
        <div className="active-modal-com" onClick={this.toPage}>
          <img className="active-modal-com-img" src={allInfo.sidebarDetail.imagePath} />
        </div>
      </Fragment>
    );
  }
}

export default ActiveModalCom;
