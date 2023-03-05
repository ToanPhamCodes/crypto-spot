import React from 'react'
import Contact from '../../components/Contact'
import Navbar from '../../components/NavBar'
import './Home.css'
import TypeWriter from 'typewriter-effect';

const Home = () => {
  return (
    <div>


      <Navbar />
      <div className="container">

        <div className="ellipses-container">

          <h2 className="greeting"><TypeWriter options = {{strings: "CryptoSpot", autoStart:true, delay: 300, loop:true, restart:true, cursor:""}}/></h2>

          <div className="ellipses ellipses__outer--thin">

            <div className="ellipses ellipses__orbit"></div>

          </div>

          <div className="ellipses ellipses__outer--thick"></div>
        </div>
      </div>

      <Contact></Contact>

      
    </div>
  )
}

export default Home