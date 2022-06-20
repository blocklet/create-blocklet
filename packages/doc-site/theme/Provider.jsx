import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';

function Provider({ children }) {
  const components = {
    code: CodeBlock,
  };
  return (
    <LocaleProvider translations={{ zh: {}, en: {} }}>
      <MDXProvider components={components}>{children}</MDXProvider>
    </LocaleProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
