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

// Token management - use only localStorage
const TOKEN_KEY = "cineprism_auth_token";

// Your backend API URL
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1";

const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["Authorization"];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); // Track if auth has been initialized

  // Fetch user data
  const fetchUser = useCallback(async () => {
    const token = getStoredToken();

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Set token in axios headers
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Use consistent API endpoint - choose one: either /user/me or /auth/me
      const response = await axios.get(`${API_BASE_URL}/user/me`);
      setUser(response.data.user);
    } catch (error) {
      console.log("Auth fetch error:", error);
      // Clear invalid token
      clearStoredToken();
      setUser(null);
    } finally {
      setLoading(false);
      setInitialized(true);
    }
  }, []);

  // Initialize auth only once
  useEffect(() => {
    if (!initialized) {
      fetchUser();
    }
  }, [fetchUser, initialized]);

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
      clearStoredToken();
      setUser(null);
    }
  }, []);

  // Handle OAuth callback
  const handleAuthCallback = useCallback(
    async (token) => {
      if (token) {
        setStoredToken(token);
        setLoading(true);
        await fetchUser();
      }
    },
    [fetchUser]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loading,
      logout,
      loginWithGoogle,
      handleAuthCallback,
      token: getStoredToken(),
    }),
    [user, loading, logout, loginWithGoogle, handleAuthCallback]
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
