import { stringify } from 'qs';
import request from '@/util/request';

export async function paramsList(params) {
  return request(`/dynamic_param/list?${stringify(params)}`);
}

export async function paramsSave(params) {
  return request('/dynamic_param/save', {
    method: 'POST',
    body: params,
  });
}

export async function paramsDebug(params) {
  return request('/dynamic_param/debug', {
    method: 'POST',
    body: params,
  });
}

export async function paramsDelete(params) {
  return request(`/dynamic_param/delete?${stringify(params)}`);
}
