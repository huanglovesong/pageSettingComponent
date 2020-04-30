import * as orderDetail from '../services/orderDetail';

export default {
  namespace: 'orderDetail',
  state: {},
  effects: {
    *getOrderDetail({ payload }, { call, put }) {
      const result = yield call(orderDetail.getOrderDetail, payload);
      yield put({
        type: 'success',
        payload: {
            getOrderDetail: result,
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