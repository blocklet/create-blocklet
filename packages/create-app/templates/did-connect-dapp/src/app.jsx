import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { ThemeProvider } from '@arcblock/ux/lib/Theme';

import { SessionProvider } from './libs/session';
import { translations } from './locales';
import Main from './pages/main';

function App() {
  return (
    <ThemeProvider>
      <LocaleProvider translations={translations}>
        <SessionProvider>
          <Main />
        </SessionProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;
