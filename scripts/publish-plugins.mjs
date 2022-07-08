/* eslint-disable no-console */
import { execSync } from 'child_process';
import { fs } from 'zx';

const pluginList = await fs.readdirSync(`./plugins`); // scan the plugins directory

const pathList = pluginList.filter((name) => !name.startsWith('.')).map((pluginName) => `./plugins/${pluginName}`);

pathList.map((path) => {
  execSync(`cd ${path} && npm run build`, { stdio: 'inherit' });
  execSync(`npm publish ${path} --access public --no-git-checks`, { stdio: 'inherit' });
});
