
import './App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import { AuthContextProvider } from './components/context/authContext';
import { useContext, useState, useEffect } from "react"
import Nav from './components/nav';

function App() {
  // useEffect = (() => {
  //   document.title = "see the future"
  // },[])


  return (
    <>

      <AuthContextProvider>
        <Router>
          <Nav></Nav>
        </Router>

      </AuthContextProvider>
    </>
  );
}

export default App;
