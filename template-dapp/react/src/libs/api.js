import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const prefix = window.blocklet ? window.blocklet.prefix : '/';
    config.baseURL = prefix || '';
    config.timeout = 200000;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
