import semver from 'semver';
import { getOutput } from './index.js';

export function checkAbtnodeInstalled() {
  const output = getOutput('which blocklet');
  return !!output;
}

export function getAbtnodeVersion() {
  const output = getOutput('blocklet --version');
  return output.trim();
}

export function getAbtnodeStatus() {
  const output = getOutput('blocklet server status');
  const [matchStr] = output.match(/ABT Node status:[\s\S]*?\n/gm) || [];
  if (!matchStr) {
    return 'stop';
  }
  const status = matchStr.replace(/ABT Node status:[\s]*([\S]+)\n/gm, '$1');
  return status.toLowerCase();
}
export function checkAbtnodeRunning() {
  const status = getAbtnodeStatus();
  return status === 'running';
}

export function checkSatisfiedVersion() {
  const output = getOutput('blocklet --version');
  const version = output.trim();
  return semver.satisfies(version, '>= 1.6.1');
}

export function getAbtnodeDirectory() {
  const output = getOutput('blocklet server status');
  const [matchStr] = output.match(/Blocklet Server Data Directory:[\s\S]*?\n/gm) || [];
  if (!matchStr) return null;

  const directory = matchStr.replace(/Blocklet Server Data Directory:[\s]*([\S]+)\/\.abtnode\n/gm, '$1');
  return directory;
}

const dic = getAbtnodeDirectory();

console.log(dic);
