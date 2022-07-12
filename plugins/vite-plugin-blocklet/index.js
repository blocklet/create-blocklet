import createHmrPlugin from './libs/hmr';
import createConfigPlugin from './libs/config';
import createMetaPlugin from './libs/meta';
import { isInBlocklet } from './libs/utils';

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
