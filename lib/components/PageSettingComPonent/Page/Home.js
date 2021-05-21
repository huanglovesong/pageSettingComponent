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

var _Draw = require('../BusinessComponent/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _DrawUserInfo = require('../BusinessComponent/DrawUserInfo');

var _DrawUserInfo2 = _interopRequireDefault(_DrawUserInfo);

var _DrawWinRecord = require('../BusinessComponent/DrawWinRecord');

var _DrawWinRecord2 = _interopRequireDefault(_DrawWinRecord);

var _MallLoginModalPageSetting = require('../../LoginModal/MallLoginModalPageSetting');

var _MallLoginModalPageSetting2 = _interopRequireDefault(_MallLoginModalPageSetting);

var _Loading = require('../../Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _auth = require('../../../utils/auth');

var _umBuriedPoint = require('../../../utils/umBuriedPoint');

var _gfBuriedPoint = require('../../../utils/gfBuriedPoint');

var _gfBuriedPoint2 = _interopRequireDefault(_gfBuriedPoint);

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('../less/pageSetting.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 友盟埋点


// 抽奖

// import SlyderAdventures from '../BusinessComponent/Draw/SlyderAdventures';
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

        _this.pageLoadUmBuired = function (data, pageId) {
            // 埋点公用方法
            _umBuriedPoint.commonBuriedPoin.cnzzUpload('自定义页面', '页面加载', pageId);
            data.pageModuleList.map(function (item, index) {
                // banner轮播
                if (item.moduleType === 'bannerRoll') {
                    // 埋点公用方法
                    _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-banner\u8F6E\u64AD' + index, '曝光', pageId);
                }
                // banner广告
                else if (item.moduleType === 'banner') {
                        // 埋点公用方法
                        _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-banner\u5E7F\u544A' + index, '曝光', pageId);
                    }
                    // 分类
                    else if (item.moduleType === 'class') {
                            // 埋点公用方法
                            _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u5206\u7C7B' + index, '曝光', pageId);
                        }
                        // 限时抢购
                        else if (item.moduleType === 'flashSale') {
                                // 埋点公用方法
                                _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u9650\u65F6\u62A2\u8D2D' + index, '曝光', pageId);
                            }
                            // 图文导航
                            else if (item.moduleType === 'imageText') {
                                    // 埋点公用方法
                                    _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u56FE\u6587\u5BFC\u822A' + index, '曝光', pageId);
                                }
                                // 富文本
                                else if (item.moduleType === 'richText') {
                                        // 埋点公用方法
                                        _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u5BCC\u6587\u672C' + index, '曝光', pageId);
                                    }
                                    // 公告
                                    else if (item.moduleType === 'notice') {
                                            // 埋点公用方法
                                            _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u516C\u544A' + index, '曝光', pageId);
                                        }
                                        // 优惠券
                                        else if (item.moduleType === 'coupon') {
                                                // 埋点公用方法
                                                _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u4F18\u60E0\u5238' + index, '曝光', pageId);
                                            }
                                            // 券列表
                                            else if (item.moduleType === 'couponsList') {
                                                    // 埋点公用方法
                                                    _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u5238\u5217\u8868' + index, '曝光', pageId);
                                                }
                                                // 券包
                                                else if (item.moduleType === 'couponsPackage') {
                                                        // 埋点公用方法
                                                        _umBuriedPoint.commonBuriedPoin.cnzzUpload('\u7EC4\u4EF6-\u5238\u5305' + index, '曝光', pageId);
                                                    }
            });
        };

        _this.clickUmBuired = function (location, pname) {
            if (location === '组件-图文导航切换') {
                // 首页-点击金刚区
                _gfBuriedPoint2.default.TDAPP('third_fulu_entertainment_07', pname);
            } else if (location === '组件-banner轮播') {
                // 首页-顶部轮播点击
                _gfBuriedPoint2.default.TDAPP('third_fulu_entertainment_06', pname);
            } else if (location === '组件-banner广告') {
                // 首页-中间位置广告位
                _gfBuriedPoint2.default.TDAPP('third_fulu_entertainment_11', pname);
            } else if (location === '组件-分类切换') {
                // 首页-tab点击
                _gfBuriedPoint2.default.TDAPP('third_fulu_entertainment_12', pname);
            }

            // 埋点公用方法
            var pageId = _this.state.pageId;

            if (location === '组件-分类商品' || location === '组件-限时抢购') {
                _umBuriedPoint.commonBuriedPoin.cnzzUpload(location, '点击', pageId + ',' + pname);
            } else {
                _umBuriedPoint.commonBuriedPoin.cnzzUpload(location, '点击', pageId);
            }
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
            var _this$state = _this.state,
                allInfo = _this$state.allInfo,
                pageId = _this$state.pageId;

            var arr = [];
            // arr.push(<SlyderAdventures />);


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
                                // 富文本
                                else if (item.moduleType === 'richText') {
                                        arr.push(_react2.default.createElement(_RichText2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired, componentIndex: index }));
                                    }
                                    // 公告
                                    else if (item.moduleType === 'notice') {
                                            arr.push(_react2.default.createElement(_Notice2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                                        }
                                        // 优惠券
                                        else if (item.moduleType === 'coupon') {
                                                arr.push(_react2.default.createElement(_Coupons2.default, { item: item, history: _this.props.history, componentIndex: index,
                                                    authorizationFailurePageSetting: _this.authorizationFailurePageSetting, clickUmBuired: _this.clickUmBuired }));
                                            }
                                            // 券列表
                                            else if (item.moduleType === 'couponsList') {
                                                    arr.push(_react2.default.createElement(_CouponsList2.default, { item: item, history: _this.props.history, componentIndex: index, clickUmBuired: _this.clickUmBuired,
                                                        authorizationFailurePageSetting: _this.authorizationFailurePageSetting, getPage: _this.getPage }));
                                                }
                                                // 券包
                                                else if (item.moduleType === 'couponsPackage') {
                                                        arr.push(_react2.default.createElement(_CouponsPackage2.default, { item: item, history: _this.props.history, componentIndex: index,
                                                            authorizationFailurePageSetting: _this.authorizationFailurePageSetting }));
                                                    }
                                                    // // 抽奖用户信息
                                                    else if (item.moduleType === 'drawUserInfo') {
                                                            arr.push(_react2.default.createElement(_DrawUserInfo2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
                                                        }
                                                        // 抽奖
                                                        else if (item.moduleType === 'draw') {
                                                                arr.push(_react2.default.createElement(_Draw2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired, componentIndex: index,
                                                                    authorizationFailurePageSetting: _this.authorizationFailurePageSetting }));
                                                            }
                                                            // 抽奖记录
                                                            else if (item.moduleType === 'drawWinRecord') {
                                                                    arr.push(_react2.default.createElement(_DrawWinRecord2.default, { item: item, history: _this.props.history, clickUmBuired: _this.clickUmBuired }));
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
            var pageId = this.state.pageId;

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
                    this.pageLoadUmBuired(data, data.id);
                    return this.setState({
                        allInfo: data,
                        pageId: data.id
                    });
                } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                    // true是预览页面
                    var disableClick = this.props.disableClick;

                    this.pageLoadUmBuired(data, data.id);
                    this.setState({
                        allInfo: data,
                        pageId: data.id
                    });
                    // 如果不是预览页面
                    if (!disableClick) {
                        // 自定义页面接口授权失效重新授权
                        return this.authorizationFailurePageSetting(1000);
                    }
                } else {
                    debugger;
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

                // 抽奖不能loading
                !!this.props.loading.models.pageSetting && !this.props.loading.effects['pageSetting/getPrizeNum'] && !this.props.loading.effects['pageSetting/handlePrize'] && _react2.default.createElement(_Loading2.default, null)
            );
        }
    }]);
    return PageSettingComPonent;
}(_react2.default.Component);
// 广发埋点


// 用户授权失败调用函数


// 登录弹框


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(PageSettingComPonent);