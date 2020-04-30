import axios from '../utils/axios';
import Api from '../configs/api';

export function getOrderList(params) {
    return axios.get(configs.openAPI + Api.getOrderList, { params });
}
