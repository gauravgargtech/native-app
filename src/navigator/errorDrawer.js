import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
import {NetworkError} from '../screens';
import {INTERNET_ERROR} from './routes';

const ErrorDrawer = ({route, navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerIcon: ({color}) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      }}>
      <Drawer.Screen name={INTERNET_ERROR} component={NetworkError} />
    </Drawer.Navigator>
  );
};
export default ErrorDrawer;
