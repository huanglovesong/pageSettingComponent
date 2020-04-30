import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';

import PageSettingComPonent from '../PageSettingComPonent';

class Home extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         allInfo: {
            pageModuleList: []
         }
      }
   }
   componentWillMount() {
      this.props.dispatch({
         type: 'pageSetting/getPage',
         payload: {
            pageType: 1
         }
      });
   }
   componentWillReceiveProps(nextProps) {
      const { props } = this;
      const { pageSetting: { getPageResult } } = nextProps;
      if (getPageResult !== props.pageSetting.getPageResult) {
         const { code, data, message } = getPageResult;
         if (code === '0') {
            return this.setState({
               allInfo: data
            })
         } else {
            Toast.info(message);
         }
      }
   }
   render() {
      const { allInfo } = this.state;
      return (
         <PageSettingComPonent history={this.props.history} allInfo={allInfo} />
      )
   }
}

const mapStateToProps = (state) => {
   return {
      ...state,
   };
}

export default connect(mapStateToProps)(Home);