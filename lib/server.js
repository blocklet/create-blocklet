import { $, which } from 'zx';
import semver from 'semver';

$.verbose = false;

export async function checkServerInstalled() {
  try {
    await which('blocklet');
    return true;
  } catch (e) {
    return false;
  }
}

export async function getServerVersion() {
  const { stdout: output } = await $`blocklet --version`;
  return output.trim();
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
  const { stdout: output } = await $`blocklet server status`;
  const [matchStr] = output.match(/Blocklet Server Data Directory:[\s\S]*?\n/gm) || [];
  if (!matchStr) return null;

  const directory = matchStr.replace(/Blocklet Server Data Directory:[\s]*([\S]+)\/\.abtnode\n/gm, '$1');
  return directory;
}

export async function getUserInfo() {
  try {
    const { stdout: user } = await $`blocklet config get user`;
    const { stdout: email } = await $`blocklet config get email`;
    return {
      user: user?.trim(),
      email: email?.trim(),
    };
  } catch {
    return {
      user: '',
      email: '',
    };
  }
}
