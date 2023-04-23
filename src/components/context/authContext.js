import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const login = async ({ username, password }) => {
    console.log("hhhhhhhhhhhhhhhhhhhhkkkkkkkkkkkkkkkk")
    const res = await axios.post(
      "http://localhost:3600/api/auth/login",
      { username, password },
      {
        withCredentials: true,
      }
    );

    if (res == 401)

      alert("your password is'nt correct")
    setCurrentUser(res.data.user);
    setToken(res.data.accessToken);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ currentUser, token, setCurrentUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
};
