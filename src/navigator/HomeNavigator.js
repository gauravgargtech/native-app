import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DRAWER_NAVIGATOR, HOME} from './routes';
import DrawerNavigator from './drawer';
import {Home} from '../screens';
const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={DRAWER_NAVIGATOR}
        options={{
          headerShown: false,
        }}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
