export default function createMetaPlugin() {
  return {
    name: 'blocklet:meta',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            // injectTo: 'head',
            tag: 'script',
            attrs: {
              src: '__blocklet__.js',
            },
          },
        ],
      };
    },
  };
}
