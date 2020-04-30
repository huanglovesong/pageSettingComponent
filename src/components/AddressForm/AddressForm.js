import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import './less/addressform.less';

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    this.state = {
      userInfo,
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'prize/getAddress', payload: {
        drawnId: 'd6844ca9-8087-11ea-83c4-0242ac110002',
      }
    })
  }
  submitForm = () => {
    const { userInfo } = this.state;
    this.props.dispatch({
      type: 'prize/saveAddress', payload: {
        userId: userInfo.fuluId,
        mobile: '130361632256',
        receipt: '周稳',
        receiptAddress: '南极',
        eventId: 'CJ100001',
        drawnId: 'd6844ca9-8087-11ea-83c4-0242ac110002',
      }
    })
  }
  render() {
    return (
      <div className="addressform">
        <button onClick={this.submitForm}>提交</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(AddressForm);
