import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  username: null,
  id: null,
  token: null,
  role:null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.username = null;
      state.id = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;
