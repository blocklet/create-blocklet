/* eslint-disable no-console */
const { toTypeInfo } = require('@arcblock/did');
const { fromPublicKey } = require('@ocap/wallet');
const { fromBase58 } = require('@ocap/util');

const logger = require('../../libs/logger');
const { getRandomMessage } = require('../../libs/utils');

const action = 'request-text-signature';
module.exports = {
  action,
  onConnect() {
    return {
      signature: () => {
        const data = getRandomMessage();

        return {
          description: 'Please sign the text',
          type: 'mime:text/plain',
          data,
        };
      },
    };
  },

  onAuth: ({ userDid, userPk, claims, updateSession }) => {
    const type = toTypeInfo(userDid);
    const user = fromPublicKey(userPk, type);
    const claim = claims.find((x) => x.type === 'signature');

    logger.info(`${action}.onAuth`, { userPk, userDid, claim });

    if (claim.origin) {
      if (user.verify(claim.origin, claim.sig, claim.method !== 'none') === false) {
        throw new Error('Invalid origin signature');
      }
    }

    updateSession({
      result: {
        origin: fromBase58(claim.origin).toString(),
        sig: claim.sig,
      },
    });
  },
};
