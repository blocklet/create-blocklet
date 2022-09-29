import React from 'react';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from '@arcblock/ux/lib/Button';
import { styled } from '@arcblock/ux/lib/Theme';
import { useInjectContext } from 'virtual:context';
import { templates } from '../lib/templates';

const translations = {
  en: {
    useTemplate: 'Use template',
    readMore: 'Read more',
  },
  zh: {
    useTemplate: '使用模板',
    readMore: '更多内容',
  }
}

function GalleryItem({ templateInfo, ...rest }) {
  const { useLocaleContext } = useInjectContext();
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
          <div className="gallery-actions">
            {/* <Button 
              size="small" 
              variant="outlined"
              color="inherit"
              sx={{ textTransform: 'none' }}
              onClick={handleUseTemplate}>
              {translations[locale].useTemplate}
            </Button> */}
            <Button 
              size="small" 
              variant="outlined"
              color="inherit" 
              endIcon={<NavigateNextIcon />} 
              sx={{ textTransform: 'none' }}>
              {translations[locale].readMore}
            </Button>
          </div>
        </div>
      </Link>
    </GalleryItemRoot>
  );
}

const GalleryItemRoot = styled('li')`
  overflow: hidden;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 6px 10px rgba(0,0,0,.2);
  }
  /* fix: 避免受 .markdown-body li+li 样式影响 */
  & + & {
    margin: 0;
  }
  a.gallery-inner {
    display: block;
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
    color: inherit;
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
      height: 50px;
      background: linear-gradient(180deg, transparent, rgba(0,0,0,.02));
    }
  }
  .gallery-content {
    padding: 16px;
    .gallery-title {
      font-weight: bold;
    }
    .gallery-desc {
      height: 44px;
      margin: 4px 0 0 0;
      font-size: 13px;
      color: ${props => props.theme.palette.grey[600]};
      /* text ellipsis */
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .gallery-actions {
      display: flex;
      /* justify-content: space-between; */
      justify-content: end;
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
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    list-style: none;
    padding: 0;
  }
`;

export default TemplateGallery;
