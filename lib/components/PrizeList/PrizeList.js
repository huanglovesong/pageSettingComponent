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

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

require('./less/prizelist.less');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _filedIcon = require('./images/filed-icon.png');

var _filedIcon2 = _interopRequireDefault(_filedIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = _modal2.default.alert;

var PrizeList = (_temp = _class = function (_React$Component) {
    (0, _inherits3.default)(PrizeList, _React$Component);

    function PrizeList(props) {
        (0, _classCallCheck3.default)(this, PrizeList);

        // 获取商户信息
        var _this = (0, _possibleConstructorReturn3.default)(this, (PrizeList.__proto__ || (0, _getPrototypeOf2.default)(PrizeList)).call(this, props));

        _initialiseProps.call(_this);

        var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
        var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
        var eventId = localStorage.getItem('eventId');
        var dataSource = new _listView2.default.DataSource({
            rowHasChanged: function rowHasChanged(row1, row2) {
                return row1 !== row2;
            }
        });
        _this.consignList = [];
        _this.state = {
            eventId: eventId === 'null' ? null : eventId,
            manageDataSource: dataSource.cloneWithRows([]),
            isSearchFinish: false, // 判断当前请求是否完成
            isLoadScroll: false,
            isSearchAll: false,
            dataSource: [],
            total: -1,
            postData: {
                pageIndex: 1,
                pageSize: 10
            },
            userInfo: userInfo,
            showModal: false,
            SaleType: 11,
            lineDetail: {},
            shopInfo: shopInfo,
            showMallLoginModal: false,
            loading: false
        };
        return _this;
    }

    (0, _createClass3.default)(PrizeList, [{
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
            // // 判断模式和授权
            var yes = (0, _auth.isLoginOrAuth)(this);
            // 如果从来没有登录
            if (yes) {
                this.init();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            new _clipboard2.default('.prize-btn');
            _czc.push(["_setAutoPageview", false]);
            _czc.push(["_trackPageview", '/prizelist']);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this2 = this;

            var props = this.props;
            var fuluusertoken = nextProps.login.fuluusertoken;
            var prizeResultRes = nextProps.prize.prizeResultRes;

            if (prizeResultRes !== props.prize.prizeResultRes) {
                var code = prizeResultRes.code,
                    data = prizeResultRes.data,
                    message = prizeResultRes.message;

                if (code === '0') {
                    if (data && data.list) {
                        var _consignList;

                        data.list.map(function (item, index) {
                            if (item.verificationDateEnd) {
                                item.timeout = (0, _moment2.default)(item.verificationDateEnd).valueOf() < (0, _moment2.default)((0, _moment2.default)().format()).valueOf();
                            }
                        });
                        (_consignList = this.consignList).push.apply(_consignList, (0, _toConsumableArray3.default)(data.list));
                        if (data.current >= data.pageTotal) {
                            this.setState({
                                isSearchAll: true
                            });
                        }
                        this.setState({
                            dataSource: [].concat((0, _toConsumableArray3.default)(this.consignList)),
                            total: data.total,
                            isSearchFinish: true,
                            isLoadScroll: false,
                            loading: false
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
                            isLoadScroll: false,
                            loading: false
                        });
                    }
                } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                    var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
                    userInfo.fuluToken = '';
                    localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
                    (0, _auth.isLoginOrAuth)(this);
                }
            }
            if (fuluusertoken !== props.login.fuluusertoken) {
                var _code = fuluusertoken.code,
                    _data = fuluusertoken.data,
                    _message = fuluusertoken.message;

                if (_code === '1000') {
                    localStorage.setItem('userInfo', (0, _stringify2.default)(_data));
                    this.loginSuccess(_data);
                } else {
                    _toast2.default.fail(_message);
                }
            }
        }
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
                loading = _state2.loading;

            var tabs = [{ title: '全部', sub: '0' }, { title: '待付款', sub: '1' }, { title: '充值成功', sub: '2' }, { title: '充值失败', sub: '3' }];
            return _react2.default.createElement(
                'div',
                { className: 'prizelist' },
                _react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
                    jump: function jump() {
                        return _this3.props.history.push('/');
                    },
                    myLoading: loading // 判断loading
                })),
                _react2.default.createElement(
                    'div',
                    { className: hasHead ? "list-con tabs-top" : "list-con" },
                    total === 0 ? _react2.default.createElement(
                        'div',
                        { className: 'noting' },
                        _react2.default.createElement('span', null),
                        '\u8FD8\u6CA1\u6709\u4E2D\u5956\u54E6\uFF5E'
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
                showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
            );
        }
    }]);
    return PrizeList;
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
        _this4.setState({
            loading: true
        });
        _this4.props.dispatch({
            type: 'prize/prizeResult', payload: (0, _extends3.default)({
                userId: _this4.state.userInfo.fuluId,
                eventId: _this4.state.eventId || configs.eventId
            }, _this4.state.postData)
        });
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
        _toast2.default.show('稍后会有客服人员联系您，请保持手机畅通。');
    };

    this.renderRow = function (rowData, sectionID, rowID) {
        return _react2.default.createElement(
            'div',
            { className: 'prize-line', key: rowID },
            _react2.default.createElement(
                'div',
                { className: 'prize-title' },
                rowData.prizeName
            ),
            rowData.verificationDateEnd && rowData.isUse !== 1 && _react2.default.createElement(
                'div',
                { className: 'prize-time' },
                (0, _moment2.default)(rowData.verificationDateEnd).format('YYYY.MM.DD'),
                '\u8FC7\u671F'
            ),
            _react2.default.createElement(
                'div',
                { className: 'prize-body' },
                _react2.default.createElement(
                    'div',
                    { className: 'prize-img' },
                    _react2.default.createElement('img', { src: rowData.prizeType === 4 ? _filedIcon2.default : rowData.prizeImageUrl })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'prize-txt' },
                    _react2.default.createElement(
                        'h2',
                        null,
                        rowData.prizeName
                    )
                ),
                rowData.prizeType === 5 ? _react2.default.createElement(
                    'div',
                    { onClick: function onClick() {
                            _this4.entityexchange();
                        }, className: 'prize-btn' },
                    '\u7ACB\u5373\u5151\u6362'
                ) : rowData.prizeType !== 4 && rowData.isUse !== 1 && (rowData.timeout ? _react2.default.createElement(
                    'div',
                    { className: 'prize-btn-timeout' },
                    '\u5DF2\u8FC7\u671F'
                ) : _react2.default.createElement(
                    'div',
                    { onClick: function onClick() {
                            _this4.exchange(rowData.exchangeUrl, rowData.cards, rowData.batchType);
                        }, 'data-clipboard-text': rowData.cards, className: 'prize-btn' },
                    '\u7ACB\u5373\u5151\u6362'
                ))
            ),
            rowData.isUse == 1 && _react2.default.createElement('div', { className: 'exchanged' })
        );
    };

    this.onEndReached = function () {
        var _state3 = _this4.state,
            postData = _state3.postData,
            isSearchFinish = _state3.isSearchFinish,
            isSearchAll = _state3.isSearchAll;
        //this.setState({ isLoadScroll: true });
        // 当前请求完成，才去请求下一页

        if (isSearchFinish && !isSearchAll) {
            postData.pageIndex++;
            _this4.setState({ postData: postData }, function () {
                _this4.init();
            });
        }
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
            showMallLoginModal: false
        });
    };
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(PrizeList);