import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';

function Provider({ children }) {
  const components = {
    code: CodeBlock,
  };
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

Provider.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Provider;
