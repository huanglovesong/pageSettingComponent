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

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = require('react-router');

var _errIcon = require('./images/err-icon.png');

var _errIcon2 = _interopRequireDefault(_errIcon);

var _filedIcon = require('./images/filed-icon.png');

var _filedIcon2 = _interopRequireDefault(_filedIcon);

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

require('./less/prizeModal.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrizeModal = (0, _reactRouter.withRouter)(_class = (_temp = _class2 = function (_Component) {
    (0, _inherits3.default)(PrizeModal, _Component);

    function PrizeModal(props) {
        (0, _classCallCheck3.default)(this, PrizeModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (PrizeModal.__proto__ || (0, _getPrototypeOf2.default)(PrizeModal)).call(this, props));

        _this.drawAgain = function () {
            var drawInfo = _this.state.drawInfo;

            _this.props.hidePrizeModal();
            // 九宫格
            if (drawInfo.eventTemplate === 1) {
                _this.props.drawScratchableLatex();
            }
            // 大转盘
            else if (drawInfo.eventTemplate === 2) {
                    _this.props.drawBigWheel();
                }
        };

        _this.exchange = function () {
            var prizeData = _this.state.prizeData;

            if (prizeData.prizeType === '5') {
                _this.props.hidePrizeModal();
                Toast.show('稍后会有客服人员联系您，请保持手机畅通。');
            } else {
                // 1满减券 2折扣券 3 兑换劵
                if (prizeData.batchType !== '3') {
                    _this.props.history.push('./mycoupons');
                } else {
                    //将card复制到剪切板
                    Toast.success('券码复制成功，请在页面跳转后粘贴使用。', 3);
                    setTimeout(function () {
                        window.location.href = prizeData.exchangeUrl;
                    }, 3000);
                }
            }
        };

        _this.state = {
            drawInfo: props.drawInfo || {},
            prizeData: props.prizeData || {}
        };
        return _this;
    }

    (0, _createClass3.default)(PrizeModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            new _clipboard2.default('.gotoexchange');
        }
    }, {
        key: 'render',
        value: function render() {
            var prizeData = this.state.prizeData;

            console.log(prizeData, 2222);
            return _react2.default.createElement(
                'div',
                { className: 'draw-square-prize-modal' },
                _react2.default.createElement(
                    'div',
                    { className: 'draw-square-prize-modal-container' },
                    _react2.default.createElement('div', { className: 'close-btn', onClick: this.props.hidePrizeModal }),
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        prizeData.prizeType === '4' && '很遗憾',
                        prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' && '恭喜你抽中'
                    ),
                    prizeData.prizeType === '4' && _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement('div', { className: 'prize-img', style: {
                                backgroundImage: 'url(' + _filedIcon2.default + ')',
                                backgroundSize: 'cover'
                            } }),
                        _react2.default.createElement(
                            'div',
                            { className: 'prize-name' },
                            '\u8C22\u8C22\u53C2\u4E0E'
                        )
                    ),
                    prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' && _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement('div', { className: 'prize-img', style: {
                                backgroundImage: 'url(' + prizeData.prizeImageUrl + ')',
                                backgroundSize: 'cover'
                            } }),
                        _react2.default.createElement(
                            'div',
                            { className: 'prize-name' },
                            prizeData.prizeName
                        )
                    ),
                    prizeData.prizeType === '-1' && _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement('div', { className: 'prize-img', style: {
                                backgroundImage: 'url(' + _errIcon2.default + ')',
                                backgroundSize: 'cover'
                            } }),
                        _react2.default.createElement(
                            'div',
                            { className: 'prize-name' },
                            _react2.default.createElement(
                                'div',
                                { className: 'error-text' },
                                '\u7CFB\u7EDF\u5F02\u5E38'
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'error-text' },
                                '\u70B9\u51FB\u91CD\u65B0\u62BD\u5956'
                            )
                        )
                    ),
                    prizeData.prizeType !== '-1' && _react2.default.createElement(
                        'div',
                        { className: 'prize-text' },
                        '\u540E\u7EED\u4F1A\u6709\u5DE5\u4F5C\u4EBA\u5458\u548C\u60A8\u8054\u7CFB\uFF0C\u6838\u5BF9\u4E2D\u5956\u4FE1\u606F\uFF0C\u8BF7\u4FDD\u6301\u624B\u673A\u7545\u901A'
                    ),
                    prizeData.prizeType === '-1' && _react2.default.createElement(
                        'div',
                        { className: 'prize-btn', onClick: this.drawAgain },
                        '\u91CD\u65B0\u62BD\u5956'
                    ),
                    (prizeData.prizeType === '4' || prizeData.prizeType === '7') && _react2.default.createElement(
                        'div',
                        { className: 'prize-btn', onClick: this.props.hidePrizeModal },
                        '\u6211\u77E5\u9053\u4E86'
                    ),
                    prizeData.prizeType !== '-1' && prizeData.prizeType !== '4' && prizeData.prizeType !== '7' && _react2.default.createElement(
                        'div',
                        { className: 'prize-btn gotoexchange', 'data-clipboard-text': prizeData.cards,
                            onClick: this.exchange },
                        '\u7ACB\u5373\u5151\u6362'
                    )
                )
            );
        }
    }]);
    return PrizeModal;
}(_react.Component), _class2.propTypes = {
    prop: _propTypes2.default
}, _temp)) || _class;

exports.default = PrizeModal;