import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState( JSON.parse(localStorage.getItem("user")) || null);

  const [token, setToken] = useState( localStorage.getItem("token") || null);

  const [theme, setTheme] = useState('');
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1); 

  const changeTheme = (newTheme) => {
    if(newTheme=='large-font'){
      const newMultiplier = fontSizeMultiplier * 1.5; 
      setFontSizeMultiplier(newMultiplier);
      document.body.style.fontSize = `${newMultiplier}em`;
    }
    else if(newTheme==''){
      setFontSizeMultiplier(1); 
      document.body.style.fontSize = '1em';
      setTheme('');
      document.body.className = newTheme;  
    }
    else if(newTheme=='large-cursor'){
      document.body.classList.add('large-cursor');
    }
    else{
      setTheme(newTheme);
      document.body.classList.add(newTheme);   
      document.body.classList.remove('large-cursor');
    }

  };

  const login = async ({ username, password }) => {
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
    <AuthContext.Provider value={{theme, changeTheme, currentUser, token, setCurrentUser, setToken, login, logout }}>
      {children}
    </AuthContext.Provider>

  )
};
