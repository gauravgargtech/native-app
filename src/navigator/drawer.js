import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
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
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, fontSizes} from '../theme';
import {ms} from 'react-native-size-matters';

const DrawerNavigator = ({
  route,
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
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent
          {...props}
          getCategoryData={getCategoryData}
          getCategoryData_Action={getCategoryData_Action}
        />
      )}
      screenOptions={{
        headerShown: false,
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
    </Drawer.Navigator>
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
