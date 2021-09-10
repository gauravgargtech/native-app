import React from 'react';
import {ms} from 'react-native-size-matters';
import {Box, SubHeadingText} from '../index';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Image} from 'react-native';
import {fontSizes} from '../../theme';
import Feather from 'react-native-vector-icons/Feather';
const ProfileOption = ({ProfileAvtar, icon, OptionName}) => {
  return (
    <Box p={ms(15)} flexDirection={'row'}>
      <Box width={wp('10%')} alignItems={'center'}>
        {ProfileAvtar ? (
          <Image
            source={ProfileAvtar}
            style={{width: 50, height: 35}}
            resizeMode={'contain'}
          />
        ) : (
          <Feather name={icon} size={25} />
        )}
      </Box>
      <Box ml={ms(20)} justifyContent={'center'}>
        <SubHeadingText fontSize={fontSizes[3]}>{OptionName}</SubHeadingText>
      </Box>
    </Box>
  );
};
export default ProfileOption;
