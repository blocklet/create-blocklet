import fs from 'fs';
import YAML from 'yaml';

export default function createMetaPlugin() {
  return {
    name: 'blocklet:meta',
    transformIndexHtml(html) {
      const tags = [];
      // 如果 index.html 中没有设置 title，则自动注入 blocklet.yml 中的 title
      if (!/<title>(.*?)<\/title>/.test(html)) {
        const blockletYamlPath = './blocklet.yml';
        const blockletYaml = YAML.parse(fs.readFileSync(blockletYamlPath, 'utf8'));
        const { title } = blockletYaml;

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
