import { $ } from 'zx';
import { getAuthor } from './npm.js';
import { getUserInfo } from './git.js';
import { getUserInfo as getServerUserInfo } from './server.js';

export async function getOutput(cmd) {
  const { stdout: output } = await $`${cmd}`;
  return output.trim();
}

export async function getUser() {
  function purifyString(str) {
    return [undefined, 'undefined', null, 'null'].includes(str) ? '' : str;
  }

  const [npmAuthor, gitUser, serverUser] = await Promise.all([getAuthor(), getUserInfo(), getServerUserInfo()]);
  const info = {
    name: purifyString(serverUser.name) || purifyString(npmAuthor.name) || purifyString(gitUser.name) || '',
    email: purifyString(serverUser.email) || purifyString(npmAuthor.email) || purifyString(gitUser.email) || '',
  };
  return info;
}
