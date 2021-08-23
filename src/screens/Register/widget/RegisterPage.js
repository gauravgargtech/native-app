import React from 'react';
import {Box, PlainText} from '../../../components';
import {Colors, fontSizes} from '../../../theme';
const RegisterPage = ({navigation}) => {
  return (
    <Box flex={1} justifyContent={'flex-start'}>
      <Box flex={1} alignItems={'center'}>
        <PlainText color={Colors.blackColor} fontSize={fontSizes[2]}>
          Register Page
        </PlainText>
      </Box>
    </Box>
  );
};
export default RegisterPage;
