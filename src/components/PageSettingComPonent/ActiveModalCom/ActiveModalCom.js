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
    // 如果是自定义链接
    if (allInfo.sidebarDetail.linkType === 1) {
      return window.location.href = allInfo.sidebarDetail.linkUrl;
    }
    // 如果是内部商品
    this.props.history.push(`/detail?gid=${allInfo.sidebarDetail.linkUrl}&pid=${allInfo.sidebarDetail.linkData}`);
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
