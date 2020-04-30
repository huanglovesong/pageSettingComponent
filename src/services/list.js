import axios from '../utils/axios';
import Api from '../configs/api'; 

export function getFirstMenu(params) {
    return axios.get(configs.openAPI + Api.getFirstMenu, { params: params ? params : {} });
}
export function getsecondMenu(params) {
    return axios.get(configs.openAPI + Api.getsecondMenu, { params: params ? params : {} });
}

export function getHotPro(params) {
    return axios.get(configs.openAPI + Api.getHotPro, { params: params ? params : {} });
}