import * as pay from '../services/pay';

export default {
  namespace: 'pay',
  state: {},
  effects: {
    *recommendProduct({ payload }, { call, put }) {
      const result = yield call(pay.recommendProduct, payload);
      yield put({
        type: 'success',
        payload: {
          recommendProduct: result,
        },
      });
    },
    *getHotCategory({ payload }, { call, put }) {
      const result = yield call(pay.getHotCategory, payload);
      yield put({
        type: 'success',
        payload: {
          getHotCategory: result,
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