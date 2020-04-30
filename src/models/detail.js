import * as detail from '../services/detail';

export default {
  namespace: 'detail',
  state: {},
  effects: {

    *getGoodsList({ payload }, { call, put }) {
      const result = yield call(detail.getGoodsList, payload);
      yield put({
        type: 'success',
        payload: {
          getGoodsList: result,
        },
      });
    },
    *sendOrder({ payload }, { call, put }) {
      const result = yield call(detail.sendOrder, payload);
      yield put({
        type: 'success',
        payload: {
          sendOrder: result,
        },
      });
    },
    *sendCardOrder({ payload }, { call, put }) {
      const result = yield call(detail.sendCardOrder, payload);
      yield put({
        type: 'success',
        payload: {
          sendCardOrder: result,
        },
      });
    },
    *getGameProTemp({ payload }, { call, put }) {
      const result = yield call(detail.getGameProTemp, payload);
      yield put({
        type: 'success',
        payload: {
          getGameProTemp: result,
        },
      });
    },
    *getProductById({ payload }, { call, put }) {
      const result = yield call(detail.getProductById, payload);
      yield put({
        type: 'success',
        payload: {
          getProductById: result,
        },
      });
    },
    *getSecretCard({ payload }, { call, put }) {
      const result = yield call(detail.getSecretCard, payload);
      yield put({
        type: 'success',
        payload: {
          getSecretCard: result,
        },
      });
    },
    *GetPassCodeStatus({ payload }, { call, put }) {
      const result = yield call(detail.GetPassCodeStatus, payload);
      yield put({
        type: 'success',
        payload: {
          GetPassCodeStatus: result,
        },
      });
      return result;
    },
    *GetPassCode({ payload }, { call, put }) {
      const result = yield call(detail.GetPassCode, payload);
      yield put({
        type: 'success',
        payload: {
          GetPassCode: result,
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
    }, getMid(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    commonDispatch(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};