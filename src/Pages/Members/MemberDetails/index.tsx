import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isEmpty, isEqual, isNull, omitBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../../Generic Components/SuccessAlert";
import { UPDATE_MEMBER } from "../../../graphql/mutations/updateMember";
import { GET_MEMBER } from "../../../graphql/queries/member";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import SaleSummary from "../components/SaleSummary";
import { createUpdateMemberPayload } from "../utils";
import { validationSchema } from "../validationSchema";

export default function MemberDetails() {
  const { id } = useParams();
  const { data, loading: getMemberLoading } = useQuery(GET_MEMBER, {
    variables: { memberId: id },
  });
  const member = useMemo(() => data?.member?.data as Member, [data]);

  const methods = useForm<Member>({
    resolver: yupResolver(validationSchema),
    defaultValues: member,
  });
  const {
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { isDirty: isFormDirty },
    setError,
  } = methods;

  useEffect(() => {
    reset(member);
  }, [member, reset]);
  const [update, { data: updateRes, loading: updateLoading }] = useMutation(
    UPDATE_MEMBER,
    {
      refetchQueries: [{ query: GET_MEMBERS }],
    }
  );
  const successMessage = updateRes?.updateMember?.data;
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const error = updateRes?.updateMember?.errors;
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

  const onSave = (data: Member, photoUrl: string) => {
    const updatedMember = createUpdateMemberPayload(data, photoUrl);
    update({
      variables: updatedMember,
      refetchQueries: [
        { query: GET_MEMBER, variables: { memberId: id } },
        { query: GET_MEMBERS },
      ],
    })
      .then(({ data }) => {
        if (isEmpty(data?.updateMember?.errors)) {
          setOpenSuccessMessage(true);
          setValue("newMembership", undefined);
        }
      })
      .finally(() => setIsSubmitting(false));
  };
  const onSubmit: SubmitHandler<Member> = (data) => {
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
      onSave(data, (member?.photo as string) || "");
    }
  };

  const hasNewMembership = methods.watch("newMembership");

  const isDirty =
    !isEqual(omitBy(getValues(), isNull), omitBy(member, isNull)) ||
    isFormDirty;

  return (
    <Box p={1} width={{ xs: "95%" }}>
      {(isSubmitting || updateLoading || getMemberLoading) && (
        <LoadingSpinner />
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container direction="row" borderBottom="1px solid #e3e3e3">
                <LeftPanel member={member} />
                <Grid item xs={12} md={9} lg={7}>
                  <Information memberships={member?.memberships || []} />
                </Grid>
                {hasNewMembership && (
                  <Grid item xs={12} xl={3}>
                    <SaleSummary />
                  </Grid>
                )}
              </Grid>
              <Stack
                className="edit-btn"
                spacing={2}
                direction="row-reverse"
                mt={2}
              >
                <Button
                  variant="contained"
                  color="warning"
                  disabled={!isDirty}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    reset();
                  }}
                  disabled={!isDirty}
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
