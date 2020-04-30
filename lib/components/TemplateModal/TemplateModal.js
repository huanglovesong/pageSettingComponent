'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _picker = require('antd-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _inputItem = require('antd-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('antd-mobile/lib/picker/style');

require('antd-mobile/lib/list/style');

require('antd-mobile/lib/input-item/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _rcForm = require('rc-form');

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { Form, Input, Button, message, Spin, Select, Modal } from 'antd';
var TemplateModal = function (_React$Component) {
  (0, _inherits3.default)(TemplateModal, _React$Component);

  function TemplateModal(props) {
    (0, _classCallCheck3.default)(this, TemplateModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TemplateModal.__proto__ || (0, _getPrototypeOf2.default)(TemplateModal)).call(this, props));

    _this.getTemplate = function () {
      var TemplateId = _this.props.TemplateId;
      // 如果TemplateID不存在则不查询

      if (TemplateId) {
        _this.props.dispatch({ type: 'detail/getGameProTemp', payload: { productTemplateId: TemplateId } });
      }
    };

    _this.mangeNum = function (num) {
      var choseProduct = _this.props.choseProduct;
      // console.log('====', choseProduct)

      var chargeSelect = [],
          centerArr = [];
      if (num) {
        // 判断是否包含 | 
        if (num.value.indexOf("|") != -1) {
          centerArr = num.value.split('|');
        } else {
          centerArr.push(num.value);
        }
        // 判断是否包含 -
        centerArr.length && centerArr.map(function (v) {
          if (v.indexOf("-") != -1) {
            var a = v.split('-');
            for (var i = Number(a[0]); i <= Number(a[1]); i++) {
              if (Number(i) <= Number(choseProduct.singlePurchaseLimit)) {
                chargeSelect.push({
                  label: i.toString(),
                  value: i.toString()
                });
              }
            }
          } else {
            if (Number(v) <= choseProduct.singlePurchaseLimit) {
              chargeSelect.push({
                label: v.toString(),
                value: v.toString()
              });
            }
          }
        });
      }
      _this.setState({
        chargeSelect: chargeSelect
      }, function () {
        var postData = _this.state.postData;

        postData.ChargeNum = chargeSelect[0].value || '1';
        _this.setState({
          postData: postData
        });
      });
    };

    _this.changeGame = function (val) {
      _this.props.form.setFieldsValue({
        ChargeRegion: '',
        ChargeServer: '',
        ChargeType: ''
      });
      var _this$state = _this.state,
          ChargeGameList = _this$state.ChargeGameList,
          ChargeRegionList = _this$state.ChargeRegionList,
          ChargeServerList = _this$state.ChargeServerList,
          ChargeTypeList = _this$state.ChargeTypeList;

      ChargeGameList.map(function (v) {
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
          _this.setState({
            ChargeRegionList: ChargeRegionList,
            ChargeServerList: ChargeServerList,
            ChargeTypeList: ChargeTypeList
          });
        }
      });
    };

    _this.changeRegion = function (val) {
      _this.props.form.setFieldsValue({
        ChargeServer: '',
        ChargeType: ''
      });
      var _this$state2 = _this.state,
          ChargeRegionList = _this$state2.ChargeRegionList,
          ChargeServerList = _this$state2.ChargeServerList,
          ChargeTypeList = _this$state2.ChargeTypeList;

      ChargeRegionList.map(function (v) {
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
          _this.setState({
            ChargeServerList: ChargeServerList,
            ChargeTypeList: ChargeTypeList
          });
        }
      });
    };

    _this.changeServer = function (val) {
      _this.props.form.setFieldsValue({
        ChargeType: ''
      });
      var _this$state3 = _this.state,
          ChargeServerList = _this$state3.ChargeServerList,
          ChargeTypeList = _this$state3.ChargeTypeList;

      ChargeServerList.map(function (v) {
        if (v.name === val) {
          if (v.ChargeType[0]) {
            ChargeTypeList = v.ChargeType;
          }
          _this.setState({
            ChargeTypeList: ChargeTypeList
          });
        }
      });
    };

    _this.exchange = function () {
      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          // 正则匹配
          var postData = _this.state.postData;

          if ('ChargeAccount' in values) {
            //4到16位（字母，数字，下划线，减号）
            var validType = _this.props.validType;

            var validTxt = '',
                validText = "";
            if (validType === 1) {
              //手机
              validTxt = /^1(3|4|5|6|7|8|9)\d{9}$/;
              validText = '手机号';
            } else if (validType === 2) {
              // qq
              validTxt = /^[1-9][0-9]{4,9}$/;
              validText = 'QQ号';
            } else if (validType === 3) {
              // 邮箱
              validTxt = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
              validText = '邮箱';
            }
            if (!postData.ChargeAccount) {
              return _toast2.default.info('\u8BF7\u8F93\u5165\u6B63\u786E\u5145\u503C\u8D26\u53F7');
            }
            if (validTxt && !validTxt.test(postData.ChargeAccount)) {
              return _toast2.default.info('\u8BF7\u8F93\u5165\u6B63\u786E\u683C\u5F0F\u7684' + validText);
            }
          }
          if ('ContactType' in values) {
            // 手机
            if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(postData.ContactType)) {
              return _toast2.default.info('手机号格式错误');
            }
          }
          if ('ContactQQ' in values) {
            // qq
            if (!/^[1-9][0-9]{4,11}$/.test(postData.ChargeAccount)) {
              return _toast2.default.info('qq格式错误');
            }
          }
          if ('ChargePWD' in values) {
            // 密码
            if (!/^[a-zA-Z0-9_-]{4,16}$/.test(postData.ChargePWD)) {
              return _toast2.default.info('密码由4到16位（字母，数字，下划线，减号）组成');
            }
          }
          if ('ChargeWeiXin' in values) {
            // 微信
            if (!/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(postData.ChargeWeiXin)) {
              return _toast2.default.info('微信格式错误');
            }
          }
          if ('ChargeContacts' in values) {
            // 联系人
            if (!postData.ChargeContacts) {
              return _toast2.default.info('联系人不能为空');
            }
          }
          if ('ChargeAddress' in values) {
            // 联系地址
            if (!postData.ChargeAddress) {
              return _toast2.default.info('联系地址不能为空');
            }
          }
          if ('ChargeGame' in values) {
            // 充值游戏
            if (!postData.ChargeGame) {
              return _toast2.default.info('充值游戏不能为空');
            }
          }
          if ('ChargeRegion' in values) {
            // 区
            if (!postData.ChargeRegion) {
              return _toast2.default.info('充值区不能为空');
            }
          }
          if ('ChargeServer' in values) {
            // 服
            if (!postData.ChargeServer) {
              return _toast2.default.info('充值服不能为空');
            }
          }
          if ('ChargeType' in values) {
            // 充值类型
            if (!postData.ChargeType) {
              return _toast2.default.info('充值类型不能为空');
            }
          }
          _this.props.getGameInfo(postData);
        }
      });
    };

    _this.changeInput = function (type, val) {
      var postData = _this.state.postData;

      postData['' + type] = val;
      _this.setState({
        postData: postData
      });
    };

    _this.changeSelect = function (type, val) {
      var postData = _this.state.postData;

      postData['' + type] = val[0];
      _this.setState({
        postData: postData
      });
    };

    _this.blurInput = function () {
      document.documentElement.scrollTop = document.documentElement.scrollTop;
    };

    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
    _this.state = {
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
        ChargeType: ''
      },
      shopInfo: shopInfo
    };
    return _this;
  }

  (0, _createClass3.default)(TemplateModal, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.getTemplate();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      var _nextProps$detail = nextProps.detail,
          getGameProTemp = _nextProps$detail.getGameProTemp,
          toOrderMid = _nextProps$detail.toOrderMid,
          GetPassCode = _nextProps$detail.GetPassCode;

      if (nextProps.detail.focusInputGuid !== props.detail.focusInputGuid) {
        console.log('进入模板组件');
        document.getElementById('charge-input') && document.getElementById('charge-input').focus();
      }
      if (getGameProTemp !== props.detail.getGameProTemp) {
        var code = getGameProTemp.code,
            data = getGameProTemp.data;

        if (code === '1000') {
          if (data.addressId) {
            var elementInfo = data.elementInfo,
                gameTempaltePreviewList = data.gameTempaltePreviewList,
                isServiceArea = data.isServiceArea;
            // 解析数量

            if (elementInfo && elementInfo.chargeNum) {
              this.mangeNum(elementInfo.chargeNum);
              this.setState({
                chargeNum: elementInfo.chargeNum
              });
            }
            this.setState({
              inputs: elementInfo && elementInfo.inputs ? elementInfo.inputs : [],
              ChargeGameList: gameTempaltePreviewList,
              isServiceArea: isServiceArea
            });
          } else {
            _toast2.default.info(getGameProTemp.message);
          }
        } else {
          _toast2.default.info(getGameProTemp.message);
        }
      }
      if (toOrderMid !== props.detail.toOrderMid) {
        var postData = this.state.postData;

        postData.ChargeNum = '1';
        this.getTemplate();
        this.setState({
          postData: postData
        });
      }
    }
    // 获取模板信息

    // 选择游戏

    // 提交

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isServiceArea = _state.isServiceArea,
          inputs = _state.inputs,
          chargeNum = _state.chargeNum,
          shopInfo = _state.shopInfo,
          chargeSelect = _state.chargeSelect,
          ChargeGameList = _state.ChargeGameList,
          ChargeRegionList = _state.ChargeRegionList,
          ChargeServerList = _state.ChargeServerList,
          ChargeTypeList = _state.ChargeTypeList,
          postData = _state.postData;
      var _props = this.props,
          choseProduct = _props.choseProduct,
          passCodeStatus = _props.passCodeStatus,
          startSecound = _props.startSecound,
          surplusTime = _props.surplusTime,
          isLoading = _props.isLoading;
      var getFieldProps = this.props.form.getFieldProps;

      var gameList = [],
          regionList = [],
          serverList = [],
          typeList = [];
      ChargeGameList && ChargeGameList[0] && ChargeGameList.map(function (v) {
        gameList.push({
          label: v.ChargeGame,
          value: v.ChargeGame
        });
      });
      ChargeRegionList && ChargeRegionList[0] && ChargeRegionList.map(function (v) {
        regionList.push({
          label: v.name,
          value: v.name
        });
      });
      ChargeServerList && ChargeServerList[0] && ChargeServerList.map(function (v) {
        serverList.push({
          label: v.name,
          value: v.name
        });
      });
      ChargeTypeList && ChargeTypeList[0] && ChargeTypeList.map(function (v) {
        typeList.push({
          label: v.name,
          value: v.name
        });
      });
      return _react2.default.createElement(
        'div',
        { className: 'exchange-form' },
        _react2.default.createElement(
          _list2.default,
          null,
          inputs && inputs.length ? inputs.map(function (v) {
            if (v.type === 'Input') {
              return _react2.default.createElement(
                'div',
                { className: 'd-account' },
                shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') ? _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps(v.id), {
                  placeholder: choseProduct.inputTips || '\u8BF7\u8F93\u5165' + v.name,
                  clear: true,
                  onClick: function onClick(e) {
                    e.currentTarget.focus();
                  },
                  id: 'charge-input',
                  onBlur: _this2.blurInput,
                  className: 'input-bg',
                  value: postData['' + v.id],
                  onChange: function onChange(val) {
                    _this2.changeInput('' + v.id, val);
                  },
                  disabled: choseProduct.isActivity && passCodeStatus.userPassCodeStatus === 3
                })) : choseProduct.isActivity && passCodeStatus.userPassCodeStatus === 3 ? '' : _react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps(v.id), {
                  placeholder: choseProduct.inputTips || '\u8BF7\u8F93\u5165' + v.name,
                  clear: true,
                  onClick: function onClick(e) {
                    e.currentTarget.focus();
                  },
                  onBlur: _this2.blurInput,
                  id: 'charge-input',
                  className: 'input-bg',
                  value: postData['' + v.id],
                  onChange: function onChange(val) {
                    _this2.changeInput('' + v.id, val);
                  }
                }))
              );
            }
          }) : '',
          isServiceArea ?
          // 有区服
          _react2.default.createElement(
            'div',
            null,
            gameList && gameList[0] && _react2.default.createElement(
              'div',
              { className: 'd-account' },
              _react2.default.createElement(
                _picker2.default,
                (0, _extends3.default)({}, getFieldProps('ChargeGame'), {
                  data: gameList,
                  cols: 1,
                  value: [postData['ChargeGame']],
                  onChange: function onChange(val) {
                    _this2.changeSelect('ChargeGame', val);_this2.changeGame(val[0]);
                  }
                }),
                _react2.default.createElement(
                  _list2.default.Item,
                  { arrow: 'horizontal' },
                  '\u6E38\u620F'
                )
              )
            ),
            regionList && regionList[0] && _react2.default.createElement(
              'div',
              { className: 'd-account' },
              _react2.default.createElement(
                _picker2.default,
                (0, _extends3.default)({}, getFieldProps('ChargeRegion'), {
                  data: regionList,
                  cols: 1,
                  value: [postData['ChargeRegion']],
                  onChange: function onChange(val) {
                    _this2.changeSelect('ChargeRegion', val);_this2.changeRegion(val[0]);
                  }
                }),
                _react2.default.createElement(
                  _list2.default.Item,
                  { arrow: 'horizontal' },
                  '\u6E38\u620F\u5927\u533A'
                )
              )
            ),
            serverList && serverList[0] && _react2.default.createElement(
              'div',
              { className: 'd-account' },
              _react2.default.createElement(
                _picker2.default,
                (0, _extends3.default)({}, getFieldProps('ChargeServer'), {
                  data: serverList,
                  cols: 1,
                  value: [postData['ChargeServer']],
                  onChange: function onChange(val) {
                    _this2.changeSelect('ChargeServer', val);_this2.changeServer(val[0]);
                  }
                }),
                _react2.default.createElement(
                  _list2.default.Item,
                  { arrow: 'horizontal' },
                  '\u6E38\u620F\u670D'
                )
              )
            ),
            typeList && typeList[0] && _react2.default.createElement(
              'div',
              { className: 'd-account' },
              _react2.default.createElement(
                _picker2.default,
                (0, _extends3.default)({}, getFieldProps('ChargeType'), {
                  data: typeList,
                  cols: 1,
                  value: [postData['ChargeType']],
                  onChange: function onChange(val) {
                    _this2.changeSelect('ChargeType', val);
                  }
                }),
                _react2.default.createElement(
                  _list2.default.Item,
                  { arrow: 'horizontal' },
                  '\u6E38\u620F\u7C7B\u578B'
                )
              )
            )
          ) : '',

          // 选择数量
          chargeSelect && chargeSelect[0] && !choseProduct.isActivity && _react2.default.createElement(
            'div',
            { className: 'd-account' },
            _react2.default.createElement(
              _picker2.default,
              {
                data: chargeSelect,
                cols: 1,
                value: [postData['' + chargeNum.id]],
                onChange: function onChange(val) {
                  _this2.changeSelect('' + chargeNum.id, val);
                }
              },
              _react2.default.createElement(
                _list2.default.Item,
                { arrow: 'horizontal' },
                '\u9009\u62E9\u6570\u91CF'
              )
            )
          )
        ),
        choseProduct.isActivity ? _react2.default.createElement(
          'div',
          { className: 'btn-bg' },
          choseProduct.activityState == 0 ? _react2.default.createElement(
            'button',
            { className: 'btn-block time-btn' },
            _react2.default.createElement(
              'span',
              null,
              '\u8DDD\u79BB\u5F00\u62A2\u8FD8\u5269\uFF1A'
            ),
            _react2.default.createElement(
              'span',
              null,
              startSecound ? startSecound : '--:--'
            )
          ) : '',
          choseProduct.activityState == 1 && passCodeStatus ? _react2.default.createElement(
            'div',
            { className: 'active-btn' },

            // 马上抢 立即兑换(兑换下单)  立即兑换（直接跳订单） 正在抢购，请稍等...   您已参加
            passCodeStatus.userPassCodeStatus === 3 ? _react2.default.createElement(
              'button',
              { className: 'btn-block prim-btn', onClick: this.props.GetPassCode },
              '\u9A6C\u4E0A\u62A2'
            ) : '',
            passCodeStatus.userPassCodeStatus === 4 && !isLoading ? _react2.default.createElement(
              'button',
              { className: 'btn-block prim-btn', onClick: this.exchange },
              '\u7ACB\u5373\u8D2D\u4E70'
            ) : '',
            passCodeStatus.userPassCodeStatus === 1 && !isLoading ? _react2.default.createElement(
              'button',
              { className: 'btn-block prim-btn', onClick: function onClick() {
                  _this2.props.toOrderSure(passCodeStatus.orderNo);
                } },
              '\u7ACB\u5373\u8D2D\u4E70'
            ) : '',
            passCodeStatus.userPassCodeStatus === 4 && isLoading ? _react2.default.createElement(
              'button',
              { disabled: true, className: 'btn-block disable-btn' },
              '\u6B63\u5728\u62A2\u8D2D\uFF0C\u8BF7\u7A0D\u7B49...'
            ) : '',
            passCodeStatus.userPassCodeStatus === 2 ? _react2.default.createElement(
              'button',
              { disabled: true, className: 'btn-block disable-btn' },
              '\u60A8\u5DF2\u53C2\u52A0'
            ) : ''
          ) : '',
          choseProduct.activityState == 2 ? _react2.default.createElement(
            'button',
            { disabled: true, className: 'btn-block disable-btn' },
            '\u6D3B\u52A8\u5DF2\u7ED3\u675F'
          ) : ''
        ) : _react2.default.createElement(
          'div',
          { className: 'btn-bg' },
          _react2.default.createElement(
            'button',
            {
              className: 'btn-block prim-btn',
              onClick: function onClick() {
                _this2.exchange();
              },
              disabled: !!(this.props.loading && this.props.loading.effects['detail/sendOrder']),
              loading: !!(this.props.loading && this.props.loading.effects['detail/sendOrder'])
            },
            '\u7ACB\u5373\u8D2D\u4E70'
          )
        )
      );
    }
  }]);
  return TemplateModal;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)((0, _rcForm.createForm)()(TemplateModal));