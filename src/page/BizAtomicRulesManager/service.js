import request from '@/util/request';
import { stringify } from 'qs';

//新增业务规则
export async function save(params) {
  return request('/api/bizAtomicRuleAdd', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//修改状态，上下架
export async function edit(params) {
  return request('/api/bizAtomicRulesEdit', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryBizRuleList(params) {
  const { bizcode, currentPage, pageSize } = params;
  const url = `/api/bizRuleList?bizcode=${bizcode}&currentPage=${currentPage}&pageSize=${pageSize}`
  return request(url);

}


