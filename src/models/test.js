import axios from '../utils/axios';
import Api from '../configs/api';

export function getPage(params) {
    console.log(Api, 333333)
    console.log(axios, 444444)
    return axios.get(configs.openAPI + Api.getPage, { params });
}
export function getPagePreview(params) {
    return axios.get(configs.openAPI + Api.getPagePreview, { params });
}

export default {
    namespace: 'pageSetting',
    state: {},
    effects: {
        *getPagePreview({ payload, callback }, { call, put }) {
            const testRes = yield call(getPagePreview, payload);
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
            const testRes = yield call(getPage, payload);
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