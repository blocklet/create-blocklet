/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDebounceFn } from 'ahooks';
import clsx from 'clsx';
import SmartLink from '@xmark/client/src/components/SmartLink';
import path from 'path-browserify';
import { removeLastSlash } from '@xmark/utils';
import { DEFAULT_LOCALE } from '@xmark/utils/enum';
import LocaleSelector from '@arcblock/ux/lib/Locale/selector';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { useInjectContext } from 'virtual:context';

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
    &:hover {
      color: #4e6af6;
    }
  }
`;

function MyHeader({ className, ...rest }) {
  const injectData = useInjectContext();
  const { config, basename } = injectData;
  const { locale, changeLocale } = useLocaleContext();
  const location = useLocation();

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
      console.log('changeLocation', { locale, urlList });
    },
    {
      wait: 300,
    }
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
      <SmartLink className="flex" to="/">
        <img src="/logo.png" />
        <h1 className="post-header__title">{config.title}</h1>
      </SmartLink>
      <div className="flex items-center">
        <SmartLink className="post-header__link" to="/docs">
          {locale === 'zh' ? '文档' : 'Docs'}
        </SmartLink>
        <LocaleSelector />
      </div>
    </header>
  );
}

export default MyHeader;
