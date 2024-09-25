const { fromBase58, toBase58 } = require('@ocap/util');
const { getHasher, types } = require('@ocap/mcrypto');

const { getRandomMessage } = require('../../libs/utils');
const logger = require('../../libs/logger');

const hasher = getHasher(types.HashType.SHA3);
const data = 'abcdefghijklmnopqrstuvwxyz'.repeat(32);

const action = 'request-multiple-claims';

module.exports = {
  action,
  claims: {
    signText: [
      'signature',
      () => {
        return {
          type: 'mime:text/plain',
          data: getRandomMessage(),
          description: 'Please sign the text',
        };
      },
    ],
    signDigest: [
      'signature',
      () => {
        return {
          description: 'Please sign the digest',
          digest: toBase58(hasher(data, 1)),
        };
      },
    ],
  },

  onAuth: ({ userDid, userPk, claims, updateSession }) => {
    logger.info(`${action}.onAuth`, { userPk, userDid, claims });
    updateSession({
      result: [
        {
          origin: fromBase58(claims[0].origin).toString(),
          sig: claims[0].sig,
        },
        {
          origin: data,
          digest: claims[1].digest,
          sig: claims[1].sig,
        },
      ],
    });
  },
};
