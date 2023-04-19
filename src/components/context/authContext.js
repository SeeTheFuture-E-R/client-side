import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const login = async ({ username, password }) => {
    const res = await axios.post(
      "http://localhost:3600/api/auth/login",
      { username, password },
      {
        withCredentials: true,
      }
    );
console.log(res.data.user)
    setCurrentUser(res.data.user);
    console.log(res.data.accessToken)
    setToken(res.data.accessToken);
  };
  
  const logout = () => {

    setCurrentUser(null);
    setToken(null);
  };

  useEffect(() => {
    console.log("useeffectuser")
    localStorage.setItem("user",  JSON.stringify(currentUser));
  }, [currentUser]);
  
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return(
    <AuthContext.Provider value={{currentUser, token,setCurrentUser,setToken, login, logout}}>
        {children}
    </AuthContext.Provider>

  )
};
