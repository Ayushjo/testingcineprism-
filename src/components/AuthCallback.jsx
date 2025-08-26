import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      handleAuthCallback(token);
      // Clear the token from URL for security
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [searchParams, handleAuthCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-white text-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
        <p>Completing sign in...</p>
      </div>
    </div>
  );
}
