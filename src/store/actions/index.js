import * as types from '../types';

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
  (videoID) =>
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
  getCurrentVideoData =>
  (dispatch, getState, {api}) => {
    return dispatch({
      type: types.GET_CURRENT_VIDEO_PLAYER_TIME,
      payload: getCurrentVideoData,
    });
  };
