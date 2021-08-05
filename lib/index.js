/* eslint-disable import/prefer-default-export */
import shell from 'shelljs';
import { stripColors } from 'kolorist';

export function getOutput(cmd) {
  return stripColors(shell.exec(cmd, { silent: true }).stdout);
}
