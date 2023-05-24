require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const Client = require('@ocap/client');

const env = require('../libs/env');
const logger = require('../libs/logger');
const { wallet } = require('../libs/auth');
const { name } = require('../../package.json');

const ensureAccountDeclared = async () => {
  if (env.isComponent) return;
  if (!env.chainHost) return;

  const client = new Client(env.chainHost);
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
    process.exit(0);
  } catch (err) {
    logger.error(`${name} pre-start error`, err.message);
    process.exit(1);
  }
})();
