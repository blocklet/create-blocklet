import { isEqual, joinURL, withTrailingSlash } from 'ufo';
import { toBlockletDid, isInBlocklet, blockletPort, blockletPrefix, getBlockletYAML } from './utils.js';

export default function createConfigPlugin() {
  return {
    name: 'blocklet:config',
    configureServer(server) {
      if (isInBlocklet) {
        server.middlewares.use((req, res, next) => {
          // blocklet server 会把设置的 base 从请求 url 中移除，所以需要再加回 base
          if (!req.url.startsWith(blockletPrefix)) {
            req.url = joinURL(blockletPrefix || '/', req.url);
          }
          // NOTICE: 由于传递给 vite 的 base 是带有结尾 slash 的，所以需要确保传递的 vite 的 url 在等于 blockletPrefix 也一定要带有结尾 slash
          if (isEqual(req.url, blockletPrefix)) {
            req.url = withTrailingSlash(req.url);
          }
          return next();
        });
      }
    },
    async config(config, { command }) {
      if (command === 'serve') {
        const targetConfig = {};
        targetConfig.base = withTrailingSlash(joinURL('/', config.base || blockletPrefix));
        targetConfig.server = config.server || {};

        if (!targetConfig.server.port) {
          const port = blockletPort || 3000;
          targetConfig.server.port = port;
        }
        targetConfig.server.allowedHosts = true;

        return targetConfig;
      }

      if (command === 'build') {
        if (!config.base) {
          try {
            let { name, did } = await getBlockletYAML();
            if (!did && name) {
              did = toBlockletDid(name);
            }
            if (did) {
              const base = `/.blocklet/proxy/${did}/`;
              return {
                base,
              };
            }
          } catch (err) {
            console.error(err);
            return {};
          }
        }
      }

      return {};
    },
  };
}
