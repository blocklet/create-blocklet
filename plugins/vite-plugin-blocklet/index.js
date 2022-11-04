import createHmrPlugin from './libs/hmr.js';
import createConfigPlugin from './libs/config.js';
import createMetaPlugin from './libs/meta.js';
import setupClient from './libs/client.js';

export function createBlockletPlugin(options = {}) {
  const { disableConfig = false, disableMeta = false, disableHmr = false } = options;
  const plugins = [];
  if (!disableMeta) {
    plugins.push(createMetaPlugin(options));
  }
  if (!disableConfig) {
    plugins.push(createConfigPlugin(options));
  }
  if (!disableHmr) {
    plugins.push(createHmrPlugin(options));
  }

  return plugins;
}

export {
  setupClient,
  createHmrPlugin as createBlockletHmr,
  createConfigPlugin as createBlockletConfig,
  createMetaPlugin as createBlockletMeta,
};
