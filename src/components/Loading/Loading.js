import React from 'react';
import PropTypes from 'prop-types';
import './less/loading.less';
import { Icon } from 'antd-mobile';

class Loading extends React.Component {

  componentWillMount() {

  }
  render() {
    return (
      <div className="load-bg">
        <div className="load-img">
        <Icon type="loading" style={{ width: '0.72rem', height: '0.72rem' }} />
        </div>
        加载中...
      </div>
    )
  }
}

export default Loading;

