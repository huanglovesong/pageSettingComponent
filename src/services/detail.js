import axios from '../utils/axios';
import Api from '../configs/api';

export function getGoodsList(params) {
    return axios.get(configs.openAPI + Api.getGoodsList, { params });
}
export function getGameProTemp(params) {
    return axios.get(configs.openAPI + Api.getGameProTemp, { params });
}
export function sendOrder(params) {
    return axios.post(configs.openAPI + Api.sendOrder, params);
}
export function sendCardOrder(params) {
    return axios.post(configs.openAPI + Api.sendCardOrder, params);
}
export function getProductById(params) {
    return axios.get(configs.openAPI + Api.getProductById, { params });
}
export function getSecretCard(params) {
    return axios.post(configs.openAPI + Api.getSecretCard, params);
}
export function GetPassCodeStatus(params) {
    return axios.get(configs.openAPI + Api.getPassCodeStatus, { params });
}
export function GetPassCode(params) {
    return axios.get(configs.openAPI + Api.getPassCode, { params });
}