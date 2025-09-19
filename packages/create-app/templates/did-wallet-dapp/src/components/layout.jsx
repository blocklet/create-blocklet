import Header from '@blocklet/ui-react/lib/Header';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSessionContext } from '../libs/session';

export default function Layout() {
  const { session, events } = useSessionContext();

  useEffect(() => {
    events.once('logout', () => {
      window.location.href = '/';
    });
  }, []);

  // support login redirect
  // useEffect(() => {
  //   if (session.initialized && !session.user) {
  //     session.login(() => {}, { openMode: 'redirect', redirect: window.location.href });
  //   }
  // }, [session.initialized]);
  
  return (
    <>
      <Header brand={null} description={null} maxWidth={false} />
      <Outlet />
    </>
  );
}
