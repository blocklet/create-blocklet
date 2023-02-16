import { $, which } from 'zx';
import semver from 'semver';
import { BLOCKLET_COMMAND } from '../enums';

$.verbose = false;

export async function trimServerOutputVersion(output = '', command) {
  // 调用 blocklet 命令时，都会在第一行先打印一个 blocklet [command] [version] 的信息，需要把这个信息 trim 掉
  const version = await getServerVersion();
  if (command) {
    return output?.replace(`${BLOCKLET_COMMAND} ${command} v${version}\n`, '');
  }
  const reg = new RegExp(`${BLOCKLET_COMMAND} \\S+ v${version}\\n+`, 'g');
  return output?.replace(reg, '');
}

export async function checkServerInstalled() {
  try {
    await which(BLOCKLET_COMMAND);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getServerVersion() {
  try {
    const { stdout: output } = await $`${BLOCKLET_COMMAND} --version`;
    return output.trim();
  } catch (e) {
    return '0.0.0';
  }
}

export async function getServerStatus() {
  try {
    const { stdout: output } = await $`${BLOCKLET_COMMAND} server status`;
    const [matchStr] = output.match(/Blocklet Server status:[\s\S]*?\n/g) || [];
    const status = matchStr.replace(/Blocklet Server status:\s*(\S+)\s*\S*\n*[\s\S]*/gm, '$1');
    return status.toLowerCase();
  } catch (e) {
    return 'stop';
  }
}
export async function checkServerRunning() {
  const status = await getServerStatus();
  return status === 'running';
}

export async function checkSatisfiedVersion() {
  const version = await getServerVersion();
  const cleanVersion = semver.valid(semver.coerce(version));
  return semver.satisfies(cleanVersion, '>= 1.7.0');
}

export async function getServerDirectory() {
  try {
    const { stdout: output } = await $`${BLOCKLET_COMMAND} server status`;
    const [matchStr] = output.match(/Blocklet Server Data Directory:[\s\S]*?\n/gm) || [];
    if (!matchStr) return null;

    const directory = matchStr.replace(/Blocklet Server Data Directory:[\s]*([\S]+)\/\.abtnode\n/gm, '$1');
    return directory;
  } catch {
    return null;
  }
}

export async function getUserInfo() {
  try {
    const { stdout: name } = await $`${BLOCKLET_COMMAND} config get name`;
    const { stdout: email } = await $`${BLOCKLET_COMMAND} config get email`;
    return {
      name: await trimServerOutputVersion(name?.trim()),
      email: await trimServerOutputVersion(email?.trim()),
    };
  } catch {
    return {
      name: '',
      email: '',
    };
  }
}
