import createHmrPlugin from './libs/hmr.js';
import createConfigPlugin from './libs/config.js';
import createMetaPlugin from './libs/meta.js';

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

export const createBlockletHmr = createHmrPlugin;
export const createBlockletConfig = createConfigPlugin;
export const createBlockletMeta = createMetaPlugin;
