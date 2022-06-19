/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import SmartLink from '@xmark/client/src/components/SmartLink';

const rootCss = css`
  &.sidebar {
    border-right: 1px solid #ccc;
    padding: 20px;
  }
  /* .sidebar__title {
    line-height: 1;
    margin: 0;
  } */
  .sidebar__list {
    list-style: none;
    margin: 0 -20px;
    padding: 0;
  }
  .sidebar__item {
  }
  .sidebar__link {
    display: block;
    line-height: 1em;
    padding: 15px 20px;
    /* margin: 10px 0; */
    font-size: 18px;
    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

function Sidebar({ menus }) {
  return (
    <aside className="w-[240px] sidebar" css={rootCss}>
      <ul className="sidebar__list">
        {menus.map((item) => (
          <li className="sidebar__item" key={item.link}>
            <SmartLink className="sidebar__link" to={item.link}>
              {item.text}
            </SmartLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

Sidebar.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default Sidebar;
