import semver from 'semver';
import { getOutput } from './index.js';

export function checkAbtnodeInstalled() {
  const output = getOutput('which abtnode');
  return !!output;
}

export function getAbtnodeVersion() {
  const output = getOutput('abtnode --version');
  return output.trim();
}

export function getAbtnodeStatus() {
  const output = getOutput('abtnode status');
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
  const output = getOutput('abtnode --version');
  const version = output.trim();
  return semver.satisfies(version, '>= 1.5.10');
}

export function getAbtnodeDirectory() {
  const output = getOutput('abtnode status');
  const [matchStr] = output.match(/ABT Node Data Directory:[\s\S]*?\n/gm) || [];
  if (!matchStr) return null;

  const directory = matchStr.replace(/ABT Node Data Directory:[\s]*([\S]+)\/\.abtnode\n/gm, '$1');
  return directory;
}

const dic = getAbtnodeDirectory();

console.log(dic);
