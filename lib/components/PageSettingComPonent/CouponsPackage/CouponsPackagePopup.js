'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./less/couponsPackagePopup.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveModal = function (_Component) {
    (0, _inherits3.default)(ActiveModal, _Component);

    function ActiveModal(props) {
        (0, _classCallCheck3.default)(this, ActiveModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveModal.__proto__ || (0, _getPrototypeOf2.default)(ActiveModal)).call(this, props));

        _this.toPage = function () {
            var item = _this.props.item;
            var _allInfo$popupDetail = allInfo.popupDetail,
                linkType = _allInfo$popupDetail.linkType,
                linkData = _allInfo$popupDetail.linkData;
            // 如果是自定义链接

            if (linkType === 1) {
                return window.location.href = allInfo.popupDetail.linkUrl;
            }
            // 如果是内部商品
            else if (linkType === 2) {
                    _this.props.history.push('/detail?gid=' + allInfo.popupDetail.linkUrl + '&pid=' + allInfo.popupDetail.linkData);
                }
                // 如果是跳转分类页
                else if (linkType === 3) {
                        return _this.props.history.push('/list?mid=' + linkData);
                    }
                    // 如果是跳转频道页
                    else if (linkType === 4) {
                            return _this.props.history.push('/channel?pageId=' + linkData);
                        }
        };

        _this.state = {
            showHomeModal: false
        };
        return _this;
    }

    (0, _createClass3.default)(ActiveModal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log(this.props, 8888);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            setTimeout(function () {
                var clientHeight = document.getElementById('mainBgId').clientHeight;
                if (clientHeight > 1000) {
                    _this2.refs.couponPackageShade.style.height = clientHeight + 50 + 'px';
                }
            }, 1000);
        }
    }, {
        key: 'render',
        value: function render() {
            var item = this.props.item;
            var showHomeModal = this.state.showHomeModal;

            console.log(item, 9999);
            var _item$modelStyle$coup = item.modelStyle.couponsPackageStyleModel,
                backgroundImage = _item$modelStyle$coup.backgroundImage,
                couponsPackageImage = _item$modelStyle$coup.couponsPackageImage;

            return _react2.default.createElement(
                'div',
                { className: 'coupon-package-modal' },
                _react2.default.createElement('div', { 'class': 'coupon-package-shade', ref: 'couponPackageShade' }),
                _react2.default.createElement('img', { className: 'popup-com-img', src: backgroundImage }),
                _react2.default.createElement(
                    'div',
                    { className: 'coupon-package-content' },
                    item.moduleDataList.map(function (item) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'coupon-package-content-list' },
                            _react2.default.createElement(
                                'div',
                                { className: 'float-left price-content' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price' },
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'small-font' },
                                            '\uFFE5'
                                        ),
                                        _react2.default.createElement(
                                            'span',
                                            { className: 'big-font' },
                                            item.couponData.reduceAmount
                                        )
                                    )
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'price-text' },
                                    item.couponData.content
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'float-left text-content' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'name text-ellipsis' },
                                    item.couponData.name
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'name-description text-ellipsis' },
                                    item.couponData.instructions
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'valid-date' },
                                    '\u6709\u6548\u671F\u81F3\uFF1A',
                                    (0, _moment2.default)(item.couponData.endCouponTime).format('YYYY.MM.DD')
                                )
                            )
                        );
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'btn-get', onClick: this.btnGetCoupons },
                    '\u7ACB\u5373\u9886\u53D6'
                ),
                _react2.default.createElement('div', { className: 'btn-coupon-package-get' }),
                _react2.default.createElement(
                    'div',
                    { className: 'active-modal-close-bottom', onClick: this.props.hideModal },
                    _react2.default.createElement('div', { className: 'popup-close' })
                )
            );
        }
    }]);
    return ActiveModal;
}(_react.Component);

exports.default = ActiveModal;