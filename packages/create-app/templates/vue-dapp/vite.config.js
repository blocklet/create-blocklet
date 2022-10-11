import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');
  const apiPort = envMap.API_PORT || 3030;
  const apiPrefix = `${process.env.BLOCKLET_DEV_MOUNT_POINT || ''}/api`;

  return {
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: envMap.APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
    ],
    server: {
      proxy: {
        [apiPrefix]: {
          target: `http://127.0.0.1:${apiPort}`,
          rewrite: (path) => path.replace(apiPrefix, '/api'), // rewrite path when blocklet dev
        },
      },
    },
  };
});
