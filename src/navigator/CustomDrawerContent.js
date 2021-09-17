import React, {useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Box} from '../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CATEGORY_WISE} from './routes';
import {connect} from 'react-redux';
import {getCategoryAction, getCategoryData_Action} from '../store/actions';
const CustomDrawerContent = ({
  props,
  navigation,
  getCategoryAction,
  getCategoryData,
  getCategoryData_Action,
}) => {
  // const {
  //   navigation,
  //   getCategoryAction,
  //   getCategoryData,
  //   getCategoryData_Action,
  // } = props;

  useEffect(() => {
    const category = async () => {
      try {
        await getCategoryAction();
      } catch (e) {
        alert('error while get category');
      }
    };
    category();
  }, []);

  const onClickCategory = async ({item}) => {
    navigation.navigate(item?.onPress, {categoryItem: item});
    try {
      await getCategoryData_Action(item?.ID);
    } catch (e) {
      console.log('ERRORS AT GET_CATEGORY_DATA', e);
    }
  };

  const drawerMenuItems = getCategoryData?.map((categoryItem, index) => {
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
      <DrawerContentScrollView {...props}>
        {drawerMenuItems?.map((item, index) => {
          return (
            <DrawerItem
              key={index}
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

const mapStateToProps = ({
  app: {getCategoryData, getCategoryDataList, RegisterUser},
}) => ({
  getCategoryData,
  getCategoryDataList,
  RegisterUser,
});
export default connect(mapStateToProps, {
  getCategoryAction,
  getCategoryData_Action,
})(CustomDrawerContent);
// export default CustomDrawerContent;
