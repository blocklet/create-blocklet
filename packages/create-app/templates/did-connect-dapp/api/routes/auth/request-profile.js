const omit = require('lodash/omit');
const logger = require('../../libs/logger');

const action = 'request-profile';
module.exports = {
  action,
  onConnect() {
    return {
      profile: () => ({
        description: 'Please provide your full profile',
        fields: ['fullName', 'email', 'phone', 'signature', 'avatar', 'birthday'],
      }),
    };
  },

  onAuth: ({ userDid, userPk, claims, updateSession }) => {
    const claim = claims.find((x) => x.type === 'profile');
    logger.log(`${action}.onAuth`, { userDid, userPk, claim });
    updateSession({
      result: {
        ...omit(claim, ['type', 'signature']),
        did: userDid,
        pk: userPk,
      },
    });
  },
};
