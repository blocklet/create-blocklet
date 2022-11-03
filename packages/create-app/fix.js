import { fs, path, $ } from 'zx';
import { fileURLToPath } from 'url';

// 获取脚本所在目录
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd(); // 获取脚本执行目录

async function fixFile() {
  const templatesDir = path.join(__dirname, 'templates');
  const commonsDir = path.join(__dirname, 'common');

  const templates = fs.readdirSync(templatesDir);
  const commonFiles = fs.readdirSync(commonsDir);

  for (const template of templates) {
    const templateFiles = fs.readdirSync(path.join(templatesDir, template));
    for (const templateFile of templateFiles) {
      const find = commonFiles.find((commonFile) => templateFile === commonFile);
      if (find) {
        console.log('找到相同的文件', path.join(templatesDir, template, templateFile));
        fs.removeSync(path.join(templatesDir, template, templateFile));
      }
    }
  }
}

export default fixFile;
