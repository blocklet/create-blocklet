import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig(() => {
  return {
    plugins: [solidPlugin(), createBlockletPlugin(), nodePolyfills({ protocolImports: true })],
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
  };
});
