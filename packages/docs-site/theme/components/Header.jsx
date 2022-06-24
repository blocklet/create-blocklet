/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { IconButton, ClickAwayListener } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useDebounceFn, useResponsive } from 'ahooks';
import clsx from 'clsx';
import SmartLink from '@xmark/client/src/components/SmartLink';
import path from 'path-browserify';
import { removeLastSlash } from '@xmark/utils';
import { DEFAULT_LOCALE } from '@xmark/utils/enum';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { create } from '@arcblock/ux/lib/Theme';
import { useInjectContext } from 'virtual:context';

function Header({ sidebar, className, ...rest }) {
  const ulRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const { locale, changeLocale } = useLocaleContext();
  const location = useLocation();
  const responsive = useResponsive();

  const injectData = useInjectContext();
  const { basename, config } = injectData;

  const theme = create({});

  const rootCss = css`
    &.post-header {
      height: 70px;
      display: flex;
      padding: 10px 20px;
      line-height: 50px;
      justify-content: space-between;
      background-color: #fff;
      border-bottom: 1px solid #0000001a;
    }
    .post-header__title {
      font-size: 24px;
      margin: 0;
      margin-left: 20px;
    }
    .post-header__link {
      margin-left: 20px;
      padding: 0 10px;
      font-size: 18px;
      &:hover,
      &.active {
        color: #4e6af6;
      }
    }
    @media (max-width: ${theme.breakpoints.values.md}px) {
      &.post-header {
        height: 60px;
        line-height: 40px;
      }
      .post-header__title {
        font-size: 18px;
      }
      .post-header__link {
        font-size: 16px;
      }
    }
  `;

  const { run: changeLocation } = useDebounceFn(
    () => {
      const urlList = [];
      if (!injectData.locale && locale === DEFAULT_LOCALE) {
        urlList.push(removeLastSlash(path.join('/', basename, location.pathname)));
      }
      urlList.push(removeLastSlash(path.join('/', basename, locale, location.pathname)));
      if (!urlList.includes(removeLastSlash(window.location.pathname))) {
        window.location.replace(`${urlList[0]}${location.search}`);
      }
    },
    {
      wait: 300,
    }
  );
  const onToggleDrawer = useCallback(
    (show = !showMenu) => {
      setShowMenu(show);
    },
    [showMenu]
  );
  const onClickAway = useCallback(
    (event) => {
      if (event instanceof TouchEvent || event instanceof PointerEvent) {
        const { target } = event;
        if (!ulRef.current.contains(target)) {
          onToggleDrawer(false);
        } else {
          setTimeout(() => {
            onToggleDrawer(false);
          });
        }
      }
    },
    [onToggleDrawer]
  );

  // 默认语言会跟随浏览器设置
  useEffect(() => {
    if (!injectData.locale) {
      changeLocale(DEFAULT_LOCALE);
      return;
    }
    if (injectData.locale !== locale) {
      changeLocale(injectData.locale || DEFAULT_LOCALE);
    }
  }, []);

  useEffect(changeLocation, [locale, changeLocation]);
  return (
    <header className={clsx('post-header', className)} css={rootCss} {...rest}>
      <div className="flex items-center">
        {!responsive.md && (
          <ClickAwayListener onClickAway={onClickAway}>
            <IconButton color="inherit" edge="start" onClick={() => onToggleDrawer()} className="menu-button !mr-1">
              <i className="h-26px w-26px i-mdi-menu" dark="text-white" />
            </IconButton>
          </ClickAwayListener>
        )}
        <a className="flex h-full" href="/">
          <img src="/logo.png" height="100%" />
          <h1 className="post-header__title">{config.title}</h1>
        </a>
      </div>
      <div className="flex items-center">
        <SmartLink className="post-header__link" to="/intro">
          {locale === 'zh' ? '文档' : 'Docs'}
        </SmartLink>
        <LocaleSelector showText={responsive.md} />
      </div>
      {!responsive.md && (
        <div
          ref={ulRef}
          className={`absolute top-60px left-0 right-0 bg-#f7f8fa m-0 px-4 pb-4 color-#1D1F2B whitespace-nowrap leading-10 transition-all border-t-0 border-l-0 border-r-0 border-b border-b-solid border-b-gray-200 ${
            showMenu ? 'block' : 'hidden'
          }`}
          dark="bg-#080808 border-color-#080808"
          lg="block static ml-5 p-0 border-0">
          {sidebar}
        </div>
      )}
    </header>
  );
}

export default Header;
