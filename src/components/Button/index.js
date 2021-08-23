import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Button as NativeButton} from 'react-native-elements';
import {Colors} from '../../theme';

const Button = ({primary, buttonStyle, titleStyle = {}, onPress, ...props}) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          height: 48,
        },
        primary: {
          backgroundColor: Colors.btnclr,
        },
        primaryTitle: {
          color: Colors.white,
        },
      }),
    [],
  );
  const {fontWeight, fontFamily, fontStyle, ...titleStyleRest} = titleStyle;
  return (
    <NativeButton
      buttonStyle={{
        ...styles.base,
        ...(primary ? styles.primary : {}),
        ...(buttonStyle || {}),
      }}
      titleStyle={{
        // fontFamily: fonts.Semi,
        ...(primary ? styles.primaryTitle : {}),
        ...{
          ...titleStyleRest,
          // fontFamily: fonts.Semi,
        },
        ...(titleStyle || {}),
      }}
      onPress={onPress}
      {...props}
    />
  );
};
export default Button;
