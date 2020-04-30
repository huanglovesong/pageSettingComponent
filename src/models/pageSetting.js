import * as pageSettingService from '../services/pageSetting';
export default {
    namespace: 'pageSetting',
    state: {},
    effects: {
        *getPagePreview({ payload, callback }, { call, put }) {
            const testRes = yield call(pageSettingService.getPagePreview, payload);
            yield put({
                type: 'success',
                payload: {
                    getPagePreviewResult: testRes
                }
            });
            callback && callback(testRes);
            return testRes;
        },
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