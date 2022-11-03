/* eslint-disable no-console */
import { execSync } from 'child_process';
import { $, chalk, fs,YAML } from 'zx';

execSync('bumpp --no-tag --no-commit --no-push package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');
const blockletYaml = await fs.readFileSync('blocklet.yml', 'utf8');
const yamlConfig = YAML.parse(blockletYaml);

yamlConfig.version = version;
await fs.writeFileSync('version', version);
console.log(chalk.greenBright(`[info]: start to modify blocklet version to ${version}`));
fs.writeFileSync('blocklet.yml', YAML.stringify(yamlConfig, 2));
console.log(chalk.greenBright('[info]: blocklet version modified.'));

let newChangelog = '';
try {
  const gitRes = await $`git log --pretty=format:"- %s" "master"...HEAD`;
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

