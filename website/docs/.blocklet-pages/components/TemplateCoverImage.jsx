import React from 'react';
import { styled } from '@arcblock/ux/lib/Theme';

function TemplateCoverImage({ children, ...rest }) {
  return (
    <Root {...rest}>
      {children}
    </Root>
  );
}

TemplateCoverImage.propTypes = {
}

TemplateCoverImage.defaultProps = {
}

const Root = styled('div')`
  box-shadow: 0 8px 30px rgba(0, 0, 0, .12);
`;

export default TemplateCoverImage;
