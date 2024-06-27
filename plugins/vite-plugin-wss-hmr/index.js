import { createServer as createViteServer } from 'vite';

async function createVitePlugin() {
  let pongPoll, hmrServer;

  let hmrServiceConfig = {
    mode: 'development-hmr',
    // Any legal user configuration options, plus `mode` and `configFile`
    configFile: false,
    server: {
      https: true,
      strictPort: true,
      hmr: {
        host: 'localhost',
        protocol: 'wss',
      },
      fs: {
        strict: false,
      },
    },
  };

  return {
    async config(config, { mode }) {
      if (mode === 'development') {
        console.log(`[vite-plugin-wss-hmr] prepare to handle config`);

        const hmrPort = Number(config?.server?.port || 3000) + 100;

        // auto load base
        if (config.base) {
          hmrServiceConfig.base = config.base;
        }

        // auto set strictPort
        if (!config.server.strictPort) {
          config.server.strictPort = true;
        }

        // auto set fs.strict
        if (!config.server?.fs?.strict) {
          config.server.fs = {
            strict: false,
          };
        }

        // auto set hmrServiceConfig
        hmrServiceConfig.server.hmr = {
          ...config?.server?.hmr,
          ...hmrServiceConfig.server.hmr,
          port: hmrPort,
        };

        config.server.hmr = hmrServiceConfig.server.hmr;

        // open hmr server
        console.log(`[vite-plugin-wss-hmr] opening hmrServer`);

        hmrServer = await createViteServer(hmrServiceConfig);

        pongPoll = setInterval(() => {
          hmrServer?.ws.send({
            type: 'pong',
          });
        }, 30 * 1000);
      }
    },
    buildStart() {
      if (hmrServer?.ws) {
        const { base = '' } = hmrServiceConfig;
        const { host, port } = hmrServiceConfig.server?.hmr;
        console.log(`[vite-plugin-wss-hmr] hmrServer working on wss://${host}:${port}${base}`);
        setTimeout(() => {
          console.warn(
            `[vite-plugin-wss-hmr] if you use this plugin for the first time, please visit https://${host}:${port}${base} , and add your browser(which used of dev) as trust`,
          );
        }, 3000);
      }
    },
    handleHotUpdate({ modules }) {
      const updateFileUrlList = [];

      const updates = modules.map((item) => {
        updateFileUrlList.push(item.url || '');
        return {
          type: `${item.type}-update`,
          timestamp: item.lastInvalidationTimestamp,
          path: item.url,
          acceptedPath: item.url,
        };
      });

      if (updates.length > 0) {
        console.log(`[vite-plugin-wss-hmr] hot reloading: ${updateFileUrlList.join(' ')} updates`);

        hmrServer?.ws.send({
          type: 'update',
          updates,
        });
      }

      return [];
    },
    buildEnd() {
      console.log(`[vite-plugin-wss-hmr] hmrServer closed`);

      if (pongPoll) {
        clearInterval(pongPoll);
      }
      if (hmrServer) {
        hmrServer?.close();
      }
    },
  };
}

module.exports = createVitePlugin;
