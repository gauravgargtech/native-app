import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Box,
  Input,
  Thumbnail,
  SubHeadingText,
  Loader,
} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ms} from 'react-native-size-matters';
import {Colors, fontSizes, fonts} from '../../../theme';
import {SearchIcon, CloseIcon} from '../../../assets/images';
import {HOME, VIDEO_DETAILS} from '../../../navigator/routes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  getSearchAction,
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
} from '../../../store/actions';
import {connect} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const SearchPage = ({
  navigation,
  getSearchAction,
  getSearchData,
  getCurrentVideo_Action,
  getCurrentVideo,
  getCommentAction,
  getCommentData,
  getVideoPlaylistAction,
  getVideo_PlaylistData,
}) => {
  const isFocused = useIsFocused();
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isFocused) {
      const func = async () => {
        try {
          await getSearchAction('');
        } catch (e) {
          alert('error while get Search Data');
        }
      };
      func();
    }
  }, [isFocused]);

  const searchFilterFunction = async val => {
    setSearch(val);
    try {
      if (val) {
        await getSearchAction(val);
      } else {
        await getSearchAction('');
      }
    } catch (e) {
      alert('error while get Search Data');
    }
  };

  const clearReduxData = () => {
    setSearch('');
    const SearchData = [];
    getSearchAction(SearchData);
  };

  const onClickVideo = async ({searchItem}) => {
    navigation.navigate(VIDEO_DETAILS, {
      videoItem: searchItem,
    });

    try {
      const getPlayerVideo = {
        videoData: searchItem,
      };
      await getCurrentVideo_Action(getPlayerVideo);

      await getCommentAction(searchItem?.id);
      await getVideoPlaylistAction(searchItem?.id);
    } catch (e) {
      console.log('ERRORS AT GET_SEARCH_VIDEO_DATA', e);
    }
  };

  return (
    <Box flex={1}>
      <Box
        backgroundColor={Colors.white}
        borderWidth={1}
        alignItems={'center'}
        height={hp('6%')}
        borderRadius={8}
        flexDirection={'row'}>
        <Box justifyContent={'center'} alignItems={'center'} width={wp('10%')}>
          <TouchableOpacity onPress={() => navigation.navigate(HOME)}>
            <Ionicons
              name={'arrow-back-outline'}
              color={Colors.IconColor}
              size={25}
            />
          </TouchableOpacity>
        </Box>
        <Box width={wp('73%')}>
          <Input
            value={search}
            onChangeText={val => searchFilterFunction(val)}
            placeholder={'Search'}
            placeholderTextColor={Colors.grey}
            inputStyle={styles.searchInputStyle}
            style={{color: Colors.grey}}
            inputContainerStyle={styles.searchInputContainerStyle}
          />
        </Box>
        <Box justifyContent={'center'} alignItems={'center'} width={wp('10%')}>
          <TouchableOpacity
            style={{
              width: '50%',
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              clearReduxData();
            }}>
            <Image
              source={CloseIcon}
              width={'100%'}
              height={'100%'}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </Box>
      </Box>
      <Box p={ms(10)} style={{paddingVertical: ms(10)}}>
        <SubHeadingText fontSize={fontSizes[3]}>Search Data</SubHeadingText>
        <Box style={{paddingTop: ms(20)}}>
          {getSearchData?.loading ? (
            <Loader />
          ) : (
            getSearchData?.list?.map(searchItem => {
              return (
                <Box>
                  <TouchableOpacity onPress={() => onClickVideo({searchItem})}>
                    <Thumbnail
                      videoItem={searchItem}
                      descriptionStyle={styles.videoDescriptionPlaylistView}
                      channelStyle={styles.channelIcon}
                    />
                  </TouchableOpacity>
                </Box>
              );
            })
          )}
        </Box>
      </Box>
    </Box>
  );
};
const styles = StyleSheet.create({
  searchInputStyle: {
    color: Colors.grey,
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes[4],
    marginTop: ms(6),
  },
  searchInputContainerStyle: {
    right: ms(8),
    borderBottomWidth: 0,
  },
});
const mapStateToProps = ({
  app: {getSearchData, getCurrentVideo, getCommentData, getVideo_PlaylistData},
}) => ({
  getSearchData,
  getCurrentVideo,
  getCommentData,
  getVideo_PlaylistData,
});
export default connect(mapStateToProps, {
  getSearchAction,
  getCurrentVideo_Action,
  getCommentAction,
  getVideoPlaylistAction,
})(SearchPage);
