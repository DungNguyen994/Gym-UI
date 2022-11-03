import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../Redux-toolkit/hooks";

export default function RequiredAuth() {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
