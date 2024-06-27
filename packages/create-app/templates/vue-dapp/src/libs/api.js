import { createAxios } from '@blocklet/js-sdk';

const api = createAxios({
  baseURL: window?.blocklet?.prefix || '/',
});

export default api;
