import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@arcblock/ux/lib/Theme';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
// import SmarkLink from '@xmark/client';
import { Link } from 'react-router-dom';
import { templates } from '../lib/templates';

function GalleryItem({ templateInfo, ...rest }) {
  const { name, displayName, coverImage } = templateInfo;
  return (
    <GalleryItemRoot>
      <Link className="gallery-inner" to={`/templates/${name}`}>
        <div className="gallery-cover-image" style={{ backgroundImage: `url(${coverImage})` }} >
          <div className="gallery-cover-overlay" style={{  }}></div>
        </div>
        <div className="gallery-content">
          <span className="gallery-title">{displayName}</span>
        </div>
      </Link>
    </GalleryItemRoot>
  );
}

const GalleryItemRoot = styled('li')`
  flex: 0 0 auto;
  width: 33.33%;
  padding: 12px;
  overflow: hidden;
  font-size: 14px;
  /* fix: 避免受 .markdown-body li+li 样式影响 */
  & + & {
    margin: 0;
  }
  .gallery-inner {
    display: block;
    box-shadow: 0 5px 10px rgba(0,0,0,.12);
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
  }
`;

function TemplateGallery(props) {
  const { locale = 'en' } = useLocaleContext();

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
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    margin: 0 -12px;
    padding: 0;
  }
`;

export default TemplateGallery;
