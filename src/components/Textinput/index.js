import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Colors, fonts} from '../../theme';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Textinput = ({
  children,
  value,
  onChangeText,
  onBlur,
  placeholder,
  style,
  keyboardType,
  placeholderTextColor,
  onFocus,
}) => {
  return (
    <TextInput
      children={children}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      placeholder={placeholder}
      style={{...style, ...styles.container}}
      keyboardType={keyboardType}
      placeholderTextColor={placeholderTextColor}
      onFocus={onFocus}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    paddingVertical: 14,
    borderRadius: 10,
    color: Colors.black,
    textAlign: 'left',
    justifyContent: 'flex-start',
    fontFamily: fonts.RobotoRegular,
  },
});
export default Textinput;
