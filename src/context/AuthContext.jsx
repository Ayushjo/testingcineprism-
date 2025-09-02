import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
  useRef,
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

  // Use ref to prevent unnecessary re-renders
  const userRef = useRef(user);
  userRef.current = user;

  // Stable token management functions (no dependencies)
  const updateTokenStable = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
      setToken(newToken);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
    }
  }, []); // No dependencies - stable reference

  // Stable fetch user function
  const fetchUserStable = useCallback(
    async (authToken) => {
      if (!authToken) {
        setUser(null);
        setLoading(false);
        setInitialized(true);
        return;
      }

      // Don't fetch if we already have a user and token hasn't changed
      if (userRef.current && initialized) {
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
        const response = await axios.get(`${API_BASE_URL}/user/me`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Auth fetch error:", error);
        // Only clear token if it's actually invalid (not network errors)
        if (error.response?.status === 401 || error.response?.status === 403) {
          updateTokenStable(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    },
    [initialized, updateTokenStable]
  ); // Minimal dependencies

  // Initial auth check - only run once
  useEffect(() => {
    if (!initialized) {
      fetchUserStable(token);
    }
  }, [token, fetchUserStable, initialized]);

  // Google OAuth login - stable reference
  const loginWithGoogle = useCallback(() => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  }, []);

  // Logout function - stable reference
  const logout = useCallback(async () => {
    try {
      // Optional: Call backend logout endpoint if you have one
      // await axios.post(`${API_BASE_URL}/auth/logout`);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      updateTokenStable(null);
      setUser(null);
      setInitialized(false);

      // Dispatch custom event so navbar knows about logout
      window.dispatchEvent(new CustomEvent("userLoggedOut"));
    }
  }, [updateTokenStable]);


  // Handle OAuth callback - stable reference
  const handleAuthCallback = useCallback(
    async (newToken) => {
      if (newToken) {
        setLoading(true);
        setInitialized(false); // Reset to force user fetch
        updateTokenStable(newToken);
      }
    },
    [updateTokenStable]
  );

  // Memoize context value with stable references
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      loading: loading && !initialized, // Only show loading on first initialization
      logout,
      loginWithGoogle,
      handleAuthCallback,
      token,
      initialized, // Expose initialization state
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
