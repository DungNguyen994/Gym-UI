import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface User {
  id?: string;
  username?: string;
  role?: string;
  accessToken?: string;
  firstName?: string;
  lastName?: string;
  photo?: FileList | string;
}
interface AuthState {
  user?: User;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export const getAuthUser = createSelector(
  (state: RootState) => state.auth,
  (auth) => auth.user
);

export default authSlice.reducer;
