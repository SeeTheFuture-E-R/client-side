import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Login from "../Login"
import Register from "../Register"
import Home from "../Home/index"
import Books from "../Books/index"
import Articles from "../Articles/index"
import About from "../About/index"
import Shopping from "../Shopping/index"
import PersonalArea from "../Login/personalArea"
import { useContext } from "react"
import { AuthContext } from "../context/authContext"
import ICamera from "../Shopping/Products/ICamera"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom";
import Error from '../Error'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Margin } from "@mui/icons-material"


function Nav() {
  let { currentUser, setCurrentUser, setToken } = useContext(AuthContext);

  const navigate = useNavigate()

  const logout = () => {
    navigate("/")
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <>
      <nav className='main-nav'>

        <NavLink to="/">דף הבית</NavLink>
        <NavLink to={`/shopping?category=daily`}>מוצרים </NavLink>
        <NavLink to="/books">ספרים </NavLink>
        <NavLink to="/ICamera">פיתוח </NavLink>
        <NavLink to="/articles">מאמרים </NavLink>
        <NavLink to="/about">אודות  </NavLink>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
        {currentUser ?
          <>
           <div> שלום {currentUser.firstName} {currentUser.lastName}
            <FontAwesomeIcon icon={faUser} fontSize={"20px"}/></div> 
            <NavLink to="/personalArea">אזור אישי </NavLink>
            <Button onClick={logout}>logout</Button>
          </>
          :
          <>
            <NavLink to="/login">כניסה </NavLink>
            <NavLink to="/register">הרשמה </NavLink>
          </>}
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path={`/shopping`} element={<Shopping />} />
        <Route path={`/shopping?category=/*`} element={<Shopping />} />
        <Route path='/books' element={<Books />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/about' element={<About />} />
        <Route path='/personalArea' element={<PersonalArea />} />
        <Route path='/ICamera' element={<ICamera />} />
        <Route path='/*' element={<Error/>}></Route>
      </Routes>
    </>
  )
}

export default Nav