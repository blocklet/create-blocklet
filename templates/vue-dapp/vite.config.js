import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd());
  return defineConfig({
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base: process.env.BASE_URL || '/',
            title: envMap.VITE_APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
    ],
    server: {
      port: process.env.BLOCKLET_PORT,
      proxy: {
        '/api': 'http://127.0.0.1:3030',
      },
    },
  });
};
