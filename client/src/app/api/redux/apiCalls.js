import { publicRequest, userRequest } from '../../requestMethods';

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess
} from './userRedux';

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

export const createPrompt = async (prompt) => {
  try {
    const res = await userRequest.post('/prompts', prompt);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePrompt = async (id) => {
  try {
    await userRequest.delete(`/prompts/${id}`);
  } catch (error) {
    console.log(error);
  }
};
