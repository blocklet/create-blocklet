import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';

import InfoRow from '@arcblock/ux/lib/InfoRow';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import Tag from '@arcblock/ux/lib/Tag';
import DID from '@arcblock/ux/lib/DID';
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
  // function t to translate the text
  const { t } = useLocaleContext();
  const { preferences } = window.blocklet;

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

  console.log('user',user)
  const rows = !!user
    ? [
        { name: t('name'), value: <Box display="flex" alignItems="center" gap={2}><Avatar src={user.avatar}/>{user.fullName}</Box> },
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
    <Stack className="container" sx={{ maxWidth: 500, mt: 8 }}>
      {/* Current Page: {pathname} */}
      {!user && (
          <Box
            sx={{
              textAlign: 'center',
              fontSize: '18px',
              color: '#888',
              py: 5,
            }}>
              <Typography>
              You are not logged in yet! {preferences.welcome}
              </Typography>
            <Button
              onClick={() => session.login()}
              style={{ marginTop: 16, textTransform: 'none' }}
              variant="contained"
              color="primary">
              Login
            </Button>
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
            <Typography variant="h3" mb={3}>
              {t('profile')}
            </Typography>
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
    </Stack>
  );
}
