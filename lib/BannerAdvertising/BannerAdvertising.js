'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/bannerAdvertising.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BannerAdvertisingBox = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(BannerAdvertisingBox, _Component);

    function BannerAdvertisingBox() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, BannerAdvertisingBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = BannerAdvertisingBox.__proto__ || (0, _getPrototypeOf2.default)(BannerAdvertisingBox)).call.apply(_ref, [this].concat(args))), _this), _this.toBanner = function (v) {
            if (v.bannerType === 1) {
                window.location.href = v.linkurl;
            } else if (v.bannerType === 2 && v.ifSkip === 1) {
                _this.props.history.push('/detail?gid=' + v.childCategoryId + '&pid=' + v.productId);
            }
        }, _this.getCom = function () {
            var item = _this.props.item;

            var len = item.moduleDataList.length;
            if (!len) {
                return _react2.default.createElement(
                    'div',
                    { className: 'banner-advertising-box clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'banner-advertising-box-img float-left' },
                        _react2.default.createElement('img', { src: 'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png' })
                    )
                );
            } else {
                var customEle = [];
                var template = item.modelStyle.bannerStyleModel.template;
                var margin = item.modelStyle.bannerStyleModel.imageClearance / 2;
                var pagePadding = item.modelStyle.bannerStyleModel.pageMargin;
                var style = {
                    margin: margin / 50 + 'rem',
                    display: 'inline-block'
                };
                var style1 = {
                    marginLeft: '-' + margin / 50 + 'rem', marginRight: '-' + margin / 50 + 'rem', paddingLeft: pagePadding / 50 + 'rem', paddingRight: pagePadding / 50 + 'rem'
                };
                if (template === 'one' || template === 'two' || template === 'three') {
                    customEle = item.moduleDataList.map(function (item) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'banner-advertising-box-img ' + template + '-module float-left', onClick: function onClick() {
                                    _this.toBanner(item);
                                } },
                            _react2.default.createElement(
                                'a',
                                { style: (0, _extends3.default)({}, style) },
                                _react2.default.createElement('img', { src: item.bannerUrl.replace('http://fulu-mall.oss-cn-hangzhou.aliyuncs.com', 'http://tu.mall.fulu.com') })
                            )
                        );
                    });
                }
                // 一大二小
                else if (template === 'onetwo') {
                        var nowLen = len % 3 === 0 ? len / 3 : parseInt(len / 3) + 1;

                        var marginTopZero = { margin: margin / 50 + 'rem ' + margin / 50 + 'rem 0px ' + margin / 50 + 'rem', display: 'inline-block' };
                        var marginBottomZero = { margin: '0px ' + margin / 50 + 'rem ' + margin / 50 + 'rem ' + margin / 50 + 'rem', display: 'inline-block' };

                        var _loop = function _loop(index) {
                            customEle.push(_react2.default.createElement(
                                'div',
                                { className: 'one-two' },
                                _react2.default.createElement(
                                    'div',
                                    { className: 'row' },
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'top-item', onClick: function onClick() {
                                                _this.toBanner(item);
                                            } },
                                        _react2.default.createElement(
                                            'a',
                                            { style: (0, _extends3.default)({}, style) },
                                            _react2.default.createElement('img', { className: 'common-img-css', src: item.moduleDataList[index * 3].bannerUrl })
                                        )
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'top-item' },
                                        _react2.default.createElement(
                                            'div',
                                            { className: 'row' },
                                            item.moduleDataList[index * 3 + 1] && _react2.default.createElement(
                                                'div',
                                                { className: 'item',
                                                    onClick: function onClick() {
                                                        _this.toBanner(item.moduleDataList[index * 3 + 1]);
                                                    } },
                                                _react2.default.createElement(
                                                    'a',
                                                    { style: (0, _extends3.default)({}, marginTopZero) },
                                                    _react2.default.createElement('img', { className: 'common-img-css', src: item.moduleDataList[index * 3 + 1].bannerUrl
                                                    })
                                                )
                                            ),
                                            item.moduleDataList[index * 3 + 2] && _react2.default.createElement(
                                                'div',
                                                { className: 'item', onClick: function onClick() {
                                                        _this.toBanner(item.moduleDataList[index * 3 + 2]);
                                                    } },
                                                _react2.default.createElement(
                                                    'a',
                                                    { style: (0, _extends3.default)({}, style) },
                                                    _react2.default.createElement('img', { className: 'common-img-css', src: item.moduleDataList[index * 3 + 2].bannerUrl
                                                    })
                                                )
                                            )
                                        )
                                    )
                                )
                            ));
                        };

                        for (var index = 0; index < nowLen; index++) {
                            _loop(index);
                        }
                    }
                return _react2.default.createElement(
                    'div',
                    { className: 'banner-advertising-box clearfix', style: (0, _extends3.default)({}, style1) },
                    customEle
                );
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(BannerAdvertisingBox, [{
        key: 'render',
        value: function render() {
            return this.getCom();
        }
    }]);
    return BannerAdvertisingBox;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp2);
exports.default = BannerAdvertisingBox;