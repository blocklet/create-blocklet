const blockletRealDid = process.env.BLOCKLET_REAL_DID || '';
const blockletDid = process.env.BLOCKLET_DID || '';
const isComponent = blockletRealDid && blockletDid && blockletRealDid !== blockletDid;

module.exports = {
  chainId: process.env.CHAIN_ID || '',
  chainHost: process.env.CHAIN_HOST || '',
  appId: process.env.BLOCKLET_APP_ID || '',
  appName: process.env.APP_NAME || process.env.BLOCKLET_APP_NAME || '',
  appDescription: process.env.APP_DESCRIPTION || process.env.BLOCKLET_APP_DESCRIPTION || '',
  isComponent,
};
