import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Icons, { back } from '../Icon';
import './less/useCard.less';

class UseCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        return (
            <div className="use-card clearfix">
                <Header
                    title="提取卡密步骤"
					{...this.props}
                    jump={() => this.props.history.goBack()}
                />
            </div>
        )
    }
}

export default UseCard;