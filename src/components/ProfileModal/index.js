import React from 'react';
import {
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Box, Button, SubHeadingText, ProfileOption} from '../../components';
import {ms} from 'react-native-size-matters';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CloseIcon_large} from '../../assets/images';
import {Logout_Action, BetaVersion_action} from '../../store/actions';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../assets/images';

const ProfileModal = ({
  navigation,
  handleCancel,
  Logout_Action,
  RegisterUser,
  BetaVersion_action,
  betaVersion,
}) => {
  const onClickLogout = async () => {
    try {
      await Logout_Action();
      await BetaVersion_action(true);
    } catch (e) {
      console.log('ERROR WHILE LOGOUT', e);
    }
  };
  return (
    <>
      <SafeAreaView />
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
              width={'100%'}
              height={'100%'}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </Box>
        <Box style={styles.horizontalLine} />
        <ProfileOption
          ProfileAvtar={ProfileAvtar}
          icon={'log-out'}
          OptionName={'Profile'}
        />
        <ProfileOption icon={'user'} OptionName={'Account'} />
        <ProfileOption icon={'settings'} OptionName={'Settings'} />
        <Box style={styles.horizontalLine} />
        <TouchableOpacity
          onPress={() => {
            onClickLogout();
          }}>
          <ProfileOption icon={'log-out'} OptionName={'Logout'} />
        </TouchableOpacity>
      </Box>
    </>
  );
};
const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%',
    borderWidth: 0.3,
  },
});
const mapStateToProps = ({app: {betaVersion, RegisterUser}}) => ({
  betaVersion,
  RegisterUser,
});
export default connect(mapStateToProps, {Logout_Action, BetaVersion_action})(
  ProfileModal,
);
