import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue2';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), createBlockletPlugin(), nodePolyfills({ protocolImports: true })],
    define: {
      global: 'window',
    },
  };
});
