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
    this.props.history.push(allInfo.sidebarDetail.linkUrl);
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
