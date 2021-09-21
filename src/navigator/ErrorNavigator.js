import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {INTERNET_ERROR} from './routes';
import {NetworkError} from '../screens';

const Stack = createStackNavigator();

const ErrorNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={INTERNET_ERROR} component={NetworkError} />
    </Stack.Navigator>
  );
};
export default ErrorNavigator;
