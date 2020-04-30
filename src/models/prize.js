import * as prize from '../services/prize';

export default {
  namespace: 'prize',
  state: {},
  effects: {
    *addPrizeNum({ payload }, { call, put }) {
      const result = yield call(prize.addPrizeNum, payload);
      yield put({
        type: 'success',
        payload: {
          addPrizeNumRes: result,
        },
      });
    },
    *getAddress({ payload }, { call, put }) {
      const result = yield call(prize.getAddress, payload);
      yield put({
        type: 'success',
        payload: {
          getAddressRes: result,
        },
      });
    },
    *saveAddress({ payload }, { call, put }) {
      const result = yield call(prize.saveAddress, payload);
      yield put({
        type: 'success',
        payload: {
          saveAddressRes: result,
        },
      });
    },
    *userPrizeList({ payload }, { call, put }) {
      const result = yield call(prize.userPrizeList, payload);
      yield put({
        type: 'success',
        payload: {
          userPrizeListRes: result,
        },
      });
    },
    *payInfo({ payload }, { call, put }) {
      const result = yield call(prize.payInfo, payload);
      yield put({
        type: 'success',
        payload: {
          payInfoRes: result,
        },
      });
    },
    *prizeProList({ payload }, { call, put }) {
      const result = yield call(prize.prizeProList, payload);
      yield put({
        type: 'success',
        payload: {
          prizeProListRes: result,
        },
      });
    },
    *activeOpen({ payload }, { call, put }) {
      const result = yield call(prize.activeOpen, payload);
      yield put({
        type: 'success',
        payload: {
          activeOpenRes: result,
        },
      });
    },
    *handlePrize({ payload }, { call, put }) {
      const result = yield call(prize.handlePrize, payload);
      yield put({
        type: 'success',
        payload: {
          handlePrizeRes: result,
        },
      });
    },
    *prizeResult({ payload }, { call, put }) {
      const result = yield call(prize.prizeResult, payload);
      yield put({
        type: 'success',
        payload: {
          prizeResultRes: result,
        },
      });
    },
    *saveUserData({ payload }, { call, put }) {
      const result = yield call(prize.saveUserData, payload);
      yield put({
        type: 'success',
        payload: {
          saveUserDataRes: result,
        },
      });
    },
    *getPrizeNum({ payload }, { call, put }) {
      const result = yield call(prize.getPrizeNum, payload);
      yield put({
        type: 'success',
        payload: {
          getPrizeNumRes: result,
        },
      });
    },
    *prizeSendOrder({ payload }, { call, put }) {
      const result = yield call(prize.prizeSendOrder, payload);
      yield put({
        type: 'success',
        payload: {
          prizeSendOrderRes: result,
        },
      });
    },
    *isPrizeRight({ payload }, { call, put }) {
      const result = yield call(prize.isPrizeRight, payload);
      yield put({
        type: 'success',
        payload: {
          isPrizeRightRes: result,
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