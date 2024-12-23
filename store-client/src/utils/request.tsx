import axios from 'axios';
import { getToken } from './token';

const request = axios.create({
  baseURL: 'http://localhost:8800',
  timeout: 5000,
});

//通过响应拦截器，在请求头一栏带上token
request.interceptors.request.use(config => {
  const token =getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//通过响应拦截器，拒绝返回没有token的请求
request.interceptors.response.use(response => {
  if (response.status === 401) {
    // 未登录，跳转登录页面
    window.location.href = '/login';
  }
  return response;
});

export default request;