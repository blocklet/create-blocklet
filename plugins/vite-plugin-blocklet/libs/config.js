import fs from 'fs';
import YAML from 'yaml';
import { toBlockletDid } from './utils';

export default function createConfigPlugin() {
  return {
    name: 'blocklet:config',
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
