'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

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

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

require('./less/list.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = (_temp = _class = function (_React$Component) {
	(0, _inherits3.default)(List, _React$Component);

	function List(props) {
		(0, _classCallCheck3.default)(this, List);

		var _this = (0, _possibleConstructorReturn3.default)(this, (List.__proto__ || (0, _getPrototypeOf2.default)(List)).call(this, props));

		_initialiseProps.call(_this);

		var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		var url = (0, _urlParse2.default)(props.location.search, true);
		var mid = url.query.mid; // 获取一级分类id

		_this.state = {
			mid: mid,
			secondMenu: [],
			hotPro: [],
			secondTotal: -1,
			shopInfo: shopInfo,
			banner: []
		};
		return _this;
	}

	(0, _createClass3.default)(List, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			scrollTo(0, 0);
			var mid = this.state.mid;

			if (mid) {
				if (mid === 'active') {
					this.getHotPro();
				} else {
					this.getsecondMenu(mid);
					this.getBanner(mid);
				}
			} else {
				this.props.history.push('/');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var props = this.props;
			var getBanner = nextProps.home.getBanner,
			    _nextProps$list = nextProps.list,
			    getsecondMenu = _nextProps$list.getsecondMenu,
			    getHotPro = _nextProps$list.getHotPro;

			if (getsecondMenu !== props.list.getsecondMenu) {
				var code = getsecondMenu.code,
				    data = getsecondMenu.data,
				    message = getsecondMenu.message;

				if (code === '1000') {
					this.setState({
						secondMenu: data.list,
						secondTotal: data.list.length
					});
				} else {
					_toast2.default.info(message);
				}
			}
			if (getHotPro !== props.list.getHotPro) {
				var _code = getHotPro.code,
				    _data = getHotPro.data,
				    _message = getHotPro.message;

				if (_code === '1000') {
					this.setState({
						hotPro: _data.list
					});
				} else {
					_toast2.default.info(_message);
				}
			}
			if (getBanner !== props.home.getBanner) {
				var _code2 = getBanner.code,
				    _data2 = getBanner.data,
				    _message2 = getBanner.message;

				if (_code2 === '1000') {
					this.setState({
						banner: _data2.list
					});
				} else {
					_toast2.default.info(_message2);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _state = this.state,
			    secondMenu = _state.secondMenu,
			    hotPro = _state.hotPro,
			    mid = _state.mid,
			    secondTotal = _state.secondTotal,
			    banner = _state.banner;

			return _react2.default.createElement(
				'div',
				{ className: 'list-bg' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					myLoading: !!this.props.loading.models.list // 判断loading
				})),
				banner.length ? _react2.default.createElement(
					'div',
					{ className: 'list-banner', onClick: function onClick() {
							_this2.toBanner(banner[0]);
						} },
					_react2.default.createElement('img', { src: banner[0].bannerUrl })
				) : '',
				mid === 'active' ? _react2.default.createElement(
					'div',
					{ className: 'hot-list' },
					_react2.default.createElement(
						'ul',
						null,
						hotPro && hotPro[0] ? hotPro.map(function (v, i) {
							return _react2.default.createElement(
								'li',
								{ key: i, onClick: function onClick() {
										_this2.toDetail(v.childCategoryId, v.productId);
									} },
								_react2.default.createElement(
									'div',
									{ className: 'left' },
									_react2.default.createElement('img', { src: v.iconPath })
								),
								_react2.default.createElement(
									'div',
									{ className: 'center' },
									_react2.default.createElement(
										'div',
										{ className: 'name' },
										v.productName
									),
									_react2.default.createElement(
										'div',
										{ className: 'price' },
										v.price,
										_react2.default.createElement(
											'span',
											{ className: 'small' },
											'\u5143'
										),
										_react2.default.createElement(
											's',
											{ className: 'del-price' },
											v.faceValue,
											'\u5143'
										)
									)
								),
								_react2.default.createElement(
									_button2.default,
									{ className: 'right' },
									'\u9A6C\u4E0A\u62A2'
								)
							);
						}) : ''
					)
				) : _react2.default.createElement(
					'div',
					{ className: 'two-list' },
					_react2.default.createElement(
						'ul',
						null,
						secondMenu && secondMenu[0] ? secondMenu.map(function (v, i) {
							return _react2.default.createElement(
								'li',
								{ key: i, onClick: function onClick() {
										_this2.toDetail(v.childCategoryId);
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
						}) : ''
					)
				),
				secondTotal === 0 ? _react2.default.createElement(
					'div',
					{ className: 'noting' },
					_react2.default.createElement('span', null),
					'\u6682\u65E0\u6570\u636E'
				) : ''
			);
		}
	}]);
	return List;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
	var _this3 = this;

	this.getBanner = function () {
		var _state2 = _this3.state,
		    shopInfo = _state2.shopInfo,
		    mid = _state2.mid;

		_this3.props.dispatch({
			type: 'home/getBanner',
			payload: {
				sysTemplateId: shopInfo.merInfoTemplates.templateId,
				locationType: 'list',
				MerTemplateId: shopInfo.merInfoTemplates.id,
				categoryId: mid // 获取首页的banner
			} });
	};

	this.getHotPro = function () {
		var shopInfo = _this3.state.shopInfo;

		_this3.props.dispatch({
			type: 'list/getHotPro',
			payload: {
				merInfoId: shopInfo.merInfoId,
				count: 999
			}
		});
	};

	this.getsecondMenu = function (mid) {
		_this3.props.dispatch({
			type: 'list/getsecondMenu',
			payload: {
				categoryId: mid // 获取二级分类
			} });
	};

	this.toDetail = function (gid, pid) {
		_this3.props.history.push('/detail?gid=' + gid + (pid ? '&pid=' + pid : ''));
	};

	this.toBanner = function (v) {
		if (v.bannerType === 1) {
			window.location.href = v.linkurl;
		} else if (v.bannerType === 2 && v.ifSkip === 1) {
			_this3.props.history.push('/detail?gid=' + v.childCategoryId + '&pid=' + v.productId);
		}
	};
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(List);