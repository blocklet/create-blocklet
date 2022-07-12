import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      solidPlugin(),
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
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
  };
});
