import React from 'react';
import { connect } from 'dva';

import { ExchangePage } from '../PageSettingComPonent';

class MyExchange extends React.Component {

  render() {
    return (
      <ExchangePage history={this.props.history} pageType={1} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(MyExchange);