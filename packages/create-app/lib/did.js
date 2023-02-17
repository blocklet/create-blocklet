/* eslint-disable import/prefer-default-export */
import Mcrypto from '@ocap/mcrypto';
import * as jdenticon from 'jdenticon';
import { toHex } from '@ocap/util';
import { fromPublicKey } from '@arcblock/did';
import { execSync } from 'child_process';
import { trimServerOutputVersion } from './server.js';
import { BLOCKLET_COMMAND } from '../enums/index.js';

const { types } = Mcrypto;

export function toBlockletDid(name) {
  const pk = toHex(Buffer.from(typeof name === 'string' ? name.trim() : name));
  return fromPublicKey(pk, { role: types.RoleType.ROLE_ANY });
}

export function toDidIcon(did, size = 200, isPng = false) {
  return isPng ? jdenticon.toPng(did, size) : jdenticon.toSvg(did, size);
}

export async function getBlockletDidList(monikerList = []) {
  let command = `${BLOCKLET_COMMAND} init`;
  if (monikerList.length > 0) {
    command += ` --monikers=${monikerList.join(',')}`;
    const output = execSync(command);
    const pureOutput = await trimServerOutputVersion(output.toString('utf8'));
    return pureOutput
      .trim()
      .split(',')
      .filter((x) => x !== '');
  }
  return [];
}
