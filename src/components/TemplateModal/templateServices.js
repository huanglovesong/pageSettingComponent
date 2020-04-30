import axios from '../../utils/axios';
import Api from '../../configs/api';

export function GetTemplate(params) {
  return axios.get(Api.GetProductTemplate, { params });
}