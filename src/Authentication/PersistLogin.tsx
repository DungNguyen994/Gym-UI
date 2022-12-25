import { useLazyQuery } from "@apollo/client";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { client } from "../config/publicClient";
import LoadingSpinner from "../Generic Components/LoadingSpinner";
import { REFRESH_TOKEN } from "../graphql/queries/refreshToken";
import { getAuthUser, setUser } from "../Redux-toolkit/features/Auth/authSlice";
import { getPersit } from "../Redux-toolkit/features/Persit/persitSlice";
import { useAppDispatch, useAppSelector } from "../Redux-toolkit/hooks";
import { TokenPayload } from "./Login";
import { ROUTES } from "../routes";

export default function PersitLogin() {
  const [refresh, { loading }] = useLazyQuery(REFRESH_TOKEN, {
    client,
    fetchPolicy: "network-only",
  });
  const location = useLocation();
  const user = useAppSelector(getAuthUser);
  const token = user?.accessToken;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const persit = useAppSelector(getPersit);
  useEffect(() => {
    const getToken = async () => {
      const { data } = await refresh();
      const accessToken = data?.refreshToken?.data;
      const error = data?.refreshToken?.errors;
      if (error) navigate("/login", { replace: true });
      if (accessToken) {
        const { user } = jwtDecode(accessToken) as TokenPayload;
        const { username, role, firstName, lastName } = user;
        dispatch(setUser({ username, role, accessToken, firstName, lastName }));
      } else {
        navigate(ROUTES.LOGIN, { replace: true });
        dispatch(setUser(undefined));
      }
    };
    if (persit && !token) getToken();
  }, [dispatch, persit, refresh, navigate, token]);
  if (!persit && !user)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return (
    <>
      {loading && <LoadingSpinner />}
      {token && <Outlet />}
    </>
  );
}
