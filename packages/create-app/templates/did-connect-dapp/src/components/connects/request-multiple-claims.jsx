import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestMultipleClaims() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-multiple-claims';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestMultipleClaims.connect.title'),
        scan: t('claims.requestMultipleClaims.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestMultipleClaims.title')}
      description={t('claims.requestMultipleClaims.description')}
      onClick={requestFn}
      result={
        result ? (
          <>
            <Typography variant="h6">{t('step1.title')}</Typography>
            <Box sx={{ pl: 1 }}>
              <InfoRow name={t('claims.requestMultipleClaims.result.origin')} value={result[0].origin} />
              <InfoRow name={t('claims.requestMultipleClaims.result.signature')} value={result[0].sig} />
            </Box>

            <Typography variant="h6">{t('step2.title')}</Typography>
            <Box sx={{ pl: 1 }}>
              <InfoRow name={t('claims.requestMultipleClaims.result.origin')} value={result[1].origin} />
              <InfoRow name={t('claims.requestMultipleClaims.result.digest')} value={result[1].digest} />
              <InfoRow name={t('claims.requestMultipleClaims.result.signature')} value={result[1].sig} />
            </Box>
          </>
        ) : null
      }
    />
  );
}
