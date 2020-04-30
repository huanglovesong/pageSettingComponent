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
    },
    reducers: {
        success(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}