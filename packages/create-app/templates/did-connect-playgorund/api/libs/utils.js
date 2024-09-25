const { getRandomBytes } = require('@ocap/mcrypto');
const pick = require('lodash/pick');
const { toAddress, fromBase58 } = require('@ocap/util');
const { isFromPublicKey, toTypeInfo } = require('@arcblock/did');
const { fromPublicKey } = require('@ocap/wallet');

const { client } = require('./auth');
const env = require('./env');

const getRandomMessage = (len = 16) => {
  const hex = getRandomBytes(len);
  return hex.replace(/^0x/, '').toUpperCase();
};

const getTokenInfo = async () => {
  const [{ state }] = await Promise.all([client.getTokenState({ address: env.localTokenId })]);

  const result = {
    symbol: state.symbol,
    decimal: state.decimal,
  };

  return result;
};
const pickGasPayerHeaders = ({ headers }) => ({ headers: pick(headers, ['x-gas-payer-sig', 'x-gas-payer-pk']) });

const verifyAssetClaim = async ({ claim, challenge, trustedIssuers = [], trustedParents = [] }) => {
  const fields = ['asset', 'ownerProof', 'ownerPk', 'ownerDid'];
  for (const field of fields) {
    if (!claim[field]) {
      throw new Error(`Invalid asset claim: ${field} is missing`);
    }
  }

  const address = claim.asset;
  const ownerDid = toAddress(claim.ownerDid);
  const ownerPk = fromBase58(claim.ownerPk);
  const ownerProof = fromBase58(claim.ownerProof);
  if (isFromPublicKey(ownerDid, ownerPk) === false) {
    throw new Error('Invalid asset claim: owner did and pk mismatch');
  }

  const owner = fromPublicKey(ownerPk, toTypeInfo(ownerDid));
  if (owner.verify(challenge, ownerProof) === false) {
    throw new Error('Invalid asset claim: owner proof invalid');
  }

  const { state } = await client.getAssetState({ address }, { ignoreFields: ['context'] });
  if (!state) {
    throw new Error('Invalid asset claim: asset not found on chain');
  }
  if (state.owner !== ownerDid) {
    throw new Error('Invalid asset claim: owner does not match with on chain state');
  }
  if (trustedIssuers.length && trustedIssuers.includes(state.issuer) === false) {
    throw new Error('Invalid asset claim: asset issuer not in whitelist');
  }
  if (trustedParents.length && trustedParents.includes(state.parent) === false) {
    throw new Error('Invalid asset claim: asset parent not in whitelist');
  }

  return state;
};

module.exports = {
  getRandomMessage,
  getTokenInfo,
  pickGasPayerHeaders,
  verifyAssetClaim,
};
