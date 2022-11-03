import {
  InfoOutlined,
  LoyaltyOutlined,
  NotesOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { ElementType } from "react";
import {
  getToolbarSelection,
  setToolbarSelection,
} from "../../../../Redux-toolkit/features/Members/memberSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Redux-toolkit/hooks";
import { ToolbarSelection } from "../../../../types";
import "./index.scss";

interface Props {
  Icon: ElementType;
  active?: boolean;
  onClick: () => void;
}

export const ToolbarItem = ({ Icon, active, onClick }: Props) => {
  return (
    <div
      className={`icon-container ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      <Icon className="icon-btn" />
    </div>
  );
};

export default function MemberToolbar() {
  const selectedToolbar = useAppSelector(getToolbarSelection);
  console.log(selectedToolbar);
  const dispatch = useAppDispatch();
  const handleClick = (selection: ToolbarSelection) => {
    dispatch(setToolbarSelection(selection));
  };
  return (
    <Stack className="member-toolbar" spacing={3}>
      <ToolbarItem
        Icon={InfoOutlined}
        active={selectedToolbar === ToolbarSelection.Info}
        onClick={() => handleClick(ToolbarSelection.Info)}
      />
      <ToolbarItem
        Icon={LoyaltyOutlined}
        active={selectedToolbar === ToolbarSelection.NewMembership}
        onClick={() => handleClick(ToolbarSelection.NewMembership)}
      />
      <ToolbarItem
        Icon={ShoppingCartOutlined}
        active={selectedToolbar === ToolbarSelection.POS}
        onClick={() => handleClick(ToolbarSelection.POS)}
      />
      <ToolbarItem
        Icon={NotesOutlined}
        active={selectedToolbar === ToolbarSelection.Notes}
        onClick={() => handleClick(ToolbarSelection.Notes)}
      />
    </Stack>
  );
}
