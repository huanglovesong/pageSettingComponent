'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _inputItem = require('antd-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _picker = require('antd-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/input-item/style');

require('antd-mobile/lib/picker/style');

require('antd-mobile/lib/list/style');

require('antd-mobile/lib/button/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dva = require('dva');

require('./less/exchange.less');

var _TemplateModal = require('../TemplateModal');

var _TemplateModal2 = _interopRequireDefault(_TemplateModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Exchange = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(Exchange, _React$Component);

  // *****支持链接中带兑换码,自动填入
  function Exchange(props) {
    (0, _classCallCheck3.default)(this, Exchange);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Exchange.__proto__ || (0, _getPrototypeOf2.default)(Exchange)).call(this, props));

    _initialiseProps.call(_this);

    var cardNumber = sessionStorage.getItem('cardNumber') || '';
    var shopInfo = localStorage.getItem('shopInfo') && JSON.parse(localStorage.getItem('shopInfo')) || {};
    var extractCode = shopInfo.merInfoTemplates ? shopInfo.merInfoTemplates.visitType !== 3 ? localStorage.getItem("fuluId") : '' : '';
    _this.state = {
      codevalue: '',
      btnstatus: cardNumber.length > 0 ? 2 : 1,
      sValue: [],
      exchangeSuccess: false,
      account: '',
      productTemplateId: '',
      loading: false,
      exchangloading: false,
      cardNumber: cardNumber,
      shopInfo: shopInfo,
      extractCode: extractCode,
      showMallLoginModal: false,
      // 授权模板的类型
      authType: ''
    };
    return _this;
  }

  (0, _createClass3.default)(Exchange, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      //自定义配色
      var shopInfo = this.state.shopInfo;

      if (configs[shopInfo.codeKey]) {
        this.setState({
          customColor: configs[shopInfo.codeKey] || '#FF6232'
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        codevalue: this.state.cardNumber ? this.codehandle(this.state.cardNumber) : ''
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _ref = nextProps.exchange || {},
          GetProductListResult = _ref.GetProductListResult,
          sendCtripOrderResult = _ref.sendCtripOrderResult,
          sendCtripCardOrderResult = _ref.sendCtripCardOrderResult;

      var _props$exchange = this.props.exchange,
          exchange = _props$exchange === undefined ? {} : _props$exchange;
      var _state = this.state,
          authType = _state.authType,
          proTypeKaMi = _state.proTypeKaMi;
      // 如果是登录成功，找到对应组件authKey进行接下来的步骤

      if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && this.props.componentIndex === nextProps.pageSetting.componentIndex) {
        console.log(this.props.componentIndex, nextProps.pageSetting.componentIndex);
        // 如果是获取·1商品
        if (authType === 'GetProductList') {
          this.submitcode();
        }
        // 卡密
        if (authType === 'sendCtripCardOrder' && proTypeKaMi) {
          this.KMtoPay();
        }
      }
      if (sendCtripCardOrderResult !== exchange.sendCtripCardOrderResult) {
        var code = sendCtripCardOrderResult.code;

        if (code == 0) {
          //下单成功,跳转到orderstatus
          this.props.history.push('./exchangestatus?orderNo=' + sendCtripCardOrderResult.data + '&extractCode=' + this.state.extractCode);
          //const { value1 , value2 , value3 , value4 } = this.state;
          //this.props.history.push(`./exchangestatus?orderNo=${sendCtripCardOrderResult.data}&extractCode=${value1 + value2 + value3 + value4}`);
        } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
          var componentIndex = this.props.componentIndex;

          this.setState({
            authType: 'sendCtripCardOrder'
          });
          this.props.authorizationFailurePageSetting(componentIndex);
        } else {
          _toast2.default.fail(sendCtripCardOrderResult.message);
          this.setState({
            exchangloading: false
          });
        }
      }
      if (GetProductListResult !== exchange.GetProductListResult) {
        var _code = GetProductListResult.code;

        if (_code == 0) {
          GetProductListResult.data.list && GetProductListResult.data.list.map(function (item, index) {
            item.label = item.productName;
            item.value = item.productId;
          });
          this.setState({
            exchangeerrormessage: '',
            exchangeSuccess: true,
            productList: GetProductListResult.data.list ? GetProductListResult.data.list : [],
            sValue: GetProductListResult.data.list ? [GetProductListResult.data.list[0].value] : [],
            productTemplateId: GetProductListResult.data.list ? GetProductListResult.data.list[0].templateId : '',
            productDetail: GetProductListResult.data.list ? GetProductListResult.data.list[0] : {},
            proTypeKaMi: GetProductListResult.data.list && GetProductListResult.data.list[0].productType === 3 ? true : false
          });
        } else if (_code === '-3' || _code === '1013' || _code === '1014' || _code === '1015') {
          var _componentIndex = this.props.componentIndex;

          this.setState({
            authType: 'GetProductList'
          });
          this.props.authorizationFailurePageSetting(_componentIndex);
        } else {
          this.setState({
            exchangeerrormessage: GetProductListResult.message
          });
        }
        this.setState({
          loading: false
        });
      }
      if (sendCtripOrderResult !== exchange.sendCtripOrderResult) {
        var _code2 = sendCtripOrderResult.code;

        if (_code2 == 0) {
          //下单成功,跳转到orderstatus
          this.props.history.push('./exchangestatus?orderNo=' + sendCtripOrderResult.data + '&extractCode=' + this.state.extractCode);
        } else if (_code2 === '-3' || _code2 === '1013' || _code2 === '1014' || _code2 === '1015') {
          var _componentIndex2 = this.props.componentIndex;

          this.setState({
            authType: 'sendCtripOrder'
          });
          this.props.authorizationFailurePageSetting(_componentIndex2);
        } else {
          _toast2.default.fail(sendCtripOrderResult.message);
          this.setState({
            exchangloading: false
          });
        }
      }
    }

    // 登录成功调用

  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          btnstatus = _state2.btnstatus,
          productList = _state2.productList,
          productDetail = _state2.productDetail,
          extractCode = _state2.extractCode,
          shopInfo = _state2.shopInfo,
          codevalue = _state2.codevalue,
          proTypeKaMi = _state2.proTypeKaMi,
          customColor = _state2.customColor,
          showMallLoginModal = _state2.showMallLoginModal,
          authType = _state2.authType;
      var _props = this.props,
          item = _props.item,
          componentIndex = _props.componentIndex;
      var themeColor = item.modelStyle.exchangeStyleModel.themeColor;

      console.log(btnstatus, 8888);
      return _react2.default.createElement(
        'div',
        { className: 'exchange-box clearfix' },
        !this.state.exchangeSuccess ? _react2.default.createElement(
          'div',
          { className: 'exchange-con' },
          _react2.default.createElement(
            'span',
            { className: 'exchange-title' },
            '\u5151\u6362\u7801'
          ),
          _react2.default.createElement(
            'div',
            { className: 'exchange-input' },
            _react2.default.createElement('input', { value: codevalue, maxLength: 19, onKeyDown: this.handleKeyDown, onKeyUp: this.handleKeyUp,
              onChange: this.onChange, placeholder: '\u8BF7\u8F93\u5165\u5151\u6362\u7801', type: 'text' }),
            codevalue && _react2.default.createElement('span', { className: 'clear-code', onClick: this.clearcode })
          ),
          _react2.default.createElement(
            _button2.default,
            { loading: this.state.loading, style: btnstatus !== 1 ? { background: '' + themeColor } : {},
              className: btnstatus === 1 ? "exchange-btn-grey" : btnstatus === 3 ? 'exchange-btn-disabled' : 'exchange-btn-light',
              onClick: btnstatus === 2 ? this.submitcode : null },
            '\u7ACB\u5373\u9A8C\u8BC1'
          ),
          _react2.default.createElement(
            'span',
            { className: 'submitmessage' },
            this.state.exchangeerrormessage || ''
          )
        ) : _react2.default.createElement(
          'div',
          { className: 'exchange-con' },
          _react2.default.createElement(
            'span',
            { className: 'exchange-title' },
            '\u5151\u6362\u5546\u54C1'
          ),
          _react2.default.createElement(
            'div',
            { className: 'product-picker' },
            _react2.default.createElement(
              _picker2.default,
              {
                data: productList,
                title: '\u5546\u54C1',
                extra: '\u8BF7\u9009\u62E9\u5546\u54C1',
                value: this.state.sValue,
                onChange: this.productChange,
                onOk: this.PickerOnok,
                cols: '1'
              },
              _react2.default.createElement(
                _list2.default.Item,
                { key: 'productId', arrow: 'horizontal' },
                '\u8BF7\u9009\u62E9\u5546\u54C1'
              )
            ),

            //卡密商品，并且是免登模式
            this.state.proTypeKaMi && shopInfo.merInfoTemplates.visitType == 3 && _react2.default.createElement(_inputItem2.default, { placeholder: '\u8BF7\u8F93\u5165\u7528\u6237\u624B\u673A\u53F7', value: extractCode, onChange: this.kamiphoneChange }),
            !this.state.proTypeKaMi && _react2.default.createElement(_TemplateModal2.default, {
              TemplateId: this.state.productTemplateId,
              getGameInfo: this.toPay,
              choseProduct: productList,
              payment: 3,
              themeColor: themeColor,
              componentIndex: componentIndex,
              authType: authType,
              exchangloading: this.state.exchangloading,
              validType: productDetail.validType,
              inputTips: productDetail.inputTips
            })
          ),
          this.state.proTypeKaMi && _react2.default.createElement(
            'button',
            { onClick: this.KMtoPay, style: btnstatus !== 1 ? { background: '' + themeColor } : {}, className: 'exchange-btn-light' },
            '\u7ACB\u5373\u5151\u6362'
          ),
          showMallLoginModal && _react2.default.createElement(MallLoginModalPageSetting, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
        ),
        productDetail ? productDetail.exchangeDetail && _react2.default.createElement(
          'div',
          { className: 'exchange-rule' },
          productDetail.exchangeDetail.split('|').map(function (v, i) {
            return _react2.default.createElement('div', { key: i, dangerouslySetInnerHTML: {
                __html: v
              } });
          })
        ) : _react2.default.createElement(
          'div',
          { className: 'exchange-rule' },
          _react2.default.createElement(
            'div',
            { className: 'rule-item' },
            _react2.default.createElement(
              'h5',
              { className: 'h5-title' },
              '\u5151\u6362\u7801\u4F7F\u7528\u6D41\u7A0B'
            ),
            _react2.default.createElement(
              'div',
              { className: 'flow-list flow-list-img' },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('span', { className: 'icon-bj icon1' })
              ),
              _react2.default.createElement(
                'p',
                { className: 'dot-list' },
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' })
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('span', { className: 'icon-bj icon2' })
              ),
              _react2.default.createElement(
                'p',
                { className: 'dot-list' },
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' })
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('span', { className: 'icon-bj icon3' })
              ),
              _react2.default.createElement(
                'p',
                { className: 'dot-list' },
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' }),
                _react2.default.createElement('span', { className: 'dot' })
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement('span', { className: 'icon-bj icon4' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'flow-list' },
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '1. \u9A8C\u8BC1\u5151\u6362\u7801'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '2. \u9009\u62E9\u5546\u54C1\xA0'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '3. \u8F93\u5165\u8D26\u53F7\xA0\xA0\xA0'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                _react2.default.createElement(
                  'span',
                  null,
                  '4. \u5151\u6362\u6210\u529F'
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'rule-item' },
            _react2.default.createElement(
              'h5',
              { className: 'h5-title' },
              '\u5151\u6362\u7801\u4F7F\u7528\u8BF4\u660E'
            ),
            _react2.default.createElement(
              'p',
              null,
              '1. \u8BF7\u5728\u6709\u6548\u671F\u5185\u6FC0\u6D3B\uFF0C\u903E\u671F\u6FC0\u6D3B\u7801\u5C06\u5931\u6548\uFF1B'
            ),
            _react2.default.createElement(
              'p',
              null,
              '2. \u4F1A\u5458\u7C7B\u578B\u5546\u54C1\u6709\u6548\u671F\u4ECE\u6FC0\u6D3B\u65E5\u7B97\u8D77\uFF0C\u540C\u4E00\u5E10\u53F7\u4F7F\u7528\u591A\u4E2A\u6FC0\u6D3B\u7801\uFF0C\u4F1A\u5458\u671F\u81EA\u52A8\u5EF6\u957F\uFF1B'
            ),
            _react2.default.createElement(
              'p',
              null,
              '3. \u5151\u6362\u7801\u4E3A\u6570\u5B57+\u5B57\u6BCD\u768416\u4F4D\u5B57\u7B26\uFF0C\u5B57\u6BCD\u8981\u533A\u5206\u5927\u5C0F\u5199\uFF1B'
            ),
            _react2.default.createElement(
              'p',
              null,
              '4. \u8BF7\u8C28\u614E\u8F93\u5165\u5151\u6362\u7801\uFF0C\u6BD4\u5982\u201CB\u201D\u4E0E\u201C8\u201D\uFF0C\u201C0\u201D\u4E0E\u201CO\u201D\u5BB9\u6613\u51FA\u9519\uFF1B'
            )
          )
        )
      );
    }
  }]);
  return Exchange;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.loginSuccess = function (data) {
    _this2.hideLoginModal();
    _this2.setState({
      userInfo: data
    });
    _this2.submitcode();
  };

  this.hideLoginModal = function () {
    _this2.setState({
      showMallLoginModal: false
    });
  };

  this.handleKeyUp = function (e) {
    if (e.keyCode === 8) {
      //删除操作
      if (e.target.value.length === 5 * parseInt(e.target.value.length / 5)) {
        _this2.setState({
          codevalue: e.target.value.substring(0, e.target.value.length - 1)
        });
      }
    }
  };

  this.handleKeyDown = function (e) {
    if (e.keyCode === 32) {
      _this2.setState({
        codevalue: e.target.value.replace(/(^\s*)|(\s*$)/g, "")
      });
    }
  };

  this.onChange = function (e, index) {
    if (/[\u4E00-\u9FA5]/i.test(e.target.value)) {
      return false;
    }
    _this2.setState({
      codevalue: _this2.codehandle(e.target.value),
      exchangeerrormessage: '',
      loading: false
    }, function () {
      var codevalue = _this2.state.codevalue;
      //如果4个value值都为空,则置灰,否则点亮

      if (codevalue) {
        _this2.setState({
          btnstatus: 2
        });
      } else {
        _this2.setState({
          btnstatus: 1
        });
      }
    });
  };

  this.codehandle = function (value) {
    //输入内容后,输入的内容加拼接剩余位数的*号,并且自动插入空格
    var inputvalue = value.replace(/\s/g, "");
    var thiscode = '';
    for (var n = 0; n < parseInt(inputvalue.length / 4); n++) {
      if (n !== 3) {
        thiscode += inputvalue.slice(4 * n, 4 * (n + 1)) + ' ';
      } else {
        thiscode += inputvalue.slice(4 * n, 4 * (n + 1));
      }
    }
    if (inputvalue.length % 4 !== 0) {
      thiscode = thiscode + inputvalue.slice(inputvalue.length - inputvalue.length % 4, inputvalue.length);
    }
    return thiscode;
  };

  this.submitcode = function () {
    //点击验证,返回信息后,将btnstatu设为3
    //删除操作后,再将btnstatu设为1
    var codevalue = _this2.state.codevalue;

    _this2.setState({
      loading: true
    });
    _this2.props.dispatch({
      type: 'exchange/GetProductList', payload: {
        ExchangeCode: codevalue.replace(/\s/g, "")
      }
    });
  };

  this.clearcode = function () {
    _this2.setState({
      codevalue: '',
      btnstatus: 1,
      exchangeerrormessage: ''
    });
  };

  this.PickerOnok = function (v) {
    var productList = _this2.state.productList;

    productList.map(function (item, index) {
      if (item.productId === v[0]) {
        _this2.setState({
          productTemplateId: item.templateId || '',
          productDetail: item
        });
      }
    });
  };

  this.toPay = function (val) {
    var _state3 = _this2.state,
        codevalue = _state3.codevalue,
        productDetail = _state3.productDetail,
        extractCode = _state3.extractCode;

    _this2.setState({
      exchangloading: true,
      extractCode: extractCode
    });
    _this2.props.dispatch({
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
        "mobile": ''
      }
    });
  };

  this.KMtoPay = function () {
    var _state4 = _this2.state,
        codevalue = _state4.codevalue,
        productDetail = _state4.productDetail,
        proTypeKaMi = _state4.proTypeKaMi,
        extractCode = _state4.extractCode;

    if (!extractCode) {
      return _toast2.default.info('手机号不能为空');
    } else {
      var validTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (validTxt && !validTxt.test(extractCode)) {
        return _toast2.default.info('请输入正确的手机号');
      }
    }
    _this2.setState({
      exchangloading: true,
      extractCode: extractCode
    });
    _this2.props.dispatch({
      type: 'exchange/sendCtripCardOrder', payload: {
        "productId": productDetail.productId,
        "exchangeCode": codevalue.replace(/\s/g, ""),
        "mobile": extractCode,
        "chargeType": 3
      }
    });
  };

  this.productChange = function (v) {
    var productList = _this2.state.productList;

    productList.map(function (item, index) {
      if (item.productId == v) {
        //如果卡密商品
        _this2.setState({
          sValue: v,
          productTemplateId: item.templateId || '',
          proTypeKaMi: item.productType === 3 ? true : false
        }, function () {
          console.log(_this2.state.productTemplateId);
        });
      }
    });
  };

  this.kamiphoneChange = function (e) {
    _this2.setState({
      extractCode: e
    });
  };
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(Exchange);