/* eslint-disable import/no-extraneous-dependencies */
import { initBlockStudioPlugins } from '@blocklet/pages-kit-block-studio/plugins';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
// @ts-ignore
export default defineConfig(() => {
  return {
    plugins: [vitePluginRequire(), tsconfigPaths(), react(), ...initBlockStudioPlugins()],
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
