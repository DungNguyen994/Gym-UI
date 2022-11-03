import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface PersitState {
  persit: boolean;
}

const initialState: PersitState = {
  persit: false,
};

export const persitSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrate: (_, action) => {
      return action.payload;
    },
    togglePersit: (state) => {
      state.persit = !state.persit;
    },
  },
});

export const { togglePersit } = persitSlice.actions;

export const getPersit = createSelector(
  (state: RootState) => state.persit,
  (persit) => persit.persit
);

export default persitSlice.reducer;
