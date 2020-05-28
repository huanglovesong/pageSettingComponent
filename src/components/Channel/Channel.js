import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

import { Home as MyHome } from '../PageSettingComPonent';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <MyHome history={this.props.history} pageType={2} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(Home);