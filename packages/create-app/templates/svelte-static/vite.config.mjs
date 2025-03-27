import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      host: true,
    },
    plugins: [
      svelte(),
      createBlockletPlugin({
        disableLoading: true,
      }),
    ],
  };
});
