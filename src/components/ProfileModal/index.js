import React from 'react';
import {Alert, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Box, Button, SubHeadingText, ProfileOption} from '../../components';
import {ms} from 'react-native-size-matters';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CloseIcon_large} from '../../assets/images';
import {Logout_Action, BetaVersion} from '../../store/actions';
import {connect} from 'react-redux';
import {ProfileAvtar} from '../../assets/images';

const ProfileModal = ({
  handleCancel,
  Logout_Action,
  BetaVersion,
  betaVersion,
}) => {
  const onClickLogout = async () => {
    await Logout_Action();
    await BetaVersion(true);
    Alert.alert('logout');
  };
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
  );
};
const styles = StyleSheet.create({
  horizontalLine: {
    width: '100%',
    borderWidth: 0.3,
  },
});
const mapStateToProps = ({app: {betaVersion}}) => ({betaVersion});
export default connect(mapStateToProps, {Logout_Action, BetaVersion})(
  ProfileModal,
);
