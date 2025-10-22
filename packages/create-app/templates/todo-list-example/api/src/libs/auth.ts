import path from 'path';

import AuthStorage from '@arcblock/did-connect-storage-nedb';
import { BlockletService } from '@blocklet/sdk';
import { getWallet } from '@blocklet/sdk/lib/wallet';
import { WalletAuthenticator } from '@blocklet/sdk/lib/wallet-authenticator';
import { WalletHandlers } from '@blocklet/sdk/lib/wallet-handler';

import env from './env';

export const wallet = getWallet();
export const authenticator = new WalletAuthenticator();
export const handlers = new WalletHandlers({
  authenticator,
  tokenStorage: new AuthStorage({
    dbPath: path.join(env.dataDir, 'auth.db'),
  }),
});
export const authService = new BlockletService();
