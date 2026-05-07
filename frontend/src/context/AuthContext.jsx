  import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.get("https://community-page-mern.vercel.app/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
