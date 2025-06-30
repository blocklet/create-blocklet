import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import iconOpenInNewRounded from '@iconify-icons/material-symbols/open-in-new-rounded';
import { Icon } from '@iconify/react';
import { Box, Link, Typography } from '@mui/material';

import getWalletEnImg from '../assets/get_wallet_en.png';
import getWalletZhImg from '../assets/get_wallet_zh.png';
import RequestDigestSignature from '../components/connects/request-digest-signature';
import RequestMultipleClaims from '../components/connects/request-multiple-claims';
import RequestMultipleSteps from '../components/connects/request-multiple-steps';
import RequestNFT from '../components/connects/request-nft';
import RequestPayment from '../components/connects/request-payment';
import RequestProfile from '../components/connects/request-profile';
import RequestTextSignature from '../components/connects/request-text-signature';
import RequestTransactionSignature from '../components/connects/request-transaction-signature';
import Layout from '../components/layout';

function Main() {
  const { locale, t } = useLocaleContext();
  const getWalletImgUrl = locale === 'zh' ? getWalletZhImg : getWalletEnImg;
  const getWalletUrl = `https://www.didwallet.io/${locale === 'zh' ? 'zh' : 'en'}`;

  return (
    <Layout>
      <Typography component="h3" variant="h4" color="textPrimary" gutterBottom>
        {t('step1.title')}{' '}
        <Typography component="small" sx={{
          color: "text.secondary"
        }}>
          {t('step1.prepareDIDWallet')}
        </Typography>
      </Typography>
      <Typography variant="body1">
        {t('step1.getWalletFromHere')}{' '}
        <Link
          href={getWalletUrl}
          target="_blank"
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
          }}>
          DID Wallet <Icon icon={iconOpenInNewRounded} />
        </Link>
      </Typography>
      <Box
        component="a"
        href={getWalletUrl}
        target="_blank"
        rel="noreferrer"
        sx={{
          display: 'block',
          px: {
            sm: 0,
            md: 8,
            lg: 16,
          },
        }}>
        <Box
          component="img"
          src={getWalletImgUrl}
          alt="Prepare DID Wallet"
          sx={{
            width: '100%',
          }}
        />
      </Box>
      <Typography
        component="h3"
        variant="h4"
        gutterBottom
        sx={{
          color: "text.primary",
          mt: 2
        }}>
        {t('step2.title')}{' '}
        <Typography component="small" sx={{
          color: "text.secondary"
        }}>
          {t('step2.enjoyPlayground')}
        </Typography>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          mb: 10,
        }}>
        <RequestProfile />
        <RequestNFT />
        <RequestTextSignature />
        <RequestDigestSignature />
        <RequestTransactionSignature />
        <RequestPayment />
        <RequestMultipleClaims />
        <RequestMultipleSteps />
      </Box>
    </Layout>
  );
}

export default Main;
