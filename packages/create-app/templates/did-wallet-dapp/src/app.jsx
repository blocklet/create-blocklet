import React from 'react';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';

import { SessionProvider } from './libs/session';
import { translations } from './locales';
import Layout from './components/layout';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './global.css';

const Home = React.lazy(() => import('./pages/home'));
const Profile = React.lazy(() => import('./pages/profile'));

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <SessionProvider>
      <LocaleProvider translations={translations} fallbackLocale="en">
        <Router basename={basename}>
          <App />
        </Router>
      </LocaleProvider>
    </SessionProvider>
  );
}
