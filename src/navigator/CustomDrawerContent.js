import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Box} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getCategoryData_Action} from '../store/actions';
import {connect} from 'react-redux';
import {CATEGORY_WISE} from './routes';
const CustomDrawerContent = (
  props,
) => {
  const onClickCategory = async ({item}) => {
    props.navigation.navigate(item?.onPress, {categoryItem: item});
    try {
      await props.getCategoryData_Action(item?.ID);
      console.log('get Category Data List', props.getCategoryDataList);
    } catch (e) {
      console.log('ERRORS AT GET_CATEGORY_DATA', e);
    }
  };

  const drawerMenuItems = props.getCategoryData.map((categoryItem, index) => {
    return {
      ID: categoryItem?.id,
      icon: 'home-outline',
      inactive: 'home',
      title: categoryItem?.text,
      onPress: CATEGORY_WISE,
      name: 'Home',
    };
  });
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
              onPress={() => onClickCategory({item})}
            />
          );
        })}
      </DrawerContentScrollView>
    </Box>
  );
};
const mapStateToProps = ({app: {getCategoryDataList}}) => ({
  getCategoryDataList,
});
export default connect(mapStateToProps, {getCategoryData_Action})(
  CustomDrawerContent,
);
