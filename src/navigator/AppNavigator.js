import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AUTH_NAVIGATOR,HOME_NAVIGATOR} from './routes';
import Authentication from './Authentication';
import HomeNavigator from './HomeNavigator';
import {connect} from 'react-redux';
const Stack = createStackNavigator();

const AppNavigator = ({RegisterUser}) => {
  console.log('RegisterUser', RegisterUser);
  return (
    <Stack.Navigator>
      {RegisterUser[0]?.success == true ? (
        <Stack.Screen
          name={HOME_NAVIGATOR}
          options={{
            headerShown: false,
          }}
          component={HomeNavigator}
        />
      ) : (
        <Stack.Screen
          name={AUTH_NAVIGATOR}
          options={{
            headerShown: false,
          }}
          component={Authentication}
        />
      )}
    </Stack.Navigator>
  );
};
const mapStateToProps = ({app: {RegisterUser}}) => ({
  RegisterUser,
});
export default connect(mapStateToProps, {})(AppNavigator);
