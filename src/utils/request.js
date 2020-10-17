import axios from 'axios';
import qs from 'qs';
import CustomError from './custom-error';

/**
 * Headers是否包含key
 */
const headersHasKey = (headers, type) => {
  if (!headers) return false;
  const keys = Object.keys(headers);
  const list = keys.map((i) => i.toLowerCase());
  return type && list.indexOf(type.toLowerCase()) > -1;
};

/**
 * 是否为Form请求
 */
const isForm = (headers) => {
  if (!headers) return false;
  const headers2 = {};
  Object.keys(headers).forEach((i) => {
    headers2[i.toLowerCase()] = headers[i];
  });
  const contentType = headers2['content-type'];
  return contentType && contentType.includes('x-www-form-urlencoded');
};

/**
 * 传统请求
 * @param {String} methods 请求方式
 * @param {String} url 请求地址
 * @param {Object} option 混入项
 * @param {Object} query 请求参数
 * @param {Object} body 请求参数
 */
function request(method, url, option = {}, query = {}, body = {}) {
  const options = {
    url,
    method: method || 'get',
    data: body,
  };
  if (option) {
    Object.keys(option).forEach((i) => {
      options[i] = option[i];
    });
  }
  if (options.method.toLowerCase() === 'post') {
    if (!options.headers || !headersHasKey(options.headers, 'Content-Type')) {
      if (!options.headers) options.headers = {};
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    if (options.headers && isForm(options.headers)) {
      options.data = qs.stringify(options.data);
    }
  }
  const hasQuery = options.url.indexOf('?') > -1;
  if (hasQuery) {
    options.url += `&${qs.stringify(query)}`;
  } else {
    options.url += `?${qs.stringify(query)}`;
  }
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios(options);
      if (`${res.status}` === '200') {
        const {
          data,
        } = res;
        if (`${data.code}` === '200') {
          resolve(data.data);
        } else {
          reject(new CustomError(data.message, data.code, data.error));
        }
      } else {
        reject(new CustomError(`请求失败，Network Code: [${res.status}]`, res.status));
      }
    } catch (err) {
      reject(new CustomError(`请求失败，Network Code: [${err.request ? err.request.status : 'fail'}]`, -1));
    }
  });
}

export default request;
