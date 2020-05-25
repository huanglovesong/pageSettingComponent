import * as pageSettingService from '../services/pageSetting';

export default {
    namespace: 'pageSetting',
    state: {},
    effects: {
        *getPage({ payload, callback }, { call, put }) {
            const testRes = yield call(pageSettingService.getPage, payload);
            yield put({
                type: 'success',
                payload: {
                    getPageResult: testRes
                }
            });
            callback && callback(testRes);
            return testRes;
        },
        *CardActivityOvered({ payload }, { call, put }) {
            const result = yield call(pageSettingService.CardActivityOvered, payload);
            yield put({
                type: 'success',
                payload: {
                    CardActivityOvered: result,
                },
            });
            return result;
        },
        *ObtainCard({ payload }, { call, put }) {
            const result = yield call(pageSettingService.ObtainCard, payload);
            yield put({
                type: 'success',
                payload: {
                    ObtainCard: result,
                },
            });
            return result;
        },
    },
    reducers: {
        success(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        },
        commonRequest(state, { payload }) {
            return {
              ...state,
              ...payload,
            };
          },
    }
}