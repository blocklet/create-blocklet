/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import clsx from 'clsx';
import SmartLink from '@xmark/client/src/components/SmartLink';
import { useInjectContext } from '@xmark/utils/inject';

const rootCss = css`
  &.post-header {
    height: 70px;
    display: flex;
    padding: 10px 20px;
    line-height: 50px;
    justify-content: space-between;
  }
  .post-header__title {
    font-size: 24px;
    margin: 0;
    margin-left: 20px;
  }
  .post-header__link {
    margin-left: 20px;
    padding: 0 10px;
    &:hover {
      color: #21c8cb;
    }
  }
`;

function Header({ className, ...rest }) {
  const injectData = useInjectContext();
  const { config } = injectData;
  return (
    <header className={clsx('shadow post-header', className)} css={rootCss} {...rest}>
      <SmartLink className="flex" to="/">
        <img src="/logo.png" />
        <h1 className="post-header__title">{config.title}</h1>
      </SmartLink>
      <div>
        <SmartLink className="post-header__link" to="/doc">
          文档
        </SmartLink>
      </div>
    </header>
  );
}

export default Header;
