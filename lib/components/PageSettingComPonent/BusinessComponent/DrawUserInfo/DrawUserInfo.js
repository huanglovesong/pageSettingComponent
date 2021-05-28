'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./less/drawUserInfo.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var comModelStyle = 'drawUserInfoStyleModel';
var DrawUserInfo = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(DrawUserInfo, _Component);

    function DrawUserInfo(props) {
        (0, _classCallCheck3.default)(this, DrawUserInfo);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DrawUserInfo.__proto__ || (0, _getPrototypeOf2.default)(DrawUserInfo)).call(this, props));

        _this.getCom = function () {
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
                var _item$modelStyle$comM = item.modelStyle[comModelStyle],
                    bottomMargin = _item$modelStyle$comM.bottomMargin,
                    topMargin = _item$modelStyle$comM.topMargin,
                    imageClearance = _item$modelStyle$comM.imageClearance,
                    pageMargin = _item$modelStyle$comM.pageMargin,
                    backImage = _item$modelStyle$comM.backImage;

                var customEle = [];
                var style1 = {
                    paddingTop: topMargin / 50 + 'rem', paddingBottom: bottomMargin / 50 + 'rem'
                };
                var drawInfo = _this.state.drawInfo;

                customEle = _react2.default.createElement(
                    'div',
                    { className: 'draw-user-info-box-img float-left', style: { backgroundImage: 'url(' + backImage + ')' } },
                    drawInfo.lotteryType === 1 && _react2.default.createElement(
                        'div',
                        { className: 'my-point' },
                        _react2.default.createElement(
                            'span',
                            { className: 'title' },
                            '\u6211\u7684\u79EF\u5206'
                        ),
                        _react2.default.createElement(
                            'span',
                            { className: 'point' },
                            drawInfo.userIntegral || 0
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'remain-num' },
                        drawInfo.daySurplusNum !== null && '\u4ECA\u5929\u53EF\u62BD ' + (drawInfo.daySurplusNum || 0) + ' \u6B21',
                        drawInfo.daySurplusNum !== 0 && drawInfo.daySurplusNum !== null && drawInfo.totalSurplusNum !== 0 && drawInfo.totalSurplusNum !== null && '，',
                        drawInfo.totalSurplusNum !== null && '\u5171\u53EF\u62BD ' + (drawInfo.totalSurplusNum || 0) + ' \u6B21'
                    )
                );
                return _react2.default.createElement(
                    'div',
                    { className: 'draw-user-info-box clearfix', style: (0, _extends3.default)({}, style1) },
                    customEle
                );
            }
        };

        _this.state = {
            drawInfo: props.item.moduleDataList[0] || {},
            userData: {}
        };
        return _this;
    }

    (0, _createClass3.default)(DrawUserInfo, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var getPrizeNumRes = nextProps.pageSetting.getPrizeNumRes;

            if (getPrizeNumRes !== this.props.pageSetting.getPrizeNumRes) {
                var code = getPrizeNumRes.code,
                    data = getPrizeNumRes.data;
                var drawInfo = this.state.drawInfo;
                // 同一个抽奖活动

                if (getPrizeNumRes.code === '1000' && drawInfo.relationId === data.lotteryId) {
                    drawInfo.userIntegral = data.integral;
                    drawInfo.prizeNum = data.prizeNum;
                    drawInfo.daySurplusNum = data.daySurplusNum;
                    drawInfo.totalSurplusNum = data.totalSurplusNum;
                    return this.setState({
                        drawInfo: drawInfo
                    });
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return this.getCom();
        }
    }]);
    return DrawUserInfo;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(DrawUserInfo);