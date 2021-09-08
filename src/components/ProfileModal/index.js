import React from 'react';
import {Box, Button, SubHeadingText} from '../../components';
import {ms} from 'react-native-size-matters';
import {Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CloseIcon_large, ProfileAvtar} from '../../assets/images';
import {Colors, fontSizes} from '../../theme';

const ProfileModal = ({handleCancel}) => {
  return (
    <Box flex={1}>
      <Box p={ms(15)}>
        <TouchableOpacity
          style={{
            width: wp('8%'),
            alignItems: 'center',
          }}
          onPress={() => {
            handleCancel();
          }}>
          <Image
            source={CloseIcon_large}
            style={{width: 100, height: 20}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Box>
      <Box width={'100%'} borderWidth={0.3} />
      <Box p={ms(15)} flexDirection={'row'}>
        <Box width={wp('10%')} alignItems={'center'}>
          <Image
            source={ProfileAvtar}
            style={{width: 50, height: 35}}
            resizeMode={'contain'}
          />
        </Box>
        <Box ml={ms(20)} justifyContent={'center'}>
          <SubHeadingText fontSize={fontSizes[3]}>Profile</SubHeadingText>
        </Box>
      </Box>
      <Box p={ms(15)} flexDirection={'row'}>
        <Box width={wp('10%')} alignItems={'center'}>
          <Image
            source={ProfileAvtar}
            style={{width: 50, height: 35}}
            resizeMode={'contain'}
          />
        </Box>
        <Box ml={ms(20)} justifyContent={'center'}>
          <SubHeadingText fontSize={fontSizes[3]}>Account</SubHeadingText>
        </Box>
      </Box>
      <Box p={ms(15)} flexDirection={'row'}>
        <Box width={wp('10%')} alignItems={'center'}>
          <Image
            source={ProfileAvtar}
            style={{width: 50, height: 35}}
            resizeMode={'contain'}
          />
        </Box>
        <Box ml={ms(20)} justifyContent={'center'}>
          <SubHeadingText fontSize={fontSizes[3]}>Settings</SubHeadingText>
        </Box>
      </Box>
      <Box width={'100%'} borderWidth={0.3} />
      <Box p={ms(15)} flexDirection={'row'}>
        <Box width={wp('10%')} alignItems={'center'}>
          <Image
            source={ProfileAvtar}
            style={{width: 50, height: 35}}
            resizeMode={'contain'}
          />
        </Box>
        <Box ml={ms(20)} justifyContent={'center'}>
          <SubHeadingText fontSize={fontSizes[3]}>Logout</SubHeadingText>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileModal;
