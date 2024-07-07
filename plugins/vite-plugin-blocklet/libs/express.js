/**
 * Creates a config plugin for Vite development server.
 *
 * @param {object} options - The options for the plugin.
 * @param {string} options.entryPath - The entry path of the Express app.
 * @param {array} options.ignorePath - The entry path of the Express app.
 * @return {object} The Vite config plugin.
 */
export default function createExpressPlugin({ entryPath, ignorePath = [] }) {
  ignorePath = Array.isArray(ignorePath) ? ignorePath : [ignorePath];
  // 此处需要解构 import.meta 对象，才能拿到 vite.config 的地址，否则拿到的地址会是 express.js 文件的地址
  return {
    name: 'blocklet:express',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        process.env.VITE = 'true';
        try {
          const { app } = await server.ssrLoadModule(entryPath);
          app(req, res, next);
        } catch (err) {
          console.error(err);
        }
      });
    },
    handleHotUpdate({ server, modules, timestamp }) {
      const validatedModules = [];
      const invalidatedModules = [];

      for (const mod of modules) {
        if (ignorePath.some((x) => mod.file.startsWith(x))) {
          invalidatedModules.push(mod);
        } else {
          validatedModules.push(mod);
        }
      }
      // 手动使模块失效
      const mods = new Set();
      for (const mod of invalidatedModules) {
        server.moduleGraph.invalidateModule(mod, mods, timestamp, true);
      }
      return validatedModules;
    },
  };
}
