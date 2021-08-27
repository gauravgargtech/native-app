import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import {Input as Textinput} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Input = ({
  containerStyle,
  disabled,
  disabledInputStyle,
  errorMessage,
  errorProps,
  errorStyle,
  InputComponent,
  inputContainerStyle,
  inputStyle,
  label,
  labelProps,
  labelStyle,
  leftIcon,
  leftIconContainerStyle,
  renderErrorMessage,
  rightIcon,
  rightIconContainerStyle,
  placeholder,
  onChangeText,
  onBlur,
  keyboardType,
  style,
  value,
  placeholderTextColor,
  secureTextEntry,
}) => {
  return (
    <Textinput
      containerStyle={containerStyle}
      disabled={disabled}
      disabledInputStyle={disabledInputStyle}
      errorMessage={errorMessage}
      errorProps={errorProps}
      errorStyle={errorStyle}
      InputComponent={InputComponent}
      inputContainerStyle={inputContainerStyle}
      inputStyle={inputStyle}
      label={label}
      labelProps={labelProps}
      labelStyle={labelStyle}
      leftIcon={leftIcon}
      leftIconContainerStyle={leftIconContainerStyle}
      renderErrorMessage={renderErrorMessage}
      rightIcon={rightIcon}
      rightIconContainerStyle={rightIconContainerStyle}
      placeholder={placeholder}
      onChangeText={onChangeText}
      onBlur={onBlur}
      keyboardType={keyboardType}
      style={{...style, ...styles.container}}
      value={value}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
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
  },
});
export default Input;
