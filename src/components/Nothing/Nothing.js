import React from 'react';
import PropTypes from 'prop-types';
import './less/nothing.less';

const Nothing = (props) => {
  return (
    <div>
        <div className="nothing">
          <div className="no-bg" />
          该页面访问地址无效~
        </div>
    </div>
  );
};

export default Nothing;
