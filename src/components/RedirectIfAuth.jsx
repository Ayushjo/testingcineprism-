import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemedLoader from "./ThemeLoader";

const RedirectIfAuth = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ThemedLoader />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RedirectIfAuth;
