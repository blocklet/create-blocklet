import { flatten } from 'flat';

export default flatten({
  result: '操作结果',
  step1: {
    title: '第一步',
    prepareDIDWallet: '准备 DID Wallet',
    getWalletFromHere: '从这里获取 DID Wallet',
  },
  step2: {
    title: '第二步',
    enjoyPlayground: '享受 DID Connect 游乐场',
  },
  claims: {
    requestProfile: {
      title: '获取用户信息',
      description: '当应用需要用户名称/邮件地址来正常使用时，可以请求用户提供相关信息。',
      connect: {
        title: '获取用户信息',
        scan: '请提供您的个人信息，以便我们可以为您提供更好的服务。',
      },
      result: {
        fullName: '用户名',
        email: '邮箱地址',
        phone: '电话号码',
        birthday: '生日',
      },
    },
    requestNFT: {
      title: '请求 NFT',
      description: '从这里获取徽章或证书',
      connect: {
        title: '请出示一个 NFT',
        scan: '请出示一个 NFT，以便验证您是否有抽奖的机会',
      },
    },
    requestTextSig: {
      title: '请求文本签名',
      description: '在某些情况下，应用可能需要用户签名一段文本来授权应用做一些事情。',
      connect: {
        title: '请求文本签名',
        scan: '请签名一段文本，以便验证您的安全。',
      },
      result: {
        origin: '签名数据',
        signature: '签名结果',
      },
    },
    requestDigestSig: {
      title: '请求摘要签名',
      description:
        '在某些情况下，当需要签名的数据太大，不适合在 DID Wallet 中显示时，应用可以请求 Wallet 签名数据的摘要。',
      connect: {
        title: '请求摘要签名',
        scan: '请签名一段摘要，以便验证您的安全。',
      },
      result: {
        origin: '签名数据',
        digest: '摘要数据',
        signature: '签名结果',
      },
    },
    requestTransactionSig: {
      title: '请求交易签名',
      description: '当应用需要用户签名一个可以广播到 ArcBlock 链的交易时。',
      connect: {
        title: '请求交易签名',
        scan: '请签名一个交易，以便验证交易的安全性。',
      },
      result: {
        hash: '交易 hash',
        signature: '签名结果',
      },
    },
    requestPayment: {
      title: '请求付款',
      description: '当应用需要用户支付一些代币来获取某种服务时。',
      takeTokenFromHere: '请从这里获取一些代币',
      connect: {
        title: '请求付款',
        scan: '该笔订单需要您确认，才能完成付款。',
      },
      result: {
        hash: '交易 hash',
        signature: '签名结果',
      },
    },
    requestMultipleClaims: {
      title: '多个操作',
      description: '在同一个会话中请求文本签名和摘要签名。',
      connect: {
        title: '请求多个操作',
        scan: '在该会话中，您将同时进行文本签名和摘要签名。',
      },
      result: {
        origin: '签名数据',
        digest: '摘要数据',
        signature: '签名结果',
      },
    },
    requestMultipleSteps: {
      title: '多个步骤',
      description: '先请求文本签名，然后再请求摘要签名。',
      connect: {
        title: '请求多步操作',
        scan: '在该会话中，您将先进行文本签名，然后进行摘要签名。',
      },
      result: {
        origin: '签名数据',
        digest: '摘要数据',
        signature: '签名结果',
      },
    },
  },
});
