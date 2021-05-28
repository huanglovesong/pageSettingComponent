'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toast = require('antd-mobile/lib/toast');

var _toast2 = _interopRequireDefault(_toast);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mathManage = require('../../../../utils/mathManage');

var _mathManage2 = _interopRequireDefault(_mathManage);

require('./less/BigWheel.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigWheel = function (_React$Component) {
    (0, _inherits3.default)(BigWheel, _React$Component);

    function BigWheel(props) {
        (0, _classCallCheck3.default)(this, BigWheel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BigWheel.__proto__ || (0, _getPrototypeOf2.default)(BigWheel)).call(this, props));

        _this.getBigWheelInfo = function (index) {
            setTimeout(function () {
                // 每次点击抽奖，都将初始化角度重置
                window.cancelAnimationFrame(_this.timer);
                _this.state.startRadian = 0;
                // 一共要走的距离
                var nowDistance = _this.distanceToStop(index, 'getPrizeResult');
                // 一共要走的距离
                var distance = nowDistance;
                _this.setState({
                    distance: distance
                }, function () {
                    _this.rotatePanel(); //调用处理旋转的方法
                });
            }, 1000);
        };

        var item = props.item;

        _this.state = {
            lotteryPrizeList: [], //大转盘的奖品列表
            animation: true,
            fileRootPath: "", //"http://co.dev.touty.io"
            startRadian: -90 * Math.PI / 180, //大转盘的开始弧度(canvas绘制圆从水平方向开始，所以这里调整为垂直方向) 弧度计算公式：角度*Math.PI/180
            canBeClick: true, //判断抽奖有没有结束
            canvas: '',
            content: ''
        };
        _this.imgArr = [];
        return _this;
    }

    (0, _createClass3.default)(BigWheel, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.props.onRef && this.props.onRef(this);
            var item = this.props.item;

            var nowItem = item.moduleDataList[0] || {};
            nowItem.lotteryPrizeList.map(function (item) {
                return item.isActive = false;
            });
            this.setState({
                lotteryPrizeList: nowItem.lotteryPrizeList
            });
            this.imgArr = [];
            for (var index = 0; index < nowItem.lotteryPrizeList.length; index++) {
                var element = nowItem.lotteryPrizeList[index];
                var img = new Image();
                img.src = element.prizeImageUrl;
                img.src = element.prizeImageUrl;
                this.imgArr.push(img);
            }
            setTimeout(function () {
                _this2.onLoadPage(nowItem.lotteryPrizeList, item);
            }, 500);
        }
    }, {
        key: 'onLoadPage',
        value: function onLoadPage(lotteryPrizeList, item) {
            var _item$modelStyle$draw = item.modelStyle.drawStyleModel,
                prizeTextColor = _item$modelStyle$draw.prizeTextColor,
                oddNumberBackColor = _item$modelStyle$draw.oddNumberBackColor,
                evenNumberBackColor = _item$modelStyle$draw.evenNumberBackColor;
            var startRadian = this.state.startRadian;

            var canvas = document.getElementById("wheelcanvas");
            // 获取canvas的上下文,context含有各种api用来操作canvas
            var context = canvas.getContext('2d');
            this.setState({ canvas: canvas, context: context });
            context.save();
            // 新建一个路径,画笔的位置回到默认的坐标(0,0)的位置
            // 保证了当前的绘制不会影响到之前的绘制
            context.beginPath();
            // 设置填充转盘用的颜色,fill是填充而不是绘制
            context.fillStyle = '#370098';
            // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向(false表示顺时针)
            context.arc(211, 211, 211, startRadian, Math.PI * 2 + startRadian, false);
            // 将设置的颜色填充到圆中,这里不用closePath是因为closePath对fill无效.
            context.fill();
            // 将画布的状态恢复到上一次save()时的状态
            context.restore();
            // 第一个奖品色块开始绘制时开始的弧度及结束的弧度
            var RadianGap = Math.PI * 2 / lotteryPrizeList.length,
                endRadian = startRadian + RadianGap;
            for (var i = 0; i < lotteryPrizeList.length; i++) {
                context.save();
                context.beginPath();
                // 设置渐变背景
                // const lineargradient = context.createLinearGradient(100,100,0,100,100,100)
                // lineargradient.addColorStop(0, 'white')
                // lineargradient.addColorStop(1, 'black')
                // var linearGradient = context.createLinearGradient(0, 0, 640, 480);
                // linearGradient.addColorStop(0, '#fff');
                // linearGradient.addColorStop(0.50, 'green');
                // linearGradient.addColorStop(1.0, 'black');
                // 为了区分不同的色块,使用随机生成的颜色作为色块的填充色
                context.fillStyle = i % 2 === 0 ? evenNumberBackColor : oddNumberBackColor;
                // context.fillStyle = lineargradient;
                // 这里需要使用moveTo方法将初始位置定位在圆点处,这样绘制的圆弧都会以圆点作为闭合点
                context.moveTo(211, 211);
                // 画圆弧时,每次都会自动调用moveTo,将画笔移动到圆弧的起点,半径设置的比转盘稍小一点
                context.arc(211, 211, 201, startRadian, endRadian, false);
                context.fill();
                context.restore();
                // 开始绘制文字
                context.save();
                //设置文字颜色
                context.fillStyle = prizeTextColor;
                //设置文字样式
                context.font = "18px Arial";
                // 改变canvas原点的位置,简单来说,translate到哪个坐标点,那么那个坐标点就将变为坐标(0, 0)
                context.translate(211 + Math.cos(startRadian + RadianGap / 2) * 201, 211 + Math.sin(startRadian + RadianGap / 2) * 201);

                // 旋转角度,这个旋转是相对于原点进行旋转的.
                context.rotate(startRadian + RadianGap / 2 + Math.PI / 2);
                // 这里就是根据获取的各行的文字进行绘制,maxLineWidth取70,相当与一行最多展示5个文字
                this.getLineTextList(context, lotteryPrizeList[i].prizeName, 70).forEach(function (line, index) {
                    // 绘制文字的方法,三个参数分别带:要绘制的文字,开始绘制的x坐标,开始绘制的y坐标
                    context.fillText(line, -context.measureText(line).width / 2, ++index * 30);
                });
                context.drawImage(this.imgArr[i], -23, 60, 46, 46);

                // context.drawImage(this.imgArr[i], -30, 50, 60, 60);
                context.restore();
                // 每个奖品色块绘制完后,下个奖品的弧度会递增
                startRadian += RadianGap;
                endRadian += RadianGap;
            }
            //下面是画中间的小圆
            context.save();
            // 新建一个路径,画笔的位置回到默认的坐标(0,0)的位置
            // 保证了当前的绘制不会影响到之前的绘制
            context.beginPath();
            // 设置填充转盘用的颜色,fill是填充而不是绘制
            context.fillStyle = '#fff';
            // 绘制一个圆,有六个参数,分别表示:圆心的x坐标,圆心的y坐标,圆的半径,开始绘制的角度,结束的角度,绘制方向(false表示顺时针)
            context.arc(211, 211, 70, startRadian, Math.PI * 2 + startRadian, false);
            // 将设置的颜色填充到圆中,这里不用closePath是因为closePath对fill无效.
            context.fill();
            // 将画布的状态恢复到上一次save()时的状态
            context.restore();
        }

        //绘制文字，文字过长进行换行，防止文字溢出

    }, {
        key: 'getLineTextList',
        value: function getLineTextList(context, text, maxLineWidth) {
            var wordList = text.split(''),
                tempLine = '',
                lineList = [];
            for (var i = 0; i < wordList.length; i++) {
                if (context.measureText(tempLine).width >= maxLineWidth) {
                    lineList.push(tempLine);
                    maxLineWidth -= context.measureText(text[0]).width;
                    tempLine = '';
                }
                tempLine += wordList[i];
            }
            lineList.push(tempLine);
            return lineList;
        }

        // 这个方法是为了将canvas再window中的坐标点转化为canvas中的坐标点

    }, {
        key: 'windowToCanvas',
        value: function windowToCanvas(canvas, e) {
            // getBoundingClientRect这个方法返回html元素的大小及其相对于视口的位置
            var canvasPostion = canvas.getBoundingClientRect(),
                x = e.clientX,
                y = e.clientY;
            return {
                x: x - canvasPostion.left,
                y: y - canvasPostion.top
            };
        }
    }, {
        key: 'draw',


        //点击抽奖让转盘转起来
        value: function draw(e) {
            var _this3 = this;

            var drawInfo = this.props.drawInfo;

            console.log(drawInfo, 222);
            var userAgentType = _mathManage2.default.isAlipayOrWechat();
            console.log(userAgentType, 3333);
            // 如果是微信并且需要跳转
            if (userAgentType === 1 && drawInfo.wechartClink == 1) {
                var fromPlatform = _mathManage2.default.getDeviceType();
                console.log(fromPlatform, 444);
                // ios
                if (fromPlatform === 1) {
                    window.location.href = drawInfo.iosGuideUrl;
                }
                // android
                else if (fromPlatform === 2) {
                        window.location.href = drawInfo.androidGuideUrl;
                    }
            } else {
                // 如果是免费抽奖并且可用次数小于1
                if (drawInfo.lotteryType === 0 && drawInfo.prizeNum < 1) {
                    return _toast2.default.info('无可用次数');
                }
                // 如果是免费抽奖并且可用次数小于1
                if (drawInfo.lotteryType === 1 && drawInfo.prizeNum < 1 && drawInfo.userIntegral < drawInfo.consumeIntegral) {
                    return _toast2.default.info('积分不足');
                }
                // 如果剩余当天可用次数为0
                if (drawInfo.daySurplusNum !== null && drawInfo.daySurplusNum === 0) {
                    return _toast2.default.info('无可用次数');
                }
                // 如果总剩余次数为0
                if (drawInfo.totalSurplusNum !== null && drawInfo.totalSurplusNum === 0) {
                    return _toast2.default.info('无可用次数');
                }
                // 只要抽奖没有结束，就不让再次抽奖
                if (!this.state.canBeClick) return;
                this.state.canBeClick = false;
                // 每次点击抽奖，都将初始化角度重置
                this.state.startRadian = 0;
                var distance = this.distanceToStop();
                this.setState({
                    distance: distance
                }, function () {
                    _this3.rotatePanel(); //调用处理旋转的方法
                    _this3.props.draw(); // 获取抽奖返回数据
                });
            }
        }
    }, {
        key: 'rotatePanel',

        // 处理旋转的关键方法
        value: function rotatePanel() {
            var _state = this.state,
                distance = _state.distance,
                startRadian = _state.startRadian;
            // 这里用一个很简单的缓动函数来计算每次绘制需要改变的角度，这样可以达到一个转盘从块到慢的渐变的过程

            var changeRadian = (distance - this.state.startRadian) / 50;
            this.state.startRadian += changeRadian;
            // 当最后的目标距离与startRadian之间的差距低于0.01时，就默认奖品抽完了，可以继续抽下一个了。
            if (distance - this.state.startRadian <= 0.01) {
                this.state.canBeClick = true;
                // 刷新抽奖次数
                this.props.getPrizeNum();
                // 打开抽奖弹窗
                this.props.showPrizeModal();
                return;
            }

            var item = this.props.item;
            // 初始角度改变后，需要重新绘制

            this.onLoadPage(this.state.lotteryPrizeList, item);
            // 循环调用rotatePanel函数，使得转盘的绘制连续，造成旋转的视觉效果
            this.timer = window.requestAnimationFrame(this.rotatePanel.bind(this));
        }
    }, {
        key: 'distanceToStop',
        value: function distanceToStop() {
            var _this4 = this;

            var currentPrizeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var prizeResult = arguments[1];

            // middleDegrees为奖品块的中间角度（最终停留都是以中间角度进行计算的）距离初始的startRadian的距离，distance就是当前奖品跑到指针位置要转动的距离。
            var middleDegrees = 0,
                distance = 0;
            // 映射出每个奖品的middleDegrees
            var lotteryPrizeListToDegreesList = this.state.lotteryPrizeList.map(function (data, index) {
                var awardRadian = Math.PI * 2 / _this4.state.lotteryPrizeList.length;
                return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2;
            });

            // 随机生成一个索引值，来表示此次抽奖应该中的奖品
            // const currentPrizeIndex = Math.floor(Math.random() * this.state.lotteryPrizeList.length);
            console.log('当前奖品应该中的奖品是：' + this.state.lotteryPrizeList[currentPrizeIndex].prizeName);
            middleDegrees = lotteryPrizeListToDegreesList[currentPrizeIndex];
            // 因为指针是垂直向上的，相当坐标系的Math.PI/2,所以这里要进行判断来移动角度
            distance = Math.PI * 3 / 2 - middleDegrees;
            distance = distance > 0 ? distance : Math.PI * 2 + distance;
            // 这里额外加上后面的值，是为了让转盘多转动几圈，看上去更像是在抽奖
            return distance + Math.PI * (prizeResult ? 10 : 10000);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                item = _props.item,
                index = _props.index,
                drawInfo = _props.drawInfo;
            var _item$modelStyle$draw2 = item.modelStyle.drawStyleModel,
                backImage = _item$modelStyle$draw2.backImage,
                buttonImage = _item$modelStyle$draw2.buttonImage,
                ylImage = _item$modelStyle$draw2.ylImage,
                integralTextColor = _item$modelStyle$draw2.integralTextColor;

            var style = {
                backgroundImage: 'url(' + backImage + ')',
                backgroundSize: 'cover'
            };
            return _react2.default.createElement(
                'div',
                { className: 'wheel-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'wheel-main', style: style },
                    _react2.default.createElement(
                        'div',
                        { className: 'wheel' },
                        _react2.default.createElement('img', { className: 'wheel-circle', src: ylImage }),
                        _react2.default.createElement('canvas', { className: 'item', id: 'wheelcanvas', height: 422, width: 422 }),
                        _react2.default.createElement(
                            'div',
                            { className: 'pointer', onClick: this.draw.bind(this), style: {
                                    backgroundImage: 'url(' + buttonImage + ')',
                                    backgroundSize: 'cover'
                                } },
                            _react2.default.createElement(
                                'div',
                                { className: 'draw-times', style: { color: integralTextColor } },
                                drawInfo.lotteryType === 0 || drawInfo.lotteryType === 1 && drawInfo.prizeNum !== 0 ? '\u62BD\u5956\u6B21\u6570*' + (drawInfo.prizeNum || 0) : drawInfo.consumeIntegral + '\u79EF\u5206/\u6B21'
                            )
                        )
                    )
                )
            );
        }
    }]);
    return BigWheel;
}(_react2.default.Component);

exports.default = BigWheel;