import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  routerRedux,
} from 'dva/router';
import dynamic from 'dva/dynamic';

const { ConnectedRouter } = routerRedux;

// 路由表
// const routes = [
//   {
//     path: '/',
//     component: () => import('./routes/App'),
//   },
// ];

const RouterWrapper = ({ history, app }) => {
  const Home = dynamic({
    app,
    component: () => import('./components/Home'),
  });
  const List = dynamic({
    app,
    component: () => import('./components/List'),
  });
  const Detail = dynamic({
    app,
    component: () => import('./components/Detail'),
  });
  const OrderStatus = dynamic({
    app,
    component: () => import('./components/OrderStatus'),
  });
  const Service = dynamic({
    app,
    component: () => import('./components/Service'),
  });
  const OrderList = dynamic({
    app,
    component: () => import('./components/OrderList'),
  });
  const OrderDetail = dynamic({
    app,
    component: () => import('./components/OrderDetail'),
  });
  const GetsecretCard = dynamic({
    app,
    component: () => import('./components/GetsecretCard'),
  });
  const UseCard = dynamic({
    app,
    component: () => import('./components/UseCard'),
  });
  const PageForbidden = dynamic({
    app,
    component: () => import('./components/PageForbidden'),
  });

  const PageServerError = dynamic({
    app,
    component: () => import('./components/PageServerError'),
  });

  const PageNetworkError = dynamic({
    app,
    component: () => import('./components/PageNetworkError'),
  });

  const PageNotFound = dynamic({
    app,
    component: () => import('./components/PageNotFound'),
  });
  const Nothing = dynamic({
    app,
    component: () => import('./components/Nothing')
  });
  const LoginModal = dynamic({
    app,
    component: () => import('./components/LoginModal')
  });
  const My = dynamic({
    app,
    component: () => import('./components/My')
  });
  const ChouJiang = dynamic({
    app,
    component: () => import('./components/ChouJiang')
  });
  const KaiShiChouJ = dynamic({
    app,
    component: () => import('./components/KaiShiChouJ')
  });
  const PrizeList = dynamic({
    app,
    component: () => import('./components/PrizeList')
  });
  const AddressForm = dynamic({
    app,
    component: () => import('./components/AddressForm')
  });
  const MHome = dynamic({
    app,
    component: () => import('./components/MHome')
  });
  const Coupons = dynamic({
    app,
    component: () => import('./components/Coupons')
  });
  const Mycoupons = dynamic({
    app,
    component: () => import('./components/Mycoupons')
  });
  const Discription = dynamic({
    app,
    component: () => import('./components/Mycoupons/Discription')
  });
  const CouponPage = dynamic({
    app,
    component: () => import('./components/CouponPage')
  });

  const Channel = dynamic({
    app,
    component: () => import('./components/Channel')
  });


  let HomeComponent = Home;
  const shopInfo = localStorage.getItem('shopInfo') ? JSON.parse(localStorage.getItem('shopInfo')) : {};
  // 如果需要替换为自定义首页
  let flag = configs.pageSettingCodeId.some(item => item === shopInfo.codeKey);
  if (flag) {
    HomeComponent = MHome;
  }
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={HomeComponent} />
        <Route exact path="/channel" component={Channel} />
        <Route exact path="/list" component={List} />
        <Route exact path="/detail" component={Detail} />
        <Route exact path="/orderStatus" component={OrderStatus} />
        <Route exact path="/service" component={Service} />
        <Route exact path="/orderList" component={OrderList} />
        <Route exact path="/orderDetail" component={OrderDetail} />
        <Route exact path="/secretCard" component={GetsecretCard} />
        <Route exact path="/useCard" component={UseCard} />
        <Route exact path="/nothing" component={Nothing} />
        <Route exact path="/login" component={LoginModal} />
        <Route exact path="/my" component={My} />
        <Route exact path="/choujiang" component={ChouJiang} />
        <Route exact path="/kaishichouj" component={KaiShiChouJ} />
        <Route exact path="/prizelist" component={PrizeList} />
        <Route exact path="/addressform" component={AddressForm} />
        <Route exact path="/mHome" component={MHome} />
        <Route exact path="/coupons" component={Coupons} />
        <Route exact path="/mycoupons" component={Mycoupons} />
        <Route exact path="/discription" component={Discription} />
        <Route exact path="/couponPage" component={CouponPage} />

        {/* 403 */}
        <Route exact path="/403" component={PageForbidden} />
        {/* 500 */}
        <Route exact path="/500" component={PageServerError} />
        {/* 网络错误 */}
        <Route exact path="/error" component={PageNetworkError} />
        {/* 404 */}
        <Route component={PageNotFound} />
      </Switch>
    </ConnectedRouter>
  );
};

RouterWrapper.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
};

RouterWrapper.defaultProps = {};

export default RouterWrapper;
