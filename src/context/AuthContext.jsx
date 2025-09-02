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
  const [initialized, setInitialized] = useState(false);

  // Stable token management functions
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

  // Fetch user function - only called when needed
  const fetchUser = useCallback(
    async (authToken) => {
      if (!authToken) {
        setUser(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      // Prevent multiple calls if already initialized with valid user
      if (initialized && user) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        const response = await axios.get(`${API_BASE_URL}/user/me`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Auth fetch error:", error);
        // Only clear token if it's actually invalid
        if (error.response?.status === 401 || error.response?.status === 403) {
          updateToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    },
    [initialized, user, updateToken]
  );

  // Initial auth check - only run once on mount
  useEffect(() => {
    if (!initialized) {
      fetchUser(token);
    }
  }, []); // Empty dependency array ensures this runs only once

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
      setInitialized(false);
    }
  }, [updateToken]);

  // Handle OAuth callback
  const handleAuthCallback = useCallback(
    async (newToken) => {
      if (newToken) {
        setLoading(true);
        setInitialized(false);
        updateToken(newToken);
        // Fetch user data immediately after setting token
        await fetchUser(newToken);
      }
    },
    [updateToken, fetchUser]
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
      initialized,
    }),
    [
      user,
      loading,
      initialized,
      token,
      logout,
      loginWithGoogle,
      handleAuthCallback,
    ]
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
