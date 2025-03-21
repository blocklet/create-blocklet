/* eslint-disable import/no-extraneous-dependencies */
import { initBlockStudioPlugins } from '@blocklet/pages-kit-block-studio/plugins';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      createBlockletPlugin(),
      svgr(),
      initBlockStudioPlugins({
        formats: ['es'],
      }),
    ],
    server: {
      allowedHosts: true,
      fs: {
        strict: false, // monorepo and pnpm required
      },
    },
  };
});
