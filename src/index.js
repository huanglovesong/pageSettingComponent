if(module && module.hot) {
  module.hot.accept()
}

import { Home, ExchangePage, LoginPage } from './components/PageSettingComPonent/Page';

import ActiveModalCom from './components/PageSettingComPonent/ActiveModalCom';
import ActiveModal from './components/PageSettingComPonent/ActiveModalCom/ActiveModal';
import BannerShuffling from './components/PageSettingComPonent/BannerShuffling';
import BannerAdvertising from './components/PageSettingComPonent/BannerAdvertising';
import Classification from './components/PageSettingComPonent/Classification';
import FlashSale from './components/PageSettingComPonent/FlashSale';
import ImageText from './components/PageSettingComPonent/ImageText';
import Notice from './components/PageSettingComPonent/Notice';
import Coupons from './components/PageSettingComPonent/Coupons';
import Exchange from './components/PageSettingComPonent/BusinessComponent/Exchange';
import TouristLogin from './components/PageSettingComPonent/BusinessComponent/TouristLogin';
import RichText from './components/PageSettingComPonent/RichText';

import pageSetting from './models/pageSetting';
import loginPageSetting from './models/loginPageSetting';
import exchangePageSetting from './models/exchange';


import * as  umBuriedPoint from './utils/umBuriedPoint';
export {
  // 组件
  ActiveModal,
  ActiveModalCom,
  BannerShuffling,
  BannerAdvertising,
  Classification,
  FlashSale,
  ImageText,
  Notice,
  Coupons,
  Exchange,
  TouristLogin,
  RichText,
  // models
  pageSetting,
  loginPageSetting,
  exchangePageSetting,
  //页面
  Home,
  ExchangePage,
  LoginPage,
  // 埋点函数
  umBuriedPoint
};