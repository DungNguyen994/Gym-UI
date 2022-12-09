import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Member, ToolbarSelection } from "../../../types";
import { RootState } from "../../store";

interface MemberState {
  members: Member[];
  seletedMember: Member;
  toolbarSelected: ToolbarSelection;
}

const initialState: MemberState = {
  members: [],
  seletedMember: {},
  toolbarSelected: ToolbarSelection.Info,
};

export const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMembers: (state, action: PayloadAction<Member[]>) => {
      state.members = action.payload;
    },
    setSelectedMember: (state, action: PayloadAction<Member>) => {
      state.seletedMember = action.payload;
    },
    setToolbarSelection: (state, action: PayloadAction<ToolbarSelection>) => {
      state.toolbarSelected = action.payload;
    },
  },
});
export const { setMembers, setSelectedMember, setToolbarSelection } =
  memberSlice.actions;

export const getMembers = (state: RootState) => state.member.members;
export const getToolbarSelection = (state: RootState) =>
  state.member.toolbarSelected;
export const getSelectedMember = (state: RootState) =>
  state.member.seletedMember;

export default memberSlice.reducer;
