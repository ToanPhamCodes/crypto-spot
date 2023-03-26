import React from 'react'
import { useState, useEffect, useRef } from "react";
import Contact from '../../components/Contact'
import SpiningLogo from 'components/SpiningLogo';
import './style.css'

const Home = () => {
  
  return (
    <div>
      <SpiningLogo/>

      <Contact className ="Contact" />

      
    </div>
  )
}

export default Home