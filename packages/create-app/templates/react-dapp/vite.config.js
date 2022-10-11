import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');
  const apiPort = envMap.API_PORT || 3030;
  const apiPrefix = `${process.env.BLOCKLET_DEV_MOUNT_POINT || ''}/api`;

  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: envMap.APP_TITLE,
          },
        },
      }),
      createBlockletPlugin(),
      svgr(),
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
