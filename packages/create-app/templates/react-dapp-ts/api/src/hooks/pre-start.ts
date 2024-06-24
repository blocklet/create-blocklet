import '@blocklet/sdk/lib/error-handler';
import Client from '@ocap/client';
import dotenv from 'dotenv-flow';

import { wallet } from '../libs/auth';
import env from '../libs/env';
import logger from '../libs/logger';

dotenv.config();

const { name } = require('../../../package.json');

const ensureAccountDeclared = async () => {
  if (env.isComponent) return;
  if (!env.chainHost) return;

  const client = new Client(env.chainHost);
  // @ts-ignore
  const { state } = await client.getAccountState({ address: wallet.toAddress() }, { ignoreFields: ['context'] });
  if (!state) {
    const hash = await client.declare({ moniker: name, wallet });
    logger.log(`app account declared on chain ${env.chainHost}`, hash);
  } else {
    logger.log(`app account already declared on chain ${env.chainHost}`);
  }
};

(async () => {
  try {
    await ensureAccountDeclared();
    logger.info(`${name} pre-start successfully`);
    process.exit(0);
  } catch (err) {
    logger.error(`${name} pre-start error`, err);
    process.exit(1);
  }
})();
