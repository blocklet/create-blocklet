import { getBlockletYAML } from './utils.js';

export default function createAssetHostPlugin() {
  return {
    name: 'blocklet:asset-host',
    async transformIndexHtml(html, ctx) {
      if (ctx.bundle) {
        const { did } = await getBlockletYAML();
        const dynamicBaseAssetsCode = `globalThis.__toCdnUrl = filePath => {
          const blockletBase = '/.blocklet/proxy/${did}/';
          return window.blocklet.ASSET_HOST ? '//' + window.blocklet.ASSET_HOST + blockletBase + filePath : blockletBase + filePath;
        }`;
        return [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: dynamicBaseAssetsCode,
          },
        ];
      }
      return html;
    },
    async config(config, { command }) {
      if (command === 'build') {
        if (!config.experimental?.renderBuiltUrl) {
          return {
            experimental: {
              renderBuiltUrl: (filename, { hostType }) => {
                if (hostType === 'js') {
                  return { runtime: `window.__toCdnUrl(${JSON.stringify(filename)})` };
                }
              },
            },
          }
        }
      }

      return {};
    },
  };
}
