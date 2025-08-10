import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs when the app first loads
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "https://testingcineprismbackend-production.up.railway.app/api/v1/user/me",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
      } catch (error) {
        // Not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const response = await axios.post(
        "https://testingcineprismbackend-production.up.railway.app/api/v1/user/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Clear user from context after successful logout
      setUser(null);

      return response;
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear user locally
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
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
