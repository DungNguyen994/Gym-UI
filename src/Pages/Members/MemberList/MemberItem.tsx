import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  ListItemButton,
  Stack,
} from "@mui/material";
import { Member } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../../Redux-toolkit/hooks";
import {
  getSelectedMember,
  setSelectedMember,
} from "../../../Redux-toolkit/features/Members/memberSlice";
import { LocalPhone } from "@mui/icons-material";
interface Props {
  memberInfo: Member;
}
export default function MemberItem({ memberInfo }: Props) {
  const fullName = memberInfo.firstName + " " + memberInfo.lastName;
  const photoUrl = memberInfo.photo as string;
  const dispatch = useAppDispatch();
  const selectedMember = useAppSelector(getSelectedMember);
  const selected = selectedMember
    ? selectedMember.phoneNumber === memberInfo.phoneNumber
    : false;
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton
        onClick={() => dispatch(setSelectedMember(memberInfo))}
        selected={selected}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={photoUrl || "./blank-profile.png"} />
        </ListItemAvatar>
        <ListItemText
          primary={fullName}
          secondary={
            <Stack spacing={1}>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Active
              </Typography>
              <Stack direction="row" spacing={1}>
                <LocalPhone fontSize="small" />
                <label>{memberInfo.phoneNumber}</label>
              </Stack>
            </Stack>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
