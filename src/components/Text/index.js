import React from 'react';
import {fontSizes, fonts} from '../../theme';
import styled from 'styled-components/native';
import {
  textAlign,
  alignItems,
  lineHeight,
  letterSpacing,
  fontWeight,
  fontSize,
  color,
  fontFamily,
  justifySelf,
  justifyContent,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  padding,
  paddingLeft,
  paddingRight,
  flexWrap,
} from 'styled-system';

const Text = styled.Text`
  ${textAlign}
  ${alignItems}
  ${lineHeight}
  ${letterSpacing}
  ${fontWeight}
  ${fontSize}
  ${color}
  ${fontFamily}
  ${justifySelf}
  ${justifyContent}
  ${marginLeft}
  ${marginRight}
  ${marginTop}
  ${marginBottom}
  ${padding}
  ${paddingLeft}
  ${paddingRight}
  ${flexWrap}
`;

const HeadingText = props => {
  return <Text fontFamily={fonts.RobotoBold} {...props} />;
};

const SubHeadingText = props => {
  return <Text fontFamily={fonts.RobotoMedium} {...props} />;
};
const PlainText = props => (
  <Text
    fontFamily={fonts.RobotoRegular}
    fontSize={fontSizes[1]}
    letterSpacing={0.3}
    {...props}
  />
);

export {HeadingText, SubHeadingText};

export default PlainText;
