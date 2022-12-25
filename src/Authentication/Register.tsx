import { Button, TextField, Stack, Typography, Link } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./index.scss";
import * as yup from "yup";
import { VALID_PHONE_REGEX } from "../constants";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutations/register";
import { client } from "../config/publicClient";
import { useAppDispatch } from "../Redux-toolkit/hooks";
import jwtDecode from "jwt-decode";
import { TokenPayload } from "./Login";
import { setUser } from "../Redux-toolkit/features/Auth/authSlice";
import LoadingSpinner from "../Generic Components/LoadingSpinner";

type Inputs = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string;
};

const validationSchema = yup
  .object({
    firstName: yup.string().required("Enter First Name"),
    lastName: yup.string().required("Enter Last Name"),
    username: yup.string().required("Enter Username"),
    email: yup
      .string()
      .email("Email must be a valid Email")
      .required("Choose an email address"),
    password: yup.string().required("Enter password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phoneNumber: yup
      .string()
      .required("Enter phone number")
      .matches(VALID_PHONE_REGEX, "Phone number is not valid"),
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const [registerApi, { data, loading }] = useMutation(REGISTER, { client });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    registerApi({ variables: data });
  };

  const { data: token, errors: apiErrors } = data?.register || {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // user has registered successfully
  if (token) {
    const { user } = jwtDecode(token) as TokenPayload;
    const { username, role, lastName, firstName } = user;
    const authUser = {
      username,
      role,
      accessToken: token,
      firstName,
      lastName,
    };
    dispatch(setUser(authUser));
    navigate("/", { replace: true });
    reset();
  }

  return (
    <div className="bg">
      {loading && <LoadingSpinner />}
      <div className="glassContainer">
        <img src="./i-gym.png" alt="logo-icon" className="logo" />
        <h2 className="WelcomeText">Join Now!</h2>
        <Stack
          spacing={2}
          sx={{ width: "80%", marginBottom: "50px" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack
            direction="row"
            sx={{
              justifyItems: "center",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextField
              label="First Name"
              variant="standard"
              fullWidth
              error={Boolean(errors.firstName)}
              helperText={errors.firstName?.message}
              {...register("firstName")}
            />
            <TextField
              label="Last Name"
              variant="standard"
              fullWidth
              error={Boolean(errors.lastName)}
              helperText={errors.lastName?.message}
              {...register("lastName")}
            />
          </Stack>
          <TextField
            label="Username"
            variant="standard"
            fullWidth
            error={Boolean(
              errors.username || apiErrors?.pointer === "username"
            )}
            helperText={errors.username?.message || apiErrors?.message}
            {...register("username")}
          />
          <TextField
            label="Password"
            variant="standard"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            type="password"
            {...register("password")}
          />
          <TextField
            label="Confirm Password"
            variant="standard"
            fullWidth
            type="password"
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <TextField
            label="Phone Number"
            variant="standard"
            fullWidth
            error={Boolean(
              errors.phoneNumber || apiErrors?.pointer === "phoneNumber"
            )}
            helperText={errors.phoneNumber?.message || apiErrors?.message}
            {...register("phoneNumber")}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Typography>
            Already have an account?{" "}
            <Link classes="cursor" onClick={() => navigate("/login")}>
              Login Now
            </Link>
          </Typography>
        </Stack>
      </div>
    </div>
  );
}
