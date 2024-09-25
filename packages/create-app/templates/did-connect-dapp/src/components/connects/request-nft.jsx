import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import iconOpenInNewRounded from '@iconify-icons/material-symbols/open-in-new-rounded';
import { Icon } from '@iconify/react';
import { Link } from '@mui/material';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import { getExplorerUrl } from '../../libs/utils';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestNFT() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestFn = () => {
    const action = 'request-nft';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestNFT.connect.title'),
        scan: t('claims.requestNFT.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestNFT.title')}
      description={
        <>
          {t('claims.requestNFT.description')}{' '}
          <Link
            href="https://playground.staging.arcblock.io"
            target="_blank"
            underline="hover"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.5,
            }}>
            https://playground.staging.arcblock.io <Icon icon={iconOpenInNewRounded} />
          </Link>
        </>
      }
      onClick={requestFn}
      result={
        result ? (
          <InfoRow
            name="NFT"
            value={
              <Link
                href={getExplorerUrl(result.asset, 'assets')}
                target="_blank"
                underline="hover"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}>
                {result.asset} <Icon icon={iconOpenInNewRounded} />
              </Link>
            }
          />
        ) : null
      }
    />
  );
}
