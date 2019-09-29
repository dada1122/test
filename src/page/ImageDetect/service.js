import { stringify } from 'qs';
import request from '@/util/request';

// 执行测试用例
export async function exec(params) {
  return request('/imagedetect/exec', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
