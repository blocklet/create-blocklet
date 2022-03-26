import { $ } from 'zx';
import { getAuthor } from './npm.js';
import { getUserInfo } from './git.js';
import { getUserInfo as getServerUserInfo } from './server.js';

$.verbose = false;

export async function getOutput(cmd) {
  const { stdout: output } = await $`${cmd}`;
  return output.trim();
}

export async function getUser() {
  const [npmAuthor, gitUser, serverUser] = await Promise.all([getAuthor(), getUserInfo(), getServerUserInfo()]);
  return {
    name: serverUser.name || npmAuthor.name || gitUser.name || '',
    email: serverUser.email || npmAuthor.email || gitUser.email || '',
  };
}
