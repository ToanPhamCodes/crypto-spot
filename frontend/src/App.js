import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { Route } from '../node_modules/react-router-dom/dist/index';
import Home from './pages/Home/index';
function App() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleClick = async () => {
    const response = await axios.get(apiUrl);
    alert(response.data);
    
  };

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

      </Router>
    </div>
  );
}

export default App;
