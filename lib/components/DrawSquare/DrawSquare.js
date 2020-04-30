'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

require('antd-mobile/lib/toast/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

require('./less/drawSquare.less');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DrawSquare = (_temp = _class = function (_React$Component) {
  (0, _inherits3.default)(DrawSquare, _React$Component);

  function DrawSquare(props) {
    (0, _classCallCheck3.default)(this, DrawSquare);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DrawSquare.__proto__ || (0, _getPrototypeOf2.default)(DrawSquare)).call(this, props));

    _this.handleClick = function () {
      var token = sessionStorage.getItem('token');
      if (!token) {
        _this.props.toLogin();
        return false;
      }
      var total = _this.state.total;

      if (total < 1) {
        _this.props.toPay();
        return false;
      } else {
        _this.start(0, 999999, 50);
        _this.draw(); // 开始抽奖
      }
    };

    _this.draw = function () {
      _this.setState({ isDisabled: true }); // 开始抽奖禁止按钮
      var postData = {
        ChannelCode: sessionStorage.getItem('entry'),
        BoxId: _this.state.boxId,
        RoomNo: ''
      };
      _this.props.dispatch({ type: 'openBox/prize', payload: postData });
    };

    _this.start = function (position, result, speed) {
      // position-起始序号  result-结果序号  speed-速度
      _this.round = 0; // 总次数
      _this.active = position; // 起始位置
      var dataSource = _this.state.dataSource;
      // console.log('dataSource', dataSource);

      _this.timer = setInterval(function () {
        if (_this.round < result) {
          if (_this.active === 7) {
            _this.active = 0;
          } else {
            _this.active += 1;
          }
          _this.round += 1;
          for (var i = 0, l = dataSource.length; i < l; i += 1) {
            if (i === _this.active) {
              dataSource[i].isActive = true;
            } else {
              dataSource[i].isActive = false;
            }
          }
          _this.setState({ dataSource: dataSource, activeIndex: _this.active });
          // console.log('timer', this.active);
        } else {
          setTimeout(function () {
            _this.setState({ prizeModal: true, isDisabled: false });
          }, 1000);
          clearInterval(_this.timer);
        }
      }, speed);
    };

    _this.timer;
    _this.state = {
      dataSource: [{ isActive: true, index: 's0', classText: 'p0' }, { isActive: false, index: 's1', classText: 'p1' }, { isActive: false, index: 's2', classText: 'p2' }, { isActive: false, index: 's7', classText: 'p3' }, { isActive: false, index: 's3', classText: 'p4' }, { isActive: false, index: 's6', classText: 'p5' }, { isActive: false, index: 's5', classText: 'p6' }, { isActive: false, index: 's4', classText: 'p7' }],
      boxId: props.boxId,
      total: '',
      balance: '',
      prizeModal: true,
      isDisabled: false,
      prizeName: ''
    };
    return _this;
  }

  (0, _createClass3.default)(DrawSquare, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      console.log('props', this.props);
      var token = sessionStorage.getItem('token');
      if (token) {
        this.props.getUserinfo();
        setTimeout(function () {
          _this2.props.getUserinfo();
        }, 1000);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // console.log('nextProps', nextProps);
      var props = this.props;
      var openBox = nextProps.openBox;

      if (openBox.getBoxPrizeList !== props.openBox.getBoxPrizeList) {
        var _openBox$getBoxPrizeL = openBox.getBoxPrizeList,
            code = _openBox$getBoxPrizeL.code,
            data = _openBox$getBoxPrizeL.data,
            message = _openBox$getBoxPrizeL.message;

        if (code === '0') {
          if (data.list && data.list.length === 8) {
            (0, _assign2.default)(data.list[0], { isActive: true, index: 's0', classText: 'p0' });
            (0, _assign2.default)(data.list[1], { isActive: false, index: 's1', classText: 'p1' });
            (0, _assign2.default)(data.list[2], { isActive: false, index: 's2', classText: 'p2' });
            (0, _assign2.default)(data.list[3], { isActive: false, index: 's7', classText: 'p3' });
            (0, _assign2.default)(data.list[4], { isActive: false, index: 's3', classText: 'p4' });
            (0, _assign2.default)(data.list[5], { isActive: false, index: 's6', classText: 'p5' });
            (0, _assign2.default)(data.list[6], { isActive: false, index: 's5', classText: 'p6' });
            (0, _assign2.default)(data.list[7], { isActive: false, index: 's4', classText: 'p7' });
            this.setState({ dataSource: data.list });
          }
        } else {
          _toast2.default.info(message);
        }
      }

      // 获取余额和次数
      if (openBox.getTotalAndBalance !== props.openBox.getTotalAndBalance) {
        var _openBox$getTotalAndB = openBox.getTotalAndBalance,
            _code = _openBox$getTotalAndB.code,
            _data = _openBox$getTotalAndB.data;

        if (_code === '0') {
          this.setState({ total: _data.total });
        } else if (_code === '-100') {
          // this.props.toLogin();
          // Toast.info(message);
          sessionStorage.setItem('token', '');
        } else {
          this.props.toPay();
          // Toast.info(message);
        }
      }

      // 抽奖
      if (openBox.prize !== props.openBox.prize) {
        var _openBox$prize = openBox.prize,
            _code2 = _openBox$prize.code,
            _data2 = _openBox$prize.data,
            _message = _openBox$prize.message;

        if (_code2 === '0') {
          var result = _data2.prizeName;
          if (!result) {
            return false;
          }
          // 更新次数
          var dataSource = this.state.dataSource;

          this.setState({ total: _data2.total });
          // 寻找奖项
          var resultIndex = void 0;
          for (var i = 0, l = dataSource.length; i < l; i += 1) {
            if (dataSource[i].prizeName === _data2.prizeName) {
              resultIndex = i;
              this.setState({ prizeImgUrl: dataSource[i].imgUrl });
            }
          }
          this.setState({ prizeName: _data2.prizeName });
          setTimeout(function () {
            var activeIndex = _this3.state.activeIndex;
            // 清除定时器

            clearInterval(_this3.timer);
            // 获取清除上一次定时器时停在的activeIndex为开启下一个定时器起始位置，并补上未转一整圈的个数，
            _this3.start(activeIndex, 8 - activeIndex + resultIndex, 400);
          }, 2000);
        } else if (_code2 === '-101') {
          // this.props.toLogin();
          // Toast.info(message);
          sessionStorage.setItem('token', '');
        } else {
          _toast2.default.info(_message);
          this.props.toPay();
          clearInterval(this.timer);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          dataSource = _state.dataSource,
          prizeModal = _state.prizeModal;
      // console.log('dataSource', dataSource);

      var body = document.body;
      if (prizeModal) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = 'visible';
      }
      return _react2.default.createElement(
        'div',
        { className: 'draw-square' },
        _react2.default.createElement(
          'div',
          { className: 'draw-section' },
          dataSource && dataSource.map(function (v, i) {
            return _react2.default.createElement(
              'div',
              {
                key: v.id,
                className: v.isActive ? 'draw-item active p' + i : 'draw-item p' + i
              },
              _react2.default.createElement('img', { src: v.imgUrl, alt: '' }),
              _react2.default.createElement(
                'p',
                { className: 'item-prize-name' },
                v.prizeName
              )
            );
          }),
          _react2.default.createElement(
            'div',
            { className: 'draw-item draw-btn' },
            _react2.default.createElement('input', { type: 'button', className: 'btn', onClick: this.handleClick, disabled: this.state.isDisabled }),
            _react2.default.createElement(
              'p',
              { className: 'draw-times' },
              '\u62BD\u5956\u6B21\u6570*',
              this.state.total
            )
          )
        ),
        this.state.prizeModal && _react2.default.createElement(
          'div',
          { className: 'prize-modal' },
          _react2.default.createElement(
            'div',
            { className: 'prize-modal-container' },
            _react2.default.createElement(
              'button',
              { className: 'close-btn', onClick: function onClick() {
                  _this4.setState({ prizeModal: false });
                } },
              _react2.default.createElement(_Icon2.default, { glyph: _Icon.close })
            ),
            _react2.default.createElement(
              'p',
              { className: 'prize-name' },
              this.state.prizeImgUrl && _react2.default.createElement('img', { src: this.state.prizeImgUrl, className: 'prize-img', alt: '' })
            ),
            _react2.default.createElement(
              'p',
              { className: 'prize-text' },
              '\u606D\u559C\u60A8\u83B7\u5F97',
              this.state.prizeName,
              '\uFF01'
            ),
            _react2.default.createElement('button', { className: 'prize-btn', onClick: this.props.toOrder })
          )
        ),
        _react2.default.createElement(
          'button',
          { className: 'list-entry', onClick: this.props.toOrder },
          '\u5F00\u7BB1\u8BB0\u5F55'
        )
      );
    }
  }]);
  return DrawSquare;
}(_react2.default.Component), _class.propTypes = {}, _class.defaultProps = {}, _temp);


var mapStateToProps = function mapStateToProps(state) {
  return (0, _extends3.default)({}, state);
};

exports.default = (0, _dva.connect)(mapStateToProps)(DrawSquare);