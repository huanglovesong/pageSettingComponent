'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _listView = require('antd-mobile/lib/list-view');

var _listView2 = _interopRequireDefault(_listView);

var _button = require('antd-mobile/lib/button');

var _button2 = _interopRequireDefault(_button);

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

require('antd-mobile/lib/list-view/style');

require('antd-mobile/lib/button/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

require('./less/couponPage.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CouponPage = function (_React$Component) {
	(0, _inherits3.default)(CouponPage, _React$Component);

	function CouponPage(props) {
		(0, _classCallCheck3.default)(this, CouponPage);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CouponPage.__proto__ || (0, _getPrototypeOf2.default)(CouponPage)).call(this, props));

		_this.getCouponsGoods = function () {
			var postData = _this.state.postData;

			_this.props.dispatch({
				type: 'coupons/GetCouponProductList',
				payload: postData
			});
		};

		_this.toDetail = function (gid, pid) {
			_this.props.history.push('/detail?gid=' + gid + (pid ? '&pid=' + pid : ''));
		};

		_this.renderRow = function (rowData, sectionID, rowID) {
			return _react2.default.createElement(
				'li',
				{ key: rowID, onClick: function onClick() {
						_this.toDetail(rowData.childCategoryId);
					} },
				_react2.default.createElement(
					'div',
					{ className: 'left' },
					_react2.default.createElement('img', { src: rowData.iconPath }),
					rowData.cornerMark ? _react2.default.createElement(
						'div',
						{ className: 'sale-tips' },
						rowData.cornerMark
					) : ''
				),
				_react2.default.createElement(
					'div',
					{ className: 'center' },
					_react2.default.createElement(
						'div',
						{ className: 'name' },
						rowData.productName
					),
					_react2.default.createElement(
						'div',
						{ className: 'price' },
						rowData.price,
						_react2.default.createElement(
							'span',
							{ className: 'small' },
							'\u5143\u8D77'
						),
						_react2.default.createElement(
							's',
							{ className: 'del-price' },
							rowData.faceValue,
							'\u5143\u8D77'
						)
					),
					rowData.couponContent && rowData.couponContent[0] ? _react2.default.createElement(
						'div',
						{ className: 'label-bg' },
						rowData.couponContent.map(function (m, n) {
							if (n < 2) {
								return _react2.default.createElement(
									'span',
									null,
									m
								);
							}
						})
					) : ''
				),
				_react2.default.createElement(
					_button2.default,
					{ className: 'right' },
					'\u8D2D\u4E70'
				)
			);
		};

		_this.onEndReached = function () {
			var _this$state = _this.state,
			    postData = _this$state.postData,
			    isSearchFinish = _this$state.isSearchFinish,
			    isSearchAll = _this$state.isSearchAll;

			_this.setState({ isLoadScroll: true });
			// 当前请求完成，才去请求下一页
			if (isSearchFinish && !isSearchAll) {
				postData.pageIndex++;
				_this.setState({ postData: postData }, function () {
					_this.getCouponsGoods();
				});
			}
		};

		var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
		var url = (0, _urlParse2.default)(props.location.search, true);
		var _url$query = url.query,
		    cardId = _url$query.cardId,
		    reachedAmount = _url$query.reachedAmount,
		    reduceAmount = _url$query.reduceAmount; // 获取二级分类id// 获取商户信息 

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
			secondMenu: [],
			goodsList: [],
			secondTotal: -1,
			shopInfo: shopInfo,
			banner: [],
			cardId: cardId,
			reachedAmount: reachedAmount,
			reduceAmount: reduceAmount,
			postData: {
				couponCode: cardId,
				pageIndex: 1,
				pageSize: 9
			}
		};
		return _this;
	}

	(0, _createClass3.default)(CouponPage, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			scrollTo(0, 0);
			if (this.state.cardId) {
				this.getCouponsGoods();
			} else {
				this.props.history.push('/');
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			var _this2 = this;

			var props = this.props;
			var GetCouponProductList = nextProps.coupons.GetCouponProductList;

			if (GetCouponProductList !== props.coupons.GetCouponProductList) {
				var code = GetCouponProductList.code,
				    data = GetCouponProductList.data,
				    message = GetCouponProductList.message;

				if (code === '1000') {
					if (data && data.list) {
						var _consignList;

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
				} else {
					_toast2.default.info(message);
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var _state = this.state,
			    manageDataSource = _state.manageDataSource,
			    secondTotal = _state.secondTotal,
			    postData = _state.postData,
			    isSearchAll = _state.isSearchAll,
			    reachedAmount = _state.reachedAmount,
			    reduceAmount = _state.reduceAmount;

			return _react2.default.createElement(
				'div',
				{ className: 'couPage-bg' },
				_react2.default.createElement(_Header2.default, (0, _extends3.default)({}, this.props, {
					myLoading: !!this.props.loading.models.coupons // 判断loading
				})),
				_react2.default.createElement(
					'div',
					{ className: 'two-list' },
					reduceAmount && reduceAmount && _react2.default.createElement(
						'div',
						{ className: 'tips' },
						'\u4EE5\u4E0B\u5546\u54C1\u53EF\u4F7F\u7528',
						_react2.default.createElement(
							'span',
							{ className: 'redfont' },
							reachedAmount > 0 ? '\u6BCF\u6EE1' + reachedAmount + '\u51CF' + reduceAmount : reduceAmount + '\u5143\u65E0\u95E8\u69DB'
						),
						'\u4F18\u60E0\u5238'
					),
					_react2.default.createElement(
						'ul',
						null,
						secondTotal !== 0 ? _react2.default.createElement(_listView2.default, {
							className: 'list-view',
							dataSource: manageDataSource,
							renderRow: this.renderRow,
							initialListSize: postData.pageSize,
							pageSize: postData.pageSize,
							onEndReachedThreshold: 80,
							onEndReached: this.onEndReached,
							renderFooter: isSearchAll && function () {
								return _react2.default.createElement(
									'div',
									{ className: 'no-more' },
									'--\u6211\u662F\u6709\u5E95\u7EBF\u7684--'
								);
							}
						}) : ''
					)
				),
				secondTotal === 0 ? _react2.default.createElement(
					'div',
					{ className: 'noting' },
					_react2.default.createElement('span', null),
					'\u6682\u65E0\u6570\u636E'
				) : '',
				_react2.default.createElement('div', { className: 'cover-icon', onClick: function onClick() {
						_this3.props.history.push('/mycoupons');
					} })
			);
		}
	}]);
	return CouponPage;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
	return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(CouponPage);