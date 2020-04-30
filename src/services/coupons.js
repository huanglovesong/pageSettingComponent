import axios from '../utils/axios';
import Api from '../configs/api';

export function CardActivityOvered(params) {
    return axios.get(configs.openAPI + Api.CardActivityOvered, {params});
}
export function ObtainCard(params) {
    return axios.post(configs.openAPI + Api.ObtainCard, params);
}
export function GetProInfoDetailCouponList(params) {
    return axios.get(configs.openAPI + Api.GetProInfoDetailCouponList, {params});
}
export function GetUserCouponList(params) {
    return axios.get(configs.openAPI + Api.GetUserCouponList, {params});
}
export function GetOrderDetailsCouponList(params) {
    return axios.get(configs.openAPI + Api.GetOrderDetailsCouponList, {params});
}

export function GetCouponProductList(params) {
    return axios.get(configs.openAPI + Api.GetCouponProductList, {params});
}
