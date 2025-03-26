import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

export default defineConfig(() => {
  return {
    server: {
      host: true,
    },
    plugins: [solidPlugin(), createBlockletPlugin()],
    build: {
      target: 'esnext',
      polyfillDynamicImport: false,
    },
  };
});
