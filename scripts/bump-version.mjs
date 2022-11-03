/* eslint-disable no-console */
import { execSync } from 'child_process';
import { $, chalk, fs } from 'zx';
import batchModifyDepsVersion from './batch-modify-deps-version.mjs';

// or use pnpm to bump version: `pnpm -r --filter {packages/*, themes/*} -- pnpm version`
execSync('bumpp package.json packages/*/package.json plugins/*/package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');
await fs.writeFileSync('version', version);

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

const now = new Date();
const currentDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const title = `## ${version} (${currentDate})`;

await fs.ensureFile('CHANGELOG.md');
const oldChangelog = await fs.readFile('CHANGELOG.md', 'utf8');
const changelog = [title, newChangelog, oldChangelog].filter((item) => !!item).join('\n\n');

await fs.writeFile('CHANGELOG.md', changelog);

console.log(`\nNow you can make adjustments to ${chalk.cyan('CHANGELOG.md')}. Then press enter to continue.`);

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', process.exit.bind(process, 0));

