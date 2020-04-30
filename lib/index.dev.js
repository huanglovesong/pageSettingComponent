'use strict';

require('babel-polyfill');

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

var _dvaLoading = require('dva-loading');

var _dvaLoading2 = _interopRequireDefault(_dvaLoading);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

require('./Common/less/common.less');

var _home = require('./models/home');

var _home2 = _interopRequireDefault(_home);

var _list = require('./models/list');

var _list2 = _interopRequireDefault(_list);

var _detail = require('./models/detail');

var _detail2 = _interopRequireDefault(_detail);

var _orderDetail = require('./models/orderDetail');

var _orderDetail2 = _interopRequireDefault(_orderDetail);

var _orderList = require('./models/orderList');

var _orderList2 = _interopRequireDefault(_orderList);

var _pay = require('./models/pay');

var _pay2 = _interopRequireDefault(_pay);

var _login = require('./models/login');

var _login2 = _interopRequireDefault(_login);

var _prize = require('./models/prize');

var _prize2 = _interopRequireDefault(_prize);

var _pageSetting = require('./models/pageSetting');

var _pageSetting2 = _interopRequireDefault(_pageSetting);

var _coupons = require('./models/coupons');

var _coupons2 = _interopRequireDefault(_coupons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// antd-mobile modal.alert组件iOS10兼容

// import createHistory from 'history/createHashHistory';
_fastclick2.default.attach(document.body);

// =======================
// 1. Initialize
// =======================
var app = (0, _dva2.default)({
  history: (0, _createBrowserHistory2.default)(),
  onError: function onError(e) {
    // Toast.info(e);
  }
});

// =======================
// 2. Plugins
// =======================
app.use((0, _dvaLoading2.default)());

// =======================
// 3. Model
// =======================
// Moved to router.js

app.model(_home2.default);
app.model(_list2.default);
app.model(_detail2.default);
app.model(_orderList2.default);
app.model(_orderDetail2.default);
app.model(_pay2.default);
app.model(_login2.default);
app.model(_prize2.default);
app.model(_pageSetting2.default);
app.model(_coupons2.default);

// =======================
// 4. Router
// =======================

(function () {
  console.log('[HMR] inited with babel-plugin-dva-hmr');

  var router = require('./Router');

  app.router(router.default || router);
  app.use({
    onHmr: function onHmr(render) {
      if (module.hot) {
        var renderNormally = render;

        var renderException = function renderException(error) {
          var RedBox = require('redbox-react');

          ReactDOM.render(React.createElement(RedBox, {
            error: error
          }), document.querySelector('#root'));
        };

        var newRender = function newRender(router) {
          try {
            renderNormally(router);
          } catch (error) {
            console.error('error', error);
            renderException(error);
          }
        };

        module.hot.accept('./Router', function () {
          var router = require('./Router');

          newRender(router.default || router);
        });
      }
    }
  });

  if (module.hot) {
    var modelNamespaceMap = {};

    var model = require('./models/home');

    if (model.default) model = model.default;
    modelNamespaceMap['./models/home'] = model.namespace;
    module.hot.accept('./models/home', function () {
      try {
        app.unmodel(modelNamespaceMap['./models/home']);

        var _model = require('./models/home');

        if (_model.default) _model = _model.default;
        app.model(_model);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap = {};

    var _model2 = require('./models/list');

    if (_model2.default) _model2 = _model2.default;
    _modelNamespaceMap['./models/list'] = _model2.namespace;
    module.hot.accept('./models/list', function () {
      try {
        app.unmodel(_modelNamespaceMap['./models/list']);

        var _model3 = require('./models/list');

        if (_model3.default) _model3 = _model3.default;
        app.model(_model3);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap2 = {};

    var _model4 = require('./models/detail');

    if (_model4.default) _model4 = _model4.default;
    _modelNamespaceMap2['./models/detail'] = _model4.namespace;
    module.hot.accept('./models/detail', function () {
      try {
        app.unmodel(_modelNamespaceMap2['./models/detail']);

        var _model5 = require('./models/detail');

        if (_model5.default) _model5 = _model5.default;
        app.model(_model5);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap3 = {};

    var _model6 = require('./models/orderList');

    if (_model6.default) _model6 = _model6.default;
    _modelNamespaceMap3['./models/orderList'] = _model6.namespace;
    module.hot.accept('./models/orderList', function () {
      try {
        app.unmodel(_modelNamespaceMap3['./models/orderList']);

        var _model7 = require('./models/orderList');

        if (_model7.default) _model7 = _model7.default;
        app.model(_model7);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap4 = {};

    var _model8 = require('./models/orderDetail');

    if (_model8.default) _model8 = _model8.default;
    _modelNamespaceMap4['./models/orderDetail'] = _model8.namespace;
    module.hot.accept('./models/orderDetail', function () {
      try {
        app.unmodel(_modelNamespaceMap4['./models/orderDetail']);

        var _model9 = require('./models/orderDetail');

        if (_model9.default) _model9 = _model9.default;
        app.model(_model9);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap5 = {};

    var _model10 = require('./models/pay');

    if (_model10.default) _model10 = _model10.default;
    _modelNamespaceMap5['./models/pay'] = _model10.namespace;
    module.hot.accept('./models/pay', function () {
      try {
        app.unmodel(_modelNamespaceMap5['./models/pay']);

        var _model11 = require('./models/pay');

        if (_model11.default) _model11 = _model11.default;
        app.model(_model11);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap6 = {};

    var _model12 = require('./models/login');

    if (_model12.default) _model12 = _model12.default;
    _modelNamespaceMap6['./models/login'] = _model12.namespace;
    module.hot.accept('./models/login', function () {
      try {
        app.unmodel(_modelNamespaceMap6['./models/login']);

        var _model13 = require('./models/login');

        if (_model13.default) _model13 = _model13.default;
        app.model(_model13);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap7 = {};

    var _model14 = require('./models/prize');

    if (_model14.default) _model14 = _model14.default;
    _modelNamespaceMap7['./models/prize'] = _model14.namespace;
    module.hot.accept('./models/prize', function () {
      try {
        app.unmodel(_modelNamespaceMap7['./models/prize']);

        var _model15 = require('./models/prize');

        if (_model15.default) _model15 = _model15.default;
        app.model(_model15);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap8 = {};

    var _model16 = require('./models/pageSetting');

    if (_model16.default) _model16 = _model16.default;
    _modelNamespaceMap8['./models/pageSetting'] = _model16.namespace;
    module.hot.accept('./models/pageSetting', function () {
      try {
        app.unmodel(_modelNamespaceMap8['./models/pageSetting']);

        var _model17 = require('./models/pageSetting');

        if (_model17.default) _model17 = _model17.default;
        app.model(_model17);
      } catch (e) {
        console.error(e);
      }
    });
  }

  if (module.hot) {
    var _modelNamespaceMap9 = {};

    var _model18 = require('./models/coupons');

    if (_model18.default) _model18 = _model18.default;
    _modelNamespaceMap9['./models/coupons'] = _model18.namespace;
    module.hot.accept('./models/coupons', function () {
      try {
        app.unmodel(_modelNamespaceMap9['./models/coupons']);

        var _model19 = require('./models/coupons');

        if (_model19.default) _model19 = _model19.default;
        app.model(_model19);
      } catch (e) {
        console.error(e);
      }
    });
  }
})();

// =======================
// 5. Start
// =======================


app.start('#app');