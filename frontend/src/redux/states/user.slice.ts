import { createSlice } from "@reduxjs/toolkit";
import { UserEmptyState } from "@/models";
import {
  getFromLocalStorage,
  loadUserToLocalStorageAndCookie,
} from "@/utilities";

export const userSlice = createSlice({
  name: "user",
  initialState: getFromLocalStorage("user") || UserEmptyState,
  reducers: {
    createUser: (state, action) => {
      loadUserToLocalStorageAndCookie(action.payload);
      return action.payload || UserEmptyState;
    },
    modifyUser: (state, action) => {
      loadUserToLocalStorageAndCookie(action.payload);
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      localStorage.removeItem("user");
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      return UserEmptyState;
    },
  },
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
