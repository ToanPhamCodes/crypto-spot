import React from 'react'
import phoneImage from '../../assets/crypto_phone.png';
import AboutStyle from './About.css';
const About = () => {
  return (
    <section>
      <div className= {AboutStyle.container}>
        <div className= {AboutStyle.left}>
        <p>What is CryptoSpot</p>


        </div>
        
        <div className="right">
          <img src = {phoneImage} alt = "phoneImage"></img>
        </div>
      </div>

      
    </section>
  )
}

export default About