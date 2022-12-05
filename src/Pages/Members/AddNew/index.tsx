import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  membershipTypes,
  PAYMENT_METHODS,
  periodOptions,
} from "../../../constants";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";
import SaleSummary from "../../../Generic Components/SaleSummary";
import { ADD_MEMBER } from "../../../graphql/mutations/addMember";
import { addMember } from "../../../Redux-toolkit/features/Members/memberSlice";
import { useAppDispatch } from "../../../Redux-toolkit/hooks";
import { Member, NewMember } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import { validationSchema } from "../validationSchema";
import "./index.scss";
import { mapMemberPayload } from "./utils";

export default function AddNew() {
  const methods = useForm<NewMember>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      membership: {
        startDate: dayjs(),
        membershipType: membershipTypes[0],
        term: periodOptions[0],
      },
      payment: {
        paymentMethod: PAYMENT_METHODS[0],
      },
    },
  });
  const { handleSubmit } = methods;
  const [add, { loading }] = useMutation(ADD_MEMBER);
  const [editing, setEditing] = useState(true);
  const dispatch = useAppDispatch();
  const photoUrl = "";
  const onSave = (data: NewMember) => {
    const newMember = mapMemberPayload(data, photoUrl) as Member;

    add({
      variables: newMember,
    }).then(() => {
      dispatch(addMember(newMember));
      setEditing(false);
    });
  };
  const onSubmit: SubmitHandler<NewMember> = (data) => {
    if (data.photo instanceof FileList && data.photo.length > 0) {
      uploadPhoto(data.photo[0], () =>
        console.log("upload photo successfully")
      );
    }
  };

  return (
    <div className="new-member">
      <h1>New Member</h1>
      {loading && <LoadingSpinner />}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container className="details-container" direction="row">
              <Grid item xs={2}>
                <LeftPanel />
              </Grid>
              <Grid item xs={7}>
                <Stack className="details-content" direction="row">
                  <Information
                    editing={editing}
                    isAddNew={true}
                    setEditing={setEditing}
                  />
                </Stack>
              </Grid>

              <Grid item xs={3}>
                <SaleSummary />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      </FormProvider>
    </div>
  );
}
