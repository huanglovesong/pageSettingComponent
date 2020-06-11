// import queryString from 'query-string';
import * as exchange from '../services/exchange';

export default {
    namespace: 'exchange',
    state: {},
    effects: {
        *sendCardOrder({ payload }, { call, put }) {
            const result = yield call(exchange.sendCardOrder, payload);
            yield put({
                type: 'success',
                payload: {
                    sendCardOrderResult: result
                },
            });
        },
        *getcard({ payload }, { call, put }) {
            const result = yield call(exchange.getcard, payload);
            yield put({
                type: 'success',
                payload: {
                    getcardResult: result
                },
            });
        },
        *GetBanner({ payload }, { call, put }) {
            const result = yield call(exchange.GetBanner, payload);
            yield put({
                type: 'success',
                payload: {
                    GetBannerResult: result
                },
            });
        },
        *sendOrder({ payload }, { call, put }) {
            const result = yield call(exchange.sendOrder, payload);
            yield put({
                type: 'success',
                payload: {
                    sendOrderResult: result
                },
            });
        },
        *GetOrderDetail({ payload }, { call, put }) {
            const result = yield call(exchange.GetOrderDetail, payload);
            yield put({
                type: 'success',
                payload: {
                    GetOrderDetailResult: result
                },
            });
        },
        *GetProductTemp({ payload }, { call, put }) {
            const result = yield call(exchange.GetProductTemp, payload);
            yield put({
                type: 'success',
                payload: {
                    getGameProTemp: result
                },
            });
        },
        *GetProductList({ payload }, { call, put }) {
            const result = yield call(exchange.GetProductList, payload);
            yield put({
                type: 'success',
                payload: {
                    GetProductListResult: result
                },
            });
        },
        *getuserinfo({ payload }, { call, put }) {
            const result = yield call(exchange.getuserinfo, payload);
            yield put({
                type: 'success',
                payload: {
                    getuserinfoResult: result
                },
            });
        },
        *orderlist({ payload }, { call, put }) {
            const result = yield call(exchange.orderlist, payload);
            yield put({
                type: 'success',
                payload: {
                    orderlistResult: result
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
