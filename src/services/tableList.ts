import request, { RequestConfig } from './index';

export async function getList(params?: RequestConfig): Promise<any> {
  return request('https://randomuser.me/api', { method: 'get', ...params });
}
