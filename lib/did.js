/* eslint-disable import/prefer-default-export */
import Mcrypto from '@ocap/mcrypto';
import { toHex } from '@ocap/util';
import { fromPublicKey } from '@arcblock/did';

const { types } = Mcrypto;

export function toBlockletDid(name) {
  const pk = toHex(name);
  return fromPublicKey(pk, { role: types.RoleType.ROLE_ANY });
}
