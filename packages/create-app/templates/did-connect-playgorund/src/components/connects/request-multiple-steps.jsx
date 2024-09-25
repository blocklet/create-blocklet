import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestMultipleSteps() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-multiple-steps';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestMultipleSteps.connect.title'),
        scan: t('claims.requestMultipleSteps.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestMultipleSteps.title')}
      description={t('claims.requestMultipleSteps.description')}
      onClick={requestFn}
      result={
        result ? (
          <>
            <Typography variant="h6">Step 1</Typography>
            <Box sx={{ pl: 1 }}>
              <InfoRow name={t('claims.requestMultipleSteps.result.origin')} value={result[0].origin} />
              <InfoRow name={t('claims.requestMultipleSteps.result.signature')} value={result[0].sig} />
            </Box>
            <Typography variant="h6">Step 2</Typography>
            <Box sx={{ pl: 1 }}>
              <InfoRow name={t('claims.requestMultipleSteps.result.origin')} value={result[1].origin} />
              <InfoRow name={t('claims.requestMultipleSteps.result.digest')} value={result[1].digest} />
              <InfoRow name={t('claims.requestMultipleSteps.result.signature')} value={result[1].sig} />
            </Box>
          </>
        ) : null
      }
    />
  );
}
