import React from 'react';
import PropTypes from 'prop-types';
import Icons, { qq, phone,user } from '../Icon';
import { Toast } from 'antd-mobile';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Header from '../Header';
import './less/service.less';

class Service extends React.Component {

    constructor(props) {
        super(props);
        // 获取商户信息
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            shopInfo,
            copied: false,
        }
    }
    onCopy = (text, result) => {
        this.setState({ copied: true });
        if (result) {
            Toast.info('复制成功');
        }
    }
    render() {
        const { shopInfo } = this.state;
        return (
            <div className="service-bg clearfix">
                <Header
                    {...this.props}
                    jump={() => this.props.history.goBack()}
                />
                <div className="service-con">
                    <div className="service-top">
                        <div className="ser-txt">
                            <div className="header"><Icons glyph={user} /></div> 
                            <div className="h1">售后服务</div>
                            <div className="h5">7*24小时为您服务</div>
                        </div>
                    </div>
                    {
                        shopInfo && shopInfo.merInfoTemplates.merTemplatesMobile ?
                            <div className="s-call">
                                <div className="call-txt">
                                    <label>全国免费电话</label>
                                    <a href={`tel:${shopInfo.merInfoTemplates.merTemplatesMobile}`}>{shopInfo.merInfoTemplates.merTemplatesMobile}</a>
                                </div>
                                {/* <Icons glyph={phone} /> */}
                            </div>
                            : ''
                    }
                    {
                        shopInfo && shopInfo.merInfoTemplates.merTemplatesQq ?
                            <div className="s-call">
                                <div className="call-txt">
                                    <label>客服 / 售后官方QQ</label>
                                    <CopyToClipboard
                                        text={shopInfo.merInfoTemplates.merTemplatesQq}
                                        onCopy={this.onCopy}
                                    >
                                        <a>{shopInfo.merInfoTemplates.merTemplatesQq}</a>
                                    </CopyToClipboard>
                                </div>
                                {/* <Icons glyph={qq} /> */}
                            </div> : ''
                    }
                    {/* <div className="last-gray">
                        <div className="logo-s" />福禄
      				<div className="line">|</div>
                        本服务由福禄开放平台提供技术支持
	  			    </div> */}
                </div>
            </div>
        )
    }
}

export default Service;