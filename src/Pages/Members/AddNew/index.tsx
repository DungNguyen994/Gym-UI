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
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { addMember } from "../../../Redux-toolkit/features/Members/memberSlice";
import { useAppDispatch } from "../../../Redux-toolkit/hooks";
import { NewMember } from "../../../types";
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
  const [add, { loading }] = useMutation(ADD_MEMBER, {
    refetchQueries: [{ query: GET_MEMBERS }, "members"],
  });
  const [editing, setEditing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const onSave = (data: NewMember, photoUrl: string) => {
    const newMember = mapMemberPayload(data, photoUrl) as NewMember;
    add({
      variables: newMember,
    })
      .then(() => {
        dispatch(addMember(newMember));
        setEditing(false);
        methods.reset();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  const onSubmit: SubmitHandler<NewMember> = (data) => {
    if (data.photo instanceof FileList && data.photo.length > 0) {
      setIsSubmitting(true);
      uploadPhoto(
        data.photo[0],
        (photoUrl: string) => {
          console.log("upload photo successfully");
          onSave(data, photoUrl);
        },
        setIsSubmitting
      );
    }
  };

  return (
    <div className="new-member">
      {(loading || isSubmitting) && <LoadingSpinner />}
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
