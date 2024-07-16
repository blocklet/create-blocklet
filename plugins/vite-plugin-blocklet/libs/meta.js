import { getBlockletYAML } from './utils.js';

export default function createMetaPlugin() {
  return {
    name: 'blocklet:meta',
    async transformIndexHtml(html, ctx) {
      const tags = [];
      if (ctx?.chunk?.isEntry) {
        let script;
        html = html.replace(new RegExp('<script[^<>]+' + ctx.chunk.fileName + '[^<>]+></script>'), (match) => {
          script = match;

          return '';
        });
        if (script) {
          html = html.replace('</body>', `${script}</body>`);
        }
      }
      const { title } = await getBlockletYAML();

      // 如果 index.html 中没有设置 title，则自动注入 blocklet.yml 中的 title
      if (title && !/<title>(.*?)<\/title>/.test(html)) {
        tags.push({
          tag: 'title',
          children: title,
        });
      }
      // 默认注入 __blocklet__.js 文件
      tags.push({
        // injectTo: 'head',
        tag: 'script',
        attrs: {
          src: '__blocklet__.js',
        },
      });

      return {
        html,
        tags,
      };
    },
  };
}
