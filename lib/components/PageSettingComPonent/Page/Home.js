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

var _BannerShuffling = require('../BannerShuffling');

var _BannerShuffling2 = _interopRequireDefault(_BannerShuffling);

var _BannerAdvertising = require('../BannerAdvertising');

var _BannerAdvertising2 = _interopRequireDefault(_BannerAdvertising);

var _Classification = require('../Classification');

var _Classification2 = _interopRequireDefault(_Classification);

var _FlashSale = require('../FlashSale');

var _FlashSale2 = _interopRequireDefault(_FlashSale);

var _ImageText = require('../ImageText');

var _ImageText2 = _interopRequireDefault(_ImageText);

var _Notice = require('../Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Coupons = require('../Coupons');

var _Coupons2 = _interopRequireDefault(_Coupons);

var _ActiveModalCom = require('../ActiveModalCom');

var _ActiveModalCom2 = _interopRequireDefault(_ActiveModalCom);

var _ActiveModal = require('../ActiveModalCom/ActiveModal');

var _ActiveModal2 = _interopRequireDefault(_ActiveModal);

var _MallLoginModalPageSetting = require('../../LoginModal/MallLoginModalPageSetting');

var _MallLoginModalPageSetting2 = _interopRequireDefault(_MallLoginModalPageSetting);

var _Loading = require('../../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _auth = require('../../../utils/auth');

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('../less/pageSetting.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageSettingComPonent = function (_React$Component) {
    (0, _inherits3.default)(PageSettingComPonent, _React$Component);

    function PageSettingComPonent(props) {
        (0, _classCallCheck3.default)(this, PageSettingComPonent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PageSettingComPonent.__proto__ || (0, _getPrototypeOf2.default)(PageSettingComPonent)).call(this, props));

        _this.getPage = function () {
            var pageId = _this.state.pageId;
            var pageType = _this.props.pageType;

            _this.props.dispatch({
                type: 'pageSetting/getPage',
                payload: {
                    pageType: pageType,
                    pageId: pageId
                }
            });
        };

        _this.getCom = function () {
            var allInfo = _this.state.allInfo;

            var arr = [];
            allInfo.pageModuleList.map(function (item, index) {
                // banner轮播
                if (item.moduleType === 'bannerRoll') {
                    arr.push(_react2.default.createElement(_BannerShuffling2.default, { item: item, history: _this.props.history }));
                }
                // banner广告
                else if (item.moduleType === 'banner') {
                        arr.push(_react2.default.createElement(_BannerAdvertising2.default, { item: item, history: _this.props.history }));
                    }
                    // 分类
                    else if (item.moduleType === 'class') {
                            arr.push(_react2.default.createElement(_Classification2.default, { item: item, history: _this.props.history }));
                        }
                        // 限时抢购
                        else if (item.moduleType === 'flashSale') {
                                arr.push(_react2.default.createElement(_FlashSale2.default, { item: item, history: _this.props.history }));
                            }
                            // 图文导航
                            else if (item.moduleType === 'imageText') {
                                    arr.push(_react2.default.createElement(_ImageText2.default, { item: item, history: _this.props.history }));
                                }
                                // 图文导航
                                else if (item.moduleType === 'notice') {
                                        arr.push(_react2.default.createElement(_Notice2.default, { item: item, history: _this.props.history }));
                                    }
                                    // 优惠券
                                    else if (item.moduleType === 'coupon') {
                                            arr.push(_react2.default.createElement(_Coupons2.default, { item: item, history: _this.props.history, componentIndex: index,
                                                authorizationFailurePageSetting: _this.authorizationFailurePageSetting }));
                                        }
            });
            return arr;
        };

        _this.authorizationFailurePageSetting = function (componentIndex) {
            _this.setState({
                componentIndex: componentIndex
            }, function () {
                (0, _auth.authorizationFailurePageSetting)(_this);
            });
        };

        _this.hideModal = function () {
            var allInfo = _this.state.allInfo;

            allInfo.isPopup = false;
            _this.setState({ allInfo: allInfo });
        };

        _this.loginSuccess = function (data) {
            var componentIndex = _this.state.componentIndex;

            _this.hideLoginModal();
            localStorage.setItem('userInfo', (0, _stringify2.default)(data));
            // 防止数据发送太快导致会多次进入子组件的判断
            // setTimeout(() => {
            _this.props.dispatch({ type: 'pageSetting/commonRequest', payload: { guid: Math.random(), componentIndex: componentIndex } });
            // }, 1000);
        };

        _this.hideLoginModal = function () {
            _this.setState({
                showMallLoginModal: false
            });
        };

        _this.state = {
            allInfo: {
                pageModuleList: [],
                showMallLoginModal: false,
                // 授权的组件索引
                componentIndex: ''
            },
            pageId: _mathManage2.default.getParam('pageId')
        };
        return _this;
    }
    // componentWillMount() {

    // }
    // componentWillReceiveProps(nextProps) {
    //     const { allInfo } = this.state;
    //     if (allInfo !== nextProps.allInfo) {
    //         this.setState({
    //             allInfo: nextProps.allInfo
    //         })
    //     }
    // }


    (0, _createClass3.default)(PageSettingComPonent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.getPage();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var props = this.props;
            var getPageResult = nextProps.pageSetting.getPageResult;

            var pageId = _mathManage2.default.getParam('pageId');
            // 如果路由的pageId发生变化则重新请求页面信息
            if (pageId !== this.state.pageId) {
                this.setState({
                    pageId: pageId
                }, function () {
                    _this2.getPage();
                });
            }
            if (getPageResult !== props.pageSetting.getPageResult) {
                var code = getPageResult.code,
                    data = getPageResult.data,
                    message = getPageResult.message;

                if (code === '0') {
                    return this.setState({
                        allInfo: data
                    });
                } else {
                    _toast2.default.info(message);
                }
            }
            var fuluusertoken = nextProps.loginPageSetting.fuluusertoken;

            if (fuluusertoken !== props.loginPageSetting.fuluusertoken) {
                var _code = fuluusertoken.code,
                    _data = fuluusertoken.data,
                    _message = fuluusertoken.message;

                if (_code === '1000') {
                    this.loginSuccess(_data);
                } else {
                    _toast2.default.fail(_message);
                }
            }
        }
        // 用于设置组件唯一标识，便于后续寻找组件


        // 登录成功调用

    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                allInfo = _state.allInfo,
                showMallLoginModal = _state.showMallLoginModal,
                componentIndex = _state.componentIndex;
            var disableClick = this.props.disableClick;

            return _react2.default.createElement(
                'div',
                { className: 'main-bg ' + (disableClick && 'point-events-none') },
                _react2.default.createElement(
                    'div',
                    { className: 'page-setting-content', style: { background: allInfo.backgroud } },
                    this.getCom()
                ),
                allInfo.isPopup && _react2.default.createElement(_ActiveModal2.default, { history: this.props.history, allInfo: allInfo, disableClick: disableClick, hideModal: this.hideModal }),
                allInfo.isSidebar && _react2.default.createElement(_ActiveModalCom2.default, { history: this.props.history, allInfo: allInfo }),
                showMallLoginModal && _react2.default.createElement(_MallLoginModalPageSetting2.default, {
                    loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal }),
                !!this.props.loading.models.pageSetting && _react2.default.createElement(_Loading2.default, null)
            );
        }
    }]);
    return PageSettingComPonent;
}(_react2.default.Component);

// 用户授权失败调用函数


// 登录弹框


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(PageSettingComPonent);