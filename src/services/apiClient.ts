import axios from 'axios';
import {getItem} from './storage';

const ApiClient = () => {
  const api = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });

  api.interceptors.request.use(
    async config => {
      const token = await getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error),
  );

  const get = (path: string, params: object) => {
    return api.get(path, {params}).then(response => response);
  };

  const post = (path: string, body: object | string, params: object) => {
    return api.post(path, body, params).then(response => response);
  };

  const put = (path: string, body: object | string, params: object) => {
    return api.put(path, body, params).then(response => response);
  };

  const patch = (path: string, body: object | string, params: object) => {
    return api.patch(path, body, params).then(response => response);
  };

  const del = (path: string) => {
    return api.delete(path).then(response => response);
  };

  return {
    get,
    post,
    patch,
    put,
    del,
  };
};

export default ApiClient;
