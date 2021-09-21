import * as types from '../types';

export const getNetInfoStatus = status => dispatch => {
  const getPromise = async () => {
    return status;
  };
  return dispatch({
    type: types.CONNECTION,
    payload: getPromise(),
  });
};

export const getCategoryAction =
  () =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getCategory();
      return data;
    };
    return dispatch({
      type: types.GET_CATEGORY,
      payload: getPromise(),
    });
  };
export const getTagsAction =
  () =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getTags();
      return data;
    };
    return dispatch({
      type: types.GET_TAGS,
      payload: getPromise(),
    });
  };

export const getVideoListAction =
  () =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getVideoList();
      return data;
    };
    return dispatch({
      type: types.GET_VIDEO_LIST,
      payload: getPromise(),
    });
  };

export const getVideoDetailsAction =
  videoID =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getVideoDetails(videoID);
      return data;
    };
    return dispatch({
      type: types.GET_VIDEO_DETAILS,
      payload: getPromise(),
    });
  };

export const getVideoPlaylistAction =
  videoID =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getVideoPlaylist(videoID);
      return data;
    };
    return dispatch({
      type: types.GET_VIDEO_PLAYLIST,
      payload: getPromise(),
    });
  };

export const addCommentAction =
  (videoID, comment, userID) =>
  (dispatch, getState, {api}) => {
    console.log('comment of user', comment);
    const getPromise = async () => {
      const {data} = await api.addComment(videoID, comment, userID);
      return data;
    };
    return dispatch({
      type: types.ADD_VIDEO_COMMENT,
      payload: getPromise(),
    });
  };

export const getCommentAction =
  videoID =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getComment(videoID);
      return data?.comments;
    };
    return dispatch({
      type: types.GET_VIDEO_COMMENT,
      payload: getPromise(),
    });
  };

export const getCurrentVideo_Action =
  getCurrentVideo =>
  (dispatch, getState, {api}) => {
    return dispatch({
      type: types.GET_CURRENT_VIDEO,
      payload: getCurrentVideo,
    });
  };

// export const getCurrentTime_Action =
//   getCurrentVideoTime =>
//   (dispatch, getState, {api}) => {
//     return dispatch({
//       type: types.GET_CURRENT_VIDEO_PLAYER_TIME,
//       payload: getCurrentVideoTime,
//     });
//   };

export const getSearchAction =
  searchText =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getSearch(searchText);
      return data;
    };
    return dispatch({
      type: types.GET_SEARCH,
      payload: getPromise(),
    });
  };

export const getTagsData_Action =
  videoID =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getTagsData(videoID);
      return data;
    };
    return dispatch({
      type: types.GET_TAGS_DATA,
      payload: getPromise(),
    });
  };

export const getCategoryData_Action =
  videoID =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getCategoryData(videoID);
      return data;
    };
    return dispatch({
      type: types.GET_CATEGORY_DATA,
      payload: getPromise(),
    });
  };

export const getLoginUser_Action =
  currentUser =>
  (dispatch, getState, {api}) => {
    let array = [];
    array?.push(currentUser);
    return dispatch({
      type: types.GET_CURRENT_USER,
      payload: array,
    });
  };

export const Logout_Action = () => dispatch => {
  return dispatch({
    type: types.LOGOUT,
    payload: {},
  });
};

export const Register_Action =
  param =>
  (dispatch, getState, {api}) => {
    console.log('Register user', param);
    const getPromise = async () => {
      const {data} = await api.getRegister(param);
      return data;
    };
    return dispatch({
      type: types.REGISTER,
      payload: getPromise(),
    });
  };

export const Login_Action =
  param =>
  (dispatch, getState, {api}) => {
    console.log('Login user', param);
    const getPromise = async () => {
      const {data} = await api.getLogin(param);
      return data;
    };
    return dispatch({
      type: types.LOGIN,
      payload: getPromise(),
    });
  };

export const BetaVersion_action =
  value =>
  (dispatch, getState, {api}) => {
    return dispatch({
      type: types.BETA_VERSION,
      payload: value,
    });
  };
