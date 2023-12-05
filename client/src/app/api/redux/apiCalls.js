import { publicRequest, userRequest } from '../../requestMethods';

import {
  loginFailure,
  loginStart,
  loginSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess
} from './userRedux';

import {
  createPostFailure,
  createPostStart,
  createPostSuccess,
  deletePostFailure,
  deletePostStart,
  deletePostSuccess,
  getPostByIdSuccess,
  getPostsFailure,
  getPostsStart,
  getPostsSuccess,
  updatePostFailure,
  updatePostStart,
  updatePostSuccess
} from './postRedux';

// *User API Calls*

export const login = async (dispatch, userCredentials) => {
  dispatch(loginStart());
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

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest().put(`/users/${id}`, user);
    dispatch(updateUserSuccess(res.data));
  } catch (error) {
    dispatch(updateUserFailure());
  }
};

// *Post API Calls*

export const createPost = async (post, dispatch) => {
  dispatch(createPostStart());
  try {
    const res = await userRequest().post('/posts', post);
    dispatch(createPostSuccess(res.data));
  } catch (error) {
    dispatch(createPostFailure());
  }
};

export const getPosts = async (dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await publicRequest.get('/posts');
    dispatch(getPostsSuccess(res.data));
  } catch (error) {
    dispatch(getPostsFailure());
  }
};

export const getPostById = async (id, dispatch) => {
  dispatch(getPostsStart());
  try {
    const res = await publicRequest.get(`/posts/${id}`);
    dispatch(getPostByIdSuccess(res.data));
  } catch (error) {
    dispatch(getPostsFailure());
  }
};

export const updatePost = async (id, post, dispatch) => {
  dispatch(updatePostStart());
  try {
    const res = await userRequest().put(`/posts/${id}`, post);
    dispatch(updatePostSuccess(res.data));
  } catch (error) {
    dispatch(updatePostFailure());
  }
};

export const deletePost = async (id, dispatch) => {
  dispatch(deletePostStart());
  try {
    const res = await userRequest().delete(`/posts/${id}`);
    dispatch(deletePostSuccess(res.data));
  } catch (error) {
    dispatch(deletePostFailure());
  }
};

// *Prompt API Calls*

export const getPromptsByUser = async () => {
  try {
    const res = await publicRequest().get(`/prompts/user/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPrompt = async (prompt) => {
  try {
    const res = await userRequest().post('/prompts', prompt);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deletePrompt = async (id) => {
  try {
    await userRequest().delete(`/prompts/${id}`);
  } catch (error) {
    console.log(error);
  }
};
