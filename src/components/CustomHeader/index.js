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
import {HOME, SEARCH, SETUP_KIDS, LOGIN} from '../../navigator/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';

const CustomHeader = ({
  navigation,
  menu,
  headerName,
  search,
  SignIN,
  getCurrentUserData,
  clearData,
}) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const goBack = () => {
    navigation.navigate(HOME);
    if (clearData) {
      clearData();
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
            style={styles.menuIconView}
            onPress={() => {
              goBack();
            }}>
            <Ionicons
              name={'arrow-back-outline'}
              color={Colors.IconColor}
              size={25}
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
        {getCurrentUserData?.length == 0 ? (
          <TouchableOpacity onPress={() => navigation.navigate(SETUP_KIDS)}>
            <Image
              source={SignIN}
              style={{width: wp('18%')}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              showDialog();
            }}>
            <HeadingText
              fontSize={fontSizes[3]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {getCurrentUserData[0]?.email}
            </HeadingText>
            <Modal
              style={{margin: 0, backgroundColor: Colors.white}}
              isVisible={visible}>
              <ProfileModal handleCancel={handleCancel} />
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
const mapStateToProps = ({app: {getCurrentUserData}}) => ({
  getCurrentUserData,
});
export default connect(mapStateToProps, {})(CustomHeader);
