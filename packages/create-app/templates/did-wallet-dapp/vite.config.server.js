import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vitePluginRequire()],
  };
});
