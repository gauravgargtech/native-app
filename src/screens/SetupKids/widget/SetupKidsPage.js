import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Box, HeadingText, Button, SubHeadingText} from '../../../components';
import {Colors, fonts, fontSizes} from '../../../theme';
import {REGISTER} from '../../../navigator/routes';
const SetupkidsPage = ({navigation}) => {
  const onClickImKid = () => {
    Alert.alert('Please ask your parent to Register.');
  };

  const onClickImParent = () => {
    navigation.navigate(REGISTER);
  };

  return (
    <Box flex={1}>
      <Box flex={1} justifyContent={'center'} alignItems={'center'}>
        <HeadingText color={Colors.blackColor} fontSize={fontSizes[4]}>
          Get a parent to set up YouTube kids.
        </HeadingText>
        <Box mt={20} justifyContent={'space-evenly'} flexDirection={'row'}>
          <Button
            title={'I M A KID'}
            buttonStyle={styles.btnStyleChild}
            titleStyle={styles.btnTitleChild}
            onPress={() => onClickImKid()}
          />
          <Box ml={20}>
            <Button
              title={'I M A PARENT'}
              buttonStyle={styles.btnStyleChild}
              titleStyle={styles.btnTitleChild}
              onPress={() => onClickImParent()}
            />
          </Box>
        </Box>
        <Box mt={20}>
          <SubHeadingText
            color={Colors.SetupKidsButton}
            fontSize={fontSizes[3]}>
            LEARN MORE
          </SubHeadingText>
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  btnStyleChild: {
    paddingHorizontal: 15,
    backgroundColor: Colors.SetupKidsButton,
  },
  btnTitleChild: {
    color: Colors.white,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes[3],
  },
});
export default SetupkidsPage;
