import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import BannerShuffling from './BannerShuffling';
import BannerAdvertising from './BannerAdvertising';
import Classification from './Classification';
import FlashSale from './FlashSale';
import ImageText from './ImageText';
import Notice from './Notice';
import ActiveModalCom from './ActiveModalCom';
import ActiveModal from './ActiveModalCom/ActiveModal';
import './less/pageSetting.less';

class PageSettingComPonent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allInfo: {
                pageModuleList: []
            },
        }
    }
    componentWillMount() {

    }
    componentWillReceiveProps(nextProps) {
        const { allInfo } = this.state;
        if (allInfo !== nextProps.allInfo) {
            this.setState({
                allInfo: nextProps.allInfo
            })
        }
    }
    getCom = () => {
        const { allInfo } = this.state;
        let arr = [];
        allInfo.pageModuleList.map((item) => {
            // banner轮播
            if (item.moduleType === 'bannerRoll') {
                arr.push(<BannerShuffling item={item} history={this.props.history} />)
            }
            // banner广告
            else if (item.moduleType === 'banner') {
                arr.push(<BannerAdvertising item={item} history={this.props.history} />)
            }
            // 分类
            else if (item.moduleType === 'class') {
                arr.push(<Classification item={item} history={this.props.history} />)
            }
            // 限时抢购
            else if (item.moduleType === 'flashSale') {
                arr.push(<FlashSale item={item} history={this.props.history} />)
            }
            // 图文导航
            else if (item.moduleType === 'imageText') {
                arr.push(<ImageText item={item} history={this.props.history} />)
            }
            // 图文导航
            else if (item.moduleType === 'notice') {
                arr.push(<Notice item={item} history={this.props.history} />)
            }
        });
        return arr;
    }
    hideModal = () => {
        const { allInfo } = this.state;
        allInfo.isPopup = false;
        this.setState({ allInfo })
    }
    render() {
        const { allInfo } = this.state;
        const { disableClick } = this.props;
        return (
            <div className={`main-bg ${disableClick && 'point-events-none'}`}>
                <div className="page-setting-content" style={{ background: allInfo.backgroud }}>
                    {this.getCom()}
                </div>
                {allInfo.isPopup && <ActiveModal history={this.props.history} allInfo={allInfo} disableClick={disableClick} hideModal={this.hideModal} />}
                {allInfo.isSidebar && <ActiveModalCom history={this.props.history} allInfo={allInfo} />}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(PageSettingComPonent);