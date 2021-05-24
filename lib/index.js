'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.umBuriedPoint = exports.LoginPage = exports.ExchangePage = exports.Home = exports.exchangePageSetting = exports.loginPageSetting = exports.pageSetting = exports.DrawWinRecord = exports.DrawUserInfo = exports.Draw = exports.CouponsList = exports.CouponsPackage = exports.RichText = exports.TouristLogin = exports.Exchange = exports.Coupons = exports.Notice = exports.ImageText = exports.FlashSale = exports.Classification = exports.BannerAdvertising = exports.BannerShuffling = exports.ActiveModalCom = exports.ActiveModal = undefined;

var _Page = require('./components/PageSettingComPonent/Page');

var _ActiveModalCom = require('./components/PageSettingComPonent/ActiveModalCom');

var _ActiveModalCom2 = _interopRequireDefault(_ActiveModalCom);

var _ActiveModal = require('./components/PageSettingComPonent/ActiveModalCom/ActiveModal');

var _ActiveModal2 = _interopRequireDefault(_ActiveModal);

var _BannerShuffling = require('./components/PageSettingComPonent/BannerShuffling');

var _BannerShuffling2 = _interopRequireDefault(_BannerShuffling);

var _BannerAdvertising = require('./components/PageSettingComPonent/BannerAdvertising');

var _BannerAdvertising2 = _interopRequireDefault(_BannerAdvertising);

var _Classification = require('./components/PageSettingComPonent/Classification');

var _Classification2 = _interopRequireDefault(_Classification);

var _FlashSale = require('./components/PageSettingComPonent/FlashSale');

var _FlashSale2 = _interopRequireDefault(_FlashSale);

var _ImageText = require('./components/PageSettingComPonent/ImageText');

var _ImageText2 = _interopRequireDefault(_ImageText);

var _Notice = require('./components/PageSettingComPonent/Notice');

var _Notice2 = _interopRequireDefault(_Notice);

var _Coupons = require('./components/PageSettingComPonent/Coupons');

var _Coupons2 = _interopRequireDefault(_Coupons);

var _Exchange = require('./components/PageSettingComPonent/BusinessComponent/Exchange');

var _Exchange2 = _interopRequireDefault(_Exchange);

var _TouristLogin = require('./components/PageSettingComPonent/BusinessComponent/TouristLogin');

var _TouristLogin2 = _interopRequireDefault(_TouristLogin);

var _RichText = require('./components/PageSettingComPonent/RichText');

var _RichText2 = _interopRequireDefault(_RichText);

var _CouponsList = require('./components/PageSettingComPonent/CouponsList');

var _CouponsList2 = _interopRequireDefault(_CouponsList);

var _CouponsPackage = require('./components/PageSettingComPonent/CouponsPackage');

var _CouponsPackage2 = _interopRequireDefault(_CouponsPackage);

var _Draw = require('./components/PageSettingComPonent/BusinessComponent/Draw');

var _Draw2 = _interopRequireDefault(_Draw);

var _DrawUserInfo = require('./components/PageSettingComPonent/BusinessComponent/DrawUserInfo');

var _DrawUserInfo2 = _interopRequireDefault(_DrawUserInfo);

var _DrawWinRecord = require('./components/PageSettingComPonent/BusinessComponent/DrawWinRecord');

var _DrawWinRecord2 = _interopRequireDefault(_DrawWinRecord);

var _pageSetting = require('./models/pageSetting');

var _pageSetting2 = _interopRequireDefault(_pageSetting);

var _loginPageSetting = require('./models/loginPageSetting');

var _loginPageSetting2 = _interopRequireDefault(_loginPageSetting);

var _exchange = require('./models/exchange');

var _exchange2 = _interopRequireDefault(_exchange);

var _umBuriedPoint = require('./utils/umBuriedPoint');

var umBuriedPoint = _interopRequireWildcard(_umBuriedPoint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module && module.hot) {
  module.hot.accept();
}

exports.ActiveModal = _ActiveModal2.default;
exports.ActiveModalCom = _ActiveModalCom2.default;
exports.BannerShuffling = _BannerShuffling2.default;
exports.BannerAdvertising = _BannerAdvertising2.default;
exports.Classification = _Classification2.default;
exports.FlashSale = _FlashSale2.default;
exports.ImageText = _ImageText2.default;
exports.Notice = _Notice2.default;
exports.Coupons = _Coupons2.default;
exports.Exchange = _Exchange2.default;
exports.TouristLogin = _TouristLogin2.default;
exports.RichText = _RichText2.default;
exports.CouponsPackage = _CouponsPackage2.default;
exports.CouponsList = _CouponsList2.default;
exports.Draw = _Draw2.default;
exports.DrawUserInfo = _DrawUserInfo2.default;
exports.DrawWinRecord = _DrawWinRecord2.default;
exports.pageSetting = _pageSetting2.default;
exports.loginPageSetting = _loginPageSetting2.default;
exports.exchangePageSetting = _exchange2.default;
exports.Home = _Page.Home;
exports.ExchangePage = _Page.ExchangePage;
exports.LoginPage = _Page.LoginPage;
exports.umBuriedPoint = umBuriedPoint;