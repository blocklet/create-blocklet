import createHmrPlugin from './libs/hmr.js';
import createConfigPlugin from './libs/config.js';
import createMetaPlugin from './libs/meta.js';
import { isInBlocklet } from './libs/utils.js';

export function createBlockletPlugin(options = {}) {
  const { disableConfig = false, disableMeta = false, disableHmr = false } = options;
  const plugins = [];
  if (!disableMeta) {
    plugins.push(createMetaPlugin(options));
  }
  if (!disableConfig) {
    plugins.push(createConfigPlugin(options));
  }
  if (isInBlocklet) {
    if (!disableHmr) {
      plugins.push(createHmrPlugin(options));
    }
  }

  return plugins;
}
