import request from '@/util/request';

export async function fakeChartData() {
  return request('/api/dashboard/fake_chart_data');
}
