import { fs, path, $, echo, chalk } from 'zx';
$.verbose = false;

// common functions
export function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
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
  return fs.readdirSync(_path).length === 0;
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
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

export function fuzzyQuery(list = [], keyWord = '') {
  const arr = [];
  for (var i = 0; i < list.length; i++) {
    if (keyWord.includes(list[i])) {
      arr.push(list[i]);
    }
  }
  return arr.length > 0;
}

export async function checkLerna() {
  const checkResult = await $`type lerna >/dev/null 2>&1 || echo "false"`;
  if (checkResult.stdout.trim() === 'false') {
    console.log(`\n ${chalk.cyan('install lerna...')}`);
    const output = await $`npm install -g lerna`;
    echo(output);
  }
}

export async function checkYarn() {
  const checkResult = await $`type yarn >/dev/null 2>&1 || echo "false"`;
  if (checkResult.stdout.trim() === 'false') {
    console.log(`\n ${chalk.cyan('install yarn...')}`);
    const output = await $`npm install -g yarn`;
    echo(output);
  }
}
