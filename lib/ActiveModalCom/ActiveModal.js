'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _modal = require('antd-mobile/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

require('antd-mobile/lib/modal/style');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('./less/activeModalCom.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveModal = function (_Component) {
    (0, _inherits3.default)(ActiveModal, _Component);

    function ActiveModal(props) {
        (0, _classCallCheck3.default)(this, ActiveModal);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveModal.__proto__ || (0, _getPrototypeOf2.default)(ActiveModal)).call(this, props));

        _this.isShowHomeModal = function () {
            var allInfo = _this.props.allInfo;
            var _allInfo$popupDetail = allInfo.popupDetail,
                displayType = _allInfo$popupDetail.displayType,
                updateId = _allInfo$popupDetail.updateId;
            // 如果本地缓存的是否修改不等于服务返回的说明用户改过，所有功能重新开始计算

            if (localStorage.getItem('updateId') !== updateId) {
                localStorage.setItem('updateId', updateId);
                localStorage.removeItem('onlyOne');
                localStorage.removeItem('showHomoModalStr');
            }
            // 如果是只弹一次
            if (displayType === 'onlyOne' && !localStorage.getItem('onlyOne')) {
                _this.setState({
                    showHomeModal: true
                });
                localStorage.setItem('onlyOne', true);
            }
            // 如果是每天一次
            else {
                    var nowDate = (0, _moment2.default)().format('YYYY-MM-DD');
                    var showHomoModalStr = localStorage.getItem('showHomoModalStr');
                    // 如果之前没有弹过弹窗
                    if (!showHomoModalStr) {
                        _this.setState({
                            showHomeModal: true
                        });
                        var showHomoModalObj = { nowDate: nowDate };
                        localStorage.setItem('showHomoModalStr', (0, _stringify2.default)(showHomoModalObj));
                    } else {
                        var _showHomoModalObj = JSON.parse(showHomoModalStr);
                        // 如果是今天
                        if (nowDate === _showHomoModalObj.nowDate) {
                            _this.setState({
                                showHomeModal: false
                            });
                        }
                        // 如果不是今天
                        else {
                                _this.setState({
                                    showHomeModal: true
                                });
                                var _showHomoModalObj2 = { nowDate: nowDate };
                                localStorage.setItem('showHomoModalStr', (0, _stringify2.default)(_showHomoModalObj2));
                            }
                    }
                }
        };

        _this.toPage = function () {
            var allInfo = _this.props.allInfo;

            _this.props.history.push(allInfo.sidebarDetail.linkUrl);
        };

        _this.state = {
            showHomeModal: false
        };
        return _this;
    }

    (0, _createClass3.default)(ActiveModal, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.isShowHomeModal();
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allInfo = _props.allInfo,
                disableClick = _props.disableClick;
            var showHomeModal = this.state.showHomeModal;

            return _react2.default.createElement(
                _modal2.default,
                {
                    visible: showHomeModal,
                    transparent: true,
                    maskClosable: false,
                    onClose: this.props.hideModal,
                    className: 'active-modal'
                },
                _react2.default.createElement(
                    'div',
                    { className: 'active-modal-content' },
                    _react2.default.createElement('img', { className: 'active-modal-content-img', src: allInfo.popupDetail.imagePath }),
                    _react2.default.createElement('div', { className: 'active-modal-close-top', onClick: this.props.hideModal }),
                    _react2.default.createElement('div', (0, _defineProperty3.default)({ className: 'active-modal-close-bottom ', onClick: this.props.hideModal }, 'onClick', this.toPage))
                )
            );
        }
    }]);
    return ActiveModal;
}(_react.Component);

exports.default = ActiveModal;