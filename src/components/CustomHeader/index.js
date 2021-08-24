import React from 'react';
import {Image, StyleSheet, TouchableOpacity, Pressable} from 'react-native';
import {Box, SubHeadingText} from '../../components';
import {Colors, fontSizes} from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {HOME, LOGIN, REGISTER} from '../../navigator/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
const CustomHeader = ({navigation, menu, headerName, SearchIcon, SignUP}) => {
  const setMenuIcon = menu;
  return (
    <Box style={styles.mainHeaderContainer}>
      <Box flex={0.8} alignItems={'center'} justifyContent={'center'}>
        {setMenuIcon ? (
          <TouchableOpacity
            style={styles.menuIconView}
            onPress={() => navigation.toggleDrawer()}>
            <Image
              source={menu}
              style={{width: wp('15%'), height: hp('5%')}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.menuIconView}
            onPress={() => navigation.navigate(HOME)}>
            <Ionicons
              name={'arrow-back-outline'}
              color={Colors.grey}
              size={25}
            />
          </TouchableOpacity>
        )}
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
        <TouchableOpacity onPress={() => navigation.navigate(REGISTER)}>
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
