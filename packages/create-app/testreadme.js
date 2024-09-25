import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

function extractContent(content, section) {
  const regex = new RegExp(`## ${section}\\s*([\\s\\S]*?)(?=\\n## |$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function mergeReadme(templateName, targetDir) {
  const ignoreTemplates = ['todo-list-example'];
  if (ignoreTemplates.includes(templateName)) {
    return;
  }
  const commonReadmePath = path.join(__dirname, 'templates', 'base-readme.md');
  const templateReadmePath = path.join(__dirname, 'templates', templateName, 'README.md');
  const targetReadmePath = path.join(targetDir, 'README.md');

  let commonContent = fs.readFileSync(commonReadmePath, 'utf8');
  const templateContent = fs.existsSync(templateReadmePath) ? fs.readFileSync(templateReadmePath, 'utf8') : '';

  // 获取所有模板中的二级标题
  const templateSections = templateContent.match(/^## .+$/gm) || [];

  templateSections.forEach((section) => {
    const sectionName = section.replace('## ', '');
    const templateSection = extractContent(templateContent, sectionName);

    if (commonContent.includes(`## ${sectionName}`)) {
      // 如果base readme中存在相同的章节
      if (templateSection.trim()) {
        // 如果模板章节不为空，完全替换该章节
        const sectionRegex = new RegExp(`## ${sectionName}[\\s\\S]*?(?=\\n## |$)`, 'g');
        commonContent = commonContent.replace(sectionRegex, `\n\n## ${sectionName}\n\n${templateSection}`);
      } else {
        // 如果模板章节为空，删除整个章节包括标题
        const sectionRegex = new RegExp(`\n*## ${sectionName}[\\s\\S]*?(?=\n## |$)`, 'g');
        commonContent = commonContent.replace(sectionRegex, '');
      }
    } else {
      // 如果base readme中不存在该章节，替换对应的变量
      const variableRegex = new RegExp(`\\{${sectionName}\\}`, 'g');
      commonContent = commonContent.replace(variableRegex, templateSection);
    }
  });

  // 删除剩余的未替换变量
  commonContent = commonContent.replace(/\{[A-Z_]+\}\n*/g, '');

  // 删除空的章节（只有标题没有内容的章节）
  commonContent = commonContent.replace(/\n*## [^\n]+\n+(?=## |$)/g, '');

  // 确保每个章节之间有两个换行符
  commonContent = commonContent.replace(/\n*(## [^\n]+)/g, '\n\n$1');

  // 删除文件开头的多余换行符
  commonContent = commonContent.replace(/^\n+/, '');

  // 删除连续的多个换行，保留最多两个
  commonContent = commonContent.replace(/\n{3,}/g, '\n\n');

  // 写入合并后的 README 文件
  fs.writeFileSync(targetReadmePath, commonContent.trim());
}

// 测试函数调用
mergeReadme('todo-list-example', './test2');

export default mergeReadme;
