import * as loginPageSetting from '../services/loginPageSetting';

export default {
  namespace: 'loginPageSetting',
  state: {},
  effects: {
    // 广发银行
    *decryptInfo({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.decryptInfo, payload);
      yield put({
        type: 'success',
        payload: {
          decryptInfoRes: result,
        },
      });
      return result;
    },
    *phoneDecrypt({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.phoneDecrypt, payload);
      yield put({
        type: 'success',
        payload: {
          phoneDecryptRes: result,
        },
      });
      return result;
    },
    *flowDecrypt({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.flowDecrypt, payload);
      yield put({
        type: 'success',
        payload: {
          flowDecryptRes: result,
        },
      });
      return result;
    },
    // 云盘登录
    *panlogin({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.panlogin, payload);
      yield put({
        type: 'success',
        payload: {
          panloginRes: result,
        },
      });
      return result;
    },
    *ablogin({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.ablogin, payload);
      yield put({
        type: 'success',
        payload: {
          abloginRes: result,
        },
      });
      return result;
    },
    *pinanLogin({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.pinanLogin, payload);
      yield put({
        type: 'success',
        payload: {
          pinanLoginRes: result,
        },
      });
      return result;
    },
    *getUnionOpenId({ payload }, { call, put }) {
      const result = yield call(loginPageSetting.getUnionOpenId, payload);
      yield put({
        type: 'success',
        payload: {
          getUnionOpenIdRes: result,
        },
      });
    },
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