/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
// import { ReactComponent as LogoWhite } from '../../assets/logos/logo-horizontal-white.svg';

import { ReactComponent as LogoDark } from '../../assets/logos/logo-horizontal-dark.svg';

export default function Footer() {
  const rootCss = css`
    &.footer {
      padding: 28px 0;
      margin-bottom: -20px;
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      color: #9b9b9b;
    }
  `;

  const start = 2017;
  const end = new Date().getFullYear();
  return (
    <div css={rootCss} className="footer">
      <div>
        © ArcBlock {start} - {end}
      </div>
      <div className="flex items-center whitespace-nowrap">
        Powered by
        <LogoDark className="pl-4 pr-2" width="100%" height="40px" />
      </div>
    </div>
  );
}
