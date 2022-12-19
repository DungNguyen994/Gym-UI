import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { isEqual, isNull, omitBy } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";
import {
  PAYMENT_METHODS,
  membershipTypes,
  periodOptions,
} from "../../../constants";
import { ADD_MEMBER } from "../../../graphql/mutations/addMember";
import { UPDATE_MEMBER } from "../../../graphql/mutations/updateMember";
import { GET_MEMBER } from "../../../graphql/queries/member";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import SaleSummary from "../components/SaleSummary";
import { mapMemberPayload, mapUpdateMemberPayload } from "../utils";
import { validationSchema } from "../validationSchema";

const addNewDefaultValues = {
  newMembership: {
    startDate: dayjs(),
    membershipType: membershipTypes[0],
    term: periodOptions[0],
  },
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  gender: "Male",
  payment: {
    paymentMethod: PAYMENT_METHODS[0],
  },
};
export default function MemberDetails() {
  const { id } = useParams();
  const location = useLocation();
  const isAddNew = location.pathname === "/add-member";
  const { data, loading: getMemberLoading } = useQuery(GET_MEMBER, {
    skip: isAddNew,
    variables: { memberId: id },
  });
  const member = useMemo(() => data?.member?.data as Member, [data]);
  const methods = useForm<Member>({
    resolver: yupResolver(validationSchema),
    defaultValues: isAddNew ? addNewDefaultValues : member,
  });
  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isDirty: isFormDirty },
  } = methods;

  useEffect(() => {
    if (!isAddNew) reset(member);
    else reset(addNewDefaultValues);
  }, [member, reset, isAddNew]);
  const [add, { loading }] = useMutation(ADD_MEMBER, {
    refetchQueries: [{ query: GET_MEMBERS }],
  });
  const [update, { loading: updateLoading }] = useMutation(UPDATE_MEMBER, {
    refetchQueries: [{ query: GET_MEMBERS }],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSave = (data: Member, photoUrl: string) => {
    if (isAddNew) {
      const newMember = mapMemberPayload(data, photoUrl);
      add({
        variables: newMember,
      })
        .then(() => {
          methods.reset();
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      const updatedMember = mapUpdateMemberPayload(data, photoUrl);
      update({
        variables: updatedMember,
        refetchQueries: [{ query: GET_MEMBER, variables: { memberId: id } }],
      }).finally(() => setIsSubmitting(false));
    }
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
      onSave(data, (member.photo as string) || "");
    }
  };

  const hasNewMembership = methods.watch("newMembership");

  const isDirty =
    !isEqual(omitBy(getValues(), isNull), omitBy(member, isNull)) ||
    isFormDirty;
  return (
    <Box p={1} width={{ xs: "95%", md: "80%", lg: "95%" }}>
      {(loading || isSubmitting || updateLoading || getMemberLoading) && (
        <LoadingSpinner />
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container direction="row" borderBottom="1px solid #e3e3e3">
              <LeftPanel isAddNew={isAddNew} member={member} />
              <Grid item xs={12} md={9} lg={7}>
                <Information
                  isAddNew={isAddNew}
                  memberships={member?.memberships || []}
                  member={member}
                />
              </Grid>
              {(isAddNew || hasNewMembership) && (
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
                disabled={!isAddNew && !isDirty}
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
                disabled={!isAddNew && !isDirty}
              >
                Cancel
              </Button>
            </Stack>
          </LocalizationProvider>
        </form>
      </FormProvider>
    </Box>
  );
}
