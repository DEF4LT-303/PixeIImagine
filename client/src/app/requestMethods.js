import axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = () => {
  const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.tokens?.access_token;

  const headers = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {};

  return axios.create({
    baseURL: BASE_URL,
    headers: headers,
    withCredentials: true
  });
};
