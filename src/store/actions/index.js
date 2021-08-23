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

export const getVideoDetailsAction =
  () =>
  (dispatch, getState, {api}) => {
    const getPromise = async () => {
      const {data} = await api.getVideoDetails();
      return data.detail;
    };
    return dispatch({
      type: types.GET_VIDEO_DETAILS,
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
