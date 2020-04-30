import React from 'react';
import PropTypes from 'prop-types';
import './less/footer.less';
import { Icon } from 'antd-mobile';
import Icons, { home, user } from '../Icon';

class Footer extends React.Component {

    constructor(props) {
        super(props);
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            pathname: props.location.pathname,
            shopInfo
        }
    }
    choose = (pathname) => {
        this.setState({
            pathname
        }, () => {
            this.props.history.push(pathname)
        })
    }
    render() {
        const { pathname, shopInfo } = this.state;
        return (
            <div>
                {
                    shopInfo.merInfoTemplates.visitType !== 3 ?
                        <div className="footer-bg clearfix">
                            <div className={pathname === '/' ? "item active" : "item"} onClick={() => { this.choose('/') }}>
                                <Icons glyph={home} />
                                首页
                        </div>
                            <div className={pathname === '/my' ? "item active" : "item"} onClick={() => { this.choose('/my') }}>
                                <Icons glyph={user} />
                                我的
                        </div>
                        </div>
                        : ''
                }
            </div>
        )
    }
}

export default Footer;