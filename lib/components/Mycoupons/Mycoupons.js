'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

require('./less/mycoupons.less');

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

var _reactCopyToClipboard = require('react-copy-to-clipboard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alert = _modal2.default.alert;

var Mycoupons = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(Mycoupons, _React$Component);

	function Mycoupons(props) {
		(0, _classCallCheck3.default)(this, Mycoupons);

		// 获取商户信息
		var _this = (0, _possibleConstructorReturn3.default)(this, (Mycoupons.__proto__ || (0, _getPrototypeOf2.default)(Mycoupons)).call(this, props));

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
				pageSize: 30,
				status: '1'
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

	(0, _createClass3.default)(Mycoupons, [{
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
			var GetUserCouponList = nextProps.coupons.GetUserCouponList;
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
			if (GetUserCouponList !== props.coupons.GetUserCouponList) {
				var _code = GetUserCouponList.code,
				    _data = GetUserCouponList.data,
				    _message = GetUserCouponList.message;

				if (_code === '1000') {
					if (_data && _data.list && _data.list[0]) {
						var _consignList;

						_data.list.map(function (v, i) {
							v.key = (_data.current - 1) * _data.pageSize + i;
						});
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

			var tabs = [{ title: '未使用', sub: '1' }, { title: '已使用', sub: '2' }, { title: '已过期', sub: '3' }];
			return _react2.default.createElement(
				'div',
				{ className: 'mycoupons-list clearfix' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					jump: function jump() {
						return _this3.props.history.push('/');
					},
					myLoading: !!this.props.loading.models.coupons // 判断loading
				})),
				_react2.default.createElement(
					'div',
					{ className: hasHead ? "list-con tabs-top" : "list-con" },
					_react2.default.createElement(_tabs2.default, { tabs: tabs,
						initialPage: postData.status,
						onChange: function onChange(tab, index) {
							postData.status = tab.sub;
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
	return Mycoupons;
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
			type: 'coupons/GetUserCouponList',
			payload: postData
		});
	};

	this.authorizationFailure = function () {
		var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
		userInfo.fuluToken = '';
		localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
		(0, _auth.isLoginOrAuth)(_this4);
	};

	this.toUrl = function (url) {
		_this4.props.history.push(url);
	};

	this.showDown = function (key) {
		var manageDataSource = _this4.state.manageDataSource;

		manageDataSource._dataBlob.s1[key].show = !manageDataSource._dataBlob.s1[key].show;
		_this4.setState({
			manageDataSource: manageDataSource
		});
	};

	this.onCopy = function (text, result, rowData) {
		if (result) {
			_toast2.default.success('券码复制成功，请在页面跳转后粘贴使用。');
			_this4.jumpTo(rowData);
		}
	};

	this.renderRow = function (rowData, sectionID, rowID) {
		return _react2.default.createElement(
			'div',
			{ className: 'order-line' },
			_react2.default.createElement(
				'div',
				{ className: rowData.status == 1 ? "item" : "item unStart" },
				rowData.type == 3 ? _react2.default.createElement(
					'div',
					{ className: 'left' },
					_react2.default.createElement(
						'span',
						{ className: 'l-txt' },
						'\u5151\u6362\u5238'
					)
				) : _react2.default.createElement(
					'div',
					{ className: 'left' },
					_react2.default.createElement(
						'small',
						null,
						'\uFFE5'
					),
					_react2.default.createElement(
						'strong',
						null,
						rowData.price
					),
					_react2.default.createElement(
						'p',
						null,
						rowData.content
					)
				),
				_react2.default.createElement('div', { className: 'line' }),
				_react2.default.createElement(
					'div',
					{ className: 'right' },
					_react2.default.createElement(
						'div',
						{ className: 'txt font-clamp' },
						rowData.name
					),
					_react2.default.createElement(
						'div',
						{ className: 'time font-clamp' },
						rowData.startActiveTime,
						' ~ ',
						rowData.endActiveTime
					),
					rowData.status == 1 ? rowData.type == 1 ? _react2.default.createElement(
						'button',
						{ className: 'get-btn btn-border', onClick: function onClick() {
								_this4.jumpTo(rowData);
							} },
						'\u53BB\u4F7F\u7528'
					) : _react2.default.createElement(
						_reactCopyToClipboard.CopyToClipboard,
						{
							text: rowData.couponCode,
							onCopy: function onCopy(text, result) {
								_this4.onCopy(text, result, rowData);
							}
						},
						_react2.default.createElement(
							'button',
							{ className: 'get-btn btn-border' },
							'\u53BB\u4F7F\u7528'
						)
					) : rowData.status == 2 ? _react2.default.createElement(
						'p',
						{ className: 'btn-txt' },
						'\u5DF2\u4F7F\u7528'
					) : _react2.default.createElement(
						'p',
						{ className: 'btn-txt' },
						'\u5DF2\u4F7F\u7528'
					),
					_react2.default.createElement(
						'div',
						{ className: 'use-down', onClick: function onClick() {
								_this4.showDown(rowData.key);
							} },
						'\u4F7F\u7528\u8BF4\u660E',
						_react2.default.createElement(_icon2.default, { type: 'down' })
					)
				)
			),
			!!rowData.show ? _react2.default.createElement(
				'div',
				{ className: rowData.status == 1 ? "down-bg" : "down-bg unStart" },
				rowData.instructions || '',
				_react2.default.createElement(
					'span',
					{ className: 'more', onClick: function onClick() {
							_this4.toUrl('/discription');
						} },
					'\u8BE6\u7EC6\u8BF4\u660E',
					_react2.default.createElement(_icon2.default, { type: 'right' })
				)
			) : ''
		);
	};

	this.onEndReached = function () {
		var _state3 = _this4.state,
		    postData = _state3.postData,
		    isSearchFinish = _state3.isSearchFinish,
		    isSearchAll = _state3.isSearchAll;

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

	this.jumpTo = function (v) {
		if (v.jumpType == 1) {
			_this4.toUrl('/');
		} else if (v.jumpType == 2) {
			_this4.toUrl('/couponPage?cardId=' + v.couponCode + '&reachedAmount=' + v.fullPrice + '&reduceAmount=' + v.price);
		} else if (v.jumpType == 3) {
			window.location.href = '/detail?gid=' + v.proClassId + (v.productId ? '&pid=' + v.productId : '');
		} else if (v.jumpType == 4) {
			// 1满减 2折扣 3兑换
			if (v.type == 3) {
				setTimeout(function () {
					window.location.href = v.jumpUrl;
				}, 1000);
			} else {
				window.location.href = v.jumpUrl;
			}
		}
	};
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(Mycoupons);