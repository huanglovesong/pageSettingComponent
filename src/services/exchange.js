import axios from '../utils/axiosPageSetting';
import Api from '../configs/api';

export function orderlist(params) {
    return axios.get(configs.openAPI + Api.orderlist, { 'params': params });
}

export function getuserinfo(params) {
    return axios.get(configs.openAPI + Api.getuserinfo, { 'params': params });
}

export function GetProductList(params) {
    return axios.get(configs.openAPI + Api.GetProductList, { 'params': params });
}

export function GetProductTemp(params) {
    return axios.get(configs.openAPI + Api.GetProductTemp, { 'params': params });
}

export function GetOrderDetail(params) {
    return axios.get(configs.openAPI + Api.GetOrderDetail, { 'params': params });
}

export function sendOrder(params) {
    return axios.post(configs.openAPI + Api.sendOrder, params);
}


export function GetBanner(params) {
    return axios.get(configs.openAPI + Api.GetBanner, { 'params': params });
}

export function getcard(params) {
    return axios.post(configs.openAPI + Api.getcard, params);
}

export function sendCardOrder(params) {
    return axios.post(configs.openAPI + Api.sendCardOrder, params);
}
