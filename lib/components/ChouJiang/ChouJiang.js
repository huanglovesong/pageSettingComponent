'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/choujiang.less');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChouJiang = function (_React$Component) {
  (0, _inherits3.default)(ChouJiang, _React$Component);

  function ChouJiang(props) {
    (0, _classCallCheck3.default)(this, ChouJiang);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ChouJiang.__proto__ || (0, _getPrototypeOf2.default)(ChouJiang)).call(this, props));

    _this.getUserPriceNum = function () {
      //判断是否拥有抽奖次数
      _this.props.dispatch({
        type: 'prize/getPrizeNum', payload: {
          userId: _this.state.userid
        }
      });
    };

    _this.sendOrder = function () {
      //下单
      //this.props.history.push('./kaishichouj')
      var _this$state = _this.state,
          isprizeright = _this$state.isprizeright,
          prizeNum = _this$state.prizeNum;

      if (isprizeright === 0) {
        //下单
        _this.props.dispatch({ type: 'prize/prizeSendOrder' });
      } else if (isprizeright === 1) {
        _this.props.history.push('./kaishichouj');
      }
    };

    _this.toUrl = function (url) {
      _this.props.history.push(url);
    };

    _this.toLogin = function () {
      _this.setState({
        isOrderList: false
      }, function () {
        (0, _auth.isLoginOrAuth)(_this);
      });
    };

    _this.loginSuccess = function (data) {
      _this.hideLoginModal();
      _this.setState({
        userInfo: data
      }, function () {
        _this.props.dispatch({ type: 'prize/activeOpen' });
      });
    };

    _this.hideLoginModal = function () {
      _this.setState({
        showMallLoginModal: false
      });
    };

    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
    var userid = localStorage.getItem('userid');
    _this.state = {
      userInfo: userInfo,
      shopInfo: shopInfo,
      userid: userid,
      isprizeright: false,
      showMallLoginModal: false
    };
    return _this;
  }

  (0, _createClass3.default)(ChouJiang, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //授权
      var yes = (0, _auth.isLoginOrAuth)(this);
      if (yes) {
        //已成功登录授权
        this.props.dispatch({ type: 'prize/activeOpen' });
      }
    }
  }, {
    key: 'chinapay',
    value: function chinapay(data) {
      try {
        window.c_plugins.merchantBridge.callPaymentControl(function (result) {
          // 下述内容为点击左上角<后执行
          //alert('已调起支付控件');
          if (result.isCancelPay === '1') {
            // 客户取消了支付
          } else {
            if (result.orderStatus === '1') {
              // 支付成功的回调方法，可写返回后逻辑
              //支付成功后,直接跳抽奖页面,并带一个参数,证明该用户支付了,如果支付完成,就可以确定该用户是新用户
              this.props.history.push('./kaishichouj');
            } else {
              // 支付失败的回调方法 ，可写返回后逻辑1
            }
          }
        }, function (err) {
          alert(err.message || err || '网络错误，请检查网络连接');
        }, JSON.parse(data));
        //JSON.parse(data) 下单接口成功得到的数据
      } catch (error) {
        alert(error);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var props = this.props;
      var fuluusertoken = nextProps.login.fuluusertoken;
      var _nextProps$prize = nextProps.prize,
          getPrizeNumRes = _nextProps$prize.getPrizeNumRes,
          isPrizeRight = _nextProps$prize.isPrizeRight,
          prizeSendOrderRes = _nextProps$prize.prizeSendOrderRes,
          saveUserDataRes = _nextProps$prize.saveUserDataRes,
          activeOpenRes = _nextProps$prize.activeOpenRes,
          payInfoRes = _nextProps$prize.payInfoRes;

      if (fuluusertoken !== props.login.fuluusertoken) {
        var code = fuluusertoken.code,
            data = fuluusertoken.data,
            message = fuluusertoken.message;

        if (code === '1000') {
          localStorage.setItem('userInfo', (0, _stringify2.default)(data));
          this.loginSuccess(data);
        } else {
          _toast2.default.fail(message);
        }
      }
      if (activeOpenRes !== props.prize.activeOpenRes) {
        if (activeOpenRes.code === '1000') {
          if (activeOpenRes.data.list[0].enable === 1) {
            //开启,判断是否拥有抽奖次数
            this.getUserPriceNum();
            localStorage.setItem('activeId', activeOpenRes.data.list.length > 0 && activeOpenRes.data.list[0].id);
          } else if (activeOpenRes.data.list[0].enable === 2) {
            //禁用逻辑
            this.setState({
              isprizeright: 2 //0,未购买,显示去支付1.已支付,显示去抽奖2.活动结束
            });
          }
        }
      }
      if (saveUserDataRes !== props.prize.saveUserDataRes) {
        if (saveUserDataRes.code === '1000') {}
      }
      if (prizeSendOrderRes !== props.prize.prizeSendOrderRes) {
        if (prizeSendOrderRes.code === '1000') {
          //下单成功返回，orderNo，productId,同时请求保存用户信息,以及请求支付接口
          this.props.dispatch({
            type: 'prize/saveUserData', payload: {
              orderNo: prizeSendOrderRes.data.orderNo,
              productId: prizeSendOrderRes.data.productId,
              userId: this.state.userid,
              mobile: this.state.mobile || '13036163226'
            }
          });
          this.props.dispatch({
            type: 'prize/payInfo', payload: {
              ProductName: '中国银行抽奖',
              OrderNo: prizeSendOrderRes.data.orderNo,
              PayAmount: 0.01
            }
          });
        }
      }
      if (payInfoRes !== props.prize.payInfoRes) {
        if (payInfoRes.code === '0') {
          //请求支付接口,成功后,直接调中国银行支付面版
          this.chinapay(payInfoRes.data);
        }
      }
      if (getPrizeNumRes !== props.prize.getPrizeNumRes) {
        var _getPrizeNumRes$data = getPrizeNumRes.data,
            mobile = _getPrizeNumRes$data.mobile,
            orderNo = _getPrizeNumRes$data.orderNo,
            prizeNum = _getPrizeNumRes$data.prizeNum;

        if (getPrizeNumRes.code === '1000') {
          this.setState({
            isprizeright: 1,
            prizeNum: prizeNum
          });
        } else if (getPrizeNumRes.code === '1001') {
          //拥有抽奖资格
          this.setState({
            isprizeright: 0
          });
        }
        this.setState({
          mobile: mobile,
          orderNo: orderNo,
          prizeNum: prizeNum
        });
        localStorage.setItem('orderNo', orderNo);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          userInfo = _state.userInfo,
          shopInfo = _state.shopInfo,
          isprizeright = _state.isprizeright,
          btntxt = _state.btntxt,
          showMallLoginModal = _state.showMallLoginModal;

      return _react2.default.createElement(
        'div',
        { className: 'choujiang-bg' },
        _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
          jump: function jump() {
            _this2.props.history.goBack();
          }
        })),
        _react2.default.createElement('div', { className: 'prizeList' }),
        isprizeright && _react2.default.createElement(
          'div',
          { onClick: this.sendOrder, className: 'cj-btn' },
          isprizeright === 0 ? '支付0.01参与抽奖' : isprizeright === 1 ? '立即抽奖' : isprizeright === 2 ? '活动已结束' : ''
        ),
        showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
      );
    }
  }]);
  return ChouJiang;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(ChouJiang);