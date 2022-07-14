import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { toBlockletDid, isInBlocklet } from './utils.js';

export default function createConfigPlugin() {
  return {
    name: 'blocklet:config',
    configureServer(server) {
      if (isInBlocklet) {
        server.middlewares.use((req, res, next) => {
          const prefix = req.headers['x-path-prefix'] || '/';
          // blocklet server 会把设置的 base 从请求 url 中移除，所以需要再加回 base
          if (!req.url.startsWith(prefix)) {
            req.url = path.join(prefix || '/', req.url);
          }
          return next();
        });
      }
    },
    config(config, { command }) {
      if (command === 'serve') {
        const targetConfig = {};
        if (!config.base) {
          let base = process.env.BLOCKLET_DEV_MOUNT_POINT || '';

          if (base) {
            if (!base.startsWith('/')) {
              base = `/${base}`;
            }
            if (!base.endsWith('/')) {
              base = `${base}/`;
            }
          }
          targetConfig.base = base;
        }
        if (!config.server.port) {
          const port = process.env.BLOCKLET_PORT || 3000;
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
            const { name } = blockletYaml;
            if (name) {
              const did = toBlockletDid(name);
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
