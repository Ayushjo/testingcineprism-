import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemedLoader from "./ThemeLoader";

const RedirectIfAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ThemedLoader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuth;
