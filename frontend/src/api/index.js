import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001'
});

api.interceptors.request.use(async config => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    config.headers.authorization = `Token ${token}`
  }
  return config;
});

export default api;