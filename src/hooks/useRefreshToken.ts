import { useLazyQuery } from "@apollo/client";
import { REFRESH_TOKEN } from "../graphql/queries/refreshToken";
import { client } from "../config/publicClient";
import { useAppDispatch, useAppSelector } from "../Redux-toolkit/hooks";
import { getAuthUser, setUser } from "../Redux-toolkit/features/Auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { TokenPayload } from "../Authentication/Login";

export const useRefreshToken = () => {
  const [refresh, { data }] = useLazyQuery(REFRESH_TOKEN, {
    client,
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(getAuthUser);
  const currentToken = user?.accessToken;
  const dispatch = useAppDispatch();
  const accessToken = data?.refreshToken?.data as string | undefined;
  const apiErr = data?.refreshToken?.errors;
  if (apiErr) navigate("/login", { replace: true, state: { from: location } });
  if (accessToken && accessToken !== currentToken) {
    const { user } = jwtDecode(accessToken) as TokenPayload;
    const { username, role, firstName, lastName } = user;
    dispatch(setUser({ username, role, accessToken, firstName, lastName }));
  }
  return { refresh, accessToken };
};
