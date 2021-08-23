import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home, Login, Register, VideoDetails} from '../screens/index';
import {HOME, LOGIN, REGISTER, VIDEO_DETAILS} from './routes';

const Stack = createStackNavigator();
const LearnAppHomeNavigator = ({navigation}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME}
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={LOGIN}
        component={Login}
        options={{
          headerTitle: 'Login',
          headerBackTitleVisible: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={REGISTER}
        component={Register}
        options={{
          headerTitle: 'Register',
          headerBackTitleVisible: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name={VIDEO_DETAILS}
        component={VideoDetails}
        options={{
          headerTitle: 'Details',
          headerBackTitleVisible: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
    </Stack.Navigator>
  );
};
export default LearnAppHomeNavigator;
