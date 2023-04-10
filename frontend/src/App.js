import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import { Route } from '../node_modules/react-router-dom/dist/index';
import Navbar from './components/NavBar';
import Contact from './components/Contact';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import DashBoard from './pages/DashBoard';

// function App() {

//   return (


//       <Router>
//         <Navbar/>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Contact" element={<Contact />} />
//           <Route path = "/SignIn" element = {<SignIn/>}></Route>
//           <Route path = "/Dashboard" element = {<DashBoard/>}></Route>
//         </Routes>

//       </Router>
//   );
// }

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainRoutes />}>
          <Route index element={<Home />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Route>
        <Route path="/Dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
