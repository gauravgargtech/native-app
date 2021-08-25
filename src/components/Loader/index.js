import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Colors} from '../../theme';
import {Box} from '../../components';
const Loader = () => {
  return (
    <Box
      backgroundColor={Colors.white}
      justifyContent={'center'}
      flex={1}
      alignItems={'center'}>
      <ActivityIndicator size="large" color={Colors.black} />
    </Box>
  );
};
export default Loader;
