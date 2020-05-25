import * as loginPageSetting from '../services/loginPageSetting';

export default {
  namespace: 'loginPageSetting',
  state: {},
  effects: {
    *fuluusertoken({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.fuluusertoken, payload);
      yield put({
        type: 'success',
        payload: {
          fuluusertoken: result,
        },
      });
    },
    *getCode({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.getCode, payload);
      yield put({
        type: 'success',
        payload: {
          getCode: result,
        },
      });
    },
    *touristlogin({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.touristlogin, payload);
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