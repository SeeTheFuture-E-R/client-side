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
    const root = document.documentElement;

    // ניקוי כל הקלאסים הקודמים
    document.body.classList.remove('large-font', 'high-contrast', 'large-cursor');

    if(newTheme === 'large-font'){
        const newMultiplier = fontSizeMultiplier * 1.8;
        setFontSizeMultiplier(newMultiplier);
        root.style.setProperty('--base-font-size', newMultiplier);
        document.body.classList.add('large-font');
        localStorage.setItem('fontSizeMultiplier', newMultiplier);
    }
    else if(newTheme === 'high-contrast'){
        document.body.classList.add('high-contrast');
        localStorage.setItem('theme', 'high-contrast');
    }
    else if(newTheme === 'inverted'){
      document.body.classList.add('inverted');
      localStorage.setItem('theme', 'inverted');
    }
    else if(newTheme === ''){
        setFontSizeMultiplier(1);
        root.style.setProperty('--base-font-size', '1');
        localStorage.removeItem('fontSizeMultiplier');
        localStorage.removeItem('theme');
        setTheme('');
        document.body.className = '';
    }
    else if(newTheme === 'large-cursor'){
        document.body.classList.add('large-cursor');
        localStorage.setItem('theme', 'large-cursor');
    }
    else {
        setTheme(newTheme);
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

// פונקציה לשחזור הגדרות בטעינת האתר
const restoreAccessibilitySettings = () => {
    const savedMultiplier = localStorage.getItem('fontSizeMultiplier');
    if (savedMultiplier) {
        const root = document.documentElement;
        root.style.setProperty('--base-font-size', savedMultiplier);
        setFontSizeMultiplier(parseFloat(savedMultiplier));
    }
};

// להוסיף ב-useEffect
useEffect(() => {
    restoreAccessibilitySettings();
}, []);

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
    console.log(currentUser)
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
