import axios from '../utils/axios';
import Api from '../configs/api';
export function getPage(params) {
    return axios.get(configs.openAPI + Api.getPage, { params });
}
export function getHomePage(params) {
    return axios.get(configs.openAPI + Api.getHomePage, { params });
}
