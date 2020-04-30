import React from 'react';
import PropTypes from 'prop-types';

class BlankPage extends React.Component {

  componentWillMount() {
		// 获取商户信息
		const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
    if (shopInfo.infoState === 0) {
			return location.href = "/nothing";
		}
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

export default BlankPage;

