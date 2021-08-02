require('dotenv-flow').config();

const Client = require('@ocap/client');

const env = require('../libs/env');
const { wallet } = require('../libs/auth');
const logger = require('../libs/logger');
const { name } = require('../../package.json');

const client = new Client(env.chainHost);

const ensureAccountDeclared = async () => {
  // Check for application account, skip this if we are running as a child component
  if (env.isComponent) return;

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
