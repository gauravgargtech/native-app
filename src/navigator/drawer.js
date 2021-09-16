import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  Search,
  SetupKids,
  Login,
  Register,
  TagsWise,
  CategoryWise,
  VideoDetails,
} from '../screens';
import {
  HOME,
  SEARCH,
  SETUP_KIDS,
  LOGIN,
  REGISTER,
  TAGS_WISE,
  CATEGORY_WISE,
  VIDEO_DETAILS,
  AUTH_NAVIGATOR,
} from './routes';
import Authentication from './Authentication';
import CustomDrawerContent from './CustomDrawerContent';
import {
  getCategoryAction,
  getCategoryData_Action,
  getLoginUser_Action,
} from '../store/actions';
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({
  route,
  navigation,
  getCategoryAction,
  getCategoryData,
  getCategoryData_Action,
  getCategoryDataList,
  getLoginUser_Action,
  getCurrentUserData,
}) => {
  const {currentUser} = route.params ?? {};
  useEffect(() => {
    const category = async () => {
      try {
        await getCategoryAction();
        if (currentUser != undefined) {
          await getLoginUser_Action(currentUser);
        }
      } catch (e) {
        alert('error while get category');
      }
    };
    category();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          navigation={navigation}
          getCategoryData={getCategoryData}
          getCategoryData_Action={getCategoryData_Action}
        />
      )}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}>
      <Drawer.Screen name={HOME} component={Home} />
      <Drawer.Screen name={SEARCH} component={Search} />
      <Drawer.Screen name={SETUP_KIDS} component={SetupKids} />
      <Drawer.Screen name={LOGIN} component={Login} />
      <Drawer.Screen name={REGISTER} component={Register} />
      <Drawer.Screen name={TAGS_WISE} component={TagsWise} />
      <Drawer.Screen name={VIDEO_DETAILS} component={VideoDetails} />
      <Drawer.Screen name={CATEGORY_WISE} component={CategoryWise} />
      <Drawer.Screen name={AUTH_NAVIGATOR} component={Authentication} />
    </Drawer.Navigator>
  );
};
const mapStateToProps = ({
  app: {getCategoryData, getCategoryDataList, getCurrentUserData},
}) => ({
  getCategoryData,
  getCategoryDataList,
  getCurrentUserData,
});
export default connect(mapStateToProps, {
  getCategoryAction,
  getCategoryData_Action,
  getLoginUser_Action,
})(DrawerNavigator);
