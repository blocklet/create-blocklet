const env = require('@blocklet/sdk/lib/env');

module.exports = {
  ...env,
  chainHost: process.env.CHAIN_HOST || '',
  chainId: 'playground',
  localTokenId: process.env.LOCAL_TOKEN_ID || 'z35n6UoHSi9MED4uaQy6ozFgKPaZj2UKrurBG',
  apiPrefix: process.env.API_PREFIX || '',
};
