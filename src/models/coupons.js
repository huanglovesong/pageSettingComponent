import * as coupons from '../services/coupons';

export default {
  namespace: 'coupons',
  state: {},
  effects: {
    *CardActivityOvered({ payload }, { call, put }) {
      const result = yield call(coupons.CardActivityOvered, payload);
      yield put({
        type: 'success',
        payload: {
          CardActivityOvered: result,
        },
      });
    },
    *ObtainCard({ payload }, { call, put }) {
      const result = yield call(coupons.ObtainCard, payload);
      yield put({
        type: 'success',
        payload: {
          ObtainCard: result,
        },
      });
    },
    *GetProInfoDetailCouponList({ payload }, { call, put }) {
      const result = yield call(coupons.GetProInfoDetailCouponList, payload);
      yield put({
        type: 'success',
        payload: {
          GetProInfoDetailCouponList: result,
        },
      });
    },
    *GetUserCouponList({ payload }, { call, put }) {
      const result = yield call(coupons.GetUserCouponList, payload);
      yield put({
        type: 'success',
        payload: {
          GetUserCouponList: result,
        },
      });
    },
    *GetOrderDetailsCouponList({ payload }, { call, put }) {
      const result = yield call(coupons.GetOrderDetailsCouponList, payload);
      yield put({
        type: 'success',
        payload: {
          GetOrderDetailsCouponList: result,
        },
      });
    },
    *GetCouponProductList({ payload }, { call, put }) {
      const result = yield call(coupons.GetCouponProductList, payload);
      yield put({
        type: 'success',
        payload: {
          GetCouponProductList: result,
        },
      });
    },
  },
  reducers: {
    success(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    }
  },
};