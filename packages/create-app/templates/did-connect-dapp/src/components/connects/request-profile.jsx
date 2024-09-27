import Avatar from '@arcblock/ux/lib/Avatar';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import AccountBoxOutline from '@iconify-icons/material-symbols/account-box-outline';
import CakeOutlineRoundedIcon from '@iconify-icons/material-symbols/cake-outline-rounded';
import MailOutlineRoundedIcon from '@iconify-icons/material-symbols/mail-outline-rounded';
import PhoneOutlineRoundedIcon from '@iconify-icons/material-symbols/phone-android-outline-rounded';
import { Icon } from '@iconify/react';
import { useState } from 'react';

import { useSessionContext } from '../../libs/session';
import ConnectItem from '../connect-item';
import InfoRow from '../info-row';

export default function RequestProfile() {
  const [result, setResult] = useState(null);
  const { locale, t } = useLocaleContext();
  const { connectApi } = useSessionContext();

  const requestProfile = () => {
    const action = 'request-profile';
    setResult(null);
    connectApi.open({
      locale,
      action,
      onSuccess(res) {
        if (res.result.avatar) {
          res.result.avatar = res.result.avatar.replace(/[\r\n\s]/g, '');
        }
        setResult(res.result);
      },
      messages: {
        title: t('claims.requestProfile.connect.title'),
        scan: t('claims.requestProfile.connect.scan'),
      },
    });
  };

  return (
    <ConnectItem
      title={t('claims.requestProfile.title')}
      description={t('claims.requestProfile.description')}
      onClick={requestProfile}
      result={
        result ? (
          <>
            <Avatar variant="circle" src={result.avatar} did={result.did} size={60} />
            {result.fullName && (
              <InfoRow
                icon={<Icon fontSize={18} icon={AccountBoxOutline} />}
                name={t('claims.requestProfile.result.fullName')}
                value={result.fullName}
              />
            )}
            {result.email && (
              <InfoRow
                icon={<Icon fontSize={18} icon={MailOutlineRoundedIcon} />}
                name={t('claims.requestProfile.result.email')}
                value={result.email}
              />
            )}
            {result.phone && (
              <InfoRow
                icon={<Icon fontSize={18} icon={PhoneOutlineRoundedIcon} />}
                name={t('claims.requestProfile.result.phone')}
                value={result.phone}
              />
            )}
            {result.birthday && (
              <InfoRow
                icon={<Icon fontSize={18} icon={CakeOutlineRoundedIcon} />}
                name={t('claims.requestProfile.result.birthday')}
                value={result.birthday}
              />
            )}
          </>
        ) : null
      }
    />
  );
}
