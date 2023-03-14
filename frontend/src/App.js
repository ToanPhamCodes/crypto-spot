import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from '../node_modules/react-router-dom/dist/index';
import Navbar from './components/NavBar/NavBar';
import Contact from './components/Contact/Contact';
import Home from './pages/Home/index';
import SignIn from './pages/SignIn/SignIn';
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClick = async () => {
    const response = await axios.get(apiUrl);
    alert(response.data);
    
  };

  return (


      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path = "/SignIn" element = {<SignIn/>}></Route>
        </Routes>

      </Router>
  );
}

export default App;
