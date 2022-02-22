const path = require('path');
const AuthStorage = require('@arcblock/did-auth-storage-nedb');
const getWallet = require('@blocklet/sdk/lib/wallet');
const WalletAuthenticator = require('@blocklet/sdk/lib/wallet-authenticator');
const WalletHandler = require('@blocklet/sdk/lib/wallet-handler');

const env = require('./env');

const wallet = getWallet();
const authenticator = new WalletAuthenticator();
const handlers = new WalletHandler({
  authenticator,
  tokenStorage: new AuthStorage({
    dbPath: path.join(env.dataDir, 'auth.db'),
  }),
});

module.exports = {
  authenticator,
  handlers,
  wallet,
};
