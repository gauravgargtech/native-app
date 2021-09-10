import axios from 'axios';

const Baseurl = 'https://kid.greatequip.com';

const getCategory_API = `${Baseurl}/api/categories`;
const getTags_API = `${Baseurl}/api/tags`;
const getVideoList_API = `${Baseurl}/api/videos`;
const getVideoDetails_API = videoID => `${Baseurl}/api/video/${videoID}`;
const getVideoPlaylist_API = videoID =>
  `${Baseurl}/api/videos/playlist/${videoID}`;

const addComment_Api = (videoID, comment, userID) =>
  `${Baseurl}/api/video/comment?video_id=${videoID}&comment=${comment}&user_id=${userID}`;
const getComment_API = videoID => `${Baseurl}/api/video/comments/${videoID}`;

const getSearch_API = searchText =>
  `${Baseurl}/api/video/search?q=${searchText}`;

const getTagsData_API = videoID => `${Baseurl}/api/video/tag/${videoID}`;
const getCategoryData_API = videoID =>
  `${Baseurl}/api/video/category/${videoID}`;

const register_api = `${Baseurl}/api/users/register`;
const login_api = `${Baseurl}/api/users/login`;

const postApi = (url, values, options) => {
  console.log('url and value', url, values);
  return axios.post(url, values, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const getApi = url => {
  return axios.get(url);
};
const putApi = async (url, body) => {
  console.log('put Api', url);
  return axios.put(`${url}`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
const deleteApi = async url => {
  return axios.delete(`${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const getCategory = () => getApi(getCategory_API);
const getTags = () => getApi(getTags_API);
const getVideoList = () => getApi(getVideoList_API);
const getVideoDetails = videoID => getApi(getVideoDetails_API(videoID));
const getVideoPlaylist = videoID => getApi(getVideoPlaylist_API(videoID));
const addComment = (videoID, comment, userID) =>
  postApi(addComment_Api(videoID, comment, userID));
const getComment = videoID => getApi(getComment_API(videoID));
const getSearch = searchText => getApi(getSearch_API(searchText));

const getTagsData = videoID => getApi(getTagsData_API(videoID));
const getCategoryData = videoID => getApi(getCategoryData_API(videoID));

const getRegister = param => postApi(register_api, param);
const getLogin = param => postApi(login_api, param);
export default {
  getCategory,
  getTags,
  getVideoList,
  getVideoDetails,
  getVideoPlaylist,
  addComment,
  getComment,
  getSearch,
  getTagsData,
  getCategoryData,
  getRegister,
  getLogin,
};
