import React, {useEffect} from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Box} from '../components/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DrawerNavigation = createDrawerNavigator();
import {LEARN_APP_NAVIGATOR, CATEGORY, READ_ALOUD} from './routes';
import LearnAppHomeNavigator from './LearnAppHomeNavigator';
import {getCategoryAction} from '../store/actions';
import {connect} from 'react-redux';
import {fontSizes} from '../theme';
import {ms} from 'react-native-size-matters';
import {SignUP, Signup_medium, Signup_large} from '../assets/images';

const Drawer = ({navigation, getCategoryAction, getCategoryData}) => {
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
        name={LEARN_APP_NAVIGATOR}
        component={LearnAppHomeNavigator}
        options={{
          headerTitleStyle: {fontWeight: 'bold', fontSize: fontSizes[5]},
          headerTitle: 'LearnReadApp',
          headerRight: () => (
            <Box right={3}>
              <TouchableOpacity onPress={() => alert('This is a button!')}>
                <Image source={SignUP} style={{width:ms(80),height:ms(35)}} resizeMode={'stretch'}/>
              </TouchableOpacity>
            </Box>
          ),
          drawerLabel: () => <Text>{categoryName[0]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={CATEGORY}
        component={LearnAppHomeNavigator}
        options={{
          headerTitle: 'LearnReadApp',
          drawerLabel: () => <Text>{categoryName[1]}</Text>,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <DrawerNavigation.Screen
        name={READ_ALOUD}
        component={LearnAppHomeNavigator}
        options={{
          headerTitle: 'LearnReadApp',
          drawerLabel: () => <Text>{categoryName[2]}</Text>,
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
