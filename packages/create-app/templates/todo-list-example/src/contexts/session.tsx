import { useContext } from 'react';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer, withSession } = createAuthServiceSessionContext();

function useSessionContext() {
  const info = useContext(SessionContext);
  return info as any;
}

export { SessionProvider, SessionContext, SessionConsumer, useSessionContext, withSession };
