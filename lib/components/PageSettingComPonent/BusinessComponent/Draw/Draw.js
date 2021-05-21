'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _PrizeModal = require('./PrizeModal');

var _PrizeModal2 = _interopRequireDefault(_PrizeModal);

var _BigWheel = require('./BigWheel');

var _BigWheel2 = _interopRequireDefault(_BigWheel);

var _ScratchableLatex = require('./ScratchableLatex');

var _ScratchableLatex2 = _interopRequireDefault(_ScratchableLatex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DrawBox = (_temp = _class = function (_Component) {
    (0, _inherits3.default)(DrawBox, _Component);

    function DrawBox(props) {
        (0, _classCallCheck3.default)(this, DrawBox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DrawBox.__proto__ || (0, _getPrototypeOf2.default)(DrawBox)).call(this, props));

        _initialiseProps.call(_this);

        var userInfoStr = localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo');
        var userInfo = userInfoStr ? JSON.parse(userInfoStr) : {};
        _this.state = {
            drawInfo: props.item.moduleDataList[0] || {},
            userInfo: userInfo,
            BigWheelIndex: '',
            ScratchableLatexIndex: '',
            prizeData: {},
            prizeModal: false
        };
        return _this;
    }

    (0, _createClass3.default)(DrawBox, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            // 添加奖品
            this.addPrize();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var getPageResult = nextProps.pageSetting.getPageResult;
            // 如果是登录成功，找到对应组件authKey进行接下来的步骤

            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && (nextProps.pageSetting.componentIndex || nextProps.pageSetting.componentIndex === 0)) {
                // 如果是点击立即领取
                if (this.props.componentIndex === nextProps.pageSetting.componentIndex) {
                    this.draw();
                }
            }
            // 自定义页面授权成功,还需要添加获取奖品
            if (nextProps.pageSetting.guid !== this.props.pageSetting.guid && nextProps.pageSetting.componentIndex === 1000) {
                // 如果是自定义页面授权成功（例如优惠券需要做用户联登）1000是标识，成功之后重新获取页面信息
                // 添加奖品
                this.addPrize();
            }
        }
        // 开始抽奖

    }, {
        key: 'render',
        value: function render() {
            var _this2 = this,
                _React$createElement;

            var _props = this.props,
                item = _props.item,
                index = _props.index;
            var _state = this.state,
                drawInfo = _state.drawInfo,
                prizeData = _state.prizeData,
                prizeModal = _state.prizeModal;

            return _react2.default.createElement(
                'div',
                { className: 'draw-box' },
                drawInfo.eventTemplate === 1 && _react2.default.createElement(_ScratchableLatex2.default, { drawInfo: drawInfo, item: item, index: index, prizeData: prizeData,
                    onRef: function onRef(ref) {
                        _this2.scratchableLatexRef = ref;
                    }, draw: this.draw,
                    getPrizeNum: this.getPrizeNum, showPrizeModal: this.showPrizeModal }),
                drawInfo.eventTemplate === 2 && _react2.default.createElement(_BigWheel2.default, { drawInfo: drawInfo, item: item, index: index, prizeData: prizeData,
                    onRef: function onRef(ref) {
                        _this2.bigWheelRef = ref;
                    }, draw: this.draw, getPrizeNum: this.getPrizeNum,
                    showPrizeModal: this.showPrizeModal }),
                prizeModal && _react2.default.createElement(_PrizeModal2.default, (_React$createElement = { hidePrizeModal: function hidePrizeModal() {
                        _this2.setState({ prizeModal: false });
                    }, prizeData: prizeData, drawInfo: drawInfo,
                    draw: this.draw }, (0, _defineProperty3.default)(_React$createElement, 'draw', this.draw), (0, _defineProperty3.default)(_React$createElement, 'showPrizeModal', this.showPrizeModal), _React$createElement))
            );
        }
    }]);
    return DrawBox;
}(_react.Component), _class.propTypes = {
    prop: _propTypes2.default
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.addPrize = function () {
        var _state2 = _this3.state,
            drawInfo = _state2.drawInfo,
            userInfo = _state2.userInfo;
        //给用户添加抽奖次数

        return _this3.props.dispatch({
            type: 'pageSetting/addPrizeNum', payload: {
                id: drawInfo.relationId,
                eventId: drawInfo.eventId,
                userId: userInfo.fuluId,
                mobile: userInfo.fuluId
            }
        }).then(function () {
            _this3.getPrizeNum();
        });
    };

    this.getPrizeNum = function () {
        var _state3 = _this3.state,
            drawInfo = _state3.drawInfo,
            userInfo = _state3.userInfo;

        return _this3.props.dispatch({
            type: 'pageSetting/getPrizeNum', payload: {
                userId: userInfo.fuluId,
                id: drawInfo.relationId,
                eventId: drawInfo.eventId
            }
        }).then(function (res) {
            var code = res.code,
                data = res.data;

            if (code === '1000') {
                var _drawInfo = _this3.state.drawInfo;

                _drawInfo.prizeNum = data.prizeNum;
                _drawInfo.consumeIntegral = data.integral;
                return _this3.setState({ drawInfo: _drawInfo });
            }
        });
    };

    this.draw = function () {
        var _state4 = _this3.state,
            userInfo = _state4.userInfo,
            drawInfo = _state4.drawInfo;

        _this3.props.dispatch({
            type: 'pageSetting/handlePrize', payload: {
                id: drawInfo.relationId,
                eventId: drawInfo.eventId,
                userId: userInfo.fuluId,
                mobile: userInfo.fuluId
            }
        }).then(function (res) {
            var code = res.code,
                data = res.data;

            if (code === '1000') {
                // 查询抽中的奖品索引
                var index = drawInfo.lotteryPrizeList.findIndex(function (item) {
                    return item.id === data.producId;
                });
                if (index !== -1) {
                    console.log('抽中奖品' + index, 88779900);
                    _this3.setState({
                        prizeData: data
                    });
                    if (drawInfo.eventTemplate === 1) {
                        return _this3.scratchableLatexRef.getScratchableLatexInfo(index);
                    } else {
                        return _this3.bigWheelRef.getBigWheelInfo(index);
                    }
                } else {
                    _this3.setError();
                }
            } else if (code === '1020') {
                _toast2.default.fail('抽奖已达上限');
            } else if (code === '1021') {
                _toast2.default.fail('今日抽奖已达上限');
            } else if (code === '-3' || code === '1013' || code === '1014' || code === '1015') {
                var componentIndex = _this3.props.componentIndex;

                _this3.props.authorizationFailurePageSetting(componentIndex);
            } else {
                _this3.setError();
            }
        });
    };

    this.setError = function () {
        var drawInfo = _this3.state.drawInfo;
        // 系统异常

        _this3.setState({ prizeData: { prizeType: '-1' } });
        // 九宫格
        if (drawInfo.eventTemplate === 1) {
            return _this3.scratchableLatexRef.getScratchableLatexInfo(0);
        }
        // 大转盘
        else if (drawInfo.eventTemplate === 2) {
                return _this3.bigWheelRef.getBigWheelInfo(0);
            }
    };

    this.showPrizeModal = function () {
        _this3.setState({ prizeModal: true, isDisabled: false });
    };
}, _temp);


var mapStateToProps = function mapStateToProps(state) {
    return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(DrawBox);