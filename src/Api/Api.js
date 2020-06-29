import axios from 'axios';
import { getKey } from './LocalStorage';

const Baseurl = process.env.REACT_APP_API_URL;
const getToken = (key) => {
  return getKey(key);
}

export const postAPI = (path, data) => {
  let token = getToken('token');
  return axios({
    method: 'post',
    url: Baseurl + path,
    headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token },
    data: data
  })
}

export const putAPI = (path, data) => {
  let token = getToken('token');
  return axios({
    method: 'put',
    url: Baseurl + path,
    headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token },
    data: data
  })
}

export const getAPI = (path) => {
  let token = getToken('token');
  return axios({
    method: 'get',
    url: Baseurl + path,
    headers: { 'content-type': 'application/json', 'Authorization': 'Bearer ' + token },
  })
}

export const getPublicAPI = (path) => {
  return axios({
    method: 'get',
    url: Baseurl + path,
    headers: { 'content-type': 'application/json' },
  })
}
