import React, { Component } from 'react'
import { Modal } from 'antd-mobile';
import moment, { localeData } from 'moment';
import './less/activeModalCom.less';

export default class ActiveModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showHomeModal: false
        }
    }
    componentWillMount() {
        this.isShowHomeModal();
    }
    isShowHomeModal = () => {
        const { allInfo } = this.props;
        let { displayType, updateId } = allInfo.popupDetail;
        // 如果本地缓存的是否修改不等于服务返回的说明用户改过，所有功能重新开始计算
        if (localStorage.getItem('updateId') !== updateId) {
            localStorage.setItem('updateId', updateId);
            localStorage.removeItem('onlyOne');
            localStorage.removeItem('showHomoModalStr');
        }
        // 如果是只弹一次
        if (displayType === 'onlyOne' && !localStorage.getItem('onlyOne')) {
            this.setState({
                showHomeModal: true
            });
            localStorage.setItem('onlyOne', true);
        }
        // 如果是每天一次
        else {
            let nowDate = moment().format('YYYY-MM-DD');
            const showHomoModalStr = localStorage.getItem('showHomoModalStr');
            // 如果之前没有弹过弹窗
            if (!showHomoModalStr) {
                this.setState({
                    showHomeModal: true
                });
                let showHomoModalObj = { nowDate };
                localStorage.setItem('showHomoModalStr', JSON.stringify(showHomoModalObj));
            } else {
                let showHomoModalObj = JSON.parse(showHomoModalStr);
                // 如果是今天
                if (nowDate === showHomoModalObj.nowDate) {
                    this.setState({
                        showHomeModal: false
                    });
                }
                // 如果不是今天
                else {
                    this.setState({
                        showHomeModal: true
                    });
                    let showHomoModalObj = { nowDate };
                    localStorage.setItem('showHomoModalStr', JSON.stringify(showHomoModalObj));
                }
            }
        }

    }
    toPage = () => {
        const { allInfo } = this.props;
        // 如果是自定义链接
        if (allInfo.popupDetail.linkType === 1) {
            return window.location.href = allInfo.popupDetail.linkUrl;
        }
        // 如果是内部商品
        this.props.history.push(`/detail?gid=${allInfo.popupDetail.linkUrl}&pid=${allInfo.popupDetail.linkData}`);
    }
    render() {
        const { allInfo, disableClick } = this.props;
        const { showHomeModal } = this.state;
        return (
            <Modal
                visible={showHomeModal}
                transparent={true}
                maskClosable={false}
                onClose={this.props.hideModal}
                className="active-modal"
            >
                <div className="active-modal-content">
                    <img className="active-modal-content-img" src={allInfo.popupDetail.imagePath} />
                    <div className="active-modal-close-top" onClick={this.props.hideModal}></div>
                    <div className={`active-modal-close-bottom `} onClick={this.props.hideModal} onClick={this.toPage}></div>
                </div>
            </Modal>
        )
    }
}
