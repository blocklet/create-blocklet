import { Header } from '@blocklet/ui-react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      {/* @ts-ignore */}
      <Header brand={null} description={null} maxWidth={false} />
      <Outlet />
    </>
  );
}
