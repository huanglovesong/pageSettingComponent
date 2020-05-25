import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
// import createHistory from 'history/createHashHistory';
import { Toast } from 'antd-mobile';
import FastClick from "fastclick";
import './Common/less/common.less';
import { default as home } from './models/home';
import { default as list } from './models/list';
import { default as detail } from './models/detail';
import { default as orderDetail } from './models/orderDetail';
import { default as orderList } from './models/orderList';
import { default as pay } from './models/pay';
import { default as login } from './models/login';
import { default as prize } from './models/prize';
import { default as pageSetting } from './models/pageSetting';
import { default as coupons } from './models/coupons';
import { default as loginPageSetting } from './models/loginPageSetting';

// antd-mobile modal.alert组件iOS10兼容
FastClick.attach(document.body);

// =======================
// 1. Initialize
// =======================
const app = dva({
  history: createHistory(),
  onError(e) {
    // Toast.info(e);
  },
});

// =======================
// 2. Plugins
// =======================
app.use(createLoading());

// =======================
// 3. Model
// =======================
// Moved to router.js

app.model(home);
app.model(list);
app.model(detail);
app.model(orderList);
app.model(orderDetail);
app.model(pay);
app.model(login);
app.model(prize);
app.model(pageSetting);
app.model(coupons);
app.model(loginPageSetting);

// =======================
// 4. Router
// =======================
app.router(require('./Router'));

// =======================
// 5. Start
// =======================
app.start('#app');
