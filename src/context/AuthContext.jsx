import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

// Token management
const TOKEN_KEY = "cineprism_auth_token";

// Your backend API URL
const API_BASE_URL =
  "https://testingcineprismbackend-production.up.railway.app/api/v1";

const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
};

const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(TOKEN_KEY, token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  delete axios.defaults.headers.common["Authorization"];
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const token = getStoredToken();

      if (token) {
        // Set token in axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        fetchUser();
      } else {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`);
        setUser(response.data.user);
      } catch (error) {
        console.log("Auth fetch error:", error);
        // Clear invalid token
        clearStoredToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Google OAuth login - redirects to your backend
  const loginWithGoogle = () => {
    window.location.href = `${API_BASE_URL}/auth/google`;
  };

  const logout = () => {
    clearStoredToken();
    setUser(null);
  };

  // Handle OAuth callback
  const handleAuthCallback = (token) => {
    if (token) {
      setStoredToken(token);
      fetchUserAfterLogin();
    }
  };

  const fetchUserAfterLogin = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/me`);
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to fetch user after login:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
        loginWithGoogle,
        handleAuthCallback,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
