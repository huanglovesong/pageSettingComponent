import * as orderList from '../services/orderList';

export default {
  namespace: 'orderList',
  state: {},
  effects: {
    *getOrderList({ payload }, { call, put }) {
      const result = yield call(orderList.getOrderList, payload);
      yield put({
        type: 'success',
        payload: {
            getOrderList: result,
        },
      });
    }
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