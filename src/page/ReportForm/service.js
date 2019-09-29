import request from '@/util/request';

export async function queryRule(params) {
  return request(`/test_record/statistic/list`, {
    params,
  });
}


