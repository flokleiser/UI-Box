import React, { useState, useEffect, FC } from 'react';
// import { Page } from '../renderer';
import { Page } from './Window'
import {motion} from 'framer-motion'


interface NavbarProps {
  activePage: Page;
}

const Navbar: React.FC<NavbarProps> = ({ activePage }) => {

  const [isDark, setIsDark] = useState(false)

  function toggleIcon() {
    setIsDark(!isDark);
  }

    return (
    <div className="bodyCenter" style={{paddingTop:'0.75rem', paddingBottom:'0.35rem'}}>
      <nav>
        <div className="navbarLeft">

          <button className={activePage === 'Home' ? "navbarButton active" : "navbarButton"} id="homeButton">
            <span className="material-symbols-outlined">
              home
            </span>
          </button>

          <button className={activePage === 'Buttons' ? "navbarButton active" : "navbarButton"} id="buttonspageButton">
            <span className="material-symbols-outlined">
              apps
            </span>
          </button>

          <button className={activePage === 'Switches' ? "navbarButton active" : "navbarButton"} id="switchespageButton">
            <span className="material-symbols-outlined">
              toggle_on 
            </span>
          </button>

          <button className={activePage === 'Cube' ? "navbarButton active" : "navbarButton"} id="cubepageButton">
            <span className="material-symbols-outlined">
              deployed_code
            </span>
          </button>

          <button className={activePage === 'Spinner' ? "navbarButton active" : "navbarButton"} id="spinnerpageButton">
            <span className="material-symbols-outlined">
              network_node
            </span>
          </button>

          <button className={activePage === 'Particles' ? "navbarButton active" : "navbarButton"} id="particlespageButton">
            <span className="material-symbols-outlined">
              lens_blur
            </span>
          </button>

          <button className={activePage === 'Ball' ? "navbarButton active" : "navbarButton"} id="ballpageButton">
            <span className="material-symbols-outlined">
              airline_stops
            </span>
          </button>

          <button className={activePage === 'Tether' ? "navbarButton active" : "navbarButton"} id="tetherpageButton">
            <span className="material-symbols-outlined">
              tenancy
            </span>
          </button>

          <button className={activePage === 'Joystick' ? "navbarButton active" : "navbarButton"} id="joystickpageButton">
            <span className="material-symbols-outlined">
              joystick 
            </span>
          </button>

          <button className={activePage === 'Musializer' ? "navbarButton active" : "navbarButton"} id="musializerpageButton">
            <span className="material-symbols-outlined">
              {/* pause_circle */}
              music_note
            </span>
          </button>

          <button className={activePage === 'Lock' ? "navbarButton active" : "navbarButton"} id="lockpageButton">
            <span className="material-symbols-outlined">
                lock
            </span>
          </button>

          </div>

            <button className="settingsButton" id="darkmodeToggleButton"
            onMouseDown={toggleIcon}
            >
              <span className="material-symbols-outlined" 
              // whileHover={{rotate:180}}
              style={{transform: isDark? 'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s'}}>
                contrast
              </span>
            </button>

        </nav>
      </div>
    )
  }
  export default Navbar