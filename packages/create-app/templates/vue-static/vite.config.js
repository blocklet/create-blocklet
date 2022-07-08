import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import createWssHmrPlugin from 'vite-plugin-wss-hmr';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const envMap = loadEnv(mode, process.cwd(), '');
  const port = process.env.BLOCKLET_PORT || 3000;

  const whenDev = mode === 'development';

  let mountPoint = process.env.BLOCKLET_DEV_MOUNT_POINT || '';

  if (mountPoint && !mountPoint.endsWith('/')) {
    mountPoint = `${mountPoint}/`;
  }

  const base = whenDev ? mountPoint : process.env.BASE_URL || '/';

  return {
    base,
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            base,
            title: envMap.APP_TITLE,
          },
        },
      }),
      await createWssHmrPlugin(),
    ],
    server: {
      port,
    },
  };
});
