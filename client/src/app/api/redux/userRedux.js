import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registrationStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registrationSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    registrationFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = false;
    },
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.user = action.payload;
      state.error = false;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    findUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    findUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    findUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  findUserStart,
  findUserSuccess,
  registrationFailure,
  registrationStart,
  registrationSuccess,
  findUserFailure
} = userSlice.actions;

export default userSlice.reducer;
