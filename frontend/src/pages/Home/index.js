import React from 'react'
import { useState, useEffect, useRef } from "react";
import Contact from '../../components/Contact/Contact'
import './Home.css'
import TypeWriter from 'typewriter-effect';
const Home = () => {
  const contactRef = useRef(null);
  

  return (
    <div>
      <div className="container">

        <div className="ellipses-container">

          <h2 className="greeting"><TypeWriter options = {{strings: "CryptoSpot", autoStart:true, delay: 300, loop:true, restart:true, cursor:""}}/></h2>

          <div className="ellipses ellipses-outer-thin">

            <div className="ellipses ellipses-orbit"></div>

          </div>

          <div className="ellipses ellipses-outer-thick"></div>
        </div>
      </div>

      <Contact className ="Contact" ref = {contactRef} id = "Contact"/>

      
    </div>
  )
}

export default Home