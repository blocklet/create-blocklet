import React from 'react';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';

import { SessionProvider } from './libs/session';
import { translations } from './locales';
import Main from './page/main';

let prefix = '/';
if (window.blocklet && window.blocklet.prefix) {
  prefix = window.blocklet.prefix;
}

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider translations={translations}>
        <SessionProvider serviceHost={prefix}>
          <Main />
        </SessionProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
