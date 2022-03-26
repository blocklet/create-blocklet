import { $, which, cd } from 'zx';

$.verbose = false;

export async function isGitInstalled() {
  try {
    await which('git');
    return true;
  } catch (e) {
    return false;
  }
}

export async function initGitRepo(root) {
  await cd(root);
  await $`git init`;
  await $`git add .`;
  await $`git commit -m 'init'`;
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
