import axios from '../utils/axios';
import Api from '../configs/api';

export function getOrderDetail(params) {
    return axios.get(configs.openAPI + Api.getOrderDetail, { params });
}