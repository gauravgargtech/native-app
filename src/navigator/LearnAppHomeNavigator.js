import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {Home, VideoDetails} from '../screens/index';
import {HOME, VIDEO_DETAILS, DRAWER} from './routes';
import Drawer from './drawer';
import {fontSizes} from '../theme';
import {Box} from '../components';
import {Image, TouchableOpacity} from 'react-native';
import {SignUP} from '../assets/images';
import {ms} from 'react-native-size-matters';

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
        name={VIDEO_DETAILS}
        component={VideoDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default LearnAppHomeNavigator;
