import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import SuccessAlert from "../../Generic Components/SuccessAlert";
import { User, getAuthUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { UPDATE_PASSWORD } from "../../graphql/mutations/updatePasword";
import { GET_USER } from "../../graphql/queries/user";

interface FormType {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
function ChangePassword() {
  const authUser = useSelector(getAuthUser);
  const [open, setIsOpen] = useState(false);
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: authUser?.username },
  });
  const userInfo = data?.user?.data as User;
  const [updatePassword, { data: updateRes, loading: updateLoading }] =
    useMutation(UPDATE_PASSWORD);
  const successMessage = updateRes?.changePassword?.data;
  const errorMessage = updateRes?.changePassword?.errors?.message;

  const validationSchema = yup
    .object({
      currentPassword: yup.string().required("Enter current password"),
      password: yup.string().required("Enter password"),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    })
    .required();

  const methods = useForm<FormType>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, errors },
    register,
  } = methods;
  const onSubmit: SubmitHandler<FormType> = (data) => {
    updatePassword({
      variables: {
        id: userInfo?.id,
        password: data.password,
        currentPassword: data.currentPassword,
      },
    }).then(() => {
      reset();
      setIsOpen(true);
    });
  };

  return (
    <Box>
      <FormProvider {...methods}>
        {(loading || updateLoading) && <LoadingSpinner />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <Stack direction="column" pt={4}>
              <h1 className="header">Change Password</h1>
              <Stack spacing={2} mb={2} mt={2}>
                <TextField
                  label="Current Password"
                  type="password"
                  {...register("currentPassword")}
                  variant="standard"
                  required
                  error={Boolean(errorMessage)}
                  helperText={Boolean(errorMessage) && errorMessage}
                />
                <TextField
                  label="New Password"
                  variant="standard"
                  type="password"
                  {...register("password")}
                  required
                />
                <TextField
                  variant="standard"
                  type="password"
                  label="Confirm Password"
                  {...register("confirmPassword")}
                  error={Boolean(errors.confirmPassword)}
                  helperText={
                    Boolean(errors.confirmPassword) &&
                    errors.confirmPassword?.message
                  }
                  required
                />
              </Stack>
              <Stack className="edit-btn" spacing={2} direction="row-reverse">
                <Button
                  variant="contained"
                  color="warning"
                  type="submit"
                  disabled={!isDirty}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => reset()}
                  disabled={!isDirty}
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Container>
        </form>
      </FormProvider>
      {!errorMessage && (
        <SuccessAlert open={open} onClose={() => setIsOpen(false)}>
          {successMessage}
        </SuccessAlert>
      )}
    </Box>
  );
}

export default ChangePassword;
