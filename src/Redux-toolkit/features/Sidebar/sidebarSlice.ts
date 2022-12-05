import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface SidebarState {
  selectedMenuItem: number;
}

const initialState: SidebarState = {
  selectedMenuItem: 0,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSelectedMenuItem: (state, action: PayloadAction<number>) => {
      state.selectedMenuItem = action.payload;
    },
  },
});

export const { setSelectedMenuItem } = sidebarSlice.actions;

export const getSelectedMenuItem = createSelector(
  (state: RootState) => state.sidebar,
  (sidebar) => sidebar.selectedMenuItem
);

export default sidebarSlice.reducer;
