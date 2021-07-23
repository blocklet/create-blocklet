const path = require('path');
const AuthStorage = require('@arcblock/did-auth-storage-nedb');
const WalletAuthenticator = require('@blocklet/sdk/lib/wallet-authenticator');
const { types } = require('@ocap/mcrypto');
const { fromSecretKey, WalletType } = require('@ocap/wallet');
const { WalletHandlers } = require('@arcblock/did-auth');
const logger = require('./logger');

const appSk = process.env.APP_SK || process.env.BLOCKLET_APP_SK;
const wallet = fromSecretKey(appSk, WalletType({ role: types.RoleType.ROLE_APPLICATION }));

const authenticator = new WalletAuthenticator();

const handlers = new WalletHandlers({
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
