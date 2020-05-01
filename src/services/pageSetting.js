import axios from '../utils/axiosPageSetting';
import Api from '../configs/api';
export function getPage(params) {
    return axios.get(configs.openAPI + Api.getPage, { params });
}
export function getHomePage(params) {
    return axios.get(configs.openAPI + Api.getHomePage, { params });
}
