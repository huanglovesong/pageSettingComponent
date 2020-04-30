import * as login from '../services/login';

export default {
  namespace: 'login',
  state: {},
  effects: {
    *fuluusertoken({ payload }, { call, put }) {
      const result = yield call(login.fuluusertoken, payload);
      yield put({
        type: 'success',
        payload: {
          fuluusertoken: result,
        },
      });
    },
    *getCode({ payload }, { call, put }) {
      const result = yield call(login.getCode, payload);
      yield put({
        type: 'success',
        payload: {
          getCode: result,
        },
      });
    },
    *touristlogin({ payload }, { call, put }) {
      const result = yield call(login.touristlogin, payload);
      yield put({
        type: 'success',
        payload: {
          touristlogin: result,
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