import path from 'node:path';
import { promises as fs } from 'node:fs';
import { findExportNames } from 'mlly';
import externalGlobals from 'rollup-plugin-external-globals';
import { joinURL, withLeadingSlash, withoutLeadingSlash, getQuery, withQuery, parseURL } from 'ufo';
import { build } from 'vite';
import pMap from 'p-map';

const DEFINE_KEY = '__UNDER_BLOCKLET_EMBED_BUNDLE__';
const PROXY_SUFFIX = 'blocklet-embed-proxy';
const ENTRY_FILE = 'index.mjs';
const defaultExternals = [
  // default externals
  'react',
  '@arcblock/ux/lib/Locale/context',
  '@arcblock/did-connect/lib/Session',
];

/**
 * @param {object} options - The options for the plugin.
 * @param {object} [options.embeds={}] - The embeds to be built.
 * @param {array} [options.embedExternals=['react', '@arcblock/ux/lib/Locale/context', '@arcblock/did-connect/lib/Session']] - The external modules to be used in the embeds.
 * @param {array} [options.embedPlugins=[]] - The plugins to be used in the embeds.
 * @param {number} [options.embedBuildConcurrency=0] - The plugins to be used in the embeds.
 * @return {array} The Vite config plugin.
 */
export default function createEmbedPlugin(options) {
  const cache = {
    config: {},
  };

  const inputEmbeds = options?.embeds || [];
  const embedBuildConcurrency = options?.embedBuildConcurrency || 0;
  let embedList = inputEmbeds;
  if (!Array.isArray(inputEmbeds)) {
    embedList = Object.keys(inputEmbeds).map((key) => {
      return {
        output: key,
        entry: inputEmbeds[key],
      };
    });
  }

  if (inputEmbeds.length === 0) {
    return [];
  }

  return [
    {
      name: 'blocklet:embed:serve',
      apply: 'serve',
      enforce: 'pre',
      async resolveId(id, importer, options) {
        const queryObject = getQuery(id);
        if (queryObject[PROXY_SUFFIX] !== undefined) {
          return id;
        }
        const entryId = parseURL(id).pathname;
        const embedInput = embedList.find((x) => joinURL(withLeadingSlash(x.output), ENTRY_FILE) === entryId);
        if (embedInput?.entry) {
          const resolution = await this.resolve(embedInput.entry, importer, options);
          return withQuery(resolution.id, { [PROXY_SUFFIX]: '' });
        }
        return null;
      },
      async load(id) {
        const queryObject = getQuery(id);
        if (queryObject[PROXY_SUFFIX] !== undefined) {
          const entryId = parseURL(id).pathname;
          const fileContent = await fs.readFile(entryId, { encoding: 'utf-8' });
          const names = findExportNames(fileContent);
          let code = `import ${JSON.stringify(entryId)};`;
          code += `export * from ${JSON.stringify(entryId)};`;
          if (names.includes('default')) {
            code += `export { default } from ${JSON.stringify(entryId)};`;
          }
          return code;
        }
        return null;
      },
    },
    {
      name: 'blocklet:embed:build',
      apply: 'build',
      enforce: 'post',
      config(config) {
        cache.config = config;
      },
      async closeBundle() {
        if (cache.config?.define?.[DEFINE_KEY]) {
          return;
        }

        const external = options?.embedExternals ? options.embedExternals : defaultExternals;
        const externalMaps = external.reduce((acc, cur) => {
          acc[cur] = `window[Symbol.for('embedModules')]['${cur}']`;
          return acc;
        }, {});

        const promiseList = pMap(
          embedList,
          async (embedItem) => {
            const entryItem = embedItem.entry;
            const outputItem = withoutLeadingSlash(embedItem.output);
            // eslint-disable-next-line no-await-in-loop
            await build({
              ...cache.config,
              configFile: false,
              publicDir: false,
              define: {
                ...cache.config?.define,
                'process.env': {
                  NODE_ENV: 'production',
                  ...(cache.config?.define?.['process.env'] || {}),
                },
                [DEFINE_KEY]: true,
              },
              plugins: [
                ...(cache.config?.plugins || []),
                ...(options?.embedPlugins || []),
                externalGlobals(externalMaps),
              ],
              build: {
                lib: {
                  entry: entryItem,
                  formats: ['es'],
                  fileName: path.parse(ENTRY_FILE).name,
                },
                rollupOptions: {
                  external,
                  output: {
                    dir: joinURL(cache.config?.build?.outDir || 'dist', outputItem),
                  },
                },
              },
            });
          },
          {
            concurrency: embedBuildConcurrency || 1,
          },
        );
        if (embedBuildConcurrency === 0) {
          await promiseList;
        }
      },
    },
  ];
}
