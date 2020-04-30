import axios from '../utils/axios';
import Api from '../configs/api';

export function recommendProduct(params) {
    return axios.get(configs.openAPI + Api.recommendProduct, { params });
}
export function getHotCategory(params) {
    return axios.get(configs.openAPI + Api.getHotCategory, { params });
}