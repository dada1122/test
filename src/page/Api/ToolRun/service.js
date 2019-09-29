import request from '@/util/request';

export async function submitToolExec(params) {
  return request('/api/tool/exec', {
    method: 'POST',
    body: params,
  });
}
