

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import Home from "./Home/index"
import Books from "./Books/index"
import Articles from "./Articles/index"
import About from "./About/index"
import Shopping from "./Shopping/index"
import PersonalArea from "./Login/personalArea"
import{useContext} from "react"
import {AuthContext} from "./context/authContext"
import ICamera from "./Shopping/Products/ICamera"

function Nav(){
    let {currentUser } = useContext(AuthContext);

    return (
        <>
        <nav className='main-nav'>
         
        <NavLink to="/">דף הבית</NavLink>
        <NavLink to={`/shopping?category=daily`}>מוצרים </NavLink>
        <NavLink to="/books">ספרים </NavLink>
        <NavLink to="/articles">מאמרים </NavLink>
        <NavLink to="/about">אודות </NavLink>
        {(currentUser) ? <div> שלום {currentUser.firstName} {currentUser.lastName}</div> : <div>שלום</div>}
        <NavLink to="/login">כניסה </NavLink>
        <NavLink to="/register">הרשמה </NavLink>   
        <NavLink to="/ICamera">פיתוח </NavLink>  
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
        <Route path='/personalArea' element={<PersonalArea/>} />
        <Route path='/ICamera' element={<ICamera/>} />

      </Routes>
      </>
    )
}

export default Nav