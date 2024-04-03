import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import TodoList from './pages/todo-list';
import Layout from './components/layout';
import { SessionProvider } from './contexts/session';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<TodoList />} />
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
      <LocaleProvider translations={{}}>
        <Router basename={basename}>
          <App />
        </Router>
      </LocaleProvider>
    </SessionProvider>
  );
}
