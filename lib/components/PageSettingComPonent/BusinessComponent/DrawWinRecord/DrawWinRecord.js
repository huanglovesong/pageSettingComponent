'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _carousel = require('antd-mobile/lib/carousel');

var _carousel2 = _interopRequireDefault(_carousel);

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

require('antd-mobile/lib/carousel/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/drawWinRecord.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comModelStyle = 'drawWinRecordStyleModel';
var DrawWinRecord = (_temp2 = _class = function (_Component) {
    (0, _inherits3.default)(DrawWinRecord, _Component);

    function DrawWinRecord() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, DrawWinRecord);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = DrawWinRecord.__proto__ || (0, _getPrototypeOf2.default)(DrawWinRecord)).call.apply(_ref, [this].concat(args))), _this), _this.getCom = function () {
            var item = _this.props.item;

            var len = item.moduleDataList.length;
            if (!len) {
                return _react2.default.createElement(
                    'div',
                    { className: 'draw-win-record-box clearfix' },
                    _react2.default.createElement(
                        'div',
                        { className: 'draw-win-record-box-img float-left' },
                        _react2.default.createElement('img', { src: 'https://su.yzcdn.cn/public_files/2019/03/05/2b60ed750a93a1bd6e17fc354c86fa78.png' })
                    )
                );
            } else {
                if (!item.moduleDataList[0].lotteryRecordList.length) {
                    return '';
                }
                var customEle = [];
                var _item$modelStyle$comM = item.modelStyle[comModelStyle],
                    bottomMargin = _item$modelStyle$comM.bottomMargin,
                    topMargin = _item$modelStyle$comM.topMargin,
                    borderRadius = _item$modelStyle$comM.borderRadius,
                    imageClearance = _item$modelStyle$comM.imageClearance,
                    pageMargin = _item$modelStyle$comM.pageMargin,
                    backImage = _item$modelStyle$comM.backImage;

                var margin = imageClearance / 2;
                var pagePadding = pageMargin;
                var style = {
                    margin: margin / 50 + 'rem',
                    display: 'inline-block'
                };
                var style1 = {
                    paddingTop: topMargin / 50 + 'rem', paddingBottom: bottomMargin / 50 + 'rem',
                    marginLeft: '-' + margin / 50 + 'rem', marginRight: '-' + margin / 50 + 'rem', paddingLeft: pagePadding / 50 + 'rem', paddingRight: pagePadding / 50 + 'rem'
                };
                var nowItem = item.moduleDataList[0] || {};
                customEle = _react2.default.createElement(
                    'div',
                    { className: 'draw-win-record-box-img float-left', style: { backgroundImage: 'url(' + backImage + ')' } },
                    _react2.default.createElement(
                        _carousel2.default,
                        { vertical: true, autoplay: true, dots: false, infinite: true },
                        nowItem.lotteryRecordList.map(function (dataItem) {
                            return _react2.default.createElement(
                                'div',
                                { className: 'win-record-info' },
                                '\u7528\u6237 ',
                                dataItem.mobile.substring(0, 3) + '*****' + dataItem.mobile.substring(8, 11),
                                ' \u62BD\u4E2D',
                                dataItem.prizeName
                            );
                        })
                    )
                );
                return _react2.default.createElement(
                    'div',
                    { className: 'draw-win-record-box clearfix', style: (0, _extends3.default)({}, style1) },
                    customEle
                );
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(DrawWinRecord, [{
        key: 'render',
        value: function render() {
            return this.getCom();
        }
    }]);
    return DrawWinRecord;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp2);
exports.default = DrawWinRecord;