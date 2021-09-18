import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AUTH_NAVIGATOR,SETUP_KIDS, HOME_NAVIGATOR} from './routes';
import Authentication from './Authentication';
import HomeNavigator from './HomeNavigator';
import {connect} from 'react-redux';
const Stack = createStackNavigator();

const AppNavigator = ({RegisterUser}) => {
  return (
    <Stack.Navigator>
      {!RegisterUser[0]?.user_id ? (
        <Stack.Screen
          name={SETUP_KIDS}
          options={{
            headerShown: false,
          }}
          component={Authentication}
        />
      ) : (
        <Stack.Screen
          name={HOME_NAVIGATOR}
          options={{
            headerShown: false,
          }}
          component={HomeNavigator}
        />
      )}
    </Stack.Navigator>
  );
};
const mapStateToProps = ({app: {RegisterUser}}) => ({
  RegisterUser,
});
export default connect(mapStateToProps, {})(AppNavigator);
