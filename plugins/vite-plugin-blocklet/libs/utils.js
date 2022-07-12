import Mcrypto from '@ocap/mcrypto';
import { toHex } from '@ocap/util';
import { fromPublicKey } from '@arcblock/did';

const { types } = Mcrypto;

export function toBlockletDid(name) {
  const pk = toHex(Buffer.from(typeof name === 'string' ? name.trim() : name));
  return fromPublicKey(pk, { role: types.RoleType.ROLE_ANY });
}

const isInBlocklet = !!process.env.BLOCKLET_PORT;

export { isInBlocklet };
