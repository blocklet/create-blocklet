/* eslint-disable no-console */
import { execSync } from 'child_process';
import { $, chalk, fs } from 'zx';

execSync('bumpp --no-tag --no-commit --no-push package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');

let newChangelog = '';

try {
  const gitRes = await $`git log --pretty=format:"- %s" "master"...HEAD`;
  newChangelog = gitRes.stdout.trim();
} catch {
  console.error(chalk.redBright('Could not get git log, please write changelog manually.'));
}

// TODO: 这里可以直接用 nodejs 来获取日期？不需要区分系统语言
const dateRes = await $`date +'%B %d, %Y'`;
const date = dateRes.stdout.trim();
const title = `## ${version} (${date})`;

await fs.ensureFile('CHANGELOG.md');
const oldChangelog = await fs.readFile('CHANGELOG.md', 'utf8');
const changelog = [title, newChangelog, oldChangelog].filter((item) => !!item).join('\n\n');
await fs.writeFile('CHANGELOG.md', changelog);

console.log(`\nNow you can make adjustments to ${chalk.cyan('CHANGELOG.md')}. Then press enter to continue.`);
await $`read`;

await fs.writeFileSync('version', version);
