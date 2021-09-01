import React, {useEffect} from 'react';
import {Text, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import {Box, SubHeadingText, CustomHeader} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
import {
  Home,
  Search,
  Login,
  Register,
  TagsWise,
  CategoryWise,
  VideoDetails,
} from '../screens';
import {
  HOME,
  SEARCH,
  LOGIN,
  REGISTER,
  TAGS_WISE,
  CATEGORY_WISE,
  VIDEO_DETAILS,
} from './routes';
import LearnAppHomeNavigator from './LearnAppHomeNavigator';
import CustomDrawerContent from './CustomDrawerContent';
import {getCategoryAction, getCategoryData_Action} from '../store/actions';
import {connect} from 'react-redux';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, fontSizes} from '../theme';
import {ms} from 'react-native-size-matters';
const Category = ({navigation}) => {
  return (
    <Box flex={1} backgroundColor={Colors.lightWhite} as={SafeAreaView}>
      <CustomHeader navigation={navigation} headerName={'Category Name'} />
      <Box
        flex={1}
        style={{
          height: hp('100%'),
          backgroundColor: Colors.white,
          padding: ms(10),
        }}>
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <SubHeadingText fontSize={fontSizes[5]}>
            Category Screen Display
          </SubHeadingText>
        </Box>
      </Box>
    </Box>
  );
};
const DrawerNavigator = ({
  route,
  navigation,
  getCategoryAction,
  getCategoryData,
  getCategoryData_Action,
  getCategoryDataList,
}) => {
  useEffect(() => {
    getCategoryAction();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent {...props} getCategoryData={getCategoryData} getCategoryData_Action={getCategoryData_Action} />
      )}
      screenOptions={{
        headerShown: false,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}>
      <Drawer.Screen name={HOME} component={Home} />
      <Drawer.Screen name={SEARCH} component={Search} />
      <Drawer.Screen name={LOGIN} component={Login} />
      <Drawer.Screen name={REGISTER} component={Register} />
      <Drawer.Screen name={TAGS_WISE} component={TagsWise} />
      <Drawer.Screen name={VIDEO_DETAILS} component={VideoDetails} />
      <Drawer.Screen name={CATEGORY_WISE} component={CategoryWise} />
    </Drawer.Navigator>
  );
};
const mapStateToProps = ({app: {getCategoryData}}) => ({getCategoryData});
export default connect(mapStateToProps, {getCategoryAction,getCategoryData_Action})(DrawerNavigator);
