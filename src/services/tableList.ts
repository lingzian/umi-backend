import request, { RequestConfig } from './index';

export async function getList(params?: RequestConfig): Promise<any> {
  console.log('发起请求');
  return request('https://randomuser.me/api', { method: 'get', ...params });
}
