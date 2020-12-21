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

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mathManage = require('../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('./less/imageText.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageTextBox = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(ImageTextBox, _Component);

    function ImageTextBox() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ImageTextBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ImageTextBox.__proto__ || (0, _getPrototypeOf2.default)(ImageTextBox)).call.apply(_ref, [this].concat(args))), _this), _this.toBanner = function (v) {
            // 友盟埋点图文导航点击
            _this.props.clickUmBuired('icon位');
            if (v.bannerType === 1) {
                _this.toPageFuluIdAndToken(v);
                // window.open(v.linkurl, '_blank')
            } else if (v.bannerType === 2 && v.ifSkip === 1) {
                _this.props.history.push('/detail?gid=' + v.childCategoryId + '&pid=' + v.productId);
            }
        }, _this.toPageFuluIdAndToken = function (v) {
            var shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
            var userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {};
            var fuluId = userInfo.fuluId,
                fuluToken = userInfo.fuluToken;
            // 如果需要页面跳转添加fuluId和token

            var flag = configs.codeIdFuluIdAndToken ? configs.codeIdFuluIdAndToken.some(function (item) {
                return item.toLowerCase() === shopInfo.codeKey.toLowerCase();
            }) : false;
            var linkurl = v.linkurl;

            if (linkurl) {
                if (flag) {
                    // 如果存在?符号
                    if (linkurl.indexOf('?') !== -1) {
                        linkurl = '' + linkurl + (fuluId ? '&fuluId=' + fuluId : '') + (fuluToken ? '&fuluToken=' + fuluToken : '');
                    }
                    // 如果不存在
                    else {
                            linkurl = '' + linkurl + (fuluId ? '?fuluId=' + fuluId : '') + (fuluToken ? '&fuluToken=' + fuluToken : '');
                        }
                }
                window.location.href = linkurl;
            }
        }, _this.getCom = function () {
            var item = _this.props.item;

            var len = item.moduleDataList.length;
            if (!len) {
                return _react2.default.createElement(
                    'div',
                    { className: 'banner-advertising-box clearfix', style: { background: item.modelStyle.imageTextStyleModel.background } },
                    _react2.default.createElement(
                        'div',
                        { className: 'banner-advertising-box-img float-left' },
                        _react2.default.createElement('img', { src: 'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png' })
                    )
                );
            } else {
                var _item$modelStyle$imag = item.modelStyle.imageTextStyleModel,
                    background = _item$modelStyle$imag.background,
                    textColor = _item$modelStyle$imag.textColor,
                    rowNum = _item$modelStyle$imag.rowNum,
                    isSlide = _item$modelStyle$imag.isSlide,
                    topMargin = _item$modelStyle$imag.topMargin,
                    bottomMargin = _item$modelStyle$imag.bottomMargin,
                    iconRowNum = _item$modelStyle$imag.iconRowNum;
                // 金刚区间距

                var obj = { 3: 72, 4: 36, 5: 18 };
                var allWidth = _mathManage2.default.Subtr(375, obj[rowNum] * 2);
                var nowWidth = allWidth / rowNum;
                var style = {
                    background: background, overflowX: isSlide ? 'scroll' : 'inherit',
                    padding: '0px ' + obj[rowNum] / 50 + 'rem',
                    paddingTop: topMargin / 50 + 'rem', paddingBottom: bottomMargin / 50 + 'rem'
                };
                return _react2.default.createElement(
                    'div',
                    { className: 'image-text-box clearfix', style: style },
                    _react2.default.createElement(
                        'div',
                        { className: 'image-text-box-content clearfix', style: { width: isSlide ? (nowWidth * len + 10) / 50 + 'rem' : '7.3rem' } },
                        item.moduleDataList.map(function (item, index) {
                            return _react2.default.createElement(
                                'div',
                                { 'class': 'item', style: { width: nowWidth / 50 + 'rem', marginBottom: '' + (index < rowNum && iconRowNum != 1 ? '.24rem' : '0px') }, onClick: function onClick() {
                                        return _this.toBanner(item);
                                    } },
                                _react2.default.createElement('img', { src: item.bannerUrl }),
                                _react2.default.createElement(
                                    'div',
                                    { 'class': 'name font-clamp', style: { color: textColor } },
                                    item.textData
                                )
                            );
                        })
                    )
                );
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ImageTextBox, [{
        key: 'render',
        value: function render() {
            return this.getCom();
        }
    }]);
    return ImageTextBox;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp2);
exports.default = ImageTextBox;