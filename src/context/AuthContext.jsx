import { createContext,useState,useEffect,useContext } from "react";
import axios from "axios";

const AuthContext =createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function runs when the app first loads
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "/api/v1/user/me",
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

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};