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

var _RichText = require('../RichText');

var _RichText2 = _interopRequireDefault(_RichText);

var _Coupons = require('../Coupons');

var _Coupons2 = _interopRequireDefault(_Coupons);

var _CouponsList = require('../CouponsList');

var _CouponsList2 = _interopRequireDefault(_CouponsList);

var _CouponsPackage = require('../CouponsPackage');

var _CouponsPackage2 = _interopRequireDefault(_CouponsPackage);

var _ActiveModalCom = require('../ActiveModalCom');

var _ActiveModalCom2 = _interopRequireDefault(_ActiveModalCom);

var _ActiveModal = require('../ActiveModalCom/ActiveModal');

var _ActiveModal2 = _interopRequireDefault(_ActiveModal);

var _MallLoginModalPageSetting = require('../../LoginModal/MallLoginModalPageSetting');

var _MallLoginModalPageSetting2 = _interopRequireDefault(_MallLoginModalPageSetting);

var _Loading = require('../../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _auth = require('../../../utils/auth');

var _umBuriedPoint = require('../../../utils/umBuriedPoint');

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('../less/pageSetting.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 用户授权失败调用函数


// 登录弹框
var PageSettingComPonent = function (_React$Component) {
    (0, _inherits3.default)(PageSettingComPonent, _React$Component);

    function PageSettingComPonent(props) {
        (0, _classCallCheck3.default)(this, PageSettingComPonent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PageSettingComPonent.__proto__ || (0, _getPrototypeOf2.default)(PageSettingComPonent)).call(this, props));

        _this.getPageId = function (pageId) {
            var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
            // 如果是云闪付
            if (shopInfo.codeKey.toLowerCase() === (configs.UnionPay ? configs.UnionPay.toLowerCase() : '')) {
                return _mathManage2.default.geturl(window.location.href.split('?')[1], pageId);
            }
            return _mathManage2.default.getParam(pageId);
        };

        _this.clickUmBuired = function (location) {
            var pathname = window.location.pathname;
            // 频道页

            if (pathname === '/channel') {
                _umBuriedPoint.commonBuriedPoin.operationBitClick('频道页', location);
            } else {
                _umBuriedPoint.commonBuriedPoin.operationBitClick('首页', location);
            }
        };

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
                    arr.push(_react2.default.createElement(_BannerShuffling2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                }
                // banner广告
                else if (item.moduleType === 'banner') {
                        arr.push(_react2.default.createElement(_BannerAdvertising2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                    }
                    // 分类
                    else if (item.moduleType === 'class') {
                            arr.push(_react2.default.createElement(_Classification2.default, { item: item, index: index, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                        }
                        // 限时抢购
                        else if (item.moduleType === 'flashSale') {
                                arr.push(_react2.default.createElement(_FlashSale2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                            }
                            // 图文导航
                            else if (item.moduleType === 'imageText') {
                                    arr.push(_react2.default.createElement(_ImageText2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                                }
                                // 公告
                                else if (item.moduleType === 'richText') {
                                        arr.push(_react2.default.createElement(_RichText2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                                    }
                                    // 公告
                                    else if (item.moduleType === 'notice') {
                                            arr.push(_react2.default.createElement(_Notice2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                                        }
                                        // 优惠券
                                        else if (item.moduleType === 'coupon') {
                                                arr.push(_react2.default.createElement(_Coupons2.default, { item: item, history: _this.props.history, componentIndex: index,
                                                    authorizationFailurePageSetting: _this.authorizationFailurePageSetting }));
                                            }
                                            // 券列表
                                            else if (item.moduleType === 'couponsList') {
                                                    arr.push(_react2.default.createElement(_CouponsList2.default, { item: item, history: _this.props.history, componentIndex: index,
                                                        authorizationFailurePageSetting: _this.authorizationFailurePageSetting, getPage: _this.getPage }));
                                                }
                                                // 券包
                                                else if (item.moduleType === 'couponsPackage') {
                                                        arr.push(_react2.default.createElement(_CouponsPackage2.default, { item: item, history: _this.props.history, componentIndex: index,
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
            sessionStorage.setItem('userInfo', (0, _stringify2.default)(data));
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
            pageId: _this.getPageId('pageId')
        };
        _this.timer = null;
        return _this;
    }

    (0, _createClass3.default)(PageSettingComPonent, [{
        key: 'componentWillMount',

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
        value: function componentWillMount() {
            // 将child传递给this.props.onRef()方法
            this.props.onRef && this.props.onRef(this);
            this.getPage();
            // 页面加载埋点
            _umBuriedPoint.pageLoadPoin.pageLoad('首页');
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var props = this.props;
            var getPageResult = nextProps.pageSetting.getPageResult;

            var pageId = this.getPageId('pageId');
            console.log(props, 8888);
            // 自定义页面授权成功
            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && nextProps.pageSetting.componentIndex === 1000) {
                // 如果是自定义页面授权成功（例如优惠券需要做用户联登）1000是标识，成功之后重新获取页面信息
                this.getPage();
            }
            // 如果路由的pageId发生变化则重新请求页面信息,并且是频道页才会做查询
            if (pageId !== this.state.pageId && props.history.location.pathname === '/channel') {
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
                } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                    // true是预览页面
                    var disableClick = this.props.disableClick;

                    this.setState({
                        allInfo: data
                    });
                    // 如果不是预览页面
                    if (!disableClick) {
                        // 自定义页面接口授权失效重新授权
                        return this.authorizationFailurePageSetting(1000);
                    }
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
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var pathname = window.location.pathname;
            // 频道页

            if (pathname === '/channel') {
                localStorage.setItem('commodity_detail_souce', '频道页');
            } else {
                localStorage.setItem('commodity_detail_souce', '首页');
            }
        }
        // 首页运营位埋点


        // 用于设置组件唯一标识，便于后续寻找组件


        // 登录成功调用

    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                allInfo = _state.allInfo,
                showMallLoginModal = _state.showMallLoginModal;
            var disableClick = this.props.disableClick;

            return _react2.default.createElement(
                'div',
                { className: 'main-bg ' + (disableClick && 'point-events-none'), id: 'mainBgId' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-setting-content', style: { background: allInfo.backgroud, minHeight: '100vh' } },
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

// 友盟埋点


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(PageSettingComPonent);