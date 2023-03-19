
import './App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"

import Login from "./components/Login/index"
import Register from "./components/Register/Register"
import Home from "./components/Home/index"
import Books from "./components/Books/index"
import Articles from "./components/Articles/index"
import About from "./components/About/index"
import Shopping from "./components/Shopping/index"

function App() {
  return (
    <>
      <Router>
        <nav className='main-nav'>
          <NavLink to="/">דף הבית</NavLink>
          <NavLink to={`/shopping?category=daily`}>מוצרים </NavLink>
          <NavLink to="/books">ספרים </NavLink>
          <NavLink to="/articles">מאמרים </NavLink>
          <NavLink to="/about">אודות </NavLink>
          <NavLink to="/login">כניסה </NavLink>
          <NavLink to="/register">הרשמה </NavLink>
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
