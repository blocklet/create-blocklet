import React from 'react';
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import Button from '@arcblock/ux/lib/Button';
import { styled } from '@arcblock/ux/lib/Theme';
import { useInjectContext } from 'virtual:context';
import { findByName } from '../lib/templates';

const translations = {
  en: {
    viewSource: 'View Source',
  },
  zh: {
    viewSource: '查看源码',
  }
}

function TemplateInfo({ templateName, ...rest }) {
  const { useLocaleContext } = useInjectContext();
  const { locale = 'en' } = useLocaleContext();
  const template = findByName(templateName);
  const items = [
    { key: 'name', label: { en: 'Template Name', zh: '模板名称', } },
    { key: 'blockletType', label: { en: 'Blocklet Type', zh: 'Blocklet 类型', } },
    { 
      key: 'composable', 
      label: { en: 'Composable', zh: '是否可组合', },
      renderer(value) {
        const texts = {
          true: { en: 'Yes', zh: '是' },
          false: { en: 'No', zh: '否' },
        };
        return texts[value][locale]
      },
    },
    { 
      key: 'framework', 
      label: { en: 'Framework', zh: '使用框架', }, 
      renderer(value) {
        return value || 'N/A';
      },
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
            const value = renderer ? renderer(template[key]) : template[key];
            const localizedLabel = label[locale];
            if (ignoreEmptyValue && !value) {
              return null;
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
              startIcon={<GitHubIcon />}
              component="a"
              href={template.readme}
              target="_blank"
              style={{ color: 'inherit', textDecoration: 'none', textTransform: 'none' }}>
              {translations[locale].viewSource}
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
