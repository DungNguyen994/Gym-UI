import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox, FormControlLabel, Link, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { client } from "../config/publicClient";
import LoadingSpinner from "../Generic Components/LoadingSpinner";
import { LOGIN } from "../graphql/mutations/login";
import { getAuthUser, setUser } from "../Redux-toolkit/features/Auth/authSlice";
import {
  getPersit,
  togglePersit,
} from "../Redux-toolkit/features/Persit/persitSlice";
import { useAppDispatch, useAppSelector } from "../Redux-toolkit/hooks";
import "./index.scss";

interface Inputs {
  username: string;
  password: string;
}

interface User {
  username: string;
  role: string;
  firstName: string;
  lastName: string;
}

export interface TokenPayload {
  user: User;
}

const validationSchema = yup
  .object({
    username: yup.string().required("Enter Username"),
    password: yup.string().required("Enter Password"),
  })
  .required();

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });
  const [login, { data: apiData, loading }] = useMutation(LOGIN, { client });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    login({ variables: data });
  };

  const { data: token, errors: apiErrors } = apiData?.login || {};
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useAppDispatch();

  // user has loggin successfully
  useEffect(() => {
    if (token) {
      const { user } = jwt_decode(token) as TokenPayload;
      const { username, role, firstName, lastName } = user;
      const authUser = {
        username,
        role,
        accessToken: token,
        firstName,
        lastName,
      };
      dispatch(setUser(authUser));
      navigate(from, { replace: true });
      reset();
    }
  }, [token, dispatch, navigate, reset, from]);

  const authUser = useAppSelector(getAuthUser);

  useEffect(() => {
    if (authUser) navigate(from, { replace: true });
  }, [authUser, navigate, from]);
  const persit = useAppSelector(getPersit);
  return (
    <div className="bg">
      <div className="glassContainer">
        {loading && <LoadingSpinner />}
        <img src="/i-gym.png" alt="logo-icon" className="logo" />
        <h2 className="WelcomeText">Welcome</h2>
        <Stack
          spacing={2}
          sx={{ width: "80%", marginBottom: "50px" }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            id="standard-password-input"
            label="Password"
            type="password"
            error={Boolean(
              errors.password || apiErrors?.pointer === "password"
            )}
            helperText={errors.password?.message || apiErrors?.message}
            autoComplete="current-password"
            variant="standard"
            fullWidth
            {...register("password")}
          />
          <Stack
            direction="row"
            sx={{ justifyItems: "center", justifyContent: "space-between" }}
          >
            <FormControlLabel
              control={<Checkbox checked={persit} />}
              onChange={() => dispatch(togglePersit())}
              label="Trust this device"
              sx={{ width: "fit-content" }}
            />
            <Link
              href="#"
              className="forget-password"
              sx={{ textAlign: "right", width: "fit-content", padding: "0" }}
            >
              Forget Password?
            </Link>
          </Stack>
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Typography>
            Don't have an account?{" "}
            <Link classes="cursor" onClick={() => navigate("/register")}>
              Register Now
            </Link>
          </Typography>
        </Stack>
      </div>
    </div>
  );
}
