import React from 'react'
import TypeWriter from 'typewriter-effect';
const SpiningLogo = () => {
    return (
        <div className="container">

            <div className="ellipses-container">

                <h2 className="greeting"><TypeWriter options={{ strings: "CryptoSpot", autoStart: true, delay: 300, loop: true, restart: true, cursor: "" }} /></h2>

                <div className="ellipses ellipses-outer-thin">

                    <div className="ellipses ellipses-orbit"></div>

                </div>

                <div className="ellipses ellipses-outer-thick"></div>
            </div>
        </div>
    )
}

export default SpiningLogo