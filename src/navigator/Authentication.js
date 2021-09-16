import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SetupKids, Login, Register} from '../screens';
import {
  SETUP_KIDS,
  LOGIN,
  REGISTER,
  DRAWER_NAVIGATOR,
  HOME_NAVIGATOR,
} from './routes';
import DrawerNavigator from './drawer';
import HomeNavigator from './HomeNavigator';
const AuthStack = createStackNavigator();
const Authentication = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={SETUP_KIDS} component={SetupKids} />
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={Register} />
      {/*<AuthStack.Screen name={DRAWER_NAVIGATOR} component={DrawerNavigator} />*/}
      {/*<AuthStack.Screen name={HOME_NAVIGATOR} component={HomeNavigator} />*/}
    </AuthStack.Navigator>
  );
};

export default Authentication;
