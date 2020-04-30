'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _carousel = require('antd-mobile/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

require('antd-mobile/lib/modal/style');

require('antd-mobile/lib/carousel/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/kaishichouj.less');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _auth = require('../../utils/auth');

var _errIcon = require('./images/err-icon.png');

var _errIcon2 = _interopRequireDefault(_errIcon);

var _filedIcon = require('./images/filed-icon.png');

var _filedIcon2 = _interopRequireDefault(_filedIcon);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KaiShiChouJ = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(KaiShiChouJ, _React$Component);

  function KaiShiChouJ(props) {
    (0, _classCallCheck3.default)(this, KaiShiChouJ);

    var _this = (0, _possibleConstructorReturn3.default)(this, (KaiShiChouJ.__proto__ || (0, _getPrototypeOf2.default)(KaiShiChouJ)).call(this, props));

    _initialiseProps.call(_this);

    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
    var userid = localStorage.getItem('userid');
    var orderNo = localStorage.getItem('orderNo');
    var eventId = localStorage.getItem('eventId');
    var url = (0, _urlParse2.default)(props.location.search, true);
    _this.timer;
    _this.state = {
      eventId: eventId === 'null' ? null : eventId,
      userInfo: userInfo,
      shopInfo: shopInfo,
      userid: userid,
      activeId: '',
      orderNo: orderNo,
      dataSource: [{ isActive: true, index: 's0', classText: 'p0', proName: '百度网盘 会员30天' }, { isActive: false, index: 's1', classText: 'p1', proName: '百度网盘 会员30天' }, { isActive: false, index: 's2', classText: 'p2', proName: '百度网盘 会员30天' }, { isActive: false, index: 's7', classText: 'p3', proName: '百度网盘 会员30天' }, { isActive: false, index: 's3', classText: 'p4', proName: '百度网盘 会员30天' }, { isActive: false, index: 's6', classText: 'p5', proName: '百度网盘 会员30天' }, { isActive: false, index: 's5', classText: 'p6', proName: '百度网盘 会员30天' }, { isActive: false, index: 's4', classText: 'p7', proName: '百度网盘 会员30天' }],
      showModal: false,
      prizeNum: 0,
      errModal: false,
      filedModal: false,
      entityModal: false,
      drawnCount: 0,
      thisindex: 0,
      userlist: [],
      refreshNum: 0,
      ifopen: false,
      showMallLoginModal: false,
      showLoginPageModal: false,
      myprizelist: 0
    };
    return _this;
  }

  (0, _createClass3.default)(KaiShiChouJ, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      //1.进来先走游客模式登录
      var yes = (0, _auth.isLoginOrAuth)(this);
      if (yes) {
        this.init();
      }
      new _clipboard2.default('.gotoexchange');

      _czc.push(["_setAutoPageview", false]);
      _czc.push(["_trackPageview", '/kaishichouj']);
    }
  }, {
    key: 'init',
    value: function init() {
      //2.登录成功之后，判断活动是否开启
      this.props.dispatch({
        type: 'prize/activeOpen', payload: {
          eventId: this.state.eventId || configs.eventId
        }
      });
      //请求的有用户中奖内容
      this.userPrizeList();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var props = this.props;
      var fuluusertoken = nextProps.login.fuluusertoken;
      var _nextProps$prize = nextProps.prize,
          getPrizeNumRes = _nextProps$prize.getPrizeNumRes,
          prizeResultRes = _nextProps$prize.prizeResultRes,
          handlePrizeRes = _nextProps$prize.handlePrizeRes,
          prizeProListRes = _nextProps$prize.prizeProListRes,
          userPrizeListRes = _nextProps$prize.userPrizeListRes,
          activeOpenRes = _nextProps$prize.activeOpenRes,
          addPrizeNumRes = _nextProps$prize.addPrizeNumRes;

      if (addPrizeNumRes !== props.prize.addPrizeNumRes) {
        this.getUserPriceNum();
      }
      if (activeOpenRes !== props.prize.activeOpenRes) {
        if (activeOpenRes.code === '1000') {
          var userInfo = this.state.userInfo;

          if (activeOpenRes.data.enable === 1) {
            //给用户添加抽奖次数
            this.props.dispatch({
              type: 'prize/addPrizeNum', payload: {
                id: activeOpenRes.data.id,
                eventId: this.state.eventId || configs.eventId,
                userId: userInfo.fuluId,
                mobile: userInfo.fuluId
              }
            });
            this.setState({
              activeId: activeOpenRes.data.id,
              ifopen: true,
              eventDesc: activeOpenRes.data.eventDesc,
              eventAnnouncement: activeOpenRes.data.eventAnnouncement,
              startTime: activeOpenRes.data.eventStartTime.split(" ")[0],
              endTime: activeOpenRes.data.eventEndTime.split(" ")[0]
            }, function () {
              //请求奖品列表
              _this2.proList();
            });
            //3.如果开启，给用户添加抽奖次数
          } else if (activeOpenRes.data.enable === 2) {
            //禁用逻辑
            this.setState({
              ifopen: false
            });
            _toast2.default.fail('活动未开启');
          }
        } else if (activeOpenRes.code === '-3' || activeOpenRes.code === '1013' || activeOpenRes.code === '1014' || activeOpenRes.code === '1015') {
          var _userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
          _userInfo.fuluToken = '';
          localStorage.setItem("userInfo", (0, _stringify2.default)(_userInfo));
          (0, _auth.isLoginOrAuth)(this);
        }
      }
      if (userPrizeListRes !== props.prize.userPrizeListRes) {
        if (userPrizeListRes.code === '1000') {
          this.setState({
            drawnCount: userPrizeListRes.data.drawnCount,
            userlist: userPrizeListRes.data.outDtos
          });
        }
      }
      if (prizeProListRes !== props.prize.prizeProListRes) {
        if (prizeProListRes.code === '1000') {
          prizeProListRes.data.list.length > 0 && prizeProListRes.data.list.map(function (item, index) {
            if (index === 0) item.isActive = true;
            item.isActive = false;
          });
          this.setState({
            dataSource: prizeProListRes.data.list
          });
        }
      }
      if (handlePrizeRes !== props.prize.handlePrizeRes) {
        if (handlePrizeRes.code === '1000') {
          var dataSource = this.state.dataSource;
          //将内容展示在弹框中

          clearInterval(this.timer);
          dataSource.map(function (item, index) {
            item.isActive = false;
            if (item.id === handlePrizeRes.data.producId) {
              item.isActive = true;
            }
          });
          //prizetype为4 为谢谢回顾 其它为抽中
          if (handlePrizeRes.data.prizeType == 4) {
            this.setState({
              filedModal: true,
              errModal: false,
              showModal: false,
              entityModal: false
            });
          } else if (handlePrizeRes.data.prizeType == 5) {
            //实体
            this.setState({
              filedModal: false,
              errModal: false,
              showModal: false,
              entityModal: true,
              modalData: handlePrizeRes.data
            });
          } else {
            //非实体
            this.setState({
              filedModal: false,
              errModal: false,
              showModal: true,
              entityModal: false,
              modalData: handlePrizeRes.data
            });
          }
          this.setState({
            dataSource: dataSource
          });
          //刷新抽奖次数
          this.getUserPriceNum();
          //请求的有用户中奖内容
          this.userPrizeList();
        } else if (handlePrizeRes.code === '-3' || handlePrizeRes.code === '1013' || handlePrizeRes.code === '1014' || handlePrizeRes.code === '1015') {
          var _userInfo2 = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
          _userInfo2.fuluToken = '';
          localStorage.setItem("userInfo", (0, _stringify2.default)(_userInfo2));
          (0, _auth.isLoginOrAuth)(this);
        } else if (handlePrizeRes.code === '1020') {
          _toast2.default.fail('抽奖已达上限');
          clearInterval(this.timer);
        } else if (handlePrizeRes.code === '1021') {
          _toast2.default.fail('今日抽奖已达上限');
          clearInterval(this.timer);
        } else {
          clearInterval(this.timer);
          //刷新抽奖次数
          this.getUserPriceNum();
          this.setState({
            filedModal: false,
            errModal: true,
            showModal: false,
            entityModal: false
          });
        }
      }
      if (getPrizeNumRes !== props.prize.getPrizeNumRes) {
        if (getPrizeNumRes.code === '1000') {
          this.setState({
            prizeNum: getPrizeNumRes.data.prizeNum
          });
        }
        // let timer = null;
        // clearInterval(timer)
        // if (getPrizeNumRes.code === '1000') {
        //   this.setState({
        //     prizeNum: getPrizeNumRes.data.prizeNum
        //   })
        // } else if (getPrizeNumRes.code === '1001') {
        //   const { refreshNum } = this.state;
        //   if(refreshNum < 4 ){
        //     timer = setInterval(() => {
        //       this.getUserPriceNum()
        //     }, 12000);
        //   }else{
        //     clearInterval(timer)
        //   }
        //   this.setState({
        //     refreshNum: refreshNum + 1
        //   })
        // }
      }
      if (fuluusertoken !== props.login.fuluusertoken) {
        var code = fuluusertoken.code,
            data = fuluusertoken.data,
            message = fuluusertoken.message;

        if (code === '1000') {
          console.log('走了授权');
          localStorage.setItem('userInfo', (0, _stringify2.default)(data));
          this.loginSuccess();
          this.init();
        } else {
          _toast2.default.fail(message);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this,
          _React$createElement,
          _React$createElement2,
          _React$createElement3,
          _React$createElement4;

      var _state = this.state,
          startTime = _state.startTime,
          endTime = _state.endTime,
          entityModal = _state.entityModal,
          eventAnnouncement = _state.eventAnnouncement,
          eventDesc = _state.eventDesc,
          prizeList = _state.prizeList,
          dataSource = _state.dataSource,
          showModal = _state.showModal,
          prizeNum = _state.prizeNum,
          errModal = _state.errModal,
          filedModal = _state.filedModal,
          drawnCount = _state.drawnCount,
          userlist = _state.userlist,
          modalData = _state.modalData,
          showMallLoginModal = _state.showMallLoginModal,
          showLoginPageModal = _state.showLoginPageModal;

      return _react2.default.createElement(
        'div',
        { className: 'kaishichouj-bg' },
        _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
          jump: function jump() {
            _this3.props.history.goBack();
          }
        })),
        _react2.default.createElement('div', { className: 'pagetitle' }),
        _react2.default.createElement(
          'div',
          { className: 'prize-body' },
          _react2.default.createElement(
            'p',
            { className: 'prize-usernum' },
            '\u5DF2\u6709\uFF1A',
            drawnCount,
            '\u4EBA\u53C2\u4E0E\u62BD\u5956'
          ),
          _react2.default.createElement(
            'div',
            { className: 'prize-roll' },
            _react2.default.createElement(
              'div',
              { className: 'draw-section' },
              dataSource && dataSource.map(function (v, i) {
                return _react2.default.createElement(
                  'div',
                  {
                    key: i,
                    className: v.isActive ? 'draw-item active p' + i : 'draw-item p' + i
                  },
                  v.prizeImageUrl && _react2.default.createElement('img', { src: v.prizeImageUrl, alt: '' }),
                  _react2.default.createElement(
                    'p',
                    { className: 'item-prize-name' },
                    v.prizeName
                  )
                );
              }),
              _react2.default.createElement(
                'div',
                { className: 'draw-item draw-btn', onClick: function onClick() {
                    _this3.handleClick();
                  } },
                _react2.default.createElement('button', { className: 'btn' }),
                _react2.default.createElement(
                  'p',
                  { className: 'draw-times' },
                  '\u62BD\u5956\u6B21\u6570*',
                  this.state.prizeNum
                )
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'prize-notice' },
            userlist.length > 0 && _react2.default.createElement(
              _carousel2.default,
              { className: 'my-carousel',
                vertical: true,
                dots: false,
                dragging: false,
                swiping: false,
                autoplay: true,
                infinite: true
              },
              userlist.map(function (item, index) {
                return _react2.default.createElement(
                  'div',
                  { key: index, className: 'v-item' },
                  '\u7528\u6237: ',
                  item.mobile.substring(0, 3) + '*****' + item.mobile.substring(8, 11),
                  ' \u62BD\u4E2D',
                  item.prizeName
                );
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'prize-rule' },
            _react2.default.createElement(
              'h1',
              null,
              '\u6D3B\u52A8\u89C4\u5219'
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\u6D3B\u52A8\u65F6\u95F4'
              ),
              ' ',
              startTime,
              ' \u81F3 ',
              endTime
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\u6D3B\u52A8\u8BF4\u660E'
              ),
              ' ',
              eventDesc && eventDesc
            ),
            _react2.default.createElement(
              'p',
              null,
              _react2.default.createElement(
                'span',
                null,
                '\u6CE8\u610F\u4E8B\u9879'
              ),
              ' ',
              eventAnnouncement && eventAnnouncement
            )
          )
        ),
        _react2.default.createElement('div', { onClick: this.myPrize, className: 'myprize' }),
        showModal && _react2.default.createElement(
          _modal2.default,
          (_React$createElement = {
            visible: true,
            transparent: true,
            maskClosable: false
          }, (0, _defineProperty3.default)(_React$createElement, 'transparent', true), (0, _defineProperty3.default)(_React$createElement, 'className', 'choujiangmodal'), _React$createElement),
          modalData && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('h1', null),
            _react2.default.createElement('img', { src: modalData.prizeImageUrl }),
            _react2.default.createElement(
              'p',
              { className: 'proname' },
              modalData.prizeName
            ),
            _react2.default.createElement(
              'p',
              { className: 'pro-notice' },
              '\u5173\u95ED\u9875\u9762\u540E\u53EF\u4EE5\u901A\u8FC7\u6D3B\u52A8\u9875\u9762\u4E0B\u65B9 \u6211\u7684\u5956\u54C1\u67E5\u770B\u4E2D\u5956\u60C5\u51B5'
            ),
            _react2.default.createElement(
              'button',
              { className: 'gotoexchange', 'data-clipboard-text': modalData.cards, onClick: function onClick() {
                  _this3.exchange(modalData.exchangeUrl, modalData.cards, modalData.batchType);
                } },
              '\u7ACB\u5373\u5151\u6362'
            ),
            _react2.default.createElement('span', { className: 'close', onClick: function onClick() {
                _this3.hiddenModal('showModal');
              } })
          )
        ),
        filedModal && _react2.default.createElement(
          _modal2.default,
          (_React$createElement2 = {
            visible: true,
            transparent: true,
            maskClosable: false
          }, (0, _defineProperty3.default)(_React$createElement2, 'transparent', true), (0, _defineProperty3.default)(_React$createElement2, 'className', 'choujiangmodal'), _React$createElement2),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('h1', { className: 'filedmodal-title' }),
            _react2.default.createElement('img', { src: _filedIcon2.default }),
            _react2.default.createElement(
              'p',
              { className: 'proname' },
              '\u8C22\u8C22\u53C2\u4E0E'
            ),
            _react2.default.createElement(
              'p',
              { className: 'pro-notice' },
              '\u5173\u95ED\u9875\u9762\u540E\u53EF\u4EE5\u901A\u8FC7\u6D3B\u52A8\u9875\u9762\u4E0B\u65B9 \u6211\u7684\u5956\u54C1\u67E5\u770B\u4E2D\u5956\u60C5\u51B5'
            ),
            _react2.default.createElement(
              'button',
              { className: 'gotoexchange', onClick: function onClick() {
                  _this3.hiddenModal('filedModal');
                } },
              '\u77E5\u9053\u4E86'
            ),
            _react2.default.createElement('span', { className: 'close', onClick: function onClick() {
                _this3.hiddenModal('filedModal');
              } })
          )
        ),
        errModal && _react2.default.createElement(
          _modal2.default,
          (_React$createElement3 = {
            visible: true,
            transparent: true,
            maskClosable: false
          }, (0, _defineProperty3.default)(_React$createElement3, 'transparent', true), (0, _defineProperty3.default)(_React$createElement3, 'className', 'choujiangmodal'), _React$createElement3),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('h1', { className: 'errmodal-title' }),
            _react2.default.createElement('img', { src: _errIcon2.default }),
            _react2.default.createElement(
              'p',
              { className: 'err-mes' },
              '\u7CFB\u7EDF\u5F02\u5E38'
            ),
            _react2.default.createElement(
              'p',
              { className: 'err-mes' },
              '\u70B9\u51FB\u91CD\u65B0\u62BD\u5956'
            ),
            _react2.default.createElement(
              'button',
              { className: 'gotoexchange', onClick: this.againprize },
              '\u91CD\u65B0\u62BD\u5956'
            ),
            _react2.default.createElement('span', { className: 'close', onClick: function onClick() {
                _this3.hiddenModal('errModal');
              } })
          )
        ),
        entityModal && _react2.default.createElement(
          _modal2.default,
          (_React$createElement4 = {
            visible: true,
            transparent: true,
            maskClosable: false
          }, (0, _defineProperty3.default)(_React$createElement4, 'transparent', true), (0, _defineProperty3.default)(_React$createElement4, 'className', 'choujiangmodal'), _React$createElement4),
          modalData && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('h1', null),
            _react2.default.createElement('img', { src: modalData.prizeImageUrl }),
            _react2.default.createElement(
              'p',
              { className: 'proname' },
              modalData.prizeName
            ),
            _react2.default.createElement(
              'p',
              { className: 'pro-notice' },
              '\u540E\u7EED\u4F1A\u6709\u5DE5\u4F5C\u4EBA\u5458\u548C\u60A8\u8054\u7CFB\uFF0C\u6838\u5BF9\u4E2D\u5956\u4FE1\u606F\uFF0C\u8BF7\u4FDD\u6301\u624B\u673A\u7545\u901A'
            ),
            _react2.default.createElement(
              'button',
              { className: 'gotoexchange', 'data-clipboard-text': modalData.cards, onClick: this.entityexchange },
              '\u7ACB\u5373\u5151\u6362'
            ),
            _react2.default.createElement('span', { className: 'close', onClick: function onClick() {
                _this3.hiddenModal('entityModal');
              } })
          )
        ),
        showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
      );
    }
  }]);
  return KaiShiChouJ;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.userPrizeList = function () {
    _this4.props.dispatch({
      type: 'prize/userPrizeList', payload: {
        eventId: _this4.state.eventId || configs.eventId
      }
    });
  };

  this.proList = function () {
    //奖品列表接口
    _this4.props.dispatch({
      type: 'prize/prizeProList', payload: {
        id: _this4.state.activeId
      }
    });
  };

  this.myPrize = function () {
    _this4.props.history.push('./prizelist');
  };

  this.getUserPriceNum = function () {
    //判断是否拥有抽奖次数
    _this4.props.dispatch({
      type: 'prize/getPrizeNum', payload: {
        userId: _this4.state.userInfo.fuluId,
        eventId: _this4.state.eventId || configs.eventId,
        id: _this4.state.activeId
      }
    });
  };

  this.loginSuccess = function () {
    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
    _this4.setState({
      userInfo: userInfo
    }, function () {
      _this4.init();
    });
    _this4.hideLoginModal();
  };

  this.hideLoginModal = function () {
    _this4.setState({
      showMallLoginModal: false,
      showLoginPageModal: false
    });
  };

  this.toUrl = function (url) {
    _this4.props.history.push(url);
  };

  this.toLogin = function () {
    _this4.setState({
      isOrderList: false
    }, function () {
      (0, _auth.isLoginOrAuth)(_this4);
    });
  };

  this.againprize = function () {
    _this4.hiddenModal('errModal');
    _this4.handleClick();
  };

  this.handleClick = function () {
    var _state2 = _this4.state,
        userInfo = _state2.userInfo,
        activeId = _state2.activeId,
        prizeNum = _state2.prizeNum,
        ifopen = _state2.ifopen;
    //活动是否开启 ifopen true
    //抽奖次数是否大于0 prizeNum > 0

    if (ifopen) {
      if (prizeNum > 0) {
        clearInterval(_this4.timer);
        _this4.start(0, 999999, 50);
        //抽奖接口
        _this4.props.dispatch({
          type: 'prize/handlePrize', payload: {
            id: activeId,
            eventId: _this4.state.eventId || configs.eventId,
            userId: userInfo.fuluId,
            mobile: userInfo.fuluId
          }
        });
      } else {
        _toast2.default.fail('您的抽奖次数已用完');
      }
    } else {
      _toast2.default.fail('活动未开始');
    }
  };

  this.start = function (position, result, speed) {
    // position-起始序号  result-结果序号  speed-速度
    _this4.round = 0; // 总次数
    _this4.active = position; // 起始位置
    var dataSource = _this4.state.dataSource;

    _this4.timer = setInterval(function () {
      if (_this4.round < result) {
        if (_this4.active === 7) {
          _this4.active = 0;
        } else {
          _this4.active += 1;
        }
        _this4.round += 1;
        for (var i = 0, l = dataSource.length; i < l; i += 1) {
          if (i === _this4.active) {
            dataSource[i].isActive = true;
          } else {
            dataSource[i].isActive = false;
          }
        }
        _this4.setState({ dataSource: dataSource, activeIndex: _this4.active });
        // console.log('timer', this.active);
      } else {
        setTimeout(function () {
          _this4.setState({ prizeModal: true, isDisabled: false });
        }, 1000);
        clearInterval(_this4.timer);
      }
    }, speed);
  };

  this.hiddenModal = function (modal) {
    _this4.setState((0, _defineProperty3.default)({}, modal, false));
  };

  this.exchange = function (url, card, type) {
    // 1满减券 2折扣券 3 兑换劵
    if (type !== '3') {
      _this4.props.history.push('./mycoupons');
    } else {
      //将card复制到剪切板
      _toast2.default.success('券码复制成功，请在页面跳转后粘贴使用。', 3);
      setTimeout(function () {
        window.location.href = url;
      }, 3000);
    }
  };

  this.entityexchange = function () {
    _this4.hiddenModal('entityModal');
    _toast2.default.show('稍后会有客服人员联系您，请保持手机畅通。');
  };
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(KaiShiChouJ);