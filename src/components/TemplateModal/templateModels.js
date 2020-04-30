import * as template from './templateServices';
import { message } from 'antd';

export default {
    namespace: 'template',
    state: {},
    effects: {
        *GetTemplate({ payload }, { call, put }) {
            const regRes = yield call(template.GetTemplate, payload);
            if (regRes.code == '0') {
                yield put({
                    type: 'success',
                    GetTemplate: regRes
                });
            } else {
                message.destroy();
                message.warning(regRes.message);
            }
        }
    },
    reducers: {
        success(state, payload) {
            return { ...state, ...payload };
        }
    } 
};
