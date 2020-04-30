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

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _auth = require('../../utils/auth');

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

require('./less/coupons.less');

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var xInteval = null;
var Coupons = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(Coupons, _React$Component);

	function Coupons(props) {
		(0, _classCallCheck3.default)(this, Coupons);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Coupons.__proto__ || (0, _getPrototypeOf2.default)(Coupons)).call(this, props));

		_initialiseProps.call(_this2);

		var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
		var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		var url = (0, _urlParse2.default)(props.location.search, true);
		var couponId = url.query.couponId; // 获取二级分类id// 获取商户信息 

		_this2.state = {
			userInfo: userInfo,
			shopInfo: shopInfo,
			couponId: couponId,
			activeInfo: {}
		};
		return _this2;
	}

	(0, _createClass3.default)(Coupons, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.cardActivityOvered();
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this3 = this;

			var props = this.props;
			var getBanner = nextProps.home.getBanner,
			    _nextProps$coupons = nextProps.coupons,
			    ObtainCard = _nextProps$coupons.ObtainCard,
			    CardActivityOvered = _nextProps$coupons.CardActivityOvered;
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
			if (ObtainCard !== props.coupons.ObtainCard) {
				var _code = ObtainCard.code,
				    _data = ObtainCard.data,
				    _message = ObtainCard.message;

				if (_code === '1000') {
					_toast2.default.info('领取成功', 2);
					var _this = this;
					setTimeout(function () {
						_this.jumpTo(_data);
					}, 1500);
				} else if (_code === '-3' || _code === '1013' || _code === '1014' || _code === '1015') {
					this.setState({
						clickCoupon: true
					}, function () {
						(0, _auth.isLoginOrAuth)(_this3);
					});
				} else {
					_toast2.default.info(_message);
				}
			}
			if (CardActivityOvered !== props.coupons.CardActivityOvered) {
				var _code2 = CardActivityOvered.code,
				    _data2 = CardActivityOvered.data,
				    _message2 = CardActivityOvered.message;

				if (_code2 === '1000') {
					this.setState({
						activeInfo: _data2
					}, function () {
						var activeInfo = _this3.state.activeInfo;
						// 倒计时

						var time = (0, _moment2.default)(activeInfo.startCouponTime).format('X') - (0, _moment2.default)().format('X');
						_this3.settime(time);
					});
				} else {
					_toast2.default.info(_message2);
				}
			}
		}
		// 登录成功调用

	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.clearDetailTimeInterval();
		}
	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state = this.state,
			    shopInfo = _state.shopInfo,
			    showMallLoginModal = _state.showMallLoginModal,
			    showLoginPageModal = _state.showLoginPageModal,
			    activeInfo = _state.activeInfo,
			    startTime = _state.startTime;

			return _react2.default.createElement(
				'div',
				{ className: 'coupons-bg' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					jump: function jump() {
						_this4.props.history.goBack();
					}
				})),
				_react2.default.createElement(
					'div',
					{ className: 'main-bg' },
					_react2.default.createElement(
						'div',
						{ className: 'head-bg' },
						_react2.default.createElement('div', { className: 'img' }),
						_react2.default.createElement(
							'h3',
							null,
							shopInfo.merInfoTemplates.infoTitle
						),
						_react2.default.createElement(
							'p',
							{ className: 'text' },
							'\u9001\u60A8\u4E00\u5F20\u4F18\u60E0\u5238'
						),
						activeInfo.status == 1 ? _react2.default.createElement(
							'div',
							{ className: 's-time' },
							'\u6D3B\u52A8\u5373\u5C06\u5F00\u59CB\uFF0C\u5012\u8BA1\u65F6\uFF1A',
							_react2.default.createElement(
								'span',
								{ className: 'redfont' },
								startTime ? startTime : '00:00:00'
							)
						) : '',
						_react2.default.createElement(
							'div',
							{ className: 'item' },
							_react2.default.createElement(
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
									activeInfo.price
								),
								_react2.default.createElement(
									'p',
									null,
									activeInfo.content
								)
							),
							_react2.default.createElement('div', { className: 'line' }),
							_react2.default.createElement(
								'div',
								{ className: 'right' },
								_react2.default.createElement(
									'div',
									{ className: 'txt font-clamp' },
									activeInfo.name
								),
								_react2.default.createElement(
									'div',
									{ className: 'time font-clamp' },
									activeInfo.instructions
								),
								_react2.default.createElement(
									'div',
									{ className: 'use-down font-clamp' },
									activeInfo.startCouponTime,
									' ~ ',
									activeInfo.endCouponTime
								)
							)
						),
						activeInfo.status != 2 ? _react2.default.createElement(
							'div',
							{ className: 'get-coupons disabled' },
							activeInfo.status == 1 ? '抱歉，未到领取时间' : '活动已结束'
						) : _react2.default.createElement(
							'button',
							{ className: 'get-coupons', onClick: this.getCoupon },
							'\u70B9\u51FB\u9886\u53D6\u4F18\u60E0\u5238'
						)
					)
				),
				activeInfo.status != 2 ? _react2.default.createElement(
					'div',
					{ className: 'banner-bg' },
					_react2.default.createElement(
						'h2',
						null,
						'\u5176\u4ED6\u6D3B\u52A8'
					),
					_react2.default.createElement('div', { className: 'img-bg', onClick: function onClick() {
							_this4.props.history.push('/');
						} })
				) : '',
				showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal }),
				showLoginPageModal && _react2.default.createElement(_LoginPageModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
			);
		}
	}]);
	return Coupons;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this5 = this;

	this.cardActivityOvered = function () {
		var couponId = _this5.state.couponId;

		_this5.props.dispatch({
			type: 'coupons/CardActivityOvered',
			payload: {
				merCouponActivityId: couponId
			}
		});
	};

	this.clearDetailTimeInterval = function () {
		if (xInteval) {
			clearInterval(xInteval);
			xInteval = null;
		}
	};

	this.settime = function (time) {
		_this5.setState({
			countNum: time
		}, function () {
			_this5.clearDetailTimeInterval();
			var that = _this5;
			xInteval = setInterval(function () {
				var countNum = that.state.countNum;

				countNum -= 1;
				if (countNum === 0) {
					that.clearDetailTimeInterval();
					that.cardActivityOvered();
				}
				if (countNum > 0) {
					that.setState({
						countNum: countNum,
						startTime: _mathManage2.default.secondToDate(countNum)
					});
				}
			}, 1000);
		});
	};

	this.loginSuccess = function (data) {
		_this5.hideLoginModal();
		_this5.setState({
			userInfo: data
		});
		if (_this5.state.clickCoupon) {
			_this5.getCouponFn();
		}
	};

	this.hideLoginModal = function () {
		_this5.setState({
			showMallLoginModal: false,
			showLoginPageModal: false
		});
	};

	this.toLogin = function () {
		_this5.setState({
			clickCoupon: false
		}, function () {
			(0, _auth.isLoginOrAuth)(_this5);
		});
	};

	this.getCoupon = function () {
		var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';
		if (userInfo && userInfo.fuluToken) {
			_this5.getCouponFn();
		} else {
			_this5.setState({
				clickCoupon: true
			}, function () {
				(0, _auth.isLoginOrAuth)(_this5);
			});
		}
	};

	this.getCouponFn = function () {
		var couponId = _this5.state.couponId;

		_this5.props.dispatch({
			type: 'coupons/ObtainCard',
			payload: {
				merCouponActivityId: couponId
			}
		});
	};

	this.jumpTo = function (data) {
		var activeInfo = _this5.state.activeInfo;

		if (activeInfo.jumpType == 1) {
			_this5.toUrl('/');
		} else if (activeInfo.jumpType == 2) {
			_this5.toUrl('/couponPage?cardId=' + data.card + '&reachedAmount=' + data.discountsInfo.reachedAmount + '&reduceAmount=' + data.discountsInfo.reduceAmount);
		} else if (activeInfo.jumpType == 3) {
			window.location.href = '/detail?gid=' + activeInfo.proClassId + (activeInfo.productId ? '&pid=' + activeInfo.productId : '');
		} else if (activeInfo.jumpType == 4) {
			window.location.href = activeInfo.jumpUrl;
		}
	};

	this.toUrl = function (url) {
		_this5.props.history.push(url);
	};
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};
exports.default = (0, _dva.connect)(mapStateToProps)(Coupons);