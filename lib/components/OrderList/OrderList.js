'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _tabs = require('antd-mobile/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

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

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/icon/style');

require('antd-mobile/lib/tabs/style');

require('antd-mobile/lib/toast/style');

require('antd-mobile/lib/list-view/style');

require('antd-mobile/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icon2 = require('../Icon');

var _Icon3 = _interopRequireDefault(_Icon2);

require('./less/orderList.less');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = _modal2.default.alert;

var OrderList = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(OrderList, _React$Component);

    function OrderList(props) {
        (0, _classCallCheck3.default)(this, OrderList);

        // 获取商户信息
        var _this = (0, _possibleConstructorReturn3.default)(this, (OrderList.__proto__ || (0, _getPrototypeOf2.default)(OrderList)).call(this, props));

        _initialiseProps.call(_this);

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            }
        });
        _this.consignList = [];
        _this.state = {
            manageDataSource: dataSource.cloneWithRows([]),
            isSearchFinish: false, // 判断当前请求是否完成
            isLoadScroll: false,
            isSearchAll: false,
            dataSource: [],
            total: -1,
            postData: {
                pageIndex: 1,
                pageSize: 10,
                orderStatus: '0'
            },
            userInfo: userInfo,
            showModal: false,
            SaleType: 11,
            lineDetail: {},
            shopInfo: shopInfo,
            showMallLoginModal: false,
            showLoginPageModal: false
        };
        return _this;
    }

    (0, _createClass3.default)(OrderList, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _state = this.state,
                hasHead = _state.hasHead,
                shopInfo = _state.shopInfo;

            if (shopInfo.codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
                if (window.terminal.appVersion && configs.chinaBankVision) {
                    var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision);
                    if (bankVision === -1) {
                        hasHead = true;
                    } else {
                        hasHead = false;
                    }
                } else {
                    hasHead = false;
                }
            } else {
                hasHead = false;
            }
            this.setState({
                hasHead: hasHead
            });
            // 判断模式和授权
            var yes = (0, _auth.isLoginOrAuth)(this);
            // 如果从来没有登录
            if (yes) {
                this.init();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var props = this.props;
            var getOrderList = nextProps.orderList.getOrderList;
            var fuluusertoken = nextProps.login.fuluusertoken;

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
            if (getOrderList !== props.orderList.getOrderList) {
                var _code = getOrderList.code,
                    _data = getOrderList.data,
                    _message = getOrderList.message;

                if (_code === '1000') {
                    if (_data && _data.list) {
                        var _consignList;

                        (_consignList = this.consignList).push.apply(_consignList, (0, _toConsumableArray3.default)(_data.list));
                        if (_data.current >= _data.pageTotal) {
                            this.setState({
                                isSearchAll: true
                            });
                        }
                        this.setState({
                            dataSource: [].concat((0, _toConsumableArray3.default)(this.consignList)),
                            total: _data.total,
                            isSearchFinish: true,
                            isLoadScroll: false
                        }, function () {
                            _this2.setState({
                                manageDataSource: _this2.state.manageDataSource.cloneWithRows(_this2.state.dataSource)
                            });
                        });
                    } else {
                        this.setState({
                            dataSource: [],
                            total: 0,
                            isSearchFinish: true,
                            isLoadScroll: false
                        });
                    }
                } else if (_code === '-3' || _code === '1013' || _code === '1014' || _code === '1015') {
                    // 授权失效
                    this.authorizationFailure();
                } else {
                    _toast2.default.info(_message);
                }
            }
        }
        // 授权失效

    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state2 = this.state,
                manageDataSource = _state2.manageDataSource,
                total = _state2.total,
                postData = _state2.postData,
                showModal = _state2.showModal,
                isSearchAll = _state2.isSearchAll,
                SaleType = _state2.SaleType,
                hasHead = _state2.hasHead,
                showMallLoginModal = _state2.showMallLoginModal,
                showLoginPageModal = _state2.showLoginPageModal;

            var tabs = [{ title: '全部', sub: '0' }, { title: '待付款', sub: '1' }, { title: '充值成功', sub: '2' }, { title: '充值失败', sub: '3' }];
            return _react2.default.createElement(
                'div',
                { className: 'order-list clearfix' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    jump: function jump() {
                        return _this3.props.history.push('/');
                    },
                    myLoading: !!this.props.loading.models.orderList // 判断loading
                })),
                _react2.default.createElement(
                    'div',
                    { className: hasHead ? "list-con tabs-top" : "list-con" },
                    _react2.default.createElement(_tabs2.default, { tabs: tabs,
                        initialPage: postData.orderStatus,
                        onChange: function onChange(tab, index) {
                            postData.orderStatus = tab.sub;
                            postData.pageIndex = 1;
                            _this3.consignList = [];
                            _this3.setState({
                                postData: postData
                            }, function () {
                                _this3.init();
                            });
                        }
                    }),
                    total === 0 ? _react2.default.createElement(
                        'div',
                        { className: 'noting' },
                        _react2.default.createElement('span', null),
                        '\u6682\u65E0\u6570\u636E'
                    ) : _react2.default.createElement(_listView2.default, {
                        className: 'list-view',
                        dataSource: manageDataSource,
                        renderRow: this.renderRow,
                        initialListSize: postData.pageSize,
                        pageSize: postData.pageSize,
                        onEndReachedThreshold: 10,
                        onEndReached: this.onEndReached,
                        renderFooter: isSearchAll && function () {
                            return _react2.default.createElement(
                                'div',
                                { className: 'no-more' },
                                '--\u6211\u662F\u6709\u5E95\u7EBF\u7684--'
                            );
                        }
                    })
                ),
                showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal }),
                showLoginPageModal && _react2.default.createElement(_LoginPageModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
            );
        }
    }]);
    return OrderList;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
    var _this4 = this;

    this.loginSuccess = function (data) {
        _this4.hideLoginModal();
        _this4.setState({
            userInfo: data
        }, function () {
            _this4.init();
        });
    };

    this.init = function () {
        var postData = _this4.state.postData;

        _this4.props.dispatch({
            type: 'orderList/getOrderList',
            payload: postData
        });
    };

    this.authorizationFailure = function () {
        var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        userInfo.fuluToken = '';
        localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
        (0, _auth.isLoginOrAuth)(_this4);
    };

    this.toDetail = function (oid) {
        _this4.props.history.push('/orderDetail?oid=' + oid);
    };

    this.getSecretCrad = function (v) {
        _this4.props.history.push('/secretCard?oid=' + v.orderNo + '&pid=' + v.productId + '&mid=' + v.childCategoryId);
    };

    this.getOtherOrder = function (cid, pid) {
        _this4.props.history.push('/detail?gid=' + cid + '&pid=' + pid);
    };

    this.showModal = function (type, v) {
        _this4.setState((0, _defineProperty3.default)({}, type, true));
        if (v) {
            _this4.setState({
                lineDetail: v
            });
        }
    };

    this.hideModal = function (type) {
        _this4.setState((0, _defineProperty3.default)({}, type, false));
    };

    this.payAgain = function (v) {
        // 计算订单时间  如果订单生成时间大于15分钟  就跳转订单列表页
        var now = (0, _moment2.default)((0, _moment2.default)().format()).valueOf(); // 当前时间
        var oTime = (0, _moment2.default)(v.orderTime).valueOf(); // 订单时间
        var time = _mathManage2.default.accDiv(_mathManage2.default.Subtr(now, oTime), 1000).toFixed(0);
        if (time > 1500) {
            _toast2.default.info('订单已失效！');
            _this4.setState({
                dataSource: [],
                total: 0,
                isSearchFinish: true,
                isLoadScroll: false
            }, function () {
                _this4.init();
            });
            return;
        } else {
            var _state3 = _this4.state,
                userInfo = _state3.userInfo,
                shopInfo = _state3.shopInfo;

            window.location.href = configs.commonUrl + '/orderSure?oid=' + v.orderNo + '&codeKey=' + shopInfo.codeKey + '&fuluToken=' + userInfo.fuluToken + '&fuluId=' + userInfo.fuluId;
        }
    };

    this.toDelete = function (oid) {
        var that = _this4;
        alert('提示', '您确定要删除该订单信息？', [{ text: '取消', onPress: function onPress() {
                return console.log('取消');
            } }, {
            text: '确定', onPress: function onPress() {
                return that.props.dispatch({
                    type: 'orderList/deleteOrder',
                    payload: {
                        orderId: oid
                    }
                });
            }
        }]);
    };

    this.renderRow = function (rowData, sectionID, rowID) {
        return _react2.default.createElement(
            'div',
            { className: 'order-line' },
            _react2.default.createElement(
                'div',
                { className: 'o-top' },
                _react2.default.createElement(
                    'span',
                    { className: 'time' },
                    rowData.orderTime
                ),
                _react2.default.createElement(
                    'span',
                    { className: rowData.orderStatus === 51 || rowData.orderStatus === 71 ? "o-status greenfont" : rowData.orderStatus === 61 ? 'o-status redfont' : rowData.orderStatus === 11 ? 'o-status orangefont' : 'o-status' },
                    rowData.orderStatusText
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'o-info', onClick: function onClick() {
                        _this4.toDetail(rowData.orderNo);
                    } },
                _react2.default.createElement('img', { src: rowData.productImg, className: 'logo' }),
                _react2.default.createElement(
                    'span',
                    { className: 'order-info' },
                    _react2.default.createElement(
                        'span',
                        { className: 'name' },
                        rowData.productName
                    ),
                    _react2.default.createElement(
                        'span',
                        { className: 'price' },
                        '\u5171\u652F\u4ED8\uFF1A',
                        _react2.default.createElement(
                            'span',
                            { className: 'redfont' },
                            '\xA5',
                            rowData.payPrice
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'right' },
                    'x',
                    rowData.buyNum,
                    _react2.default.createElement(_icon2.default, { type: 'right' })
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'o-btn' },
                (rowData.orderStatus === 51 || rowData.orderStatus === 71) && _react2.default.createElement(
                    'button',
                    { className: 'btn', onClick: function onClick() {
                            return _this4.getOtherOrder(rowData.childCategoryId, rowData.productId);
                        } },
                    '\u518D\u6765\u4E00\u5355'
                ),
                rowData.productType === 3 && rowData.orderStatus === 51 && _react2.default.createElement(
                    'button',
                    { className: 'btn btn-theme', onClick: function onClick() {
                            return _this4.getSecretCrad(rowData);
                        } },
                    '\u63D0\u53D6\u5361\u5BC6'
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'btn', onClick: function onClick() {
                            _this4.toDetail(rowData.orderNo);
                        } },
                    '\u67E5\u770B\u8BE6\u60C5'
                ),
                rowData.orderStatus === 11 && _react2.default.createElement(
                    'button',
                    { className: 'btn btn-theme', onClick: function onClick() {
                            _this4.payAgain(rowData);
                        } },
                    '\u53BB\u652F\u4ED8'
                )
            )
        );
    };

    this.onEndReached = function () {
        var _state4 = _this4.state,
            postData = _state4.postData,
            isSearchFinish = _state4.isSearchFinish,
            isSearchAll = _state4.isSearchAll;

        _this4.setState({ isLoadScroll: true });
        // 当前请求完成，才去请求下一页
        if (isSearchFinish && !isSearchAll) {
            postData.pageIndex++;
            _this4.setState({ postData: postData }, function () {
                _this4.init();
            });
        }
    };

    this.changeVal = function (type, val) {
        _this4.setState((0, _defineProperty3.default)({}, type, val));
    };

    this.hideLoginModal = function () {
        _this4.setState({
            showMallLoginModal: false,
            showLoginPageModal: false
        });
    };
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(OrderList);