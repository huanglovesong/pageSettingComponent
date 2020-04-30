'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _router = require('dva/router');

var _dynamic = require('dva/dynamic');

var _dynamic2 = _interopRequireDefault(_dynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConnectedRouter = _router.routerRedux.ConnectedRouter;

// 路由表
// const routes = [
//   {
//     path: '/',
//     component: () => import('./routes/App'),
//   },
// ];

var RouterWrapper = function RouterWrapper(_ref) {
  var history = _ref.history,
      app = _ref.app;

  var Home = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Home');
    }
  });
  var List = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/List');
    }
  });
  var Detail = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Detail');
    }
  });
  var OrderStatus = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/OrderStatus');
    }
  });
  var Service = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Service');
    }
  });
  var OrderList = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/OrderList');
    }
  });
  var OrderDetail = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/OrderDetail');
    }
  });
  var GetsecretCard = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/GetsecretCard');
    }
  });
  var UseCard = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/UseCard');
    }
  });
  var PageForbidden = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/PageForbidden');
    }
  });

  var PageServerError = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/PageServerError');
    }
  });

  var PageNetworkError = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/PageNetworkError');
    }
  });

  var PageNotFound = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/PageNotFound');
    }
  });
  var Nothing = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Nothing');
    }
  });
  var LoginModal = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/LoginModal');
    }
  });
  var My = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/My');
    }
  });
  var ChouJiang = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/ChouJiang');
    }
  });
  var KaiShiChouJ = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/KaiShiChouJ');
    }
  });
  var PrizeList = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/PrizeList');
    }
  });
  var AddressForm = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/AddressForm');
    }
  });
  var MHome = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/MHome');
    }
  });
  var Coupons = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Coupons');
    }
  });
  var Mycoupons = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Mycoupons');
    }
  });
  var Discription = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/Mycoupons/Discription');
    }
  });
  var CouponPage = (0, _dynamic2.default)({
    app: app,
    component: function component() {
      return import('./components/CouponPage');
    }
  });
  return _react2.default.createElement(
    ConnectedRouter,
    { history: history },
    _react2.default.createElement(
      _router.Switch,
      null,
      _react2.default.createElement(_router.Route, { exact: true, path: '/', component: Home }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/list', component: List }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/detail', component: Detail }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/orderStatus', component: OrderStatus }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/service', component: Service }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/orderList', component: OrderList }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/orderDetail', component: OrderDetail }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/secretCard', component: GetsecretCard }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/useCard', component: UseCard }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/nothing', component: Nothing }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/login', component: LoginModal }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/my', component: My }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/choujiang', component: ChouJiang }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/kaishichouj', component: KaiShiChouJ }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/prizelist', component: PrizeList }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/addressform', component: AddressForm }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/mHome', component: MHome }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/coupons', component: Coupons }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/mycoupons', component: Mycoupons }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/discription', component: Discription }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/couponPage', component: CouponPage }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/403', component: PageForbidden }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/500', component: PageServerError }),
      _react2.default.createElement(_router.Route, { exact: true, path: '/error', component: PageNetworkError }),
      _react2.default.createElement(_router.Route, { component: PageNotFound })
    )
  );
};

RouterWrapper.propTypes = {
  history: _propTypes2.default.object,
  app: _propTypes2.default.object
};

RouterWrapper.defaultProps = {};

exports.default = RouterWrapper;