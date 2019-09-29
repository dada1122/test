import request from '@/util/request';
import { stringify } from 'qs';

export async function queryApiList(params) {
  return request(`/api/list?${stringify(params)}`);
}

export async function queryApiDetail(id) {
  return request(`/api/list/${id}`);
}
