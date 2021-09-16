import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import {NetworkError} from '../screens';
import {INTERNET_ERROR} from './routes';

const ErrorDrawer = ({route, navigation}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}>
      <Drawer.Screen name={INTERNET_ERROR} component={NetworkError} />
    </Drawer.Navigator>
  );
};
export default ErrorDrawer;
