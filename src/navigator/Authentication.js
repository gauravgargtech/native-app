import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SetupKids, Login, Register} from '../screens';
import {SETUP_KIDS, LOGIN, REGISTER} from './routes';
const AuthStack = createStackNavigator();
const Authentication = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={SETUP_KIDS} component={SetupKids} />
      <AuthStack.Screen name={LOGIN} component={Login} />
      <AuthStack.Screen name={REGISTER} component={Register} />
    </AuthStack.Navigator>
  );
};
export default Authentication;
