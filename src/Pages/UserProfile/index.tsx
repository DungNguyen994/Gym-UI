import { useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../Generic Components/LoadingSpinner";
import { User, getAuthUser } from "../../Redux-toolkit/features/Auth/authSlice";
import { GET_USER } from "../../graphql/queries/user";
import Information from "../UserProfile/Information";
import LeftPanel from "../UserProfile/LeftPanel";
import { validationSchema } from "./validationSchema";

function UserProfile() {
  const authUser = useSelector(getAuthUser);
  const { data, loading } = useQuery(GET_USER, {
    variables: { username: authUser?.username },
  });
  const userInfo = data?.user?.data as User;

  const methods = useForm<User>({
    resolver: yupResolver(validationSchema),
    defaultValues: userInfo,
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };
  return (
    <div>
      <FormProvider {...methods}>
        {loading && <LoadingSpinner />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row">
            <Grid item xs={0} md={2} display={{ xs: "none", md: "block" }}>
              <LeftPanel isAddNew={false} />
            </Grid>
            <Grid item xs={12} md={7}>
              <Stack direction="column">
                <Information />
              </Stack>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </div>
  );
}

export default UserProfile;
