import PropTypes from 'prop-types';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import '@fontsource/lato';

function Provider({ children }) {
  return <LocaleProvider translations={{ zh: {}, en: {} }}>{children}</LocaleProvider>;
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
