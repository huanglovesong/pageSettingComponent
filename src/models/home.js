import * as home from '../services/home';

export default {
  namespace: 'home',
  state: {},
  effects: {
    *getBanner({ payload }, { call, put }) {
      const result = yield call(home.getBanner, payload);
      yield put({
        type: 'success',
        payload: {
            getBanner: result,
        },
      });
    },
    *getIndexMenu({ payload }, { call, put }) {
        const result = yield call(home.getIndexMenu, payload);
        yield put({
          type: 'success',
          payload: {
            getIndexMenu: result,
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