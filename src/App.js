
import './App.css';

import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import { AuthContextProvider } from './components/context/authContext';
import{useContext} from "react"
import Nav from './components/nav';

function App() {
 
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
