import request from '@/util/request';

export async function queryTestLog(params) {
  return request(`/test_record/log`, {
    params,
  });
}
