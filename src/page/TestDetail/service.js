import request from '@/util/request';

export async function queryRule(params) {
  return request(`/test_detail/list`, {
    params,
  });
}


