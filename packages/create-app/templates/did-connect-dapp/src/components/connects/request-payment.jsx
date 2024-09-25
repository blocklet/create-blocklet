import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import iconOpenInNewRounded from '@iconify-icons/material-symbols/open-in-new-rounded';
import { Icon } from '@iconify/react';
import { Box, Link } from '@mui/material';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import { getExplorerUrl } from '../../libs/utils';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestPayment() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestPayment = () => {
    const action = 'request-payment';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestPayment.connect.title'),
        scan: t('claims.requestPayment.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestPayment.title')}
      description={
        <>
          {t('claims.requestPayment.description')}

          <Box>
            {t('claims.requestPayment.takeTokenFromHere')}{' '}
            <Link
              href="https://faucet.abtnetwork.io"
              target="_blank"
              underline="hover"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
              }}>
              https://faucet.abtnetwork.io <Icon icon={iconOpenInNewRounded} />
            </Link>
          </Box>
        </>
      }
      onClick={requestPayment}
      result={
        result ? (
          <>
            <InfoRow
              name={t('claims.requestPayment.result.hash')}
              value={
                <Link
                  href={getExplorerUrl(result.hash)}
                  target="_blank"
                  underline="hover"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}>
                  {result.hash} <Icon icon={iconOpenInNewRounded} />
                </Link>
              }
            />
            <InfoRow name={t('claims.requestPayment.result.signature')} value={result.sig} />
          </>
        ) : null
      }
    />
  );
}
