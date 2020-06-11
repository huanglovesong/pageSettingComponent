'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

var _tabs = require('antd-mobile/lib/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _carousel = require('antd-mobile/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

require('antd-mobile/lib/button/style');

require('antd-mobile/lib/tabs/style');

require('antd-mobile/lib/carousel/style');

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

require('./less/home.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(Home, _React$Component);

	function Home(props) {
		(0, _classCallCheck3.default)(this, Home);

		// 获取商户信息
		var _this = (0, _possibleConstructorReturn3.default)(this, (Home.__proto__ || (0, _getPrototypeOf2.default)(Home)).call(this, props));

		_initialiseProps.call(_this);

		var url = (0, _urlParse2.default)(props.location.search, true);
		var codeid = url.query.codeid; // 获取二级分类id// 获取商户信息 

		var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		// if (shopInfo.codeKey === configs.xiaomi) {
		// 	this.props.history.push('/mHome');
		// }
		_this.state = {
			banner: [],
			firstMenu: [],
			shopInfo: shopInfo,
			secondMenu: [],
			hotPro: [],
			backshow: false
		};
		return _this;
	}

	(0, _createClass3.default)(Home, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var shopInfo = this.state.shopInfo;

			this.props.dispatch({
				type: 'home/getBanner',
				payload: {
					sysTemplateId: shopInfo.merInfoTemplates.templateId,
					locationType: 'home',
					MerTemplateId: shopInfo.merInfoTemplates.id // 获取首页的banner
				} });
			// 获取首页一级类目
			this.props.dispatch({
				type: 'list/getFirstMenu'
			});
			this.getHotPro();
			//判断是否是中国银行,如果是显示头部返回
			var codeKey = this.state.codeid || shopInfo.codeKey;
			if (codeKey) {
				if (codeKey.toLowerCase() === configs.chinaBank.toLowerCase()) {
					if (window.terminal) {
						var bankVision = window.versionCompare(window.terminal.appVersion, configs.chinaBankVision);
						this.setState({
							backshow: codeKey.toLowerCase() === configs.chinaBank.toLowerCase() && bankVision == '-1' ? true : false
						});
					}
				}
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			var props = this.props;
			var getBanner = nextProps.home.getBanner,
			    _nextProps$list = nextProps.list,
			    getFirstMenu = _nextProps$list.getFirstMenu,
			    getsecondMenu = _nextProps$list.getsecondMenu,
			    getHotPro = _nextProps$list.getHotPro;

			if (getBanner !== props.home.getBanner) {
				var code = getBanner.code,
				    data = getBanner.data,
				    message = getBanner.message;

				if (code === '1000') {
					this.setState({
						banner: data.list
					});
				} else {
					_toast2.default.info(message);
				}
			}
			if (getFirstMenu !== props.list.getFirstMenu) {
				var _code = getFirstMenu.code,
				    _data = getFirstMenu.data,
				    _message = getFirstMenu.message;

				if (_code === '1000') {
					_data.list.map(function (v) {
						v.title = v.className;
					});
					this.setState({
						firstMenu: _data.list
					}, function () {
						if (_data.list && _data.list[0]) {
							_this2.getsecondMenu(_data.list[0].id);
						}
					});
				} else {
					_toast2.default.info(_message);
				}
			}
			if (getsecondMenu !== props.home.getsecondMenu) {
				var _code2 = getsecondMenu.code,
				    _data2 = getsecondMenu.data,
				    _message2 = getsecondMenu.message;

				if (_code2 === '1000') {
					this.setState({
						secondMenu: _data2.list
					});
				} else {
					_toast2.default.info(_message2);
				}
			}
			if (getHotPro !== props.home.getHotPro) {
				var _code3 = getHotPro.code,
				    _data3 = getHotPro.data,
				    _message3 = getHotPro.message;

				if (_code3 === '1000') {
					this.setState({
						hotPro: _data3.list
					});
				} else {
					_toast2.default.info(_message3);
				}
			}
		}
		// 获取二级分类

	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state,
			    firstMenu = _state.firstMenu,
			    banner = _state.banner,
			    shopInfo = _state.shopInfo,
			    hotPro = _state.hotPro,
			    secondMenu = _state.secondMenu,
			    mid = _state.mid,
			    backshow = _state.backshow;

			var MenuCarousel = [];
			for (var i = 0, len = firstMenu.length; i < len; i += 5) {
				MenuCarousel.push(firstMenu.slice(i, i + 5));
			}
			return _react2.default.createElement(
				'div',
				{ className: 'mian-bg' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					myLoading: !!(this.props.loading.models.home || this.props.loading.models.list) // 判断loading
				})),
				backshow && _react2.default.createElement(
					'div',
					{ className: 'backtobank' },
					_react2.default.createElement(
						'button',
						{
							className: 'header-left',
							onClick: this.backbank
						},
						_react2.default.createElement(_Icon2.default, { glyph: _Icon.back }),
						'\u8FD4\u56DE'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'banner-bg' },
					banner && banner[0] ? _react2.default.createElement(
						_carousel2.default,
						{
							autoplay: true,
							infinite: true
						},
						banner.map(function (v, i) {
							return _react2.default.createElement(
								'li',
								{ style: { width: '100%', height: '4.26rem' } },
								_react2.default.createElement(
									'a',
									{
										key: i,
										onClick: function onClick() {
											_this3.toBanner(v);
										},
										style: { display: 'inline-block', width: '100%', height: '4.26rem' }
									},
									_react2.default.createElement('img', {
										src: v.bannerUrl,
										alt: '',
										className: 'banner-img',
										style: { width: '100%', verticalAlign: 'top' },
										onLoad: function onLoad() {
											window.dispatchEvent(new Event('resize'));
										}
									})
								)
							);
						})
					) : _react2.default.createElement(
						'div',
						{ className: 'no-banner' },
						'\u6682\u65E0\u5E7F\u544A\u56FE\u7247'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'advantage' },
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(_Icon2.default, { glyph: _Icon.zpbz }),
						'\u6B63\u54C1\u4FDD\u8BC1'
					),
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(_Icon2.default, { glyph: _Icon.zxzk }),
						'\u4E13\u4EAB\u6298\u6263'
					),
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(_Icon2.default, { glyph: _Icon.jstk }),
						'\u6025\u901F\u5230\u8D26'
					),
					_react2.default.createElement(
						'span',
						null,
						_react2.default.createElement(_Icon2.default, { glyph: _Icon.shwy }),
						'\u552E\u540E\u65E0\u5FE7'
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'first-bg' },
					MenuCarousel.length > 0 && _react2.default.createElement(
						_carousel2.default,
						{
							autoplay: true,
							infinite: true
						},
						MenuCarousel.map(function (item, data) {
							return _react2.default.createElement(
								'ul',
								{ className: 'menu-ul clearfix' },
								item[0] && item.map(function (v, i) {
									if (i < 5) {
										return _react2.default.createElement(
											'li',
											{ key: i, onClick: function onClick() {
													_this3.toList(v.id);
												}, style: { height: '1.3rem' } },
											_react2.default.createElement(
												'div',
												{ className: 'menu-img' },
												_react2.default.createElement('img', { src: v.iconPath })
											),
											_react2.default.createElement(
												'div',
												{ className: 'menu-t' },
												v.className
											)
										);
									}
								})
							);
						})
					)
				),
				hotPro[0] && _react2.default.createElement(
					'div',
					{ className: 'hot-pro' },
					_react2.default.createElement(
						'div',
						{ className: 'title' },
						_react2.default.createElement(
							'span',
							{ className: 'left' },
							'\u9650\u65F6\u62A2\u8D2D'
						),
						_react2.default.createElement(
							'span',
							{ className: 'right', onClick: function onClick() {
									_this3.toList('active');
								} },
							'\u66F4\u591A',
							_react2.default.createElement(_Icon2.default, { glyph: _Icon.arrowRight })
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'con clearfix' },
						_react2.default.createElement(
							'ul',
							{
								style: { width: hotPro.length > 2 ? hotPro.length * 2.6 + 'rem' : '100%', height: '3.1rem' } },
							hotPro.map(function (item, m) {
								return _react2.default.createElement(
									'li',
									{ key: m, onClick: function onClick() {
											_this3.toDetail(item.childCategoryId, item.productId);
										} },
									_react2.default.createElement(
										'div',
										{ className: 'menu-img' },
										_react2.default.createElement('img', { src: item.iconPath })
									),
									_react2.default.createElement(
										'div',
										{ className: 'name' },
										item.productName
									),
									_react2.default.createElement(
										'div',
										{ className: 'price' },
										_react2.default.createElement(
											'small',
											null,
											'\uFFE5'
										),
										item.price,
										_react2.default.createElement(
											's',
											{ className: 'del-price' },
											'\uFFE5',
											item.faceValue
										)
									)
								);
							})
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'home-g-title' },
					_react2.default.createElement(_tabs2.default, { tabs: firstMenu, onChange: function onChange(tab) {
							_this3.getsecondMenu(tab.id);
						}, renderTabBar: function renderTabBar(props) {
							return _react2.default.createElement(_tabs2.default.DefaultTabBar, (0, _extends3.default)({}, props, { page: 4 }));
						} })
				),
				_react2.default.createElement(
					'div',
					{ className: 'goods-main' },
					_react2.default.createElement(
						'div',
						{ className: 'g-con' },
						_react2.default.createElement(
							'ul',
							null,
							secondMenu && secondMenu[0] ? secondMenu.map(function (v, i) {
								return _react2.default.createElement(
									'li',
									{ key: i, onClick: function onClick() {
											_this3.toDetail(v.childCategoryId);
										} },
									_react2.default.createElement(
										'div',
										{ className: 'left' },
										_react2.default.createElement('img', { src: v.iconPath }),
										v.cornerMark ? _react2.default.createElement(
											'div',
											{ className: 'sale-tips' },
											v.cornerMark
										) : ''
									),
									_react2.default.createElement(
										'div',
										{ className: 'center' },
										_react2.default.createElement(
											'div',
											{ className: 'name' },
											v.childCategoryName
										),
										_react2.default.createElement(
											'div',
											{ className: 'price' },
											v.price,
											_react2.default.createElement(
												'span',
												{ className: 'small' },
												'\u5143\u8D77'
											),
											_react2.default.createElement(
												's',
												{ className: 'del-price' },
												v.faceValue,
												'\u5143\u8D77'
											)
										)
									),
									_react2.default.createElement(
										_button2.default,
										{ className: 'right' },
										'\u8D2D\u4E70'
									)
								);
							}) : _react2.default.createElement(
								'div',
								{ className: 'no-data' },
								'\u6682\u65E0\u6570\u636E'
							)
						)
					)
				),
				_react2.default.createElement(_Footer2.default, this.props)
			);
		}
	}]);
	return Home;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this4 = this;

	this.getsecondMenu = function (mid) {
		_this4.setState({
			mid: mid
		}, function () {
			_this4.props.dispatch({
				type: 'list/getsecondMenu',
				payload: {
					categoryId: mid
				}
			});
		});
	};

	this.toList = function (mid) {
		_this4.props.history.push('/list?mid=' + mid);
	};

	this.toDetail = function (gid, pid) {
		_this4.props.history.push('/detail?gid=' + gid + (pid ? '&pid=' + pid : ''));
	};

	this.toBanner = function (v) {
		if (v.bannerType === 1) {
			window.location.href = v.linkurl;
		} else if (v.bannerType === 2 && v.ifSkip === 1) {
			_this4.props.history.push('/detail?gid=' + v.childCategoryId + '&pid=' + v.productId);
		}
	};

	this.getHotPro = function () {
		var shopInfo = _this4.state.shopInfo;

		_this4.props.dispatch({
			type: 'list/getHotPro',
			payload: {
				merInfoId: shopInfo.merInfoId,
				count: 5
			}
		});
	};

	this.backbank = function () {
		try {
			document.addEventListener('deviceready', function () {
				window.c_plugins.merchantBridge.goToNative(function () {}, function (err) {
					alert(err.message || err || '网络错误，请检查网络连接');
				}, { page: '0' });
			});
		} catch (error) {
			alert(error);
		}
	};
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(Home);