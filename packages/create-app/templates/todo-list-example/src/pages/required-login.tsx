import { Alert, Button, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionContext } from '../contexts/session';

type RequiredLoginProps = {
  onLogin?: Function;
  nextUrl?: undefined | string;
} & import('@mui/material').GridProps;

/**
 * @description
 * @param {{
 *  onLogin: Function,
 *  nextUrl: undefined | string,
 * } & import('@mui/material').GridProps} { onLogin = () => {}, nextUrl = undefined, ...rest }
 * @return {*}
 */
function RequiredLogin({ onLogin = () => {}, nextUrl = undefined, ...rest }: Readonly<RequiredLoginProps>) {
  const { session } = useSessionContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.user) {
      session.login(onLogin);
    } else if (session.user && nextUrl) {
      navigate(`${nextUrl}${window.location.search}`, { replace: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.user, session.login]);

  return (
    <Grid container justifyContent="center" {...rest}>
      <Grid item justifyContent="center" textAlign="center" xl={12} lg={12}>
        <Alert severity="warning">Connect to the DID Wallet login to access the website</Alert>
        <Button
          onClick={() => session.login()}
          style={{ marginTop: 16, textTransform: 'none' }}
          variant="contained"
          color="primary">
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default RequiredLogin;
