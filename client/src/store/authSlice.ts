import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authStatus: false,
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.authStatus = true;
      } else {
        state.user = null;
        state.authStatus = false;
      }
    },
    unSetUser: (state) => {
      state.user = null;
      state.authStatus = false;
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;
export default authSlice.reducer;