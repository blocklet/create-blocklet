import { nodePolyfills } from 'vite-plugin-node-polyfills';
import createHmrPlugin from './libs/hmr.js';
import createConfigPlugin from './libs/config.js';
import createMetaPlugin from './libs/meta.js';
import setupClient from './libs/client.js';

export function createBlockletPlugin(options = {}) {
  const {
    // NOTICE: 由于 polyfill 不是每个项目都必须的，并且有些现有的项目已经配置了 polyfill，所以这个配置默认 disable 会比较好
    // UPDATE: 经过实践，大部分项目都需要此配置，现变更为默认开启 @2023-04-25
    disableNodePolyfills = false,
    disableConfig = false,
    disableMeta = false,
    disableHmr = false,
  } = options;
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
  if (!disableNodePolyfills) {
    plugins.push(nodePolyfills({ protocolImports: true }));
  }

  return plugins;
}

export {
  setupClient,
  createHmrPlugin as createBlockletHmr,
  createConfigPlugin as createBlockletConfig,
  createMetaPlugin as createBlockletMeta,
  nodePolyfills,
};
