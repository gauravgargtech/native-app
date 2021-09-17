import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  Search,
  TagsWise,
  CategoryWise,
  VideoDetails,
  SetupKids,
  Login,
  Register,
} from '../screens';
import {
  HOME,
  SEARCH,
  TAGS_WISE,
  CATEGORY_WISE,
  VIDEO_DETAILS,
  AUTH_NAVIGATOR,
  SETUP_KIDS,
  LOGIN,
  REGISTER,
} from './routes';
import CustomDrawerContent from './CustomDrawerContent';
import Authentication from './Authentication';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
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
      <Drawer.Screen name={TAGS_WISE} component={TagsWise} />
      <Drawer.Screen name={VIDEO_DETAILS} component={VideoDetails} />
      <Drawer.Screen name={CATEGORY_WISE} component={CategoryWise} />
      <Drawer.Screen name={AUTH_NAVIGATOR} component={Authentication} />
      {/*<Drawer.Screen name={SETUP_KIDS} component={SetupKids} />*/}
      {/*<Drawer.Screen name={LOGIN} component={Login} />*/}
      {/*<Drawer.Screen name={REGISTER} component={Register} />*/}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
// const mapStateToProps = ({
//   app: {getCategoryData, getCategoryDataList, RegisterUser},
// }) => ({
//   getCategoryData,
//   getCategoryDataList,
//   RegisterUser,
// });
// export default connect(mapStateToProps, {
//   getCategoryAction,
//   getCategoryData_Action,
// })(DrawerNavigator);
