import { fs, path, $, echo, chalk, which } from 'zx';

// common functions
export function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    // eslint-disable-next-line no-use-before-define
    copyDir(src, dest);
  } else {
    fs.copySync(src, dest);
  }
}

export function isValidName(name) {
  return !!name.trim();
}

export function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

export function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

export function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

export function isEmpty(_path) {
  const fileList = fs.readdirSync(_path);
  const isEmitNodeModulesEmpty = fileList.filter((x) => !['node_modules', '.pnpm-store'].includes(x)).length === 0;
  let isNodeModulesEmpty = true;
  try {
    isNodeModulesEmpty = fs.readdirSync(path.resolve(_path, 'node_modules')).length === 0;
  } catch {
    isNodeModulesEmpty = true;
  }
  return isEmitNodeModulesEmpty && isNodeModulesEmpty;
}

export function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      if (file !== 'node_modules') {
        fs.rmdirSync(abs);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (file !== 'node_modules') {
        fs.unlinkSync(abs);
      } else {
        emptyDir(abs);
      }
    }
  }
}

export function fuzzyQuery(list = [], keyWord = '') {
  const arr = [];
  for (let i = 0; i < list.length; i++) {
    if (keyWord.includes(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr.length > 0;
}

export async function checkCLIInstall(name) {
  try {
    await which(name);
    return true;
  } catch (e) {
    return false;
  }
}

export async function checkLerna() {
  const learn = await checkCLIInstall('lerna');
  if (!learn) {
    echo(`\n ${chalk.cyan('install lerna...')}`);
    const output = await $`npm install -g lerna`;
    echo(output);
  }
}

export async function checkYarn() {
  const yarn = await checkCLIInstall('yarn');
  if (!yarn) {
    echo(`\n ${chalk.cyan('install yarn...')}`);
    const output = await $`npm install -g yarn`;
    echo(output);
  }
}
