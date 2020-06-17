import React from 'react';
import { connect } from 'dva';

import { LoginPage } from '../PageSettingComPonent';

class MyLogin extends React.Component {

  render() {
    return (
      <LoginPage history={this.props.history} pageType={4} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(MyLogin);