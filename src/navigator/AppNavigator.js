import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AUTH_NAVIGATOR, HOME_NAVIGATOR} from './routes';
import Authentication from './Authentication';
import HomeNavigator from './HomeNavigator';
import {connect} from 'react-redux';
const Stack = createStackNavigator();

const AppNavigator = ({getCurrentUserData, RegisterUser}) => {
  console.log('RegisterUser', RegisterUser);
  return (
    <Stack.Navigator>
      {RegisterUser?.length == 0 ? (
        <Stack.Screen
          name={AUTH_NAVIGATOR}
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
const mapStateToProps = ({app: {getCurrentUserData, RegisterUser}}) => ({
  getCurrentUserData,
  RegisterUser,
});
export default connect(mapStateToProps, {})(AppNavigator);
