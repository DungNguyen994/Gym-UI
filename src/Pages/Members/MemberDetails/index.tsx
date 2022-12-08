import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
import { GET_MEMBER } from "../../../graphql/queries/member";
import { GET_MEMBERS } from "../../../graphql/queries/members";
import { addMember } from "../../../Redux-toolkit/features/Members/memberSlice";
import { useAppDispatch } from "../../../Redux-toolkit/hooks";
import { Member, NewMember } from "../../../types";
import { uploadPhoto } from "../../../utils";
import Information from "../components/Information";
import LeftPanel from "../components/LeftPanel/LeftPanel";
import { mapMemberPayload } from "../utils";
import { validationSchema } from "../validationSchema";
import "./index.scss";

export default function MemberDetails() {
  const { id } = useParams();
  const [fetchMember, { data, loading: getMemberLoading }] =
    useLazyQuery(GET_MEMBER);
  const member = data?.member?.data as Member;
  const location = useLocation();
  const isAddNew = location.pathname === "/add-member";
  useEffect(() => {
    if (!isAddNew) fetchMember({ variables: { memberId: id } });
  }, []);
  const addNewDefaultValues = {
    membership: {
      startDate: dayjs(),
      membershipType: membershipTypes[0],
      term: periodOptions[0],
    },
    payment: {
      paymentMethod: PAYMENT_METHODS[0],
    },
  };
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();
  const onSave = (data: NewMember, photoUrl: string) => {
    const newMember = mapMemberPayload(data, photoUrl) as NewMember;
    add({
      variables: newMember,
    })
      .then(() => {
        dispatch(addMember(newMember));
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
                <LeftPanel member={member} isAddNew={isAddNew} />
              </Grid>
              <Grid item xs={7}>
                <Stack className="details-content" direction="row">
                  <Information isAddNew={isAddNew} />
                </Stack>
              </Grid>
              {isAddNew && (
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
