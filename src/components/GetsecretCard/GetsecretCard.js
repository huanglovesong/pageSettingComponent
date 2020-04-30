import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import Header from '../Header';
import Icons, { back, shanchu } from '../Icon';
import { Toast, List, InputItem } from 'antd-mobile';
import './less/getsecretCard.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import parse from 'url-parse';
import { createForm } from 'rc-form';

class GetsecretCard extends React.Component {

    constructor(props) {
        super(props);
        const url = parse(props.location.search, true);
        const { oid, pid, mid } = url.query;
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
        const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
        this.state = {
            oid,
            pid,
            mid,
            copied: false,
            card: [],
            goodsDetail: {},
            hasError: false,
            extractCode: '',
            shopInfo,
            isPatchCard: false, 
            hotPro: [],
        }
    }
    componentWillMount() {
        const { pid, mid,shopInfo } = this.state;
        this.props.dispatch({
            type: 'detail/getProductById',
            payload: {
                productId: pid,
                childCategoryId: mid
            }
        })
        this.getHotCategory()
        if(shopInfo.codeKey.toLowerCase() === (configs.xiaomi ? configs.xiaomi.toLowerCase() : '')){
            this.getsecretCard();
        }
    }
    getHotCategory = () => {
        const { oid, shopInfo } = this.state;
        this.props.dispatch({
            type: 'pay/getHotCategory',
            payload: {
                merchantId: shopInfo.merInfoId
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        const { props } = this;
        const { detail: { getProductById, getSecretCard } } = nextProps;
        const { pay: { getHotCategory } } = nextProps;
        if (getHotCategory !== props.pay.getHotCategory) {
            const { code, data, message } = getHotCategory;
            if (code === '1000') {
                this.setState({
                    hotPro: data.list
                })
            }
        }
        if (getProductById !== props.detail.getProductById) {
            const { code, data, message } = getProductById;
            if (code === '1000') {
                this.setState({
                    goodsDetail: data ? data : {},
                });
            } else {
                Toast.info(message);
            }
        }
        if (getSecretCard !== props.detail.getSecretCard) {
            const { code, data, message } = getSecretCard;
            if (code === '1000') {
                if (data && data.list) {
                    this.setState({
                        card: data.list
                    });
                } else {
                    this.setState({
                        card: []
                    });
                    Toast.info(getSecretCard.message);
                }
            } else {
                Toast.info(message);
            }
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length !== 6) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            extractCode: value,
        });
    }
    onCopy = (text, result) => {
        this.setState({ copied: true });
        if (result) {
            Toast.success('已复制');
        }
    }
    getsecretCard = () => {
        const { oid, extractCode, shopInfo } = this.state;
        this.props.dispatch({
            type: 'detail/getSecretCard',
            payload: {
                orderNo: oid,
                extractCode: shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') ? extractCode : '123456'
            }
        })
    }
    toUrl = (url) => {
        this.props.history.push(url)
    }
    render() {
        const { goodsDetail, extractCode, hasError, card, isPatchCard, shopInfo,  hotPro } = this.state;
        const { getFieldProps } = this.props.form;
        return (
            <div className="secret-card clearfix">
                <Header
                    title="提取卡密"
                    {...this.props}
                    jump={() => this.props.history.goBack()}
                    myLoading={!!(this.props.loading && this.props.loading.effects['detail/getProductById'])}  // 判断loading
                />
                <div className="secret-con">
                    <div className="d-info">
                        <div className="menu-img">
                            <img src={goodsDetail.iconPath} /></div>
                        <div className="menu-t">
                            <div className="name">{goodsDetail.productName}</div>
                            <div className="price">{goodsDetail.price}<small>元</small><s>{goodsDetail.faceValue}元</s></div>
                        </div>
                    </div>
                    <div className="secret-account">
                        {
                            shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
                            <div className="line d-account">
                                <InputItem
                                    {...getFieldProps('extractCode')}
                                    placeholder="输入6位数字提取码"
                                    clear
                                    className="input-bg"
                                    type="number"
                                    value={extractCode}
                                    onChange={this.onChange}
                                ></InputItem>
                                {
                                    hasError ?
                                        <p className="input-tips redfont">请输入6位数字的提取码</p>
                                        :
                                        <p className="input-tips">请输入您在购买商品时填写的6位数字卡密提取码</p>
                                }
                            </div>
                        }
                        {
                            shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
                            <button disabled={!extractCode || extractCode.length !== 6 || !!this.props.loading.models.detail} className="btn-theme get-btn" onClick={this.getsecretCard}>立即提取</button>
                        }
                    </div>
                    {
                        card && card.length ?
                            <div className="card-info">
                                <h2>卡密信息</h2>
                                <div className="crad-con">
                                    {
                                        card.map((v, i) => (
                                            <div className="card-line" key={i}>
                                                {
                                                    shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
                                                    <p>卡号：<span>{v.cardNumber}</span>
                                                        <CopyToClipboard
                                                            text={v.cardNumber}
                                                            onCopy={this.onCopy}
                                                        >
                                                            <button>复制</button>
                                                        </CopyToClipboard>
                                                    </p>
                                                }
                                                <p>密码：<span>{v.cardPwd}</span>
                                                    <CopyToClipboard
                                                        text={v.cardPwd}
                                                        onCopy={this.onCopy}
                                                    >
                                                        <button>复制</button>
                                                    </CopyToClipboard>
                                                </p>
                                            </div>
                                        ))
                                    }
                                    <div className="tips">请在<span className="themefont">官方指定充值渠道</span>处充值，切勿通过他人提供的网站或充值渠道进行充值操作</div>
                                </div>
                            </div> : ''
                    }
                    <div className="use-info">
                        <p>
                            {
                                goodsDetail.content && goodsDetail.content.split('|').map((v, i) => (
                                    <div key={i} dangerouslySetInnerHTML={{
                                        __html: v
                                    }} />
                                ))
                            }
                        </p>
                    </div>
                    {
                        shopInfo.codeKey.toLowerCase() === (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') &&
                        <div className="more-bg">
                            <div className="more-txt">为你精选更多权益</div>
                            <div className="more-pro">
                                {
                                    hotPro && hotPro[0] && hotPro.map((item,index) => (
                                        index < 3 &&<div className="item" onClick={() => { this.toUrl(`/detail?gid=${item.childCategoryId}`) }}>
                                            <img src={item.iconPath} />
                                            <span className="name">{item.childCategoryName}</span>
                                            <span className="price">{item.price}<small>元起</small></span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(createForm()(GetsecretCard));