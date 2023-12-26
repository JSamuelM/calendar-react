import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: 'checking', // 'authenticated', 'not-authenticated'
  user: {},
  errorMessage: undefined,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'cheking';
      state.user = {};
      state.errorMessage = undefined
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state, { payload }) => {
      state.errorMessage = payload;
    }
  }
});

export const {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} = authSlice.actions
