import { $, which, cd, chalk } from 'zx';

const { yellow } = chalk;

export async function isGitInstalled() {
  try {
    await which('git');
    return true;
  } catch (e) {
    return false;
  }
}

export async function getUserInfo() {
  try {
    const { stdout: name } = await $`git config user.name`;
    const { stdout: email } = await $`git config user.email`;
    return { name: name.trim(), email: email.trim() };
  } catch {
    return {
      name: '',
      email: '',
    };
  }
}

async function canInitGit() {
  const isInstalled = await isGitInstalled();
  const gitInfo = await getUserInfo();
  if (isInstalled && gitInfo.name && gitInfo.email) {
    return true;
  }
  return false;
}

export async function initGitRepo(root) {
  const canInstalled = await canInitGit();
  if (canInstalled) {
    await cd(root);
    await $`git init`;
    await $`git add .`;
    await $`git commit -m 'init'`;
  } else {
    console.warn(`${yellow('Git is not installed')}`);
  }
}
