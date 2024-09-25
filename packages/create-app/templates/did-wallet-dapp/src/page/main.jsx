import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Avatar, Box } from '@mui/material';

import InfoRow from '@arcblock/ux/lib/InfoRow';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Tag from '@arcblock/ux/lib/Tag';
import DID from '@arcblock/ux/lib/DID';
import { UserCenter } from '@blocklet/ui-react';
import uniqBy from 'lodash/uniqBy';

import { useSessionContext } from '../libs/session';

const formatToDatetime = (date) => {
  if (!date) {
    return '-';
  }

  return dayjs(date).format('YYYY-MM-DD hh:mm:ss');
};

export default function Main() {
  const { session, api } = useSessionContext();
  const [user, setUser] = useState();
  const { t } = useLocaleContext();
  const { preferences } = window.blocklet;
  const { pathname } = window.location;

  useEffect(() => {
    getData();
  }, [session.user]); //eslint-disable-line

  const getData = () => {
    api
      .get('/api/user')
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        window.location.reload();
      });
  };

  const rows = !!user
    ? [
        { name: t('name'), value: user.fullName },
        preferences.displayAvatar ? { name: t('avatar'), value: <Avatar alt="" src={user.avatar}></Avatar> } : null,
        { name: t('did'), value: <DID did={user.did} showQrcode locale="zh" /> },
        { name: t('email'), value: user.email },
        {
          name: t('passports'),
          value: user.passports ? (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {uniqBy(user.passports, 'name').map((passport) => (
                <Tag key={passport.name} type={passport.name === 'owner' ? 'success' : 'primary'}>
                  {passport.title}
                </Tag>
              ))}
            </Box>
          ) : (
            '--'
          ),
        },
        {
          name: t('role'),
          value: <Tag type={user.role === 'owner' ? 'success' : 'primary'}>{user.role}</Tag>,
        },
        { name: t('lastLogin'), value: formatToDatetime(user.updatedAt) },
        { name: t('createdAt'), value: formatToDatetime(user.createdAt) },
      ].filter(Boolean)
    : [];

  return (
    <>
      {/* Current Page: {pathname} */}
      <UserCenter currentTab={pathname}>
        {!user && (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#888',
              py: 5,
            }}>
            You are not logged in yet! {preferences.welcome}
          </Box>
        )}
        {!!user && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              '&>div': {
                mb: 0,
              },
              '.info-row__name': {
                fontWeight: 'bold',
                color: 'grey.800',
              },
            }}>
            {rows.map((row) => {
              if (row.name === t('did')) {
                return (
                  <InfoRow
                    valueComponent="div"
                    key={row.name}
                    nameWidth={120}
                    name={row.name}
                    nameFormatter={() => t('did')}>
                    {row.value}
                  </InfoRow>
                );
              }

              return (
                <InfoRow valueComponent="div" key={row.name} nameWidth={120} name={row.name}>
                  {row.value}
                </InfoRow>
              );
            })}
          </Box>
        )}
      </UserCenter>
    </>
  );
}
