const { fromPublicKey } = require('@ocap/wallet');
const { toAddress, fromBase58, toBuffer } = require('@ocap/util');
const { toTypeInfo } = require('@arcblock/did');

const { verifyAssetClaim } = require('../../libs/utils');
const { wallet } = require('../../libs/auth');
const logger = require('../../libs/logger');

const validateAgentProof = async (claim) => {
  const ownerDid = toAddress(claim.ownerDid);
  const ownerPk = fromBase58(claim.ownerPk);
  if (!claim.agentProof) {
    throw new Error('agent proof is empty');
  }

  if (typeof claim.agentProof === 'string') {
    claim.agentProof = JSON.parse(claim.agentProof);
  }

  logger.info('claim.agentProof.nonce', claim.agentProof.nonce);
  logger.info('claim.agentProof.signature', claim.agentProof.signature);

  const { nonce } = claim.agentProof;
  if (nonce < Math.ceil(Date.now() / 1000) - 5 * 60) {
    throw new Error('agent proof is expired: ttl is 5 minutes');
  }

  const message = Buffer.concat([toBuffer(nonce.toString()), toBuffer(wallet.address)]);
  const signer = fromPublicKey(ownerPk, toTypeInfo(ownerDid));
  const signature = fromBase58(claim.agentProof.signature);

  if (claim.type === 'asset') {
    if (!(await signer.verify(message, signature))) {
      throw new Error('agent proof is invalid for asset');
    }
  }

  if (claim.type === 'verifiableCredential') {
    if (!(await signer.verify(message, signature))) {
      throw new Error('agent proof is invalid for vc');
    }
  }
};

const action = 'request-nft';

module.exports = {
  action,
  onConnect() {
    return {
      assetOrVC: () => {
        return {
          description: 'Please provide NFT or VC to continue',
          filters: [
            {
              type: ['NFTBadge', 'NFTCertificate'],
              trustedIssuers: [
                // wallet.address,
                'zNKXAEjKYXEnf2hf18NjTQsa1JajA9gJ3haY',
              ],
            },
          ],
        };
      },
    };
  },
  onAuth: async ({ claims, challenge, updateSession }) => {
    const asset = claims.find((x) => x.type === 'asset');

    if (!asset) {
      throw new Error('Neither NFT nor VC is provided');
    }

    logger.info(`${action}.onAuth.asset`, asset);

    await validateAgentProof(asset, challenge);

    const assetState = await verifyAssetClaim({ claim: asset, challenge });
    updateSession({
      result: asset,
    });
    return { successMessage: `You provided asset: ${assetState.address}` };
  },
};
