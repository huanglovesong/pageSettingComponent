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

require('./less/scratchableLatex.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ScratchableLatex = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(ScratchableLatex, _React$Component);

  function ScratchableLatex(props) {
    (0, _classCallCheck3.default)(this, ScratchableLatex);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ScratchableLatex.__proto__ || (0, _getPrototypeOf2.default)(ScratchableLatex)).call(this, props));

    _this.getScratchableLatexInfo = function (resultIndex) {
      var activeIndex = _this.state.activeIndex;
      // 清除定时器

      clearInterval(_this.timer);
      // 获取清除上一次定时器时停在的activeIndex为开启下一个定时器起始位置，并补上未转一整圈的个数，
      _this.start(activeIndex, 8 - activeIndex + resultIndex, 400);
    };

    _this.handleClick = function () {
      var _this$state = _this.state,
          total = _this$state.total,
          drawInfo = _this$state.drawInfo;

      if (!_this.isDisabled) {
        _this.isDisabled = true;
        // (如果是无门槛抽奖并且次数小于1)     (不是无门槛抽奖并且抽奖次数小于1并且可用积分小于抽奖积分）
        if (drawInfo.lotteryType === 0 && drawInfo.prizeNum < 1 || drawInfo.lotteryType === 1 && drawInfo.prizeNum < 1 && drawInfo.userIntegral < drawInfo.consumeIntegral) {
          return false;
        } else {
          var _drawInfo = _this.state.drawInfo;

          _this.start(0, 999999, 50);
          _this.props.draw(); // 获取抽奖返回数据
        }
      }
    };

    _this.start = function (position, result, speed) {
      // position-起始序号  result-结果序号  speed-速度
      _this.round = 0; // 总次数
      _this.active = position; // 起始位置
      var lotteryPrizeList = _this.state.lotteryPrizeList;
      // console.log('lotteryPrizeList', lotteryPrizeList);

      _this.timer = setInterval(function () {
        if (_this.round < result) {
          if (_this.active === 7) {
            _this.active = 0;
          } else {
            _this.active += 1;
          }
          _this.round += 1;
          for (var i = 0, l = lotteryPrizeList.length; i < l; i += 1) {
            if (i === _this.active) {
              lotteryPrizeList[i].isActive = true;
            } else {
              lotteryPrizeList[i].isActive = false;
            }
          }
          _this.setState({ lotteryPrizeList: lotteryPrizeList, activeIndex: _this.active });
        } else {
          setTimeout(function () {
            // 刷新抽奖次数
            _this.props.getPrizeNum();
            // 打开抽奖弹窗
            _this.props.showPrizeModal();
            _this.isDisabled = false;
          }, 1000);
          clearInterval(_this.timer);
        }
      }, speed);
    };

    _this.timer;
    var item = props.item;

    _this.isDisabled = false;
    _this.state = {
      lotteryPrizeList: [],
      boxId: props.boxId,
      total: 10,
      balance: '',
      drawInfo: props.drawInfo || {},
      prizeData: props.prizeData || {}
    };
    return _this;
  }

  (0, _createClass3.default)(ScratchableLatex, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onRef && this.props.onRef(this);
      var item = this.props.item;
      var drawInfo = this.state.drawInfo;

      drawInfo.lotteryPrizeList.map(function (item) {
        return item.isActive = false;
      });
      this.setState({
        lotteryPrizeList: drawInfo.lotteryPrizeList
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // console.log('nextProps', nextProps);
      var props = this.props;
      var openBox = nextProps.openBox,
          ScratchableLatexIndex = nextProps.ScratchableLatexIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          lotteryPrizeList = _state.lotteryPrizeList,
          drawInfo = _state.drawInfo;

      console.log(drawInfo, 88888);
      var _props = this.props,
          item = _props.item,
          index = _props.index;

      var body = document.body;
      var _item$modelStyle$draw = item.modelStyle.drawStyleModel,
          backImage = _item$modelStyle$draw.backImage,
          selectImage = _item$modelStyle$draw.selectImage,
          prizeBackImage = _item$modelStyle$draw.prizeBackImage,
          borderRadius = _item$modelStyle$draw.borderRadius,
          integralTextColor = _item$modelStyle$draw.integralTextColor,
          buttonImage = _item$modelStyle$draw.buttonImage,
          prizeTextColor = _item$modelStyle$draw.prizeTextColor,
          prizeData = _item$modelStyle$draw.prizeData;


      var style = {
        backgroundImage: 'url(' + backImage + ')',
        backgroundSize: 'cover'
      };
      console.log(style, 223311);
      return _react2.default.createElement(
        'div',
        { className: 'draw-square', style: style },
        _react2.default.createElement(
          'div',
          { className: 'draw-section' },
          lotteryPrizeList && lotteryPrizeList.map(function (v, i) {
            return _react2.default.createElement(
              'div',
              {
                key: v.id,
                style: {
                  backgroundImage: 'url(\'' + (v.isActive ? selectImage : prizeBackImage) + '\')',
                  backgroundSize: 'cover',
                  borderRadius: (borderRadius || 0) + 'px'
                },
                className: 'draw-item p' + i
              },
              _react2.default.createElement('img', { src: v.prizeImageUrl }),
              _react2.default.createElement(
                'div',
                { className: 'item-prize-name no-wrap-2', style: { color: prizeTextColor } },
                v.prizeName
              )
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'draw-item draw-btn', onClick: this.handleClick, style: {
                backgroundImage: 'url(' + buttonImage + ')',
                backgroundSize: 'cover'
              } },
            _react2.default.createElement(
              'div',
              { className: 'draw-times', style: { color: integralTextColor } },
              drawInfo.lotteryType === 0 || drawInfo.lotteryType === 1 && item.prizeNum !== 0 ? '\u62BD\u5956\u6B21\u6570*' + (drawInfo.prizeNum || 0) : drawInfo.consumeIntegral + '\u79EF\u5206/\u6B21'
            )
          )
        )
      );
    }
  }]);
  return ScratchableLatex;
}(_react2.default.Component), _class.propTypes = {}, _class.defaultProps = {}, _temp);


var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(ScratchableLatex);