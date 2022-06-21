import { $, which } from 'zx';
import semver from 'semver';

$.verbose = false;

function trimServerOutputVersion(output = '') {
  return output?.replace(/blocklet \S+ v\d+\.\d+\.\d+\n+/g, '');
}

export async function checkServerInstalled() {
  try {
    await which('blocklet');
    return true;
  } catch (e) {
    return false;
  }
}

export async function getServerVersion() {
  try {
    const { stdout: output } = await $`blocklet --version`;
    return output.trim();
  } catch (e) {
    return '0.0.0';
  }
}

export async function getServerStatus() {
  try {
    const { stdout: output } = await $`blocklet server status`;
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
  return semver.satisfies(version, '>= 1.7.0');
}

export async function getServerDirectory() {
  try {
    const { stdout: output } = await $`blocklet server status`;
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
    const { stdout: name } = await $`blocklet config get name`;
    const { stdout: email } = await $`blocklet config get email`;
    return {
      name: trimServerOutputVersion(name?.trim()),
      email: trimServerOutputVersion(email?.trim()),
    };
  } catch {
    return {
      name: '',
      email: '',
    };
  }
}
