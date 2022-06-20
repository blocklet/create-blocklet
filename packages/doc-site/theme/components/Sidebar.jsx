/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import SmartLink from '@xmark/client/src/components/SmartLink';

const rootCss = css`
  &.sidebar {
    border-right: 1px solid #ccc;
  }
  .sidebar__list {
    list-style: none;
    padding: 0;
    .sidebar__list {
      padding-left: 20px;
    }
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
    &.sidebar__link--parent {
      font-weight: bold;
      &:hover {
        background-color: transparent;
      }
    }
  }
`;

function Sidebar({ menus }) {
  console.log({ menus });
  return (
    <aside className="w-[240px] sidebar" css={rootCss}>
      <ul className="sidebar__list">
        {menus.map((item) => (
          <li
            className={clsx('sidebar__item', item.children ? 'sidebar__item__list' : '')}
            key={item.link || item.text}>
            {item.children ? (
              <>
                <span className="sidebar__link sidebar__link--parent">{item.text}</span>
                {Array.isArray(item.children) && (
                  <ul className="sidebar__list">
                    {item.children.map((subItem) => (
                      <li key={subItem.link || subItem.text}>
                        <SmartLink className="sidebar__link" to={subItem.link}>
                          {subItem.text}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <SmartLink className="sidebar__link" to={item.link}>
                {item.text}
              </SmartLink>
            )}
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
