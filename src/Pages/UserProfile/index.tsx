import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../Generic Components/SuccessAlert";
import { User, getAuthUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { UPDATE_USER } from "../../graphql/mutations/updateUser";
import { GET_USER } from "../../graphql/queries/user";
import { uploadPhoto } from "../../utils";
import Information from "../UserProfile/Information";
import LeftPanel from "../UserProfile/LeftPanel";
import { validationSchema } from "./validationSchema";

function UserProfile() {
  const authUser = useSelector(getAuthUser);
  const [open, setIsOpen] = useState(false);
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: authUser?.username },
  });
  const userInfo = data?.user?.data as User;
  const [updateUser, { data: updateRes, loading: updateLoading }] = useMutation(
    UPDATE_USER,
    {
      refetchQueries: [
        { query: GET_USER, variables: { username: userInfo?.username } },
      ],
    }
  );
  const successMessage = updateRes?.updateUser?.data;
  const methods = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: userInfo,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, reset } = methods;
  useEffect(() => {
    reset(userInfo);
  }, [userInfo, reset]);

  const onSave = (data: User, photoUrl: string) => {
    updateUser({
      variables: {
        ...data,
        photo: photoUrl,
      },
    })
      .then(() => {
        setIsOpen(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  const onSubmit: SubmitHandler<User> = (data) => {
    if (data.photo instanceof FileList && data.photo.length > 0) {
      setIsSubmitting(true);
      uploadPhoto(
        data.photo[0],
        (photoUrl: string) => {
          console.log("upload photo successfully");
          onSave(data, photoUrl);
        },
        setIsSubmitting,
        "user-images"
      );
    } else {
      onSave(data, (userInfo?.photo as string) || "");
    }
  };

  return (
    <Box>
      <FormProvider {...methods}>
        {(loading || updateLoading || isSubmitting) && <LoadingSpinner />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row">
            <Grid item xs={0} md={2} display={{ xs: "none", md: "block" }}>
              <LeftPanel photo={userInfo?.photo as string} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack direction="column">
                <Information />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
      <SuccessAlert open={open} onClose={() => setIsOpen(false)}>
        {successMessage}
      </SuccessAlert>
    </Box>
  );
}

export default UserProfile;
