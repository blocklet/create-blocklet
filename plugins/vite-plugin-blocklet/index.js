import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { createDefu } from 'defu';

import createHmrPlugin from './libs/hmr.js';
import createConfigPlugin from './libs/config.js';
import createMetaPlugin from './libs/meta.js';
import createLoadingPlugin from './libs/loading.js';
import createDebugPlugin from './libs/debug.js';
import createExpressPlugin from './libs/express.js';
import createEmbedPlugin from './libs/embed.js';
import createAssetHostPlugin from './libs/asset-host.js';
import setupClient from './libs/client.js';

/**
 * Plugin options.
 *
 * @typedef {Object} PluginOptions
 * @property {boolean} [disableNodePolyfills=false] - Disable node polyfills.
 * @property {boolean} [disableConfig=false] - Disable config plugin.
 * @property {boolean} [disableMeta=false] - Disable meta plugin.
 * @property {boolean} [disableHmr=false] - Disable hmr plugin.
 * @property {boolean} [disableLoading=false] - Disable loading plugin.
 * @property {boolean} [disableDebug=false] - Disable debug plugin.
 * @property {boolean} [disableEmbed=false] - Disable embed plugin.
 *
 * @property {import('vite-plugin-node-polyfills').PolyfillOptions} [nodePolyfillsOptions]
 *
 * @property {string} [loadingElementId='app'] - The ID of the loading element.
 * @property {string} [loadingColor='#8abaf0'] - The color of the loading animation.
 * @property {string} [loadingImage='/.well-known/service/blocklet/logo?imageFilter=convert&f=png&w=80'] - The URL of the loading image.
 * @property {boolean} [loadingShowDots=true] - Whether to show the loading dots animation.
 * @property {boolean} [loadingShowPoweredBy=true] - Whether to show the "Powered by" text.
 * @property {string} [loadingPoweredByText='Powered by ArcBlock'] - The text to display for "Powered by".
 *
 * @property {'all'|'mobile'|'desktop'} [debugPlatform='mobile'] - The platforms to enable debug mode for.
 * @property {string} [debugScript] - The initialization code for the debug script.
 * @property {number} [positionX=0] - The initialization positionX for entry button.
 * @property {number} [positionY=0] - The initialization positionY for entry button.
 *
 * @property {object} [embeds={}] - The embeds to be built.
 * @property {array} [embedExternals=['react', '@arcblock/ux/lib/Locale/context', '@arcblock/did-connect-react/lib/Session']] - The external modules to be used in the embeds.
 * @property {array} [embedPlugins=[]] - The plugins to be used in the embeds.
 * @property {number} [embedBuildConcurrency=0] - The plugins to be used in the embeds.
 *
 * @property {'middleware'|'client'|'server'|'wsUpgrade'} [hmrMode='middleware'] - 当未传入任何 option 参数时，会自动变为 middleware 模式
 * @property {number} [chunkSizeLimit=2000] - The chunk size limit in KB.
 */

const defuReplaceArray = createDefu((obj, key, value) => {
  // 如果当前值或默认值是数组，直接使用新值（实现替换）
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value
    return true // 返回 true 表示我们已经处理了这个 key，defu 不需要再做默认处理
  }
})

/**
 * Create blocklet plugins.
 *
 * @param {PluginOptions} options
 * @returns {import('vite').Plugin[]}
 */
export function createBlockletPlugin(options = {}) {
  const {
    // NOTICE: 由于 polyfill 不是每个项目都必须的，并且有些现有的项目已经配置了 polyfill，所以这个配置默认 disable 会比较好
    // UPDATE: 经过实践，大部分项目都需要此配置，现变更为默认开启 @2023-04-25
    disableNodePolyfills = false,
    disableConfig = false,
    disableMeta = false,
    disableHmr = false,
    disableLoading = false,
    disableDebug = false,
    disableEmbed = false,
    disableDynamicAssetHost = true,
    nodePolyfillsOptions,
    ...restOptions
  } = options;

  /** @type {import('vite').Plugin[]} */
  const plugins = [];

  if (!disableMeta) {
    plugins.push(createMetaPlugin(restOptions));
  }
  if (!disableConfig) {
    plugins.push(createConfigPlugin(restOptions));
  }
  if (!disableHmr) {
    plugins.push(createHmrPlugin(restOptions));
  }
  if (!disableNodePolyfills) {
    const mergedOptions = defuReplaceArray(nodePolyfillsOptions, {
      include: ['buffer'],
      globals: {
        buffer: true,
        global: false,
        process: false,
      }
    });
    plugins.push(nodePolyfills(mergedOptions));
  }
  if (!disableLoading) {
    plugins.push(createLoadingPlugin(restOptions));
  }
  if (!disableDebug) {
    plugins.push(createDebugPlugin(restOptions));
  }
  if (!disableEmbed) {
    plugins.push(createEmbedPlugin(restOptions));
  }
  if (!disableDynamicAssetHost) {
    plugins.push(createAssetHostPlugin(restOptions));
  }

  return plugins;
}

export {
  setupClient,
  createHmrPlugin as createBlockletHmr,
  createConfigPlugin as createBlockletConfig,
  createMetaPlugin as createBlockletMeta,
  createLoadingPlugin as createBlockletLoading,
  createDebugPlugin as createBlockletDebug,
  createExpressPlugin as createBlockletExpress,
  createEmbedPlugin as createBlockletEmbed,
  nodePolyfills,
};
