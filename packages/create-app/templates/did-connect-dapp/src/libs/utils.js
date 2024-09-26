/* eslint-disable import/prefer-default-export */
export const getExplorerUrl = (assetDidOrHash, type = 'txs') => {
  return `https://explorer.abtnetwork.io/explorer/${type}/${assetDidOrHash}?host=${window.blocklet.CHAIN_HOST}`;
};
