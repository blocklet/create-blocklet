import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@arcblock/ux/lib/Theme';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { Link } from 'react-router-dom';
import { templates } from '../lib/templates';

function GalleryItem({ templateInfo, ...rest }) {
  const { locale = 'en' } = useLocaleContext();
  const { name, displayName, coverImage, desc } = templateInfo;
  return (
    <GalleryItemRoot>
      <Link className="gallery-inner" to={`/templates/${name}`}>
        <div className="gallery-cover-image" style={{ backgroundImage: `url(${coverImage})` }} >
          <div className="gallery-cover-overlay" />
        </div>
        <div className="gallery-content">
          <span className="gallery-title">{displayName}</span>
          <p className="gallery-desc">{desc[locale]}</p>
        </div>
      </Link>
    </GalleryItemRoot>
  );
}

const GalleryItemRoot = styled('li')`
  overflow: hidden;
  font-size: 14px;
  box-shadow: 0 5px 10px rgba(0,0,0,.12);
  /* fix: 避免受 .markdown-body li+li 样式影响 */
  & + & {
    margin: 0;
  }
  a.gallery-inner {
    display: block;
    height: 100%;
    overflow: hidden;
    color: inherit!important;
    border-radius: 4px;
    &,
    &:hover {
      text-decoration: none;
    }
  }
  .gallery-cover-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 56%;
    background-size: cover;
    .gallery-cover-overlay {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: linear-gradient(180deg,transparent,rgba(0,0,0,.05));
    }
  }
  .gallery-content {
    padding: 16px;
    .gallery-title {
      font-weight: bold;
    }
    .gallery-desc {
      margin: 4px 0;
      font-size: 13px;
      color: ${props => props.theme.palette.grey[600]};
    }
  }
`;

function TemplateGallery(props) {
  return (
    <Root {...props}>
      <ul>
        {templates.map(item => <GalleryItem key={item.name} templateInfo={item} />)}
      </ul>
    </Root>
  );
}



TemplateGallery.propTypes = {
}

TemplateGallery.defaultProps = {
}

const Root = styled('div')`
  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    list-style: none;
    padding: 0;
  }
`;

export default TemplateGallery;
