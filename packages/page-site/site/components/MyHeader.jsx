/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import CommonHeader from '@xmark/client/src/components/Header';
import NavMenu from '@arcblock/ux/lib/NavMenu';
import { useInjectContext } from 'virtual:context';
import path from 'path-browserify';

function Header({ meta, ...rest }) {
  const rootCss = css`
    .header-nav {
      display: none;
    }
  `;
  const { locale } = useInjectContext();

  return (
    <CommonHeader
      css={rootCss}
      {...rest}
      homeLink={path.join('/', locale)}
      meta={meta}
      brand={null}
      description={null}
      // eslint-disable-next-line react/jsx-no-useless-fragment
      prepend={<></>}
      // eslint-disable-next-line react/no-unstable-nested-components
      addons={(addons, { navigation }) => {
        const navItems = navigation.navItems || [];
        const filterNavItems = navItems.slice(0, Math.max(1, navItems.length - 1));

        return (
          <>
            {filterNavItems.length > 0 && (
              <NavMenu activeId={navigation.activeId} items={filterNavItems} bgColor="transparent" textColor="#888" />
            )}
            {addons}
          </>
        );
      }}
    />
  );
}
Header.propTypes = {
  meta: PropTypes.object,
};

Header.defaultProps = {
  meta: {},
};

export default Header;
