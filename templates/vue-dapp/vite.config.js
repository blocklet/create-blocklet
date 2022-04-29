import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const port = process.env.BLOCKLET_PORT || 3000;

  const envMap = loadEnv(mode, process.cwd(), '');
  const apiPort = envMap.API_PORT || 3030;

  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base: process.env.BASE_URL || '/',
            title: envMap.APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
    ],
    server: {
      port,
      proxy: {
        '/api': `http://127.0.0.1:${apiPort}`,
      },
    },
  });
};
