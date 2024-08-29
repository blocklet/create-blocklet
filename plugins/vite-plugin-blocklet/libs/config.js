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
        if (!(config.server && config.server.port)) {
          const port = blockletPort || 3000;
          targetConfig.server = {
            port,
          };
        }
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
