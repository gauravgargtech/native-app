import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Box, PlainText} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {Colors, fontSizes} from '../../../theme';
const LoginPage = ({navigation}) => {
  return (
    <Box flex={0.1} justifyContent={'flex-start'}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Box height={hp('6%')} flexDirection={'row'}>
          <PlainText color={Colors.blackColor} fontSize={fontSizes[2]}>
            Login Page
          </PlainText>
        </Box>
      </ScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  tagView: {
    justifyContent: 'center',
    height: vs(30),
    borderRadius: 30,
    padding: ms(8),
    margin: ms(5),
  },
});
export default LoginPage;
