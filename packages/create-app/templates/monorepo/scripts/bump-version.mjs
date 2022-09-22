/* eslint-disable no-console */
import { execSync } from 'child_process';
import { $, chalk, fs, path, YAML } from 'zx';

// or use pnpm to bump version: `pnpm -r --filter {packages/*, themes/*} -- pnpm version`
execSync('bumpp package.json blocklets/*/package.json', { stdio: 'inherit' });

const { version } = await fs.readJSON('package.json');

(async () => {
  console.log(chalk.greenBright(`[info]: start to modify blocklets version to ${version}`));
  const dirPath = path.join(__dirname, '../blocklets');
  let pathList = await fs.readdirSync(dirPath);
  pathList = pathList.map((item) => `${dirPath}/${item}/blocklet.yml`);
  for (const ymlPath of pathList) {
    const blockletYaml = await fs.readFileSync(ymlPath, 'utf8');
    const yamlConfig = YAML.parse(blockletYaml);
    yamlConfig.version = version;
    fs.writeFileSync(ymlPath, YAML.stringify(yamlConfig, 2));
  }
  console.log(chalk.greenBright('[info]: all blocklets version modified.'));
})();

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
