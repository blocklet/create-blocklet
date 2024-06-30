/* eslint-disable import/prefer-default-export */
import ora from 'ora';
import Mcrypto from '@ocap/mcrypto';
import * as jdenticon from 'jdenticon';
import { toHex } from '@ocap/util';
import { fromPublicKey } from '@arcblock/did';
import { spawn } from 'child_process';
import { BLOCKLET_COMMAND } from './constant.js';

const { types } = Mcrypto;

export function toBlockletDid(name) {
  const pk = toHex(Buffer.from(typeof name === 'string' ? name.trim() : name));
  return fromPublicKey(pk, { role: types.RoleType.ROLE_ANY });
}

export function toDidIcon(did, size = 200, isPng = false) {
  return isPng ? jdenticon.toPng(did, size) : jdenticon.toSvg(did, size);
}

export async function getBlockletDidList(monikerList = [], connectUrl = '') {
  try {
    let command = `${BLOCKLET_COMMAND} init`;
    if (monikerList.length > 0) {
      command += ` --monikers=${monikerList.join(',')}`;
    } else {
      return [];
    }

    if (connectUrl) {
      // eslint-disable-next-line no-unused-vars
      command += ` --connectUrl=${connectUrl}`;
    }
    const runCommand = new Promise((resolve, reject) => {
      let lastMessage = '';
      const childProcess = spawn('blocklet', ['init', '--monikers=react-dapp']);
      const spinner = ora().start();
      childProcess.stdout.on('data', (data) => {
        const message = data.toString('utf8') || '';
        if (message.includes('Redirecting to')) {
          spinner.text = message.replace('✔ \n', '');
        } else {
          lastMessage = message;
        }
      });
      childProcess.stderr.on('data', (data) => {
        const message = data.toString('utf8') || '';
        if (!message.includes('Waiting for connect:')) {
          spinner.fail(message);
        }
      });
      childProcess.on('close', () => {
        spinner.succeed();
        resolve(lastMessage);
      });
      childProcess.on('error', (err) => {
        spinner.fail();
        reject(err);
      });
    });
    const didStrList = await runCommand;
    return didStrList
      .trim()
      .split(',')
      .filter((x) => x !== '');
  } catch (e) {
    console.error(e);
    throw new Error('Failed to generate blocklet did');
  }
}
