import React from 'react';
import {ms} from 'react-native-size-matters';
import {Box, SubHeadingText} from '../index';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {ProfileAvtar} from '../../assets/images';
import {fontSizes} from '../../theme';

const ProfileOption = ({OptionName}) => {
  return (
    <Box p={ms(15)} flexDirection={'row'}>
      <Box width={wp('10%')} alignItems={'center'}>
        <Image
          source={ProfileAvtar}
          style={{width: 50, height: 35}}
          resizeMode={'contain'}
        />
      </Box>
      <Box ml={ms(20)} justifyContent={'center'}>
        <SubHeadingText fontSize={fontSizes[3]}>{OptionName}</SubHeadingText>
      </Box>
    </Box>
  );
};
export default ProfileOption;
