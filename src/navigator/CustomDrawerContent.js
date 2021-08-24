import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, SubHeadingText} from '../components';
import {Home} from '../screens/index';
import {HOME} from './routes';
import {Colors, fontSizes} from '../theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomDrawerContent = props => {
  console.log('custom navigator', props.getCategoryData);
  const drawerMenuItems = props.getCategoryData.map((categoryItem, index) => {
    return {
      id: categoryItem?.id,
      icon: 'home-outline',
      inactive: 'home',
      title: categoryItem?.text,
      onPress: 'Demo',
      name: 'Home',
    };
  });
  console.log('drawerMenuItems', drawerMenuItems);
  return (
    <Box flex={1}>
      <DrawerContentScrollView>
        {drawerMenuItems.map((item, index) => {
          return (
            <DrawerItem
              icon={({color, size}) => (
                <Icon name={item?.icon} color={color} size={25} />
              )}
              label={item?.title}
              onPress={() => props.navigation.navigate(item?.onPress)}
            />
          );
        })}
      </DrawerContentScrollView>
    </Box>
  );
};
const styles = StyleSheet.create({
  drawerItemView: {
    padding: 10,
  },
  text: {
    fontSize: fontSizes[3],
    color: Colors.blackColor,
  },
});
export default CustomDrawerContent;
