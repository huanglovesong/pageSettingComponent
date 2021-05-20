import axios from '../utils/axiosPageSetting';
import Api from '../configs/api';
export function getPage(params) {
    return axios.get(configs.openAPI + Api.getPage, { params });
}
export function getHomePage(params) {
    return axios.get(configs.openAPI + Api.getHomePage, { params });
}
export function CardActivityOvered(params) {
    return axios.get(configs.openAPI + Api.CardActivityOvered, { params });
}
export function ObtainCard(params) {
    return axios.post(configs.openAPI + Api.ObtainCard, params);
}

export function getPrizeNum(params) {
    return axios.post(configs.openAPI + Api.getPrizeNum, params);
}

export function addPrizeNum(params) {
    return axios.post(configs.openAPI + Api.addPrizeNum, params);
}
export function handlePrize(params) {
    return axios.post(configs.openAPI + Api.handlePrize, params);
}
