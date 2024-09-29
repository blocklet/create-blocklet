/* eslint-disable no-console */
const { fromTokenToUnit } = require('@ocap/util');
const { fromAddress } = require('@ocap/wallet');

const { wallet, client } = require('../../libs/auth');
const { getTokenInfo, pickGasPayerHeaders } = require('../../libs/utils');
const env = require('../../libs/env');
const logger = require('../../libs/logger');

const action = 'request-payment';
module.exports = {
  action,
  onConnect() {
    return {
      signature: async ({ userDid, userPk }) => {
        const amount = 1;
        const token = await getTokenInfo();

        return {
          type: 'TransferV2Tx',
          data: {
            from: userDid,
            pk: userPk,
            itx: {
              to: wallet.address,
              tokens: [
                {
                  address: env.localTokenId,
                  value: fromTokenToUnit(amount, token.decimal).toString(),
                },
              ],
            },
          },
          description: `Please pay ${amount} ${token.symbol} to application`,
        };
      },
    };
  },
  onAuth: async ({ req, claims, userDid, updateSession }) => {
    try {
      const claim = claims.find((x) => x.type === 'signature');
      const tx = client.decodeTx(claim.origin);
      const user = fromAddress(userDid);
      if (claim.from) {
        tx.from = claim.from;
      }
      if (claim.delegator) {
        tx.delegator = claim.delegator;
      }
      const hash = await client.sendTransferV2Tx(
        {
          tx,
          wallet: user,
          signature: claim.sig,
        },
        pickGasPayerHeaders(req),
      );

      logger.info(`${action}.onAuth`, { claims, userDid, hash });
      updateSession({
        result: {
          hash,
          tx,
          origin: claim.origin,
          sig: claim.sig,
        },
      });
      return { hash, tx: claim.origin };
    } catch (err) {
      logger.info(`${action}.onAuth.error`, err);
      throw new Error('Send token failed!');
    }
  },
};
