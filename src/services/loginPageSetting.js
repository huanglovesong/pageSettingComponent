import axios from '../utils/axiosPageSetting';
import Api from '../configs/api';

export function decryptInfo(params) {
    return axios.get(configs.openAPI + Api.decryptInfo, { params });
}
export function phoneDecrypt(params) {
    return axios.get(configs.openAPI + Api.phoneDecrypt, { params });
}

export function flowDecrypt(params) {
    return axios.get(configs.openAPI + Api.flowDecrypt, { params });
}

export function getCode(params) {
    return axios.post(configs.openAPI + Api.getCode, params);
}
export function touristlogin(params) {
    return axios.post(configs.openAPI + Api.touristlogin, params);
}

export function fuluusertoken(params) {
    return axios.post(configs.openAPI + Api.fuluusertoken, params);
}

export function getUnionOpenId(params) {
    return axios.post(configs.openAPI + Api.getUnionOpenId, params);
}

export function pinanLogin(params) {
    return axios.get(configs.openAPI + Api.pinanLogin, { params });
}
export function ablogin(params) {
    return axios.get(configs.openAPI + Api.ablogin, { params });
}

export function panlogin(params) {
    return axios.get(configs.openAPI + Api.panlogin, { params });
}