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
      console.log("unset user gets called and the status and user are "+state.user+" "+state.authStatus);
      
      state.user = null;
      state.authStatus=false;
      console.log(state.authStatus);
      
    },
  },
});

export const { setUser, unSetUser } = authSlice.actions;
export default authSlice.reducer;