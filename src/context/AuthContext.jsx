import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

const AuthContext = createContext();

// Token management
const TOKEN_KEY = "cineprism_auth_token";
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));

  // Helper functions for token management
  const updateToken = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
    }
  }, []);

  // Fetch user data - only depends on token
  const fetchUser = useCallback(
    async (authToken) => {
      if (!authToken) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Set token in axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

        const response = await axios.get(`${API_BASE_URL}/user/me`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Auth fetch error:", error);
        // Clear invalid token
        updateToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    [updateToken]
  );

  // Run auth check only when token changes
  useEffect(() => {
    fetchUser(token);
  }, [token, fetchUser]);

  // Google OAuth login
  const loginWithGoogle = useCallback(() => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      // Optional: Call backend logout endpoint if you have one
      // await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      updateToken(null);
      setUser(null);
    }
  }, [updateToken]);

  // Handle OAuth callback
  const handleAuthCallback = useCallback(
    async (newToken) => {
      if (newToken) {
        setLoading(true);
        updateToken(newToken);
        // fetchUser will be called automatically via useEffect when token changes
      }
    },
    [updateToken]
  );

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      loginWithGoogle,
      handleAuthCallback,
      token,
    }),
    [user, loading, token, logout, loginWithGoogle, handleAuthCallback]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
