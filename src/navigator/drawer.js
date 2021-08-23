import React, {useEffect} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Box} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerNavigation = createDrawerNavigator();
import {
  LEARN_APP_NAVIGATOR,
  CATEGORY,
  READ_ALOUD,
  NURSERY_RHYMES,
  MANY_MORE,
  AND_MORE,
} from './routes';
import LearnAppHomeNavigator from './LearnAppHomeNavigator';
import {getCategoryAction} from '../store/actions';
import {connect} from 'react-redux';

const Drawer = ({getCategoryAction, getCategoryData}) => {
  useEffect(() => {
    getCategoryAction();
  }, []);
  console.log('getCategoryData', getCategoryData);
  const categoryName = getCategoryData.map(categoryItem => {
    return categoryItem.text;
  });
  console.log('category Name', categoryName);
  return (
    <DrawerNavigation.Navigator>
      <DrawerNavigation.Screen
        name={CATEGORY}
        component={LearnAppHomeNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text>{categoryName[0]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={READ_ALOUD}
        component={LearnAppHomeNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text>{categoryName[1]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={NURSERY_RHYMES}
        component={LearnAppHomeNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text>{categoryName[2]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={MANY_MORE}
        component={LearnAppHomeNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text>{categoryName[3]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={AND_MORE}
        component={LearnAppHomeNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => <Text>{categoryName[4]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
    </DrawerNavigation.Navigator>
  );
};
const mapStateToProps = ({app: {getCategoryData}}) => ({getCategoryData});
export default connect(mapStateToProps, {getCategoryAction})(Drawer);
