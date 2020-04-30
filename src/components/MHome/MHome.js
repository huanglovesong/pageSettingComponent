import React from 'react';
import { connect } from 'dva';
import PageSettingComPonent from '../PageSettingComPonent';

class Home extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
      }
   }
   render() {

      return (
         <PageSettingComPonent/>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      ...state,
   };
}

export default connect(mapStateToProps)(Home);