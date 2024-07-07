import Mcrypto from '@ocap/mcrypto';
import { toHex } from '@ocap/util';
import { fromPublicKey, isValid } from '@arcblock/did';

const { types } = Mcrypto;

export function toBlockletDid(name) {
  if (isValid(name)) {
    return name;
  }

  const pk = toHex(Buffer.from(typeof name === 'string' ? name.trim() : name));
  return fromPublicKey(pk, { role: types.RoleType.ROLE_ANY });
}

export const isInBlocklet = !!process.env.BLOCKLET_PORT;
export const blockletPort = process.env.BLOCKLET_PORT;
export const blockletPrefix = process.env.BLOCKLET_DEV_MOUNT_POINT || '/';
