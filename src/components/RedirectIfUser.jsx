import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemedLoader from "./ThemeLoader";

const RedirectIfUser = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <ThemedLoader />;
  }

  if (user) {
    return <Outlet />;
  }

  // Save the current location so we can redirect back after login
  return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
};

export default RedirectIfUser;
