import React from 'react';
import PropTypes from 'prop-types';
import Icons, { back } from '../Icon';
import Loading from '../Loading';
import './less/header.less';
import mathManage from '../../utils/mathManage';

class Header extends React.Component {

    constructor(props) {
        super(props);
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            hasHead: false,
            shopInfo
        }
    }
    componentWillMount() {
        // 获取商户信息
        const { shopInfo } = this.state;
        if (shopInfo.infoState === 0) {
            return location.href = "/nothing";
        }
    }
    componentDidMount() {
        let { hasHead, shopInfo } = this.state;
        if (shopInfo.codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
            var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision)
            if (bankVision === -1) {
                hasHead = true
            } else {
                hasHead = false
            }
        } else {
            hasHead = false
        }
        this.setState({
            hasHead
        }, () => {
            if (hasHead) {
                $("#app").css('paddingTop', '.88rem');
            }
        })
    }
    render() {
        const { shopInfo, hasHead } = this.state;
        return (
            <div>
                {
                    hasHead ?
                        <div className="header-bg clearfix">
                            {
                                this.props.location.pathname !== '/' ?
                                    <button
                                        className="header-left"
                                        onClick={() => this.props.jump ? this.props.jump() : this.props.history.goBack(-1)}
                                    >
                                        <Icons glyph={back} />返回
                                    </button>
                                    :
                                    <button
                                        className="header-left"
                                    >
                                    </button>
                            }
                            <div className="header-center">
                                {shopInfo.merInfoTemplates.infoTitle}
                            </div>
                            <div className="header-right"></div>
                        </div>
                        :
                        ''
                }
                {
                    this.props.myLoading &&
                    <Loading />
                }
            </div>
        )
    }
}

export default Header;