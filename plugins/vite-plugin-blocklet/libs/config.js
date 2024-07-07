import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { toBlockletDid, isInBlocklet, blockletPort, blockletPrefix } from './utils.js';

export default function createConfigPlugin() {
  return {
    name: 'blocklet:config',
    configureServer(server) {
      if (isInBlocklet) {
        server.middlewares.use((req, res, next) => {
          // blocklet server 会把设置的 base 从请求 url 中移除，所以需要再加回 base
          if (!req.url.startsWith(blockletPrefix)) {
            req.url = path.join(blockletPrefix || '/', req.url);
          }
          return next();
        });
      }
    },
    config(config, { command }) {
      if (command === 'serve') {
        const targetConfig = {};
        targetConfig.base = path.join('/', config.base || blockletPrefix, '/');
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
            const blockletYamlPath = './blocklet.yml';
            const blockletYaml = YAML.parse(fs.readFileSync(blockletYamlPath, 'utf8'));
            let { name, did } = blockletYaml;
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
