import { promises as fs } from 'node:fs';
import YAML from 'yaml';
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

export async function getBlockletYAML() {
  const blockletYamlPath = './blocklet.yml';
  const content = await fs.readFile(blockletYamlPath, 'utf8');
  const blockletYaml = YAML.parse(content);
  return blockletYaml || {};
}

export const isInBlocklet = !!process.env.BLOCKLET_PORT;
export const blockletPort = process.env.BLOCKLET_PORT;
export const blockletPrefix = process.env.BLOCKLET_DEV_MOUNT_POINT || '/';
