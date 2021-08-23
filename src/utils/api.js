import axios from 'axios';

const Baseurl = 'https://kid.greatequip.com';

const getCategory_API = `${Baseurl}/api/categories`;
const getVideoDetails_API = `${Baseurl}/api/video/1`;
const getTags_API = `${Baseurl}/api/tags`;

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
const getVideoDetails = () => getApi(getVideoDetails_API);
const getTags = () => getApi(getTags_API);
export default {getCategory, getVideoDetails, getTags};
