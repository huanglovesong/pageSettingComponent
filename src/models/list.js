import * as list from '../services/list';

export default {
  namespace: 'list',
  state: {},
  effects: {
    *getFirstMenu({ payload }, { call, put }) {
      const result = yield call(list.getFirstMenu, payload);
      yield put({
        type: 'success',
        payload: {
          getFirstMenu: result,
        },
      });
    },
    *getsecondMenu({ payload }, { call, put }) {
      const result = yield call(list.getsecondMenu, payload);
      yield put({
        type: 'success',
        payload: {
          getsecondMenu: result,
        },
      });
    },
    *getHotPro({ payload }, { call, put }) {
      const result = yield call(list.getHotPro, payload);
      yield put({
        type: 'success',
        payload: {
          getHotPro: result,
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