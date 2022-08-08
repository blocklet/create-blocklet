import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import CommonHeader from '@xmark/client/src/components/Header';
import NavMenu from '@arcblock/ux/lib/NavMenu';
import { useInjectContext } from 'virtual:context';
import path from 'path-browserify';

function Header({ meta, ...rest }) {
  const Root = styled(CommonHeader)`
    .header-nav {
      display: none;
    }
  `;
  const { locale } = useInjectContext();

  return (
    <Root
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

        return (
          <>
            {navItems.length > 0 && (
              <NavMenu activeId={navigation.activeId} items={navItems} bgColor="transparent" textColor="#888" />
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
