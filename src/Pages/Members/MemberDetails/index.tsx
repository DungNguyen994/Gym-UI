import { useLazyQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import {
  membershipTypes,
  PAYMENT_METHODS,
  periodOptions,
} from "../../../constants";
import LoadingSpinner from "../../../Generic Components/LoadingSpinner";
import SaleSummary from "../../../Generic Components/SaleSummary";
import { ADD_MEMBER } from "../../../graphql/mutations/addMember";
import { UPDATE_MEMBER } from "../../../graphql/mutations/updateMember";
import { GET_MEMBER } from "../../../graphql/queries/member";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { Member, NewMember } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import { mapMemberPayload, mapUpdateMemberPayload } from "../utils";
import { validationSchema } from "../validationSchema";
import "./index.scss";

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
  const [fetchMember, { data, loading: getMemberLoading }] =
    useLazyQuery(GET_MEMBER);
  const member = useMemo(() => data?.member?.data as Member, [data]);
  const location = useLocation();
  const isAddNew = location.pathname === "/add-member";
  useEffect(() => {
    if (!isAddNew && id) fetchMember({ variables: { memberId: id } });
  }, []);
  const methods = useForm<Member>({
    resolver: yupResolver(validationSchema),
    defaultValues: isAddNew ? addNewDefaultValues : member,
  });
  const { handleSubmit, reset } = methods;

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
  const refetchMember = (id: string) => {
    if (!isAddNew && id)
      fetchMember({
        variables: { memberId: id },
        fetchPolicy: "network-only",
      });
  };
  const onSave = (data: Member, photoUrl: string) => {
    if (isAddNew) {
      const newMember = mapMemberPayload(data, photoUrl) as NewMember;
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
      update({ variables: updatedMember })
        .then(() => {
          if (id) {
            refetchMember(id);
          }
        })
        .finally(() => setIsSubmitting(false));
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
  return (
    <div className="new-member">
      {(loading || isSubmitting || updateLoading || getMemberLoading) && (
        <LoadingSpinner />
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container direction="row">
              <Grid item xs={2}>
                <LeftPanel member={member} isAddNew={isAddNew} />
              </Grid>
              <Grid item xs={7}>
                <Stack direction="column">
                  <Information
                    isAddNew={isAddNew}
                    memberships={member?.memberships}
                    member={member}
                    refetchMember={refetchMember}
                  />
                </Stack>
              </Grid>
              {(isAddNew || hasNewMembership) && (
                <Grid item xs={3}>
                  <SaleSummary />
                </Grid>
              )}
            </Grid>
          </LocalizationProvider>
        </form>
      </FormProvider>
    </div>
  );
}
