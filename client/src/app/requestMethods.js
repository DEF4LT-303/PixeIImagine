import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://knowledge-nexus.onrender.com/api/'; // hosted on render.com

const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.access_token;

export const publicRequest = axios.create({
  baseURL: BASE_URL
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `${TOKEN}` }
});
