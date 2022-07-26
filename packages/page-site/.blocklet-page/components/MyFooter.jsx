/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CommonFooter from '@xmark/client/src/components/Footer';

function MyFooter({ ...rest }) {
  const rootCss = css`
    .footer-brand-name,
    .footer-brand-desc {
      display: none;
    }
  `;

  return <CommonFooter css={rootCss} {...rest} />;
}

export default MyFooter;
