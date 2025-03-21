/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(() => {
  return {
    plugins: [vitePluginRequire(), tsconfigPaths()],
    resolve: {
      alias: {
        crypto: 'node:crypto',
      },
    },
    server: {
      hmr: false,
    },
  };
});
