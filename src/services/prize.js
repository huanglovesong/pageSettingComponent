import axios from '../utils/axios';
import Api from '../configs/api';

export function getPrizeNum(params) {
    return axios.post(configs.openAPI + Api.getPrizeNum,  params );
}
export function prizeSendOrder(params) {
    return axios.get(configs.openAPI + Api.prizeSendOrder, { params } );
}
export function isPrizeRight(params) {
    return axios.post(configs.openAPI + Api.isPrizeRight, params );
}
export function saveUserData(params) {
    return axios.post(configs.openAPI + Api.saveUserData, params );
}
export function prizeResult(params) {
    return axios.get(configs.openAPI + Api.prizeResult, { params } );
}
export function handlePrize(params) {
    return axios.post(configs.openAPI + Api.handlePrize, params );
}
export function activeOpen(params) {
    return axios.get(configs.openAPI + Api.activeOpen, { params } );
}
export function prizeProList(params) {
    return axios.get(configs.openAPI + Api.prizeProList, { params } );
}
export function payInfo(params) {
    return axios.post(configs.payment + Api.payInfo, params );
}
export function userPrizeList(params) {
    return axios.get(configs.openAPI + Api.userPrizeList, { params } );
}
export function saveAddress(params) {
    return axios.post(configs.openAPI + Api.saveAddress, params );
}
export function getAddress(params) {
    return axios.get(configs.openAPI + Api.getAddress, { params } );
}
export function addPrizeNum(params) {
    return axios.post(configs.openAPI + Api.addPrizeNum, params );
}