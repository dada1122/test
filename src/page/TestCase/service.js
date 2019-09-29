import request from '@/util/request';
import { stringify } from 'qs';

//获取测试用例列表
export async function list(params) {
  return request(`/testcase/list?${stringify(params)}`);
}

//获取测试用例详情
export async function get(id) {
  return request(`/testcase/detail/${id}`);
}

//修改或新建测试用例
export async function save(params) {
  return request('/testcase/save', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//执行测试用例
export async function exec(params) {
  return request('/testcase/exec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
