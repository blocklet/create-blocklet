import { flatten } from 'flat';

export default flatten({
  result: 'Result',
  step1: {
    title: 'Step 1',
    prepareDIDWallet: 'Prepare DID Wallet',
    getWalletFromHere: 'Get DID Wallet from here',
  },
  step2: {
    title: 'Step 2',
    enjoyPlayground: 'Enjoy The DID Connect Playground',
  },
  claims: {
    requestProfile: {
      title: 'Request Profile',
      description: 'If the app need user name/email to function properly, you can request a profile from the user.',
      connect: {
        title: 'Request Profile',
        scan: 'Please provide your name and email to continue',
      },
      result: {
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        birthday: 'Birthday',
      },
    },
    requestNFT: {
      title: 'Request NFT',
      description: 'Get a badge or Certificate from here',
      connect: {
        title: 'Request NFT',
        scan: 'Please provide a NFT to continue',
      },
    },
    requestTextSig: {
      title: 'Request Text Signature',
      description: 'In some cases, app may want user to sign some text to authorize the app to do something.',
      connect: {
        title: 'Request Text Signature',
        scan: 'Please sign some text to continue',
      },
      result: {
        origin: 'Original Text',
        signature: 'Signature',
      },
    },
    requestDigestSig: {
      title: 'Request Digest Signature',
      description:
        'In some cases, when the data to be signed is too large to display in DID Wallet, the app shall request the Wallet to sign the digest of the data.',
      connect: {
        title: 'Request Digest Signature',
        scan: 'Please sign the digest to continue',
      },
      result: {
        origin: 'Original Text',
        digest: 'Digest',
        signature: 'Signature',
      },
    },
    requestTransactionSig: {
      title: 'Request Transaction Signature',
      description: 'When the app needs user to sign some transaction that can be broadcast to ArcBlock chain.',
      connect: {
        title: 'Request Transaction Signature',
        scan: 'Please sign a transaction to continue',
      },
      result: {
        hash: 'Transaction Hash',
        signature: 'Signature',
      },
    },
    requestPayment: {
      title: 'Request Payment',
      description: 'When the app needs user to pay some token to get some service.',
      takeTokenFromHere: 'Please take some TBA from here',
      connect: {
        title: 'Request Payment',
        scan: 'Please sign the transaction to continue',
      },
      result: {
        hash: 'Transaction Hash',
        signature: 'Signature',
      },
    },
    requestMultipleClaims: {
      title: 'Request Multiple Claims',
      description: 'Request text signature and digest signature in a single session.',
      connect: {
        title: 'Request Multiple Claims',
        scan: 'In that session, you will do both text signing and summary signing.',
      },
      result: {
        origin: 'Original Text',
        digest: 'Digest',
        signature: 'Signature',
      },
    },
    requestMultipleSteps: {
      title: 'Request Multiple Steps',
      description: 'Request text signature and then request digest signature.',
      connect: {
        title: 'Request Multiple Steps',
        scan: 'In that session, you will do a text signature followed by a summary signature.',
      },
      result: {
        origin: 'Original Text',
        digest: 'Digest',
        signature: 'Signature',
      },
    },
  },
});
