import React from 'react';
import {Box, Button, SubHeadingText, ProfileOption} from '../../components';
import {ms} from 'react-native-size-matters';
import {Alert, Image, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CloseIcon_large, ProfileAvtar} from '../../assets/images';
import {connect} from 'react-redux';

const ProfileModal = ({handleCancel}) => {
  const onClickLogout = async () => {
    console.log('Logout');
    Alert.alert('Logout');
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
            // style={{width: 100, height: 20}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </Box>
      <Box width={'100%'} borderWidth={0.3} />
      <ProfileOption OptionName={'Profile'} />
      <ProfileOption OptionName={'Account'} />
      <ProfileOption OptionName={'Settings'} />
      <Box width={'100%'} borderWidth={0.3} />
      <TouchableOpacity
        onPress={() => {
          onClickLogout();
        }}>
        <ProfileOption OptionName={'Logout'} />
      </TouchableOpacity>
    </Box>
  );
};
const mapStateToProps = ({app: {}}) => ({});
export default connect(mapStateToProps, {})(ProfileModal);
