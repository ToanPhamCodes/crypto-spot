import React from 'react'
import Contact from '../../components/Contact'
import Navbar from '../../components/NavBar'
import './Home.css'
const Home = () => {
  return (
    <div>

      <Navbar />
      
      <div className="ellipses-container">

        <h2 className="greeting">CryptoSpot</h2>

        <div className="ellipses ellipses__outer--thin">

          <div className="ellipses ellipses__orbit"></div>

        </div>

        <div className="ellipses ellipses__outer--thick"></div>
      </div>

      <Contact></Contact>

      
    </div>
  )
}

export default Home