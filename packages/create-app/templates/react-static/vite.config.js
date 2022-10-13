import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');

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
  };
});
