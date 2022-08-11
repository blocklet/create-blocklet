import PropTypes from 'prop-types';
import '@fontsource/lato';

function Provider({ children }) {
  return <>{children}</>;
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
