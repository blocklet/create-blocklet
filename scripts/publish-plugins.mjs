/* eslint-disable no-console */
import { execSync } from 'child_process';
import { fs } from 'zx';

const pluginList = await fs.readdirSync(`./plugins`); // scan the plugins directory

const pathList = pluginList.map((plugin) => `./plugins/${plugin}`);

pathList.map((path) => {
  execSync(`npm publish ${path}  --access public --no-git-checks`, { stdio: 'inherit' });
});
