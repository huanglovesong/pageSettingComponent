import axios from '../utils/axios';
import Api from '../configs/api';

export function getBanner(params) {
    return axios.get(configs.openAPI + Api.getBanner, { params });
}
export function getIndexMenu(params) {
    return axios.get(configs.openAPI + Api.getIndexMenu, { params: params || {} });
}
