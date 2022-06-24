/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import CodeBlock from '@arcblock/ux/lib/CodeBlock';
import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import '@fontsource/lato';

const h1Css = css`
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
`;
const h2Css = css`
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 1em;
`;

const components = {
  code: CodeBlock,
  h1: ({ children }) => (
    <h1 css={h1Css} id={children}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 css={h2Css} id={children}>
      {children}
    </h2>
  ),
};
function Provider({ children }) {
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
