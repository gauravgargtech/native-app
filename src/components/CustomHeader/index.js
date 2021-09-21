import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  SubHeadingText,
  PlainText,
  Button,
  HeadingText,
  ProfileModal,
} from '../../components';
import {Colors, fontSizes} from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms, s, vs} from 'react-native-size-matters';
import {
  HOME,
  SEARCH,
  SETUP_KIDS,
  LOGIN,
  AUTH_NAVIGATOR,
  APP_NAVIGATOR,
} from '../../navigator/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

const CustomHeader = ({
  back,
  navigation,
  menu,
  headerName,
  search,
  SignIN,
  RegisterUser,
  clearData,
}) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const goBack = back => {
    if (back) {
      navigation.navigate(back);
      if (clearData) {
        clearData();
      }
    } else {
      navigation.navigate(HOME);
      if (clearData) {
        clearData();
      }
    }
  };

  const setMenuIcon = menu;
  return (
    <Box style={styles.mainHeaderContainer}>
      <Box flex={0.8} alignItems={'center'} justifyContent={'center'}>
        {setMenuIcon ? (
          <TouchableOpacity
            style={styles.menuIconView}
            onPress={() => navigation.toggleDrawer()}>
            <Image
              source={menu}
              style={{width: wp('15%'), height: hp('6%')}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              goBack(back);
            }}>
            <Ionicons
              name={'arrow-back-outline'}
              color={Colors.IconColor}
              size={23}
            />
          </TouchableOpacity>
        )}
      </Box>
      <Box flex={3}>
        <Box flex={3} style={styles.mainContainerForHeaderName}>
          <Box>
            <SubHeadingText
              style={{
                fontSize: fontSizes[4],
                color: Colors.black,
                alignItems: 'center',
              }}>
              {headerName}
            </SubHeadingText>
          </Box>
          <Box style={{left: ms(20)}}>
            <TouchableOpacity onPress={() => navigation.navigate(SEARCH)}>
              <Image
                source={search}
                style={{width: wp('20%'), height: hp('7%')}}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
      <Box flex={1.5} alignItems={'center'} justifyContent={'center'}>
        {RegisterUser?.user_id == undefined ? (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(SETUP_KIDS);
            }}>
            <Image
              source={SignIN}
              style={{width: wp('18%')}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{width: wp('20%')}}
            onPress={() => {
              showDialog();
            }}>
            <HeadingText
              fontSize={fontSizes[2.8]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {RegisterUser?.user_id}
            </HeadingText>
            <Modal
              style={{margin: 0, backgroundColor: Colors.white}}
              isVisible={visible}>
              <ProfileModal
                navigation={navigation}
                handleCancel={handleCancel}
              />
            </Modal>
          </TouchableOpacity>
        )}
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  mainHeaderContainer: {
    flexDirection: 'row',
    height: '8%',
    backgroundColor: Colors.white,
  },
  menuIconView: {
    width: wp('7%'),
    height: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainerForHeaderName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
const mapStateToProps = ({app: {RegisterUser}}) => ({
  RegisterUser,
});
export default connect(mapStateToProps, {})(CustomHeader);
