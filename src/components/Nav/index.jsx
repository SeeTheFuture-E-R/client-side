import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home/index";
import Books from "../Books/index";
import Articles from "../Articles/index";
import About from "../About/index";
import Management from "../management";
import Shopping from "../Shopping/index";
import PersonalArea from "../Login/personalArea";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import ICamera from "../Shopping/Products/ICamera";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Error from '../Error';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './nav.css'; // ייבוא קובץ ה-CSS
function Nav() {
  let { currentUser, setCurrentUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <>
      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          דף הבית
        </NavLink>
        <NavLink to={`/shopping?category=daily`} className={({ isActive }) => (isActive ? "active" : "")}>
          מוצרים 
        </NavLink>
        <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
          ספרים 
        </NavLink>
        <NavLink to="/ICamera" className={({ isActive }) => (isActive ? "active" : "")}>
          פיתוח 
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
          אודות  
        </NavLink>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        {currentUser ? (
          <>
            <div className="user-div">
              שלום {currentUser.firstName} {currentUser.lastName}
              <FontAwesomeIcon icon={faUser} fontSize={"20px"} />
            </div>
            <NavLink to="/personalArea" className={({ isActive }) => (isActive ? "active" : "")}>
              אזור אישי 
            </NavLink>
            <Button onClick={logout} className="logout-button">
              logout
            </Button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              כניסה 
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
              הרשמה 
            </NavLink>
          </>
          
        )}
        <div class="logo-container">
          <img src='../../../see-the-future.png' alt="Logo" class="logo" />
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={`/shopping`} element={<Shopping />} />
        <Route path={`/shopping?category=/*`} element={<Shopping />} />
        <Route path="/books" element={<Books />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<About />} />
        <Route path="/personalArea" element={<PersonalArea />} />
        <Route path="/ICamera" element={<ICamera />} />
        <Route path="/*" element={<Error />} />
        <Route path="/Admin" element={<Management />} />
      </Routes>
    </>
  );
}

export default Nav;
