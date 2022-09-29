import React from 'react';
import PropTypes from 'prop-types';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@arcblock/ux/lib/Button';
import { styled } from '@arcblock/ux/lib/Theme';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';
import { findByName } from '../lib/templates';

function TemplateInfo({ templateName, ...rest }) {
  const { locale = 'en' } = useLocaleContext();
  const template = findByName(templateName);
  const items = [
    { key: 'name', label: { en: 'Template Name', zh: '模板名称', } },
    { key: 'blockletType', label: { en: 'Blocklet Type', zh: 'Blocklet 类型', } },
    { key: 'composable', label: { en: 'Composable', zh: '是否可组合', } },
    { 
      key: 'framework', 
      label: { en: 'Framework', zh: '使用框架', }, 
      ignoreEmptyValue: true,
    },
    { key: 'languages', label: { en: 'Languages', zh: '开发语言', } },
    { key: 'useCase', label: { en: 'Use Case', zh: '使用案例', } },
    { key: 'author', label: { en: 'Author', zh: '作者', } },
  ];

  return (
    <Root {...rest}>
      <div className="template-info-img">
        <img src={template.coverImage} alt={template.displayName} className="max-w-full max-h-full" />
      </div>
      <div className="template-info-content">
        <ul>
          {items.map((item) => {
            const { key, label, ignoreEmptyValue, renderer } = item;
            const value = template[key];
            const localizedLabel = label[locale];
            if (ignoreEmptyValue && !value) {
              return null;
            }
            if (renderer) {
              return renderer({ key, label: localizedLabel, value });
            }
            return (
              <li key={key}>
                <span>{localizedLabel}</span>
                <span>{value}</span>
              </li>
            );
          })}
          <li style={{ display: 'flex', justifyContent: 'end' }}>
            <Button 
              size="small"
              variant="outlined"
              color="inherit"
              endIcon={<OpenInNewIcon />}
              component="a"
              href={template.readme}
              target="_blank"
              style={{ color: 'inherit', textTransform: 'none' }}>
              README
            </Button>
          </li>
        </ul>
      </div>
    </Root>
  );
}

TemplateInfo.propTypes = {
  templateName: PropTypes.string.isRequired
}

TemplateInfo.defaultProps = {
}

const Root = styled('div')`
  display: flex;
  align-items: start;
  flex-wrap: wrap;
  gap: 44px;
  margin: 32px 0;
  font-size: 14px;
  .template-info-img {
    flex: 1 0 440px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, .12);
    img {
      display: block;
    }
    ${props => props.theme.breakpoints.down('sm')} {
      flex-shrink: 1;
    }
  }
  .template-info-content {
    flex: 1 0 280px;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    color: ${props => props.theme.palette.grey[600]};
  }
  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }
  li {
    border-top: 1px solid ${props => props.theme.palette.grey[300]};
  }
  li span:first-of-type {
    font-weight: bold;
  }
`;

export default TemplateInfo;
