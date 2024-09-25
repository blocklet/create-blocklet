import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestDigestSignature() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-digest-signature';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestDigestSig.connect.title'),
        scan: t('claims.requestDigestSig.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestDigestSig.title')}
      description={t('claims.requestDigestSig.description')}
      onClick={requestFn}
      result={
        result ? (
          <>
            <InfoRow name={t('claims.requestDigestSig.result.origin')} value={result.origin} />
            <InfoRow name={t('claims.requestDigestSig.result.digest')} value={result.digest} />
            <InfoRow name={t('claims.requestDigestSig.result.signature')} value={result.sig} />
          </>
        ) : null
      }
    />
  );
}
