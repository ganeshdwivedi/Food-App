import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogedIn: false,
    user: null,
  },
  reducers: {
    UserLogin: (state, action) => {
      state.isLogedIn = true;
      state.user = {
        email: action.payload.email,
        name: action.payload.name,
        profile: action.payload.picture,
        token: action.payload.token,
        admin: action.payload.isAdmin,
        created: action.payload.createdAt,
        id: action.payload._id,
      };
    },
    UserLogout: (state) => {
      state.isLogedIn = false;
      state.user = null;
    },
  },
});

export const { UserLogin, UserLogout } = authSlice.actions;
export default authSlice.reducer;
