const path = require('path');
const AuthStorage = require('@arcblock/did-auth-storage-nedb');
const getWallet = require('@blocklet/sdk/lib/wallet');
const WalletAuthenticator = require('@blocklet/sdk/lib/wallet-authenticator');
const WalletHandler = require('@blocklet/sdk/lib/wallet-handler');
const logger = require('./logger');

const wallet = getWallet();
const authenticator = new WalletAuthenticator();
const handlers = new WalletHandler({
  authenticator,
  tokenGenerator: () => Date.now().toString(),
  tokenStorage: new AuthStorage({
    dbPath: path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db'),
    onload: (err) => {
      if (err) {
        logger.error(`Failed to load database from ${path.join(process.env.BLOCKLET_DATA_DIR, 'auth.db')}`, err);
      }
    },
  }),
});

module.exports = {
  authenticator,
  handlers,
  wallet,
};
