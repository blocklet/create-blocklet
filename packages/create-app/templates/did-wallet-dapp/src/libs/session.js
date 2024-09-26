/* eslint-disable object-curly-newline */
import { useContext } from 'react';
import { createAuthServiceSessionContext } from '@arcblock/did-connect/lib/Session';

const { SessionProvider, SessionContext, SessionConsumer, withSession } = createAuthServiceSessionContext();

function useSessionContext() {
  // get session info, see more: https://www.arcblock.io/docs/blocklet-developer/blocklet-sdk#session
  const info = useContext(SessionContext);
  return info;
}

export { SessionProvider, SessionContext, SessionConsumer, useSessionContext, withSession };
