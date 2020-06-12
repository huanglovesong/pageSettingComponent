import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Toast, Picker, List, Button, InputItem } from 'antd-mobile';
import './less/exchange.less';
import TemplateModal from '../TemplateModal';

class Exchange extends React.Component {

  // *****支持链接中带兑换码,自动填入
  constructor(props) {
    super(props);
    const cardNumber = localStorage.getItem('cardNumber') || '';
    const shopInfo = localStorage.getItem('shopInfo') && JSON.parse(localStorage.getItem('shopInfo'));
    this.state = {
      codevalue: '',
      btnstatus: cardNumber.length > 0 ? 2 : 1,
      sValue: [],
      exchangeSuccess: false,
      account: '',
      productTemplateId: '',
      loading: false,
      exchangloading: false,
      cardNumber,
      shopInfo,
      extractCode: shopInfo.merInfoTemplates.visitType !== 3 ? localStorage.getItem("fuluId") : '',
      showMallLoginModal: false,
      // 授权模板的类型
      authType: ''
    }
  }
  componentWillMount() {
    //自定义配色
    const { shopInfo } = this.state;
    if (configs[shopInfo.codeKey]) {
      this.setState({
        customColor: configs[shopInfo.codeKey] || '#FF6232'
      })
    }
  }
  componentDidMount() {
    this.setState({
      codevalue: this.state.cardNumber ? this.codehandle(this.state.cardNumber) : ''
    })
  }
  componentWillReceiveProps(nextProps) {
    const { GetProductListResult, GetProductTempResult, sendCtripOrderResult, sendCtripCardOrderResult } = nextProps.exchange;
    const { authType } = this.state;
    // 如果是登录成功，找到对应组件authKey进行接下来的步骤
    if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
      console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex)
      if (authType === 'GetProductList') {
        this.submitcode();
      }
    }
    if (sendCtripCardOrderResult !== this.props.exchange.sendCtripCardOrderResult) {
      if (sendCtripCardOrderResult.code == 0) {
        //下单成功,跳转到orderstatus
        this.props.history.push(`./exchangestatus?orderNo=${sendCtripCardOrderResult.data}&extractCode=${this.state.extractCode}`);
        //const { value1 , value2 , value3 , value4 } = this.state;
        //this.props.history.push(`./exchangestatus?orderNo=${sendCtripCardOrderResult.data}&extractCode=${value1 + value2 + value3 + value4}`);
      } else {
        Toast.fail(sendCtripCardOrderResult.message);
        this.setState({
          exchangloading: false
        })
      }
    }
    if (GetProductListResult !== this.props.exchange.GetProductListResult) {
      const { code } = GetProductListResult;
      if (code == 0) {
        GetProductListResult.data.list && GetProductListResult.data.list.map((item, index) => {
          item.label = item.productName;
          item.value = item.productId;
        })
        this.setState({
          exchangeerrormessage: '',
          exchangeSuccess: true,
          productList: GetProductListResult.data.list ? GetProductListResult.data.list : [],
          sValue: GetProductListResult.data.list ? [GetProductListResult.data.list[0].value] : [],
          productTemplateId: GetProductListResult.data.list ? GetProductListResult.data.list[0].templateId : '',
          productDetail: GetProductListResult.data.list ? GetProductListResult.data.list[0] : {},
          proTypeKaMi: GetProductListResult.data.list && GetProductListResult.data.list[0].productType === 3 ? true : false,
        })
      } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
        const { componentIndex } = this.props;
        this.setState({
          authType: 'GetProductList'
        })
        this.props.authorizationFailurePageSetting(componentIndex);
      } else {
        this.setState({
          exchangeerrormessage: GetProductListResult.message
        })
      }
      this.setState({
        loading: false
      })
    }
    if (sendCtripOrderResult !== this.props.exchange.sendCtripOrderResult) {
      if (sendCtripOrderResult.code == 0) {
        //下单成功,跳转到orderstatus
        this.props.history.push(`./exchangestatus?orderNo=${sendCtripOrderResult.data}&extractCode=${this.state.extractCode}`);
      } else {
        Toast.fail(sendCtripOrderResult.message);
        this.setState({
          exchangloading: false
        })
      }
    }
  }

  // 登录成功调用
  loginSuccess = (data) => {
    this.hideLoginModal();
    this.setState({
      userInfo: data
    });
    this.submitcode();
  }
  hideLoginModal = () => {
    this.setState({
      showMallLoginModal: false,
    })
  }
  handleKeyUp = (e) => {
    if (e.keyCode === 8) {
      //删除操作
      if (e.target.value.length === (5 * parseInt(e.target.value.length / 5))) {
        this.setState({
          codevalue: e.target.value.substring(0, e.target.value.length - 1)
        })
      }
    }
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 32) {
      this.setState({
        codevalue: e.target.value.replace(/(^\s*)|(\s*$)/g, "")
      })
    }
  }
  onChange = (e, index) => {
    if (/[\u4E00-\u9FA5]/i.test(e.target.value)) {
      return false
    }
    this.setState({
      codevalue: this.codehandle(e.target.value),
      exchangeerrormessage: '',
      loading: false
    }, () => {
      const { codevalue } = this.state;
      //如果4个value值都为空,则置灰,否则点亮
      if (codevalue) {
        this.setState({
          btnstatus: 2
        })
      } else {
        this.setState({
          btnstatus: 1
        })
      }
    })
  }
  codehandle = (value) => {
    //输入内容后,输入的内容加拼接剩余位数的*号,并且自动插入空格
    var inputvalue = value.replace(/\s/g, "");
    var thiscode = ''
    for (var n = 0; n < parseInt(inputvalue.length / 4); n++) {
      if (n !== 3) {
        thiscode += inputvalue.slice(4 * n, 4 * (n + 1)) + ' ';
      } else {
        thiscode += inputvalue.slice(4 * n, 4 * (n + 1));
      }
    }
    if (inputvalue.length % 4 !== 0) {
      thiscode = thiscode + inputvalue.slice((inputvalue.length - inputvalue.length % 4), inputvalue.length);
    }
    return thiscode;
  }
  submitcode = () => {
    //点击验证,返回信息后,将btnstatu设为3
    //删除操作后,再将btnstatu设为1
    const { codevalue } = this.state;
    this.setState({
      btnstatus: 3,
      loading: true
    })
    this.props.dispatch({
      type: 'exchange/GetProductList', payload: {
        ExchangeCode: codevalue.replace(/\s/g, "")
      }
    })
  }
  clearcode = () => {
    this.setState({
      codevalue: '',
      btnstatus: 1,
      exchangeerrormessage: ''
    })
  }
  PickerOnok = (v) => {
    const { productList } = this.state;
    productList.map((item, index) => {
      if (item.productId === v[0]) {
        this.setState({
          productTemplateId: item.templateId || '',
          productDetail: item,
        })
      }
    })
  }
  toPay = (val) => {
    const { codevalue, productDetail, extractCode } = this.state;
    this.setState({
      exchangloading: true,
      extractCode: extractCode
    })
    this.props.dispatch({
      type: 'exchange/sendCtripOrder', payload: {
        "productId": productDetail.productId,
        "exchangeCode": codevalue.replace(/\s/g, ""),
        "chargeAccount": val.ChargeAccount || '',
        "chargePassword": val.ChargePassword || '',
        "chargeGameName": val.ChargeGame || '',
        "chargeGameRole": val.ChargeGameRole || '',
        "chargeGameRegion": val.ChargeRegion || '',
        "chargeGameSrv": val.ChargeServer || '',
        "chargeType": val.ChargeType || '',
        "orderType": '',
        "mobile": '',
      }
    })
  }

  KMtoPay = () => {
    const { codevalue, productDetail, proTypeKaMi, extractCode } = this.state;
    if (!extractCode) {
      return Toast.info('手机号不能为空')
    } else {
      var validTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (validTxt && !validTxt.test(extractCode)) {
        return Toast.info('请输入正确的手机号');
      }
    }
    this.setState({
      exchangloading: true,
      extractCode: extractCode
    })
    this.props.dispatch({
      type: 'exchange/sendCtripCardOrder', payload: {
        "productId": productDetail.productId,
        "exchangeCode": codevalue.replace(/\s/g, ""),
        "mobile": extractCode,
        "chargeType": 3
      }
    })
  }

  productChange = (v) => {
    const { productList } = this.state;
    productList.map((item, index) => {
      if (item.productId == v) {
        //如果卡密商品
        this.setState({
          sValue: v,
          productTemplateId: item.templateId || '',
          proTypeKaMi: item.productType === 3 ? true : false,
        }, () => {
          console.log(this.state.productTemplateId);
        })
      }
    })
  }

  kamiphoneChange = (e) => {
    this.setState({
      extractCode: e
    })
  }
  submitcode = () => {
    //点击验证,返回信息后,将btnstatu设为3
    //删除操作后,再将btnstatu设为1
    const { codevalue } = this.state;
    this.setState({
      btnstatus: 3,
      loading: true
    })
    this.props.dispatch({
      type: 'exchange/GetProductList', payload: {
        ExchangeCode: codevalue.replace(/\s/g, "")
      }
    })
  }
  clearcode = () => {
    this.setState({
      codevalue: '',
      btnstatus: 1,
      exchangeerrormessage: ''
    })
  }
  render() {
    const { btnstatus, productList, productDetail, extractCode, shopInfo, codevalue, proTypeKaMi, customColor, showMallLoginModal } = this.state;
    console.log(btnstatus, 8888)
    return (
      <div className="exchange-box clearfix">
        {
          !this.state.exchangeSuccess ?
            <div className="exchange-con">
              <span className="exchange-title">兑换码</span>
              <div className="exchange-input">
                <input value={codevalue} maxLength={19} onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}
                  onChange={this.onChange} placeholder="请输入兑换码" type="text"></input>
                {
                  codevalue &&
                  <span className="clear-code" onClick={this.clearcode}></span>
                }
              </div>
              <Button loading={this.state.loading} style={btnstatus !== 1 ? { background: `${this.state.customColor}` } : {}}
                className={btnstatus === 1 ? "exchange-btn-grey" : btnstatus === 3 ? 'exchange-btn-disabled' : 'exchange-btn-light'}
                onClick={btnstatus === 2 ? this.submitcode : null}>立即验证</Button>
              <span className="submitmessage">{this.state.exchangeerrormessage || ''}</span>
            </div> :
            <div className="exchange-con">
              <span className="exchange-title">兑换商品</span>
              <div className="product-picker">
                <Picker
                  data={productList}
                  title="商品"
                  extra="请选择商品"
                  value={this.state.sValue}
                  onChange={this.productChange}
                  onOk={this.PickerOnok}
                  cols='1'
                >
                  <List.Item key="productId" arrow="horizontal">请选择商品</List.Item>
                </Picker>
                {
                  //卡密商品，并且是免登模式
                  this.state.proTypeKaMi && shopInfo.merInfoTemplates.visitType == 3 &&
                  <InputItem placeholder="请输入用户手机号" value={extractCode} onChange={this.kamiphoneChange}></InputItem>
                }
                {
                  !this.state.proTypeKaMi &&
                  <TemplateModal
                    TemplateId={this.state.productTemplateId}
                    getGameInfo={this.toPay}
                    choseProduct={productList}
                    payment={3}
                    exchangloading={this.state.exchangloading}
                    validType={productDetail.validType}
                    inputTips={productDetail.inputTips}
                  />
                }
              </div>
              {/* <input value={this.state.account} onChange={(e) => { this.setState({ account: e.target.value }) }} className="account-input" placeholder="请输入充值账号" type="text" /> */}
              {
                this.state.proTypeKaMi && <button onClick={this.KMtoPay} className="exchange-btn-light">立即兑换</button>
              }
              {showMallLoginModal && <MallLoginModalPageSetting loginSuccess={this.loginSuccess} hideLoginModal={this.hideLoginModal} />}
            </div>
        }
      </div >
    );
  }
}


const mapStateToProps = (state) => {
  return {
    ...state,
  };
}
export default connect(mapStateToProps)(Exchange);

