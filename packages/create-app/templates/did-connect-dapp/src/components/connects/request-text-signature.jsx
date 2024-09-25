import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestTextSignature() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-text-signature';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestTextSig.connect.title'),
        scan: t('claims.requestTextSig.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestTextSig.title')}
      description={t('claims.requestTextSig.description')}
      onClick={requestFn}
      result={
        result ? (
          <>
            <InfoRow name={t('claims.requestTextSig.result.origin')} value={result.origin} />
            <InfoRow name={t('claims.requestTextSig.result.signature')} value={result.sig} />
          </>
        ) : null
      }
    />
  );
}
