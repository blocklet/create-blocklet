import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { minifyHtml, injectHtml } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      minifyHtml(),
      injectHtml({
        data: {
          base: process.env.BASE_URL || '/',
          title: envMap.VITE_APP_TITLE,
        },
      }),
    ],
    server: {
      port: process.env.BLOCKLET_PORT,
      proxy: {
        '/api': 'http://127.0.0.1:3030',
      },
    },
  });
};
