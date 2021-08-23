import React from 'react';
import {Box, PlainText} from '../../../components';
import {Colors, fontSizes} from '../../../theme';
const LoginPage = ({navigation}) => {
  return (
    <Box flex={1} justifyContent={'flex-start'}>
      <Box flex={1} alignItems={'center'}>
        <PlainText color={Colors.blackColor} fontSize={fontSizes[2]}>
          Login Page
        </PlainText>
      </Box>
    </Box>
  );
};
export default LoginPage;
