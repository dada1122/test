import request from '@/util/request';

export async function ruleRecordFeedBack(params) {
  return request('/imagetest/batchRuleRecordFeedBack', {
    method: 'POST',
    data: { params },
  });
}
export async function queryRuleRecord(params) {
  return request('/imagetest/ruleRecordList', {
    params,
  });
}
