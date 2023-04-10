import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Contact from './components/Contact';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import DashBoard from './pages/DashBoard';

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add a state variable to track authentication status

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainRoutes />}>
          <Route index element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignIn" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} /> {/* Pass setIsLoggedIn as a prop */}
        </Route>
        <Route
          path="/Dashboard"
          element={isLoggedIn ? <DashBoard /> : <Navigate to="/SignIn" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
