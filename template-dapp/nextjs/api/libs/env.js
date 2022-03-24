const env = require('@blocklet/sdk/lib/env');

module.exports = {
  ...env,
  chainHost: process.env.CHAIN_HOST || '',
};
