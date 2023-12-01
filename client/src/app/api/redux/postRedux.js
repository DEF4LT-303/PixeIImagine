import { createSlice } from '@reduxjs/toolkit';

const postlice = createSlice({
  name: 'posts',
  initialState: {
    post: [],
    isFetching: false,
    error: true
  },
  reducers: {
    createPosttart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting login
    },
    createPostuccess: (state) => {
      state.isFetching = false;
      state.error = false; // Reset error to false on successful login
    },
    createPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updatePosttart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting update
    },
    updatePostuccess: (state, action) => {
      state.list = state.list.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      state.isFetching = false;
    },
    updatePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getPosttart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting find
    },
    getPostuccess: (state, action) => {
      state.isFetching = false;
      state.post = action.payload;
      state.error = false; // Reset error to false on successful find
    },
    getPostByIdSuccess: (state, action) => {
      state.isFetching = false;
      state.post = action.payload;
      state.error = false; // Reset error to false on successful find
    },
    getPostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deletePosttart: (state) => {
      state.isFetching = true;
      state.error = false; // Reset error to false when starting delete
    },
    deletePostuccess: (state, action) => {
      const removedIds = action.payload;
      state.post = state.post.filter((post) => {
        return !removedIds.includes(post.id);
      });
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  updatePosttart,
  updatePostuccess,
  updatePostFailure,
  getPosttart,
  getPostuccess,
  createPostFailure,
  createPosttart,
  createPostuccess,
  getPostFailure,
  getPostByIdSuccess,
  deletePosttart,
  deletePostuccess,
  deletePostFailure
} = postlice.actions;

export default postlice.reducer;
