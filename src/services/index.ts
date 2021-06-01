import { extend, RequestOptionsInit } from 'umi-request';
import { notification } from 'antd';

/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

export interface RequestConfig extends RequestOptionsInit {}

/** 配置request请求时的默认参数 */
const request = extend({
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

request.interceptors.request.use((url, options) => {
  return { url, options };
});

export default request;
