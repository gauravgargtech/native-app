import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Box, SubHeadingText} from '../../components';
import {Colors, fontSizes} from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SignUP,
  Signup_medium,
  Signup_large,
  SearchIcon,
  MenuIcon,
} from '../../assets/images';
import {ms} from 'react-native-size-matters';

const CustomHeader = ({navigation, headerName}) => {
  return (
    <Box style={styles.mainHeaderContainer}>
      <Box flex={0.8} alignItems={'center'} justifyContent={'center'}>
        <TouchableOpacity
          style={styles.menuIconView}
          onPress={() => navigation.toggleDrawer()}>
          <Image
            source={MenuIcon}
            style={{width: wp('15%'), height: hp('5%')}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Box>
      <Box flex={3}>
        <Box flex={3} style={styles.mainContainerForHeaderName}>
          <Box>
            <SubHeadingText
              style={{
                fontSize: fontSizes[4],
                color: Colors.black,
                alignItems: 'center',
              }}>
              {headerName}
            </SubHeadingText>
          </Box>
          <Box>
            <Image
              source={SearchIcon}
              style={{width: wp('20%'), height: hp('6%')}}
              resizeMode={'contain'}
            />
          </Box>
        </Box>
      </Box>
      <Box flex={1.5} alignItems={'center'} justifyContent={'center'}>
        <TouchableOpacity onPress={() => alert('This is a button!')}>
          <Image
            source={SignUP}
            style={{width: wp('20%')}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainHeaderContainer: {
    flexDirection: 'row',
    height: hp('5%'),
    backgroundColor: Colors.white,
  },
  menuIconView: {
    width: wp('7%'),
    height: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainerForHeaderName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
export default CustomHeader;
