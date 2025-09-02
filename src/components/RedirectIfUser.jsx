import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemedLoader from "./ThemeLoader";

const RedirectIfUser = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ThemedLoader />;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default RedirectIfUser;
