/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useResponsive } from 'ahooks';
import { create } from '@arcblock/ux/lib/Theme';

function PostLayout({ children, sidebar }) {
  const theme = create({});
  const responsive = useResponsive();
  const rootCss = css`
    min-height: 100vh;
    background-color: #fff;
    height: 100vh;

    .post-page__body {
      flex: 1;
      padding-top: 70px;
      overflow: hidden;
      @media (max-width: ${theme.breakpoints.values.md}px) {
        padding-top: 60px;
      }
    }
    .post-page__main {
      padding: 20px;
      box-shadow: rgb(0 0 0 / 2%) 0px 0px 5px, rgb(0 0 0 / 10%) 0px 5px 22px -8px;
      overflow: overlay;
    }
    .post-page__header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  `;
  return (
    <div className="flex flex-col post-page" css={rootCss}>
      <Header className="post-page__header" sidebar={sidebar} />
      <div className="flex post-page__body">
        {responsive.md && sidebar}
        <main className="flex-1 post-page__main">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default PostLayout;
