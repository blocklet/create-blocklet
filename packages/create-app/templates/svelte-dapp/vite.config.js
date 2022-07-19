import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');
  const apiPort = envMap.API_PORT || 3030;

  return {
    plugins: [
      svelte(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: envMap.APP_TITLE,
          },
        },
      }),
      createBlockletPlugin({ version: 2 }),
    ],
    server: {
      proxy: {
        '/api': `http://127.0.0.1:${apiPort}`,
      },
    },
  };
});
