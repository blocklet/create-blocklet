/* eslint-disable no-console */
import { execSync } from 'child_process';
import { $, chalk, fs } from 'zx';
import batchModifyDepsVersion from './batch-modify-deps-version.mjs';

// or use pnpm to bump version: `pnpm -r --filter {packages/*, themes/*} -- pnpm version`
execSync('bumpp package.json packages/*/package.json plugins/*/package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');

// modify the /create-app/templates plugin version
await batchModifyDepsVersion({
  dirPath: './packages/create-app/templates',
  depList: await fs.readdirSync(`./plugins`), // scan the plugins directory to get the dep list
  version: `^${version}`,
});

console.log(`\nNow you can make adjustments to ${chalk.cyan('CHANGELOG.md')}. Then press enter to continue.`);

let newChangelog = '';

try {
  const gitRes = await $`git log --pretty=format:"- %s" "main"...HEAD`;
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
await $`read`;
await fs.writeFileSync('version', version);
