import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
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
} from './routes';
import CustomDrawerContent from './CustomDrawerContent';
import {getCategoryAction, getCategoryData_Action} from '../store/actions';
import {connect} from 'react-redux';

const Drawer = createDrawerNavigator();
const DrawerNavigator = ({
  navigation,
  getCategoryAction,
  getCategoryData,
  getCategoryData_Action,
  getCategoryDataList,
}) => {
  useEffect(() => {
    const category = async () => {
      try {
        await getCategoryAction();
      } catch (e) {
        alert('error while get category');
      }
    };
    category();
  }, []);
  return (
    <NavigationContainer>
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
        <Drawer.Screen name={SETUP_KIDS} component={SetupKids} />
        <Drawer.Screen name={HOME} component={Home} />
        <Drawer.Screen name={SEARCH} component={Search} />
        <Drawer.Screen name={LOGIN} component={Login} />
        <Drawer.Screen name={REGISTER} component={Register} />
        <Drawer.Screen name={TAGS_WISE} component={TagsWise} />
        <Drawer.Screen name={VIDEO_DETAILS} component={VideoDetails} />
        <Drawer.Screen name={CATEGORY_WISE} component={CategoryWise} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
const mapStateToProps = ({app: {getCategoryData, getCategoryDataList}}) => ({
  getCategoryData,
  getCategoryDataList,
});
export default connect(mapStateToProps, {
  getCategoryAction,
  getCategoryData_Action,
})(DrawerNavigator);
