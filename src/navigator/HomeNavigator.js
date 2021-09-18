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
import DrawerNavigator from './drawer';
import Authentication from './Authentication';
const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME}
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
      />
      <Stack.Screen
        name={SEARCH}
        options={{
          headerShown: false,
        }}
        component={Search}
      />
      <Stack.Screen
        name={TAGS_WISE}
        options={{
          headerShown: false,
        }}
        component={TagsWise}
      />
      <Stack.Screen
        name={CATEGORY_WISE}
        options={{
          headerShown: false,
        }}
        component={CategoryWise}
      />
      <Stack.Screen
        name={VIDEO_DETAILS}
        options={{
          headerShown: false,
        }}
        component={VideoDetails}
      />
      <Stack.Screen
        name={AUTH_NAVIGATOR}
        options={{
          headerShown: false,
        }}
        component={Authentication}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
