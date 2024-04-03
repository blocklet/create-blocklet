import Header from '@blocklet/ui-react/lib/Header';
import { Outlet } from 'react-router-dom';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { SessionManagerProps } from '@blocklet/ui-react/lib/types';
import { useSessionContext } from '../contexts/session';

export default function Layout() {
  const { session } = useSessionContext();

  return (
    <>
      {/* @ts-ignore */}
      <Header
        brand={null}
        description={null}
        maxWidth={false}
        headerEndAddons={
          <>
            <LocaleSelector data-cy="locale-addon" size={23} showText={false} aria-label="switch-locale" />
            <SessionManagerProps session={session} size={24} aria-label="login button" />
          </>
        }
      />
      <Outlet />
    </>
  );
}
