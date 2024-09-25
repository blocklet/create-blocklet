/* eslint-disable global-require */
const { handlers } = require('../../libs/auth');

module.exports = {
  init(app) {
    handlers.attach({ app, ...require('./request-profile') });
    handlers.attach({ app, ...require('./request-text-signature') });
    handlers.attach({ app, ...require('./request-digest-signature') });
    handlers.attach({ app, ...require('./request-transaction-signature') });
    handlers.attach({ app, ...require('./request-payment') });
    handlers.attach({ app, ...require('./request-nft') });
    handlers.attach({ app, ...require('./request-multiple-claims') });
    handlers.attach({ app, ...require('./request-multiple-steps') });
  },
};
