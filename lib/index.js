import { $ } from 'zx';
import { getAuthor } from './npm.js';
import { getUserInfo } from './git.js';

$.verbose = false;

export async function getOutput(cmd) {
  const { stdout: output } = await $`${cmd}`;
  return output.trim();
}

export async function getUser() {
  const npmAuthor = await getAuthor();
  const gitUser = await getUserInfo();
  return {
    name: npmAuthor.name || gitUser.name,
    email: npmAuthor.email || gitUser.email,
  };
}
