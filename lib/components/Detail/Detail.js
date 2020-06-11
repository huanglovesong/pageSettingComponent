'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _wingBlank = require('antd-mobile/lib/wing-blank');

var _wingBlank2 = _interopRequireDefault(_wingBlank);

var _picker = require('antd-mobile/lib/picker');

var _picker2 = _interopRequireDefault(_picker);

var _list = require('antd-mobile/lib/list');

var _list2 = _interopRequireDefault(_list);

var _inputItem = require('antd-mobile/lib/input-item');

var _inputItem2 = _interopRequireDefault(_inputItem);

var _icon = require('antd-mobile/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

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

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _class, _temp, _initialiseProps;

require('antd-mobile/lib/wing-blank/style');

require('antd-mobile/lib/picker/style');

require('antd-mobile/lib/list/style');

require('antd-mobile/lib/input-item/style');

require('antd-mobile/lib/icon/style');

require('antd-mobile/lib/toast/style');

require('antd-mobile/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon2 = require('../Icon');

var _Icon3 = _interopRequireDefault(_Icon2);

var _rcForm = require('rc-form');

var _auth = require('../../utils/auth');

var _TemplateModal = require('../TemplateModal');

var _TemplateModal2 = _interopRequireDefault(_TemplateModal);

var _MallLoginModal = require('../LoginModal/MallLoginModal');

var _MallLoginModal2 = _interopRequireDefault(_MallLoginModal);

var _LoginPageModal = require('../LoginModal/LoginPageModal');

var _LoginPageModal2 = _interopRequireDefault(_LoginPageModal);

var _router = require('dva/router');

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

require('./less/detail.less');

var _mathManage = require('../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prompt = _modal2.default.prompt;

var Detail = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(Detail, _React$Component);

	function Detail(props) {
		(0, _classCallCheck3.default)(this, Detail);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Detail.__proto__ || (0, _getPrototypeOf2.default)(Detail)).call(this, props));

		_initialiseProps.call(_this);

		var url = (0, _urlParse2.default)(props.location.search, true);
		var _url$query = url.query,
		    gid = _url$query.gid,
		    pid = _url$query.pid; // 获取二级分类id// 获取商户信息 

		var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
		var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		_this.state = {
			gid: gid,
			pid: pid,
			typeDetail: {},
			ChargeNum: '1',
			goodsDetail: {},
			hasError: false,
			postData: {
				childCategoryId: gid
			},
			shopInfo: shopInfo,
			extractCode: '',
			userInfo: userInfo,
			passCodeStatus: {},
			showMallLoginModal: false,
			// showLoginPageModal: false,
			formData: {},
			showquanList: false
		}, _this.xInteval = null;
		return _this;
	}

	(0, _createClass3.default)(Detail, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			scrollTo(0, 0);
			var payment = this.isAlipayOrWechat();
			this.setState({
				payment: payment
			}, function () {
				_this2.init();
			});
			document.addEventListener("visibilitychange", function () {
				if (document.hidden) {
					_this2.setState({
						windowShow: false
					});
				} else {
					_this2.setState({
						windowShow: true
					}, function () {
						var windowShow = _this2.state.windowShow;

						if (windowShow) {
							// 页面呼出
							_this2.init();
						}
					});
				}
			});
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this3 = this;

			var props = this.props;
			var _nextProps$detail = nextProps.detail,
			    getGoodsList = _nextProps$detail.getGoodsList,
			    sendCardOrder = _nextProps$detail.sendCardOrder,
			    sendOrder = _nextProps$detail.sendOrder,
			    GetPassCodeStatus = _nextProps$detail.GetPassCodeStatus,
			    GetPassCode = _nextProps$detail.GetPassCode,
			    _nextProps$coupons = nextProps.coupons,
			    GetProInfoDetailCouponList = _nextProps$coupons.GetProInfoDetailCouponList,
			    ObtainCard = _nextProps$coupons.ObtainCard;
			var _state = this.state,
			    pid = _state.pid,
			    userInfo = _state.userInfo,
			    shopInfo = _state.shopInfo;
			var fuluusertoken = nextProps.login.fuluusertoken;

			if (nextProps.detail.focusInputGuid !== props.detail.focusInputGuid) {
				console.log('进入详情组件');
				document.getElementById('charge-input') && document.getElementById('charge-input').focus();
			}
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
					setTimeout(function () {
						_this3.getCoupothis();
					}, 300);
					this.setState({
						getQuan: false
					});
					_toast2.default.info('领取成功');
				} else if (_code === '-3' || _code === '1013' || _code === '1014' || _code === '1015') {
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(_message);
				}
			}
			if (getGoodsList !== props.detail.getGoodsList) {
				var _code2 = getGoodsList.code,
				    _data2 = getGoodsList.data,
				    _message2 = getGoodsList.message;

				if (_code2 === '1000') {
					var obj = {};
					_data2.productList && _data2.productList[0] && _data2.productList.map(function (v, i) {
						v.active = false;
						if (!pid) {
							// 默认第一个商品选中
							if (i === 0) {
								v.active = true;
								obj = v;
							}
						} else {
							if (pid === v.productId) {
								v.active = true;
								obj = v;
							}
						}
					});
					this.setState({
						typeDetail: _data2,
						goodsDetail: obj
					}, function () {
						if (obj.startSecound) {
							_this3.settime(obj.startSecound, 'startSecound', 0); // 
						}
						if (obj.surplusTime) {
							_this3.settime(obj.surplusTime, 'surplusTime', 1); // 
						}
						if (obj.isActivity) {
							// 如果已经登录，就直接获取资格
							_this3.getPassCodeStatus();
						}
						// 获取优惠券
						_this3.getCoupothis();
					});
				} else if (_code2 === '-1') {
					_toast2.default.info('商品不存在');
					this.props.history.push('/');
				} else {
					_toast2.default.info(_message2);
				}
			}
			// 直充
			if (sendOrder !== props.detail.sendOrder) {
				var _code3 = sendOrder.code,
				    _data3 = sendOrder.data;

				if (_code3 === '1000') {
					// 成功跳转
					window.location.href = configs.commonUrl + '/orderSure?oid=' + _data3 + '&codeKey=' + shopInfo.codeKey + '&fuluToken=' + userInfo.fuluToken + '&fuluId=' + userInfo.fuluId;
				} else if (_code3 === '-3' || _code3 === '1013' || _code3 === '1014' || _code3 === '1015') {
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(sendOrder.message);
				}
			}
			// 卡密
			if (sendCardOrder !== props.detail.sendCardOrder) {
				var _code4 = sendCardOrder.code,
				    _data4 = sendCardOrder.data;

				if (_code4 === '1000') {
					// 成功跳转到
					window.location.href = configs.commonUrl + '/orderSure?oid=' + _data4 + '&codeKey=' + shopInfo.codeKey + '&fuluToken=' + userInfo.fuluToken + '&fuluId=' + userInfo.fuluId;
				} else if (_code4 === '-3' || _code4 === '1013' || _code4 === '1014' || _code4 === '1015') {
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(sendCardOrder.message);
				}
			}
			if (GetPassCodeStatus !== props.detail.GetPassCodeStatus) {
				var _code5 = GetPassCodeStatus.code,
				    _data5 = GetPassCodeStatus.data;

				if (_code5 === '1000') {
					this.setState({
						isLoading: false,
						passCodeStatus: _data5
					});
				} else if (_code5 === '-3' || _code5 === '1013' || _code5 === '1014' || _code5 === '1015') {
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(GetPassCodeStatus.message);
				}
			}
			if (GetPassCode !== props.detail.GetPassCode) {
				var _code6 = GetPassCode.code,
				    _data6 = GetPassCode.data;

				_code6 = '1000';
				if (_code6 === '1000') {
					_toast2.default.success('恭喜您，已获得活动名额');
					console.log(333444);
					this.setState({
						isLoading: false,
						passCodeStatus: {
							orderNo: '',
							userPassCodeStatus: 4
						}
					}, function () {
						setTimeout(function () {
							console.log(222);
							_this3.props.dispatch({ type: 'detail/commonDispatch', payload: { focusInputGuid: Math.random() } });
						}, 1000);
					});
				} else if (_code6 === '-3' || _code6 === '1013' || _code6 === '1014' || _code6 === '1015') {
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(GetPassCode.message);
				}
			}
			if (GetProInfoDetailCouponList !== props.coupons.GetProInfoDetailCouponList) {
				var _code7 = GetProInfoDetailCouponList.code,
				    _data7 = GetProInfoDetailCouponList.data,
				    _message3 = GetProInfoDetailCouponList.message;

				if (_code7 === '1000') {
					this.setState({
						couponList: _data7.list,
						getQuanList: false
					});
				} else if (_code7 === '-3' || _code7 === '1013' || _code7 === '1014' || _code7 === '1015') {
					this.setState({
						getQuanList: true
					});
					// 授权失效
					this.authorizationFailure();
				} else {
					_toast2.default.info(sendOrder.message);
				}
			}
		}
		// 授权失效

	}, {
		key: 'render',
		value: function render() {
			var _this4 = this;

			var _state2 = this.state,
			    typeDetail = _state2.typeDetail,
			    ChargeNum = _state2.ChargeNum,
			    goodsDetail = _state2.goodsDetail,
			    hasError = _state2.hasError,
			    extractCode = _state2.extractCode,
			    couponList = _state2.couponList,
			    passCodeStatus = _state2.passCodeStatus,
			    isLoading = _state2.isLoading,
			    showquanList = _state2.showquanList,
			    startSecound = _state2.startSecound,
			    surplusTime = _state2.surplusTime,
			    showMallLoginModal = _state2.showMallLoginModal,
			    chinaBankModal = _state2.chinaBankModal,
			    shopInfo = _state2.shopInfo;
			var getFieldProps = this.props.form.getFieldProps;

			var arrNum = [];
			for (var i = 1; i <= 100; i++) {
				if (i <= goodsDetail.singlePurchaseLimit) {
					arrNum.push({
						label: i.toString(),
						value: i.toString()
					});
				}
			}
			return _react2.default.createElement(
				'div',
				{ className: 'detail-bg' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					title: '\u5145\u503C\u4E2D\u5FC3',
					myLoading: !!this.props.loading.models.detail // 判断loading
				})),
				_react2.default.createElement(
					'div',
					{ className: 'detail-con' },
					_react2.default.createElement(
						'div',
						{ className: 'goods-info-bg' },
						goodsDetail.productImage ? _react2.default.createElement('img', { src: goodsDetail.productImage, className: 'goods-img' }) : _react2.default.createElement('div', { className: 'img-bg' }),
						goodsDetail.isActivity ? _react2.default.createElement(
							'div',
							{ className: 'active-info timelimit' },
							_react2.default.createElement(
								'div',
								{ className: 'left' },
								_react2.default.createElement(
									'div',
									{ className: 'price' },
									_react2.default.createElement(
										'small',
										null,
										'\uFFE5'
									),
									goodsDetail.price,
									_react2.default.createElement(
										's',
										null,
										'\uFFE5',
										goodsDetail.faceValue
									),
									_react2.default.createElement('span', { className: 'limit-icon' })
								),
								_react2.default.createElement(
									'div',
									{ className: 'name' },
									goodsDetail.productName
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'timelimit-right' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'div',
										{ className: 'time' },
										_react2.default.createElement(
											'div',
											{ className: 'activeTime' },
											_react2.default.createElement(
												'span',
												{ className: 'activeTime-title' },
												goodsDetail.activityState == 2 ? goodsDetail.endTime + '\u7ED3\u675F' : goodsDetail.activityState == 1 ? '距结束还剩' : goodsDetail.startTime + '\u5F00\u59CB'
											),
											_react2.default.createElement(
												'span',
												{ className: 'activeTime-time' },
												surplusTime ? _react2.default.createElement(
													'span',
													null,
													_react2.default.createElement(
														'span',
														{ className: 'time-item' },
														goodsDetail.activityState == 1 ? surplusTime[0] : '0'
													),
													'\u5929',
													_react2.default.createElement(
														'span',
														{ className: 'time-item' },
														goodsDetail.activityState == 1 ? surplusTime[1] : '0'
													),
													':',
													_react2.default.createElement(
														'span',
														{ className: 'time-item' },
														goodsDetail.activityState == 1 ? surplusTime[2] : '0'
													),
													':',
													_react2.default.createElement(
														'span',
														{ className: 'time-item' },
														goodsDetail.activityState == 1 ? surplusTime[3] : '0'
													)
												) : '--:--'
											)
										)
									)
								)
							)
						) : _react2.default.createElement(
							'div',
							{ className: 'active-info' },
							_react2.default.createElement(
								'div',
								{ className: 'left' },
								_react2.default.createElement(
									'div',
									{ className: 'price' },
									_react2.default.createElement(
										'small',
										null,
										'\uFFE5'
									),
									goodsDetail.price,
									_react2.default.createElement(
										's',
										null,
										'\uFFE5',
										goodsDetail.faceValue
									)
								),
								_react2.default.createElement(
									'div',
									{ className: 'name' },
									goodsDetail.productName
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'right' },
								_react2.default.createElement('img', { src: typeDetail.iconPath, className: 'second-img' })
							)
						)
					),
					couponList && couponList[0] ? _react2.default.createElement(
						'div',
						{ className: 'quan-bg', onClick: function onClick() {
								_this4.showquanList();
							} },
						couponList && couponList[0] && couponList.map(function (v, i) {
							if (i < 3) {
								return _react2.default.createElement(
									'div',
									{ className: 'item font-clamp', key: i },
									v.content
								);
							}
						}),
						_react2.default.createElement(
							'div',
							{ className: 'to-list' },
							'\u9886\u5238',
							_react2.default.createElement(_icon2.default, { type: 'right' })
						)
					) : '',
					showquanList && couponList && couponList[0] && _react2.default.createElement(
						'div',
						{ className: 'modal-bg' },
						_react2.default.createElement('div', { className: 'modal-close', onClick: this.hidequanList }),
						_react2.default.createElement(
							'div',
							{ className: 'main' },
							_react2.default.createElement(
								'h3',
								null,
								'\u9886\u53D6\u4F18\u60E0\u5238',
								_react2.default.createElement(
									'span',
									{ className: 'close-btn', onClick: this.hidequanList },
									_react2.default.createElement(_icon2.default, { type: 'cross' })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'list' },
								couponList && couponList[0] && couponList.map(function (v, i) {
									return _react2.default.createElement(
										'div',
										{ className: v.status != 1 ? "item" : "item unStart", key: i },
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
												v.price
											),
											_react2.default.createElement(
												'p',
												null,
												v.content
											)
										),
										_react2.default.createElement('div', { className: 'line' }),
										_react2.default.createElement(
											'div',
											{ className: 'right' },
											_react2.default.createElement(
												'div',
												{ className: 'txt font-clamp' },
												v.name
											),
											_react2.default.createElement(
												'div',
												{ className: 'time font-clamp' },
												v.instructions
											),
											_react2.default.createElement(
												'div',
												{ className: 'use-down font-clamp' },
												v.startActiveTime,
												' ~ ',
												v.endActiveTime
											),
											v.status == 1 ? _react2.default.createElement(
												'p',
												{ className: 'no-start' },
												'\u5373\u5C06\u751F\u6548'
											) : '',
											v.status == 1 ? _react2.default.createElement(
												'p',
												{ className: 'btn-txt' },
												'\u5DF2\u9886\u53D6'
											) : v.status == 2 ? _react2.default.createElement(
												'button',
												{ className: 'get-btn', onClick: function onClick() {
														_this4.getQuan(v.id);
													} },
												'\u9886\u53D6'
											) : _react2.default.createElement(
												'p',
												{ className: 'btn-txt' },
												'\u5DF2\u9886\u53D6'
											)
										)
									);
								})
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'goods-isActivity' },
						_react2.default.createElement(
							'div',
							{ className: 'd-goods' },
							_react2.default.createElement(
								'ul',
								{ className: 'clearfix' },
								typeDetail.productList && typeDetail.productList.length > 1 && typeDetail.productList.map(function (v, i) {
									return _react2.default.createElement(
										'li',
										{ className: v.active ? 'active' : '', key: i, onClick: function onClick() {
												_this4.choseGoods(v);
											} },
										_react2.default.createElement(
											'div',
											{ className: 'g-faceValue' },
											v.productName
										),
										_react2.default.createElement(
											'div',
											{ className: 'g-price' },
											v.price,
											_react2.default.createElement(
												'small',
												null,
												'\u5143'
											)
										),
										v.productLableName ? _react2.default.createElement(
											'div',
											{ className: v.isActivity ? "sale-tips sale-active" : "sale-tips" },
											v.productLableName
										) : ''
									);
								})
							)
						)
					),
					typeDetail.productType === '直充' && _react2.default.createElement(_TemplateModal2.default, {
						TemplateId: goodsDetail.templateId, getGameInfo: this.toPay,
						choseProduct: goodsDetail,
						payment: this.state.payment,
						validType: goodsDetail.validType,
						passCodeStatus: passCodeStatus,
						startSecound: startSecound,
						GetPassCode: this.GetPassCode,
						toOrderSure: this.toOrderSure,
						isLoading: isLoading
					}),
					//1话费 2流量 3卡密 4直充
					typeDetail.productType === '卡密' && shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
						'div',
						{ className: 'd-account' },
						_react2.default.createElement(_inputItem2.default, (0, _extends3.default)({}, getFieldProps('extractCode'), {
							placeholder: '\u8F93\u51656\u4F4D\u6570\u5B57\u63D0\u53D6\u7801',
							clear: true,
							id: 'charge-input',
							className: 'input-bg',
							onClick: function onClick(e) {
								e.currentTarget.focus();
							},
							onBlur: this.blurInput,
							type: 'number',
							onChange: this.onChange,
							value: extractCode,
							disabled: goodsDetail.isActivity && passCodeStatus.userPassCodeStatus === 3
						})),
						hasError ? _react2.default.createElement(
							'p',
							{ className: 'input-tips redfont' },
							'\u8BF7\u8F93\u51656\u4F4D\u6570\u5B57\u7684\u63D0\u53D6\u7801'
						) : goodsDetail.isActivity && _react2.default.createElement(
							'p',
							{ className: 'input-tips' },
							'\u8BE56\u4F4D\u6570\u63D0\u53D6\u7801\u662F\u60A8\u81EA\u5B9A\u4E49\u8BBE\u7F6E\uFF0C\u4E0B\u5355\u5B8C\u6210\u540E\u51ED\u6B64\u63D0\u53D6\u7801\u5151\u6362\u60A8\u7684\u5361\u5BC6\u4FE1\u606F'
						)
					),
					typeDetail.productType === '卡密' && !goodsDetail.isActivity && _react2.default.createElement(
						'div',
						{ className: 'd-account' },
						_react2.default.createElement(
							_picker2.default,
							{
								data: arrNum,
								cols: 1,
								value: [ChargeNum],
								onChange: this.changeNum,
								disabled: passCodeStatus.userPassCodeStatus === 3
							},
							_react2.default.createElement(
								_list2.default.Item,
								{ arrow: 'horizontal' },
								'\u9009\u62E9\u6570\u91CF'
							)
						),
						shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') && _react2.default.createElement(
							'p',
							{ className: 'input-tips' },
							'\u8BE56\u4F4D\u6570\u63D0\u53D6\u7801\u662F\u60A8\u81EA\u5B9A\u4E49\u8BBE\u7F6E\uFF0C\u4E0B\u5355\u5B8C\u6210\u540E\u51ED\u6B64\u63D0\u53D6\u7801\u5151\u6362\u60A8\u7684\u5361\u5BC6\u4FE1\u606F'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'goods-info' },
					_react2.default.createElement(
						'article',
						null,
						goodsDetail.content && goodsDetail.content.split('|').map(function (v, i) {
							return _react2.default.createElement('div', { key: i, dangerouslySetInnerHTML: {
									__html: v
								} });
						}),
						typeDetail.productType === '卡密' && _react2.default.createElement(
							'div',
							{ className: 'rule-bg' },
							_react2.default.createElement(
								'h3',
								null,
								'\u4F7F\u7528\u8BF4\u660E'
							),
							_react2.default.createElement('div', { className: 'rule-img' })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'rule-tips-bg' },
						_react2.default.createElement(
							'h3',
							null,
							'\u6CE8\u610F\u5E38\u89C1\u9A97\u5B50\u624B\u6BB5'
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'1\u3001'
							),
							_react2.default.createElement(
								'p',
								null,
								'\u4EE5\u4E92\u5237\u4FE1\u8A89\u6216\u517C\u804C\u4E3A\u501F\u53E3\u6307\u5B9A\u8D26\u53F7\u8BA9\u60A8\u8D2D\u4E70'
							)
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'2\u3001'
							),
							_react2.default.createElement(
								'p',
								null,
								'\u9A97\u5B50\u76D7\u53D6\u60A8\u7684\u597D\u53CB\u8D26\u53F7\uFF0C\u8BA9\u60A8\u5E2E\u5176\u4EE3\u5145'
							)
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'3\u3001'
							),
							_react2.default.createElement(
								'p',
								null,
								'\u4F4E\u4EF7\u5F15\u8BF1\uFF0C\u53D1\u9001\u94FE\u63A5\u8BA9\u60A8\u8D2D\u4E70'
							)
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'span',
								null,
								'4\u3001'
							),
							_react2.default.createElement(
								'p',
								null,
								'\u8BF7\u52FF\u76F8\u4FE1\u4EFB\u4F55\u975E\u5B98\u65B9\u552E\u540E\u6D88\u606F\uFF0C\u5982\u9047\u4EFB\u4F55\u95EE\u9898\u8054\u7CFB',
								_react2.default.createElement(
									_router.Link,
									{ to: '/service', className: 'link' },
									'\u552E\u540E\u670D\u52A1'
								)
							)
						)
					)
				),
				typeDetail.productType === '卡密' && _react2.default.createElement(
					'span',
					null,
					goodsDetail.isActivity ? _react2.default.createElement(
						'div',
						{ className: 'btn-bg' },
						goodsDetail.activityState == 0 ? _react2.default.createElement(
							'button',
							{ className: 'btn-block time-btn' },
							'\u8DDD\u79BB\u5F00\u62A2\u8FD8\u5269\uFF1A',
							startSecound ? startSecound : '--:--'
						) : '',
						goodsDetail.activityState == 1 ? _react2.default.createElement(
							'div',
							{ className: 'active-btn' },

							// 马上抢 立即兑换(兑换下单)  立即兑换（直接跳订单） 正在抢购，请稍等...   您已参加
							passCodeStatus.userPassCodeStatus === 3 ? _react2.default.createElement(
								'button',
								{ className: 'btn-block prim-btn', onClick: this.GetPassCode },
								'\u9A6C\u4E0A\u62A2'
							) : '',
							passCodeStatus.userPassCodeStatus === 4 && !isLoading ? _react2.default.createElement(
								'button',
								{ className: 'btn-block prim-btn', onClick: this.toPay },
								'\u7ACB\u5373\u8D2D\u4E70'
							) : '',
							passCodeStatus.userPassCodeStatus === 1 && !isLoading ? _react2.default.createElement(
								'button',
								{ className: 'btn-block prim-btn', onClick: function onClick() {
										_this4.toOrderSure(passCodeStatus.orderNo);
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
						goodsDetail.activityState == 2 ? _react2.default.createElement(
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
									_this4.toPay({}, 'showMallLoginModal');
								},
								disabled: !!(this.props.loading && this.props.loading.effects['detail/sendCardOrder']),
								loading: !!(this.props.loading && this.props.loading.effects['detail/sendCardOrder'])
							},
							'\u7ACB\u5373\u8D2D\u4E70'
						)
					)
				),
				chinaBankModal && _react2.default.createElement(
					_wingBlank2.default,
					null,
					_react2.default.createElement(
						_modal2.default,
						{
							title: '\u63D0\u793A\u4FE1\u606F',
							transparent: true,
							maskClosable: false,
							visible: true,
							className: 'chinaBankModal',
							onClose: this.chinamodalCancel,
							footer: [{ text: '确定', onPress: this.chinamodalCancel }]
						},
						_react2.default.createElement(
							'div',
							null,
							'\u8BE5\u6D3B\u52A8\u4EC5\u9650\u6E56\u5317\u5730\u533A\u5BA2\u6237\u53C2\u52A0\u3002'
						)
					)
				),
				showMallLoginModal && _react2.default.createElement(_MallLoginModal2.default, { loginSuccess: this.loginSuccess, hideLoginModal: this.hideLoginModal })
			);
		}
	}]);
	return Detail;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this5 = this;

	this.getCoupothis = function () {
		var goodsDetail = _this5.state.goodsDetail;

		_this5.props.dispatch({
			type: 'coupons/GetProInfoDetailCouponList',
			payload: {
				productId: goodsDetail.productId,
				PageIndex: 1,
				PageSize: 99999
			}
		});
	};

	this.loginSuccess = function (data) {
		_this5.hideLoginModal();
		var _state3 = _this5.state,
		    formData = _state3.formData,
		    goodsDetail = _state3.goodsDetail,
		    passCodeStatus = _state3.passCodeStatus,
		    getQuan = _state3.getQuan,
		    getQuanList = _state3.getQuanList;

		_this5.setState({
			userInfo: data
		}, function () {
			if (getQuanList) {
				return _this5.getCoupothis();
			}
			if (getQuan) {
				return _this5.getQuan();
			}
			// 如果是活动商品需要获取资格码
			if (goodsDetail.isActivity) {
				// 如果是马上抢，则先获取资格码，在进行马上抢
				if (passCodeStatus.userPassCodeStatus === 3) {
					_this5.props.dispatch({
						type: 'detail/GetPassCodeStatus',
						payload: {
							productId: goodsDetail.productId
						}
					}).then(function () {
						_this5.GetPassCode();
					});
				} else {
					// 否则获取资格码
					_this5.props.dispatch({
						type: 'detail/GetPassCodeStatus',
						payload: {
							productId: goodsDetail.productId
						}
					});
				}
			} else {
				_this5.toPay(formData);
			}
		});
	};

	this.getPassCodeStatus = function () {
		var _state4 = _this5.state,
		    goodsDetail = _state4.goodsDetail,
		    shopInfo = _state4.shopInfo;

		_this5.props.dispatch({
			type: 'detail/GetPassCodeStatus',
			payload: {
				productId: goodsDetail.productId
			}
		});
	};

	this.onRef = function (ref) {
		_this5.child = ref;
	};

	this.GetPassCode = function () {
		var _state5 = _this5.state,
		    goodsDetail = _state5.goodsDetail,
		    shopInfo = _state5.shopInfo;

		_this5.setState({
			isLoading: true
		});
		_this5.props.dispatch({
			type: 'detail/GetPassCode',
			payload: {
				productId: goodsDetail.productId
			}
		});
	};

	this.settime = function (time, type, n) {
		_this5.setState({
			countNum: time
		}, function () {
			var that = _this5;
			that.clearTimeInterval();
			_this5.xInteval = setInterval(function () {
				var countNum = that.state.countNum;

				countNum -= 1;
				if (countNum === 0) {
					that.clearTimeInterval();
					that.init();
				}
				if (countNum > 0) {
					that.setState((0, _defineProperty3.default)({
						countNum: countNum
					}, type, n ? _mathManage2.default.secondToDate1(countNum) : _mathManage2.default.secondToDate(countNum)));
				}
			}, 1000);
		});
	};

	this.clearTimeInterval = function () {
		if (_this5.xInteval) {
			clearInterval(_this5.xInteval);
			_this5.xInteval = null;
		}
	};

	this.isAlipayOrWechat = function () {
		var userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.match(/Alipay/i) == "alipay") {
			return 1; //1支付宝
		} else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
			return 2; //2微信
		} else {
			return 3; //3其他
		}
	};

	this.init = function () {
		var postData = _this5.state.postData;

		_this5.props.dispatch({
			type: 'detail/getGoodsList',
			payload: postData
		});
	};

	this.changeNum = function (num, type) {
		_this5.setState({
			ChargeNum: num[0]
		});
	};

	this.choseGoods = function (data) {
		var _state6 = _this5.state,
		    typeDetail = _state6.typeDetail,
		    goodsDetail = _state6.goodsDetail,
		    userInfo = _state6.userInfo;

		if (data.isActivity) {
			window.location.href = '/detail?gid=' + typeDetail.childCategoryId + '&pid=' + data.productId;
		}
		typeDetail.productList && typeDetail.productList[0] && typeDetail.productList.map(function (v, i) {
			v.active = false;
			// 默认第一个商品选中
			if (v.productId === data.productId) {
				v.active = true;
				goodsDetail = typeDetail.productList[i];
			}
		});
		_this5.setState({
			typeDetail: typeDetail,
			goodsDetail: goodsDetail,
			ChargeNum: '1'
		}, function () {
			var goodsDetail = _this5.state.goodsDetail;

			if (goodsDetail.startSecound) {
				_this5.settime(goodsDetail.startSecound, 'startSecound', 0); // 
			}
			if (goodsDetail.surplusTime) {
				_this5.settime(goodsDetail.surplusTime, 'surplusTime', 1); // 
			}
			if (goodsDetail.isActivity) {
				// 如果已经登录，就直接获取资格
				_this5.getPassCodeStatus();
			}
			_this5.props.dispatch({
				type: 'detail/getMid',
				payload: { toOrderMid: Math.random() }
			});
			// 获取优惠券
			_this5.getCoupothis();
		});
	};

	this.authorizationFailure = function () {
		var userInfo = _this5.state.userInfo;

		userInfo.fuluToken = '';
		localStorage.setItem("userInfo", (0, _stringify2.default)(userInfo));
		_this5.setState({
			userInfo: userInfo
		}, function () {
			(0, _auth.isLoginOrAuth)(_this5);
		});
	};

	this.toPay = function (val) {
		if (val) _this5.setState({ formData: val });
		// 判断模式和授权
		var yes = (0, _auth.isLoginOrAuth)(_this5);
		console.log(yes, 'yes');
		if (yes) {
			_this5.sendOrder(val);
		}
	};

	this.sendOrder = function (val) {
		var _state7 = _this5.state,
		    typeDetail = _state7.typeDetail,
		    goodsDetail = _state7.goodsDetail,
		    ChargeNum = _state7.ChargeNum,
		    shopInfo = _state7.shopInfo,
		    extractCode = _state7.extractCode;
		//中国银行，需要判断是不是活动商品，如果是活动商品 ibknum为46405才可购买

		if (shopInfo.codeKey.toLowerCase() === (configs.chinaBank ? configs.chinaBank.toLowerCase() : '')) {
			if (goodsDetail.isActivity) {
				//活动商品
				if (localStorage.getItem('ibknum') !== '46405') {
					_this5.setState({
						chinaBankModal: true
					});
					return false;
				}
			}
		}
		if (typeDetail.productType === '直充' && val.ChargeNum > goodsDetail.singlePurchaseLimit) {
			return _toast2.default.info('\u8D2D\u4E70\u6570\u91CF\u4E0D\u80FD\u5927\u4E8E' + goodsDetail.singlePurchaseLimit);
		}
		var post = {
			productId: goodsDetail.productId, // 商品Id
			buyNum: goodsDetail.isActivity ? 1 : typeDetail.productType === '直充' ? Number(val.ChargeNum) : Number(ChargeNum),
			salePrice: goodsDetail.price,
			childCategoryId: typeDetail.childCategoryId
		};
		if (typeDetail.productType === '卡密') {
			// 卡密
			if (shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '')) {
				if (!extractCode) {
					return _toast2.default.info('提取码不能为空！');
				} else if (extractCode && !/^\d{6}$/.test(extractCode)) {
					return _toast2.default.info('提取码由6位数字组成');
				}
			}
			(0, _assign2.default)(post, {
				extractCode: shopInfo.codeKey.toLowerCase() !== (configs.xiaomi ? configs.xiaomi.toLowerCase() : '') ? extractCode : '123456'
			});
			_this5.props.dispatch({
				type: 'detail/sendCardOrder',
				payload: post
			});
		} else if (typeDetail.productType === '直充') {
			// 直充
			(0, _assign2.default)(post, {
				chargeAccount: val.ChargeAccount,
				chargePassword: val.ChargePWD,
				chargeGameName: val.ChargeGame,
				chargeGameRegion: val.ChargeRegion,
				chargeGameSrv: val.ChargeServer,
				contactTel: val.ContactType,
				contactQq: val.ContactQQ,
				chargeType: val.ChargeType
			});
			if (!post.chargeAccount) {
				return _toast2.default.info('充值账号不能为空');
			}
			_this5.props.dispatch({
				type: 'detail/sendOrder',
				payload: post
			});
		}
	};

	this.toUrl = function (url) {
		_this5.props.history.push(url);
	};

	this.onChange = function (value) {
		if (value.replace(/\s/g, '').length !== 6) {
			_this5.setState({
				hasError: true
			});
		} else {
			_this5.setState({
				hasError: false
			});
		}
		_this5.setState({
			extractCode: value
		});
	};

	this.toOrderSure = function (orderNo) {
		var _state8 = _this5.state,
		    userInfo = _state8.userInfo,
		    shopInfo = _state8.shopInfo;

		window.location.href = configs.commonUrl + '/orderSure?oid=' + orderNo + '&codeKey=' + shopInfo.codeKey + '&fuluToken=' + userInfo.fuluToken + '&fuluId=' + userInfo.fuluId;
	};

	this.chinamodalCancel = function () {
		_this5.setState({
			chinaBankModal: false
		});
	};

	this.hideLoginModal = function () {
		_this5.setState({
			showMallLoginModal: false
			// showLoginPageModal: false
		});
	};

	this.blurInput = function () {
		document.documentElement.scrollTop = document.documentElement.scrollTop;
	};

	this.showquanList = function () {
		_this5.setState({
			showquanList: true
		});
	};

	this.hidequanList = function () {
		_this5.setState({
			showquanList: false
		});
	};

	this.getQuan = function (id) {
		// 领券
		_this5.setState({
			quanId: id,
			getQuan: true
		}, function () {
			// 判断模式和授权
			var yes = (0, _auth.isLoginOrAuth)(_this5);
			console.log(yes, 'yes');
			if (yes) {
				_this5.getCouponFn();
			}
		});
	};

	this.getCouponFn = function () {
		var quanId = _this5.state.quanId;

		_this5.props.dispatch({
			type: 'coupons/ObtainCard',
			payload: {
				merCouponActivityId: quanId
			}
		});
	};

	this.jumpTo = function (v) {
		if (v.jumpType == 1) {
			_this5.toUrl('/');
		} else if (v.jumpType == 2) {
			_this5.toUrl('/couponPage?cardId=' + v.couponCode + '&reachedAmount=' + v.fullPrice + '&reduceAmount=' + v.price);
		} else if (v.jumpType == 3) {
			window.location.href = '/detail?gid=' + v.proClassId + (v.productId ? '&pid=' + v.productId : '');
		} else if (v.jumpType == 4) {
			window.location.href = v.jumpUrl;
		}
	};
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)((0, _rcForm.createForm)()(Detail));