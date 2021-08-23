import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';
import {Header as Appheader} from 'react-native-elements';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const Header = ({
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  barStyle,
  centerComponent,
  centerContainerStyle,
  containerStyle,
  leftComponent,
  leftContainerStyle,
  linearGradientProps,
  placement,
  elevated,
  rightComponent,
  rightContainerStyle,
  statusBarProps,
  ViewComponent,
}) => {
  return (
    <Appheader
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      backgroundImageStyle={backgroundImageStyle}
      barStyle={barStyle}
      centerComponent={centerComponent}
      centerContainerStyle={centerContainerStyle}
      containerStyle={containerStyle}
      leftComponent={leftComponent}
      leftContainerStyle={leftContainerStyle}
      linearGradientProps={linearGradientProps}
      placement={placement}
      elevated={elevated}
      rightComponent={rightComponent}
      rightContainerStyle={rightContainerStyle}
      statusBarProps={statusBarProps}
      ViewComponent={ViewComponent}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     width: wp('90%'),
//     paddingVertical: 14,
//     borderRadius: 10,
//     color: Colors.white,
//     textAlign: 'left',
//     justifyContent: 'flex-start',
//   },
// });
export default Header;
