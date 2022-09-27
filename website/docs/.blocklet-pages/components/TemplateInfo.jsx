import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@arcblock/ux/lib/Theme';
import { useLocaleContext } from '@arcblock/ux/lib/Locale/context';

function TemplateInfo({ info, ...rest }) {
  const { locale = 'en' } = useLocaleContext();
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
      <ul>
        {items.map(({ key, label, ignoreEmptyValue }) => {
          const value = info[key];
          const localizedLabel = label[locale];
          if (ignoreEmptyValue && !value) {
            return null;
          }
          return (
            <li key={key}>
              <span>{localizedLabel}: </span><span>{value}</span>
            </li>
          );
        })}
      </ul>
    </Root>
  );
}



TemplateInfo.propTypes = {
  info: PropTypes.shape({
    name: PropTypes.string,
    blockletType: PropTypes.oneOf(['static', 'dapp']),
    composable: PropTypes.oneOf(['Yes', 'No']),
    framework: PropTypes.string,
    languages: PropTypes.oneOf(['JavaScript', 'TypeScript']),
    useCase: PropTypes.oneOf(['Starter', 'Documentation / Website', 'Server Side API Application']),
    author: PropTypes.string,
  }).isRequired
}

TemplateInfo.defaultProps = {
}

const Root = styled('div')`
  font-size: 14px;
  li span:first-of-type {
    /* color: ${props => props.theme.palette.grey[700]}; */
  }
  li span:last-child {
    font-weight: bold;
  }
`;

export default TemplateInfo;
