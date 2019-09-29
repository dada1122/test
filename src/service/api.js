import { stringify } from 'qs';
import request from '@/util/request';

export async function queryTestCaseList(params) {
  return request(`/test/testcase/list?${stringify(params)}`);
}

export async function queryTestCase(params) {
  return request(`/api/testcase?${stringify(params)}`);
}

export async function queryTestCaseDetail(id) {
  return request(`/api/testcase/${id}`);
}

export async function queryTestRecord(params) {
  return request(`/api/testrecord?${stringify(params)}`);
}

export async function queryTestDetail(params) {
  return request(`/api/testdetail?${stringify(params)}`);
}

export async function queryDynamicParam(params) {
  return request(`/api/dynamicParam?${stringify(params)}`);
}

export async function queryDynamicParamList(params) {
  return request(`/dynamic_param/list?${stringify(params)}`);
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

// api-tool相关接口
export async function queryApiList(params) {
  return request(`/api/list?${stringify(params)}`);
}

export async function queryApiDetail(id) {
  return request(`/api/list/${id}`);
}

export async function submitRPCExec(params) {
  return request('/api/rpc/exec', {
    method: 'POST',
    body: params,
  });
}

export async function submitRPCSave(params) {
  return request('/api/rpc/create', {
    method: 'POST',
    body: params,
  });
}

export async function submitRPCEdit(params) {
  return request('/api/rpc/update', {
    method: 'POST',
    body: params,
  });
}

export async function deleteApi(id) {
  return request(`/api/delete/${id}`);
}

export async function createTestCase(params) {
  return request('/api/testcase/create', {
    method: 'POST',
    body: params,
  });
}

export async function createDynamicParam(params) {
  return request('/api/dynamicparam/create', {
    method: 'POST',
    body: params,
  });
}

export async function editTestCase(params) {
  return request('/api/testcase/update', {
    method: 'POST',
    body: params,
  });
}

export async function execTestCase(params) {
  console.log(`execTestCase ${params}`);
  return request('/api/testcase/exec', {
    method: 'POST',
    body: params,
  });
}

export async function editDynamicParam(params) {
  return request('/api/dynamicparam/update', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function submitTRExec(params) {
  return request('/api/tr/exec', {
    method: 'POST',
    body: params,
  });
}

export async function submitTRSave(params) {
  return request('/api/tr/create', {
    method: 'POST',
    body: params,
  });
}

export async function submitTREdit(params) {
  return request('/api/tr/update', {
    method: 'POST',
    body: params,
  });
}

export async function submitJSONExec(params) {
  return request('/api/json/exec', {
    method: 'POST',
    body: params,
  });
}

export async function submitJSONSave(params) {
  return request('/api/json/create', {
    method: 'POST',
    body: params,
  });
}

export async function submitJSONEdit(params) {
  return request('/api/json/update', {
    method: 'POST',
    body: params,
  });
}

export async function submitHSFEdit(params) {
  return request('/api/hsf/update', {
    method: 'POST',
    body: params,
  });
}

export async function submitHSFSave(params) {
  return request('/api/hsf/create', {
    method: 'POST',
    body: params,
  });
}

export async function submitHSFExec(params) {
  return request('/api/hsf/exec', {
    method: 'POST',
    body: params,
  });
}

export async function submitSPIEdit(params) {
  return request('/api/spi/update', {
    method: 'POST',
    body: params,
  });
}

export async function submitSPISave(params) {
  return request('/api/spi/create', {
    method: 'POST',
    body: params,
  });
}

export async function submitSPIExec(params) {
  return request('/api/spi/exec', {
    method: 'POST',
    body: params,
  });
}

export async function queryToolList(params) {
  return request(`/tool/list?${stringify(params)}`);
}

export async function queryToolDetail(id) {
  return request(`/tool/list/${id}`);
}

export async function submitToolExec(params) {
  return request('/tool/exec', {
    method: 'POST',
    body: params,
  });
}
