import axios from '../utils/axios';
import Api from '../configs/api';

export function getCode(params) {
    return axios.post(configs.openAPI + Api.getCode, params);
}
export function touristlogin(params) {
    return axios.post(configs.openAPI + Api.touristlogin, params);
}

export function fuluusertoken(params) {
    return axios.post(configs.openAPI + Api.fuluusertoken, params);
}