import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DRAWER_NAVIGATOR,
  HOME,
  SEARCH,
  TAGS_WISE,
  CATEGORY_WISE,
  VIDEO_DETAILS,
  SETUP_KIDS,
  LOGIN,
  REGISTER,
  AUTH_NAVIGATOR,
} from './routes';
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
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={HOME} component={DrawerNavigator} />
      <Stack.Screen name={SEARCH} component={Search} />
      <Stack.Screen name={TAGS_WISE} component={TagsWise} />
      <Stack.Screen name={CATEGORY_WISE} component={CategoryWise} />
      <Stack.Screen name={VIDEO_DETAILS} component={VideoDetails} />
      <Stack.Screen name={SETUP_KIDS} component={SetupKids} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={REGISTER} component={Register} />
    </Stack.Navigator>
  );
};
export default HomeNavigator;
