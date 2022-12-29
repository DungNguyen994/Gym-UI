import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../../Generic Components/SuccessAlert";
import { PAYMENT_METHODS, periodOptions } from "../../../constants";
import { ADD_MEMBER } from "../../../graphql/mutations/addMember";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { GET_MEMBERSHIP_TYPES } from "../../../graphql/queries/membershipTypes";
import { PAYMENTS } from "../../../graphql/queries/payments";
import { MembershipType, NewMemberForm } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import SaleSummary from "../components/SaleSummary";
import { createNewMemberPayload } from "../utils";
import { validationSchema } from "../validationSchema";

export default function AddNewMember() {
  const { data: membershipTypeRes, loading: getMembershipTypeLoading } =
    useQuery(GET_MEMBERSHIP_TYPES);

  const membershipTypes = membershipTypeRes?.membershipTypes
    ?.data as MembershipType[];

  const membershipTypeOptions = useMemo(
    () => membershipTypes?.map((m) => m.name) || [],
    [membershipTypes]
  );

  const addNewDefaultValues = useMemo(
    () => ({
      newMembership: {
        startDate: dayjs(),
        membershipType: membershipTypeOptions[0],
        term: periodOptions[0],
      },
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gender: "Male",
      payment: {
        paymentMethod: PAYMENT_METHODS[0],
        membershipType: "",
        term: "",
      },
    }),
    [membershipTypeOptions]
  );

  const methods = useForm<NewMemberForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: addNewDefaultValues,
  });

  const { handleSubmit, reset, setError } = methods;

  useEffect(() => {
    reset(addNewDefaultValues);
  }, [reset, addNewDefaultValues]);

  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);

  const [add, { data, loading }] = useMutation(ADD_MEMBER, {
    refetchQueries: [{ query: GET_MEMBERS }, { query: PAYMENTS }],
  });

  const successMessage = data?.addMember?.data;
  const error = data?.addMember?.errors;
  const membershipTypeError =
    error?.pointer === "membership.membershipType" && error?.message;

  useEffect(() => {
    if (membershipTypeError)
      setError(
        "newMembership.membershipType",
        {
          message: membershipTypeError,
        },
        { shouldFocus: true }
      );
  }, [membershipTypeError, setError]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSave = (data: NewMemberForm, photoUrl: string) => {
    const newMember = createNewMemberPayload(data, photoUrl);
    add({
      variables: newMember,
    })
      .then(({ data }) => {
        if (isEmpty(data?.addMember?.errors)) {
          reset();
          setOpenSuccessMessage(true);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onSubmit: SubmitHandler<NewMemberForm> = (data) => {
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
    } else {
      onSave(data, "");
    }
  };

  return (
    <Box p={1} width={{ xs: "95%" }}>
      {(loading || isSubmitting || getMembershipTypeLoading) && (
        <LoadingSpinner />
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container direction="row" borderBottom="1px solid #e3e3e3">
                <LeftPanel isAddNew />
                <Grid item xs={12} md={9} lg={7}>
                  <Information isAddNew />
                </Grid>
                <Grid item xs={12} xl={3}>
                  <SaleSummary />
                </Grid>
              </Grid>
              <Stack
                className="edit-btn"
                spacing={2}
                direction="row-reverse"
                mt={2}
              >
                <Button variant="contained" color="warning" type="submit">
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    reset();
                  }}
                >
                  Cancel
                </Button>
              </Stack>
            </LocalizationProvider>
          </FormControl>
        </form>
      </FormProvider>
      <SuccessAlert
        open={openSuccessMessage}
        onClose={() => setOpenSuccessMessage(false)}
      >
        {successMessage}
      </SuccessAlert>
    </Box>
  );
}
