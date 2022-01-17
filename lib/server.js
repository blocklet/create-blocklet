import semver from 'semver';
import { getOutput } from './index.js';

export function checkServerInstalled() {
  const output = getOutput('which blocklet');
  return !!output;
}

export function getServerVersion() {
  const output = getOutput('blocklet --version');
  return output.trim();
}

export function getServerStatus() {
  const output = getOutput('blocklet server status');
  const [matchStr] = output.match(/Blocklet Server status:[\s\S]*?\n/g) || [];
  if (!matchStr) {
    return 'stop';
  }
  const status = matchStr.replace(/Blocklet Server status:\s*(\S+)\s*\S*\n*[\s\S]*/gm, '$1');
  return status.toLowerCase();
}
export function checkServerRunning() {
  const status = getServerStatus();
  return status === 'running';
}

export function checkSatisfiedVersion() {
  const output = getOutput('blocklet --version');
  const version = output.trim();
  return semver.satisfies(version, '>= 1.6.1');
}

export function getServerDirectory() {
  const output = getOutput('blocklet server status');
  const [matchStr] = output.match(/Blocklet Server Data Directory:[\s\S]*?\n/gm) || [];
  if (!matchStr) return null;

  const directory = matchStr.replace(/Blocklet Server Data Directory:[\s]*([\S]+)\/\.abtnode\n/gm, '$1');
  return directory;
}
