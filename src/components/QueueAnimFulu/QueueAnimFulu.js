import React from 'react';
import QueueAnim from 'rc-queue-anim';

class QueueAnimFulu extends React.Component {
  render() {
    return (
      <QueueAnim duration={200} type={this.props.type || 'bottom'} >
        {this.props.children}
      </QueueAnim>
    );
  }
}

export default QueueAnimFulu;
