import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestTransactionSignature() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-transaction-signature';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestTransactionSig.connect.title'),
        scan: t('claims.requestTransactionSig.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestTransactionSig.title')}
      description={t('claims.requestTransactionSig.description')}
      onClick={requestFn}
      result={
        result ? (
          <>
            <InfoRow name={t('claims.requestTransactionSig.result.hash')} value={result.hash} />
            <InfoRow name={t('claims.requestTransactionSig.result.signature')} value={result.sig} />
          </>
        ) : null
      }
    />
  );
}
