import React from 'react';
import styled from 'styled-components/native';
import {
  flex,
  justifySelf,
  alignSelf,
  order,
  display,
  maxWidth,
  minWidth,
  width,
  height,
  maxHeight,
  minHeight,
  position,
  size,
  space,
  resizeMode,
  accessibilityLabel,
} from 'styled-system';

const BaseImage = styled.Image`
  ${space}
  ${flex}
  ${justifySelf}
  ${alignSelf}
  ${display}
  ${width}
  ${maxWidth}
  ${minWidth}
  ${position}
  ${height}
  ${maxHeight}
  ${minHeight}
  ${size}
  ${order}
  ${resizeMode}
  ${accessibilityLabel}
`;

const Image = React.forwardRef(({secure, authToken, source, ...props}, ref) => {
  const headers = {Authorization: `Bearer ${authToken}`};

  const imageSource = secure
    ? {
        ...source,
        headers,
      }
    : source;

  return <BaseImage ref={ref} source={imageSource} {...props} />;
});

export default Image;
