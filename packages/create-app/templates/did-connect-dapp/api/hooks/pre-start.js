require('@blocklet/sdk/lib/error-handler');
require('dotenv-flow').config();

const logger = require('../libs/logger');
const { name } = require('../../package.json');

(() => {
  logger.error(`${name} pre-start`);
  process.exit(0);
})();
