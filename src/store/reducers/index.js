import * as types from '../types';
const initialState = {
  getTagsData: [],
  getCategoryData: [],
  getVideoList: [],
  getVideoDetailsData: [],
};

const reducers = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case types.GET_TAGS_SUCCESS:
      return {...state, getTagsData: action.payload};
    case types.GET_CATEGORY_SUCCESS:
      return {...state, getCategoryData: action.payload};
    case types.GET_VIDEO_LIST_SUCCESS:
      return {...state, getVideoList: action.payload};
    case types.GET_VIDEO_DETAILS_SUCCESS:
      return {...state, getVideoDetailsData: action.payload};

    default:
      return {...state};
  }
};

export default reducers;
