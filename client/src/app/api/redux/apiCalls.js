import { publicRequest } from '../../requestMethods';

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess
} from './userRedux';

import {
  getPromptsFailure,
  getPromptsStart,
  getPromptsSuccess
} from './promptRedux';

// *User API Calls*

export const login = async (dispatch, userCredentials) => {
  dispatch(loginStart());
  console.log(userCredentials);
  try {
    const res = await publicRequest.post('/users/login', userCredentials);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid email or password'); // Throw an error for incorrect password
    }
    dispatch(loginFailure());
    throw error;
  }
};

export const register = async (dispatch, user) => {
  dispatch(registrationStart());
  console.log(user);
  try {
    const res = await publicRequest.post('/users/register', user);
    setTimeout(() => {
      dispatch(registrationSuccess());
    }, 3000);
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error('Email already exists'); // Throw an error for invalid email or password
    }
    dispatch(registrationFailure());
    throw error;
  }
};

// *Prompt API Calls*

export const getPrompts = async (dispatch) => {
  dispatch(getPromptsStart());
  try {
    const res = await publicRequest.get('/prompts');
    dispatch(getPromptsSuccess(res.data));
  } catch (error) {
    dispatch(getPromptsFailure());
  }
};
