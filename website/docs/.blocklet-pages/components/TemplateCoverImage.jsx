import React from 'react';
import { styled } from '@arcblock/ux/lib/Theme';
import { findByName } from '../lib/templates';

function TemplateCoverImage({ templateName, ...rest }) {
  const template = findByName(templateName);
  return (
    <Root {...rest}>
      <img src={template.coverImage} alt={template.displayName} className="max-w-full max-h-full m-auto" />
    </Root>
  );
}

TemplateCoverImage.propTypes = {
}

TemplateCoverImage.defaultProps = {
}

const Root = styled('div')`
  box-shadow: 0 8px 30px rgba(0, 0, 0, .12);
  img {
    display: block;
  }
`;

export default TemplateCoverImage;
