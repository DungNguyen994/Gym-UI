import { Stack, FormControl } from "@mui/material";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import Information from "../components/Information";
import MemberToolbar from "../components/Toolbar";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "../../../Redux-toolkit/hooks";
import {
  getSelectedMember,
  updateMember,
} from "../../../Redux-toolkit/features/Members/memberSlice";
import { useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { mapMemberPayload } from "../AddNew/utils";
import { Member } from "../../../types";
import { useMutation } from "@apollo/client";
import { UPDATE_MEMBER } from "../../../graphql/mutations/updateMember";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";

export default function Details() {
  const member = useAppSelector(getSelectedMember);
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(true);
  const methods = useForm();
  const { handleSubmit } = methods;
  const [update, { loading }] = useMutation(UPDATE_MEMBER);
  const photoUrl = "";
  const onSave = (data: Member) => {
    const newMember = mapMemberPayload(data, photoUrl) as Member;
    update({
      variables: newMember,
    }).then(() => {
      dispatch(updateMember(newMember));
      setEditing(false);
    });
  };
  const onSubmit: SubmitHandler<Member> = (data) => {
    if (editing) onSave(data);
    else setEditing((prev) => !prev);
  };
  return (
    <FormProvider {...methods}>
      {loading && <LoadingSpinner />}
      <FormControl fullWidth component="form" onSubmit={handleSubmit(onSubmit)}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack className="details-container" direction="row">
            <LeftPanel />
            <Stack className="details-content" direction="row">
              <MemberToolbar />
              <Information
                isAddNew={false}
                editing={editing}
                member={member}
                setEditing={setEditing}
              />
            </Stack>
          </Stack>
        </LocalizationProvider>
      </FormControl>
    </FormProvider>
  );
}
