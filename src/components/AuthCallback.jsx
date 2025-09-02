// AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemedLoader from "./ThemeLoader";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL params
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          console.error("OAuth error:", error);
          navigate("/login?error=auth_failed", { replace: true });
          return;
        }

        if (token) {
          // Handle the auth callback with the token
          await handleAuthCallback(token);
          // Redirect to home page after successful authentication
          navigate("/", { replace: true });
        } else {
          console.error("No token received from OAuth callback");
          navigate("/login?error=no_token", { replace: true });
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/login?error=callback_failed", { replace: true });
      }
    };

    handleCallback();
  }, [searchParams, navigate, handleAuthCallback]);

  return <ThemedLoader />;
};

export default AuthCallback;
