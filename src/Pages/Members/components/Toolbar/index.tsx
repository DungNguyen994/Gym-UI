import {
  InfoOutlined,
  LoyaltyOutlined,
  NotesOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { ElementType } from "react";
import { useLocation } from "react-router-dom";
import { DarkTooltip } from "../../../../Generic Components/Sidebar/Tooltip";
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
  tooltipText: string;
}

export const ToolbarItem = ({ Icon, active, onClick, tooltipText }: Props) => {
  return (
    <div
      className={`icon-container ${active ? "active" : ""}`}
      onClick={() => onClick()}
    >
      <DarkTooltip title={tooltipText} placement="right-start">
        <Icon className="icon-btn" />
      </DarkTooltip>
    </div>
  );
};

export default function MemberToolbar() {
  const selectedToolbar = useAppSelector(getToolbarSelection);
  const dispatch = useAppDispatch();
  const handleClick = (selection: ToolbarSelection) => {
    dispatch(setToolbarSelection(selection));
  };
  const location = useLocation();
  const isAddNewMember = location.pathname === "/members/new";
  return (
    <Stack className="member-toolbar" spacing={3}>
      <ToolbarItem
        Icon={InfoOutlined}
        active={selectedToolbar === ToolbarSelection.Info}
        onClick={() => handleClick(ToolbarSelection.Info)}
        tooltipText="Member Info"
      />
      {!isAddNewMember && (
        <ToolbarItem
          Icon={LoyaltyOutlined}
          active={selectedToolbar === ToolbarSelection.NewMembership}
          onClick={() => handleClick(ToolbarSelection.NewMembership)}
          tooltipText="New Membership"
        />
      )}
      <ToolbarItem
        Icon={ShoppingCartOutlined}
        active={selectedToolbar === ToolbarSelection.POS}
        onClick={() => handleClick(ToolbarSelection.POS)}
        tooltipText="Point of Sale"
      />
      <ToolbarItem
        Icon={NotesOutlined}
        active={selectedToolbar === ToolbarSelection.Notes}
        onClick={() => handleClick(ToolbarSelection.Notes)}
        tooltipText="Member Notes"
      />
    </Stack>
  );
}
