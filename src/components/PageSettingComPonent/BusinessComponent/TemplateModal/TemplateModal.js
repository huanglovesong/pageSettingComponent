import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
// import { Form, Input, Button, message, Spin, Select, Modal } from 'antd';
import { Picker, List, InputItem, Toast, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

class TemplateModal extends React.Component {

  constructor(props) {
    super(props);
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {}
    const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {}
    this.state = {
      TemplateId: this.props.TemplateId || '',
      inputs: [],
      ChargeGameList: [],
      chargeSelect: [],
      chargeNum: {},
      isServiceArea: false,
      ChargeRegionList: [],
      ChargeServerList: [],
      ChargeTypeList: [],
      postData: {
        ChargeNum: '1',
        ChargeGame: '',
        ChargeRegion: '',
        ChargeServer: '',
        ChargeType: '',
      },
      shopInfo,
    }
  }

  componentWillMount() {
    this.getTemplate(this.props.TemplateId || '');
    //自定义配色
    const { shopInfo } = this.state;
    if (configs[shopInfo.codeKey]) {
      this.setState({
        customColor: configs[shopInfo.codeKey] || '#FF6232'
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    const { props } = this;
    const { ctripcard: { getGameProTemp, toOrderMid } } = nextProps;
    if (this.props.TemplateId !== nextProps.TemplateId) {
      this.getTemplate(nextProps.TemplateId);
    }
    if (getGameProTemp !== props.ctripcard.getGameProTemp) {
      const { code, data } = getGameProTemp;
      if (code === '1000') {
        if (data.addressId) {
          const { elementInfo, gameTempaltePreviewList, isServiceArea } = data;
          // 解析数量
          if (elementInfo && elementInfo.chargeNum) {
            this.mangeNum(elementInfo.chargeNum);
            this.setState({
              chargeNum: elementInfo.chargeNum
            })
          }
          this.setState({
            inputs: elementInfo && elementInfo.inputs ? elementInfo.inputs : [],
            ChargeGameList: gameTempaltePreviewList,
            isServiceArea,
          });
        } else {
          Toast.info(getGameProTemp.message);
        }
      } else {
        Toast.info(getGameProTemp.message);
      }
    }
    if (toOrderMid !== props.ctripcard.toOrderMid) {
      const { postData } = this.state;
      postData.ChargeNum = '1';
      this.getTemplate()
      this.setState({
        postData
      })
    }
  }
  // 获取模板信息
  getTemplate = (id) => {
    // 如果TemplateID不存在则不查询
    if (id) {
      this.props.dispatch({ type: 'ctripcard/GetProductTemp', payload: { productTemplateId: id } });
    }
  }

  mangeNum = (num) => {
    const { choseProduct } = this.props;
    // console.log('====', choseProduct)
    let chargeSelect = [], centerArr = [];
    if (num) {
      // 判断是否包含 | 
      if (num.value.indexOf("|") != -1) {
        centerArr = num.value.split('|');
      } else {
        centerArr.push(num.value);
      }
      // 判断是否包含 -
      centerArr.length && centerArr.map(v => {
        if (v.indexOf("-") != -1) {
          let a = v.split('-');
          for (let i = Number(a[0]); i <= Number(a[1]); i++) {
            if (Number(i) <= Number(choseProduct.singlePurchaseLimit)) {
              chargeSelect.push({
                label: i.toString(),
                value: i.toString(),
              });
            }
          }
        } else {
          if (Number(v) <= choseProduct.singlePurchaseLimit) {
            chargeSelect.push({
              label: v.toString(),
              value: v.toString(),
            });
          }
        }
      })
    }
    this.setState({
      chargeSelect
    }, () => {
      const { postData } = this.state;
      postData.ChargeNum = chargeSelect.length > 0 ? chargeSelect[0].value : '1';
      this.setState({
        postData
      })
    })
  }
  // 选择游戏
  changeGame = (val) => {
    this.props.form.setFieldsValue({
      ChargeRegion: '',
      ChargeServer: '',
      ChargeType: '',
    })
    let { ChargeGameList, ChargeRegionList, ChargeServerList, ChargeTypeList } = this.state;
    ChargeGameList.map(v => {
      if (v.ChargeGame === val) {
        if (v.gameList.ChargeRegion[0]) {
          ChargeRegionList = v.gameList.ChargeRegion;
          ChargeServerList = [];
          ChargeTypeList = [];
        }
        if (v.gameList.ChargeServer[0]) {
          ChargeServerList = v.gameList.ChargeServer;
          ChargeTypeList = [];
        }
        if (v.gameList.ChargeType[0]) {
          ChargeTypeList = v.gameList.ChargeType;
        }
        this.setState({
          ChargeRegionList,
          ChargeServerList,
          ChargeTypeList
        })
      }
    })
  }
  changeRegion = (val) => {
    this.props.form.setFieldsValue({
      ChargeServer: '',
      ChargeType: '',
    })
    let { ChargeRegionList, ChargeServerList, ChargeTypeList } = this.state;
    ChargeRegionList.map(v => {
      if (v.name === val) {
        if (v.ChargeServer[0]) {
          ChargeServerList = v.ChargeServer;
          if (ChargeTypeList[0] && v.ChargeType[0]) {
            ChargeTypeList = [];
          }
        }
        if (v.ChargeType[0]) {
          ChargeTypeList = v.ChargeType;
        }
        this.setState({
          ChargeServerList,
          ChargeTypeList
        })
      }
    })
  }
  changeServer = (val) => {
    this.props.form.setFieldsValue({
      ChargeType: '',
    })
    let { ChargeServerList, ChargeTypeList } = this.state;
    ChargeServerList.map(v => {
      if (v.name === val) {
        if (v.ChargeType[0]) {
          ChargeTypeList = v.ChargeType;
        }
        this.setState({
          ChargeTypeList
        })
      }
    })
  }
  // 提交
  exchange = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 正则匹配
        const { postData } = this.state;
        if (postData.extractCode) {
          values.extractCode = postData.extractCode;
        }
        if ('ChargeAccount' in values) {
          //4到16位（字母，数字，下划线，减号）
          const { validType, inputTips } = this.props;
          let validTxt = '', validText = "";
          if (validType === 1) {  //手机
            validTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
            validText = '手机号';
          } else if (validType === 2) { // qq
            validTxt = /^[1-9][0-9]{4,10}$/;
            validText = 'QQ号';
          } else if (validType === 3) {  // 邮箱
            validTxt = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            validText = '邮箱';
          }
          if (!postData.ChargeAccount) {
            return Toast.info(`请输入正确充值账号`);
          }
          if (validTxt && !validTxt.test(postData.ChargeAccount)) {
            return Toast.info(`${inputTips && inputTips || '请输入正确的充值账号'}`);
          }
        }
        if ('ContactType' in values) {
          // 手机
          if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(postData.ContactType)) {
            return Toast.info('手机号格式错误')
          }
        }
        if ('ContactQQ' in values) {
          // qq
          if (!/^[1-9][0-9]{4,11}$/.test(postData.ChargeAccount)) {
            return Toast.info('qq格式错误')
          }
        }
        if ('ChargePWD' in values) {
          // 密码
          if (!/^[a-zA-Z0-9_-]{4,16}$/.test(postData.ChargePWD)) {
            return Toast.info('密码由4到16位（字母，数字，下划线，减号）组成')
          }
        }
        if ('ChargeWeiXin' in values) {
          // 微信
          if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(postData.ChargeWeiXin)) {
            return Toast.info('微信格式错误')
          }
        }
        if ('ChargeContacts' in values) {
          // 联系人
          if (!postData.ChargeContacts) {
            return Toast.info('联系人不能为空')
          }
        }
        if ('ChargeAddress' in values) {
          // 联系地址
          if (!postData.ChargeAddress) {
            return Toast.info('联系地址不能为空')
          }
        }
        if ('ChargeGame' in values) {
          // 充值游戏
          if (!postData.ChargeGame) {
            return Toast.info('充值游戏不能为空')
          }
        }
        if ('ChargeRegion' in values) {
          // 区
          if (!postData.ChargeRegion) {
            return Toast.info('充值区不能为空')
          }
        }
        if ('ChargeServer' in values) {
          // 服
          if (!postData.ChargeServer) {
            return Toast.info('充值服不能为空')
          }
        }
        if ('ChargeType' in values) {
          // 充值类型
          if (!postData.ChargeType) {
            return Toast.info('充值类型不能为空')
          }
        }
        if ('extractCode' in values) {
          // 充值类型
          if (!postData.extractCode) {
            return Toast.info('手机号不能为空')
          } else {
            var validTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
            if (validTxt && !validTxt.test(postData.extractCode)) {
              return Toast.info('请输入正确的手机号');
            }
          }
        }
        this.props.getGameInfo(postData);
      }
    })
  }
  changeInput = (type, val) => {
    const { postData } = this.state;
    postData[`${type}`] = val;
    this.setState({
      postData
    })
  }
  changeSelect = (type, val) => {
    const { postData } = this.state;
    postData[`${type}`] = val[0];
    this.setState({
      postData
    })
  }

  render() {
    const { isServiceArea, inputs, chargeNum, shopInfo, chargeSelect, ChargeGameList, ChargeRegionList, ChargeServerList,
      ChargeTypeList, postData } = this.state;
    const { choseProduct, passCodeStatus, startSecound, surplusTime, isLoading } = this.props;
    const { getFieldProps } = this.props.form;
    let gameList = [], regionList = [], serverList = [], typeList = [];
    ChargeGameList && ChargeGameList[0] && ChargeGameList.map(v => {
      gameList.push({
        label: v.ChargeGame,
        value: v.ChargeGame,
      })
    })
    ChargeRegionList && ChargeRegionList[0] && ChargeRegionList.map(v => {
      regionList.push({
        label: v.name,
        value: v.name,
      })
    })
    ChargeServerList && ChargeServerList[0] && ChargeServerList.map(v => {
      serverList.push({
        label: v.name,
        value: v.name,
      })
    })
    ChargeTypeList && ChargeTypeList[0] && ChargeTypeList.map(v => {
      typeList.push({
        label: v.name,
        value: v.name,
      })
    })
    return (
      <div className="exchange-form">
        <List>
          {
            inputs && inputs.length ? inputs.map(v => {
              if (v.type === 'Input') {
                return (
                  <div className="d-account">
                    <InputItem
                      {...getFieldProps(v.id)}
                      placeholder={choseProduct.inputTips || `请输入${v.name}`}
                      clear
                      className="input-bg"
                      value={postData[`${v.id}`]}
                      onChange={(val) => { this.changeInput(`${v.id}`, val) }}
                      disabled={choseProduct.isActivity && passCodeStatus.userPassCodeStatus === 3}
                    ></InputItem>
                  </div>
                )
              }
            })
              :
              ''
          }
          {
            isServiceArea ?
              // 有区服
              <div>
                {
                  gameList && gameList[0] &&
                  <div className="d-account">
                    <Picker
                      {...getFieldProps('ChargeGame')}
                      data={gameList}
                      cols={1}
                      value={[postData[`ChargeGame`]]}
                      onChange={(val) => { this.changeSelect(`ChargeGame`, val); this.changeGame(val[0]) }}
                    >
                      <List.Item arrow="horizontal">游戏</List.Item>
                    </Picker>
                  </div>
                }
                {
                  regionList && regionList[0] &&
                  <div className="d-account">
                    <Picker
                      {...getFieldProps('ChargeRegion')}
                      data={regionList}
                      cols={1}
                      value={[postData[`ChargeRegion`]]}
                      onChange={(val) => { this.changeSelect(`ChargeRegion`, val); this.changeRegion(val[0]) }}
                    >
                      <List.Item arrow="horizontal">游戏大区</List.Item>
                    </Picker>
                  </div>
                }
                {
                  serverList && serverList[0] &&
                  <div className="d-account">
                    <Picker
                      {...getFieldProps('ChargeServer')}
                      data={serverList}
                      cols={1}
                      value={[postData[`ChargeServer`]]}
                      onChange={(val) => { this.changeSelect(`ChargeServer`, val); this.changeServer(val[0]) }}
                    >
                      <List.Item arrow="horizontal">游戏服</List.Item>
                    </Picker>
                  </div>
                }
                {
                  typeList && typeList[0] &&
                  <div className="d-account">
                    <Picker
                      {...getFieldProps('ChargeType')}
                      data={typeList}
                      cols={1}
                      value={[postData[`ChargeType`]]}
                      onChange={(val) => { this.changeSelect(`ChargeType`, val); }}
                    >
                      <List.Item arrow="horizontal">游戏类型</List.Item>
                    </Picker>
                  </div>
                }
              </div>
              : ''
          }
          {/* {
            // 选择数量
            chargeSelect && chargeSelect[0] && !choseProduct.isActivity &&
            <div className="d-account">
              <Picker
                data={chargeSelect}
                cols={1}
                value={[postData[`${chargeNum.id}`]]}
                onChange={(val) => { this.changeSelect(`${chargeNum.id}`, val); }}
              >
                <List.Item arrow="horizontal">选择数量</List.Item>
              </Picker>
            </div>
          } */}
        </List>
        {
          choseProduct.isActivity ?
            <div className="btn-bg">
              {
                choseProduct.activityState == 0 ?
                  <button className="btn-block time-btn">
                    <span>距离开抢还剩：</span>
                    <span>{startSecound ? startSecound : '--:--'}</span>
                  </button>
                  : ''
              }
              {
                choseProduct.activityState == 1 && passCodeStatus ?
                  <div className="active-btn">
                    {
                      // 马上抢 立即兑换(兑换下单)  立即兑换（直接跳订单） 正在抢购，请稍等...   您已参加
                      passCodeStatus.userPassCodeStatus === 3 ?
                        <button className="btn-block prim-btn" onClick={this.props.GetPassCode}>马上抢</button>
                        : ''
                    }
                    {
                      passCodeStatus.userPassCodeStatus === 4 && !isLoading ?
                        <Button loading={this.props.exchangloading} className="btn-block prim-btn" onClick={this.exchange}>立即兑换</Button>
                        : ''
                    }
                    {
                      passCodeStatus.userPassCodeStatus === 1 && !isLoading ?
                        <button className="btn-block prim-btn" onClick={() => { this.props.toOrderSure(passCodeStatus.orderNo) }}>立即购买</button>
                        : ''
                    }
                    {
                      passCodeStatus.userPassCodeStatus === 4 && isLoading ?
                        <button disabled={true} className="btn-block disable-btn">正在抢购，请稍等...</button>
                        : ''
                    }
                    {
                      passCodeStatus.userPassCodeStatus === 2 ?
                        <button disabled={true} className="btn-block disable-btn">您已参加</button>
                        : ''
                    }
                  </div>
                  : ''
              }
              {
                choseProduct.activityState == 2 ?
                  <button disabled={true} className="btn-block disable-btn">活动已结束</button>
                  : ''
              }
            </div>
            :
            <div className="btn-bg">
              <Button
                style={{ background: `${this.state.customColor}` }}
                className="btn-block prim-btn"
                onClick={() => { this.exchange() }}
                disabled={this.props.exchangloading}
                loading={!!(this.props.loading && this.props.loading.effects['detail/sendOrder'])}
              >立即兑换</Button>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

export default connect(mapStateToProps)(createForm()(TemplateModal));
