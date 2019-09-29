import request from '@/util/request';
import { stringify } from 'qs';

export async function queryRule(params) {
  return request(`/atomicrulesmanager`, {
    params,
  });
}

export async function queryToolList(params) {
  return request(`/api/atomicRuleList?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/tooltablelist', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/tooltablelist', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/tooltablelist', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
