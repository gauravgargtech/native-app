import * as types from '../types';
const initialState = {
  getTagsData: {list: [], loading: false},
  getCategoryData: [],
  getVideoList: [],
  getVideoDetailsData: [],
  getVideo_PlaylistData: {playList: [], loading: false},
  addCommentData: {data: [], loading: false},
  getCommentData: [],
  getCurrentVideo: {},

  getSearchData: {list: [], loading: false},
  getTagsDataList: [],
  getCategoryDataList: [],
  getCurrentUserData: [],
  RegisterUser: [],
  betaVersion: true,
};

const reducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.GET_TAGS_START:
      return {...state, getTagsData: {loading: true}};
    case types.GET_TAGS_SUCCESS:
      return {...state, getTagsData: {list: action.payload, loading: false}};

    case types.GET_CATEGORY_SUCCESS:
      return {...state, getCategoryData: action.payload};
    case types.GET_VIDEO_LIST_SUCCESS:
      return {...state, getVideoList: action.payload};
    case types.GET_VIDEO_DETAILS_SUCCESS:
      return {...state, getVideoDetailsData: action.payload};

    case types.GET_VIDEO_PLAYLIST_START:
      return {...state, getVideo_PlaylistData: {loading: true}};
    case types.GET_VIDEO_PLAYLIST_SUCCESS:
      return {
        ...state,
        getVideo_PlaylistData: {playList: action.payload, loading: false},
      };

    case types.ADD_VIDEO_COMMENT_START:
      return {...state, addCommentData: {loading: true}};
    case types.ADD_VIDEO_COMMENT_SUCCESS:
      return {...state, addCommentData: {data: action.payload, loading: false}};

    case types.GET_VIDEO_COMMENT_SUCCESS:
      return {...state, getCommentData: action.payload};

    case types.GET_SEARCH_START:
      return {...state, getSearchData: {loading: true}};
    case types.GET_SEARCH_SUCCESS:
      return {...state, getSearchData: {list: action.payload, loading: false}};

    case types.GET_TAGS_DATA_SUCCESS:
      return {...state, getTagsDataList: action.payload};
    case types.GET_CATEGORY_DATA_SUCCESS:
      return {...state, getCategoryDataList: action.payload};

    case types.GET_CURRENT_VIDEO:
      return {...state, getCurrentVideo: action.payload};
    case types.GET_CURRENT_USER:
      return {...state, getCurrentUserData: action.payload};
    case types.LOGOUT:
      return {...state, getCurrentUserData: action.payload};
    case types.REGISTER_SUCCESS:
      return {...state, RegisterUser: action.payload};
    case types.LOGIN_SUCCESS:
      return {...state, RegisterUser: action.payload};
    case types.BETA_VERISON:
      return {...state, betaVersion: action.payload};
    default:
      return {...state};
  }
};

export default reducers;
