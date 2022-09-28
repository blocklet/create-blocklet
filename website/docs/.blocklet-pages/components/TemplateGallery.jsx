import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { styled } from '@arcblock/ux/lib/Theme';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
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
  const navigate = useNavigate();
  const { locale = 'en' } = useLocaleContext();
  const { name, displayName, coverImage, desc } = templateInfo;

  return (
    <GalleryItemRoot>
      <div className="gallery-inner" to={`/templates/${name}`}>
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
              color="inherit" 
              endIcon={<NavigateNextIcon />} 
              sx={{ textTransform: 'none' }}
              onClick={() => navigate(`/templates/${name}`)}>
              {translations[locale].readMore}
            </Button>
          </div>
        </div>
      </div>
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
  gallery-inner {
    height: 100%;
    overflow: hidden;
    border-radius: 4px;
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
