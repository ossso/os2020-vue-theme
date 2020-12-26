/**
 * ZBlogPHP Api接口
 */

import request from '@/utils/request';

const {
  host,
} = {
  host: process.env.NODE_ENV === 'production' ? window.bloghost : '/',
};

export default (options) => {
  const {
    method,
    type,
    query,
    body,
    headers,
  } = options || {
    method: 'get',
  };
  const option = {};
  if (headers) {
    option.headers = headers;
  }
  const url = `${host}zb_system/api.php`;
  return request(method || type, url, option, query, body);
};
