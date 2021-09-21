import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home} from '../screens';
import {HOME} from './routes';
import CustomDrawerContent from './CustomDrawerContent';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        // drawerIcon: ({color}) => (
        //   <MaterialCommunityIcons name="home" color={color} size={26} />
        // ),
      }}>
      <Drawer.Screen name={HOME} component={Home} />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
