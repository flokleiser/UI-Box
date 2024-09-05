import React, { useState, useEffect, FC } from 'react';
// import { Page } from '../renderer';
import { Page } from './Window'
import {motion} from 'framer-motion'
// import 'material-icons/iconfont/outlined.css';


interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activePage, onNavigate}) => {

  const [activeThemeSource, setThemeSource] = useState('system')

  function toggleDarkMode() {
    window.darkMode.toggle().then(() => {
        window.darkMode.getThemeSource().then(setThemeSource)
    })
}

  const handlePageChange = (page: Page) => {
    if (window.setActivePage) {
        window.setActivePage(page);
    }
};

  const [isDark, setIsDark] = useState(false)

  function toggleIcon() {
    setIsDark(!isDark);
  }

    return (
    <div className="bodyCenter" style={{paddingTop:'0.75rem', paddingBottom:'0.35rem'}}>
      <nav>
        <div className="navbarLeft">

          <button className={activePage === 'Home' ? "navbarButton active" : "navbarButton"} id="homeButton"
          onClick={() => {
            onNavigate('Home');
          }} 
          >
            {/* <span className="material-symbols-outlined"> */}
            {/* <span className="material-symbols-outlined"> */}
            <span className="material-symbols-outlined">
              home
            </span>
          </button>

          <button className={activePage === 'Buttons' ? "navbarButton active" : "navbarButton"} id="buttonspageButton"
          onClick={() => {
            onNavigate('Buttons');
          }}  
          >
            <span className="material-symbols-outlined">
              apps
            </span>
          </button>

          <button className={activePage === 'Spinner' ? "navbarButton active" : "navbarButton"} id="spinnerpageButton"
          onClick={() => onNavigate('Spinner')}  
          >
            <span className="material-symbols-outlined">
              network_node
            </span>
          </button>

          <button className={activePage === 'Particles' ? "navbarButton active" : "navbarButton"} id="particlespageButton"
          onClick={() => onNavigate('Particles')}           
          >
            <span className="material-symbols-outlined">
              lens_blur
            </span>
          </button>

          <button className={activePage === 'Switches' ? "navbarButton active" : "navbarButton"} id="switchespageButton"
          onClick={() => onNavigate('Switches')}           
          >
            <span className="material-symbols-outlined">
              toggle_on 
            </span>
          </button>

          <button className={activePage === 'Tether' ? "navbarButton active" : "navbarButton"} id="tetherpageButton"
          onClick={() => onNavigate('Tether')} 
          >
            <span className="material-symbols-outlined">
              tenancy
            </span>
          </button>

          <button className={activePage === 'Ball' ? "navbarButton active" : "navbarButton"} id="ballpageButton"
          onClick={() => onNavigate('Ball')} 
          >
            <span className="material-symbols-outlined">
              airline_stops
            </span>
          </button>

          <button className={activePage === 'Joystick' ? "navbarButton active" : "navbarButton"} id="joystickpageButton"
          onClick={() => onNavigate('Joystick')} 
          >
            <span className="material-symbols-outlined">
              joystick 
            </span>
          </button>

          <button className={activePage === 'Cube' ? "navbarButton active" : "navbarButton"} id="cubepageButton"
          onClick={() => onNavigate('Cube')} 
          >
            <span className="material-symbols-outlined">
              deployed_code
            </span>
          </button>

          <button className={activePage === 'Musializer' ? "navbarButton active" : "navbarButton"} id="musializerpageButton"
          onClick={() => onNavigate('Musializer')} 
          >
            <span className="material-symbols-outlined">
              {/* pause_circle */}
              music_note
            </span>
          </button>

          {/* <button className={activePage === 'Lock' ? "navbarButton active" : "navbarButton"} id="lockpageButton"
          onClick={() => onNavigate('Lock')} 
          >
            <span className="material-symbols-outlined">
              lock_reset
            </span>
          </button> */}

          </div>

            <button className="settingsButton" id="darkmodeToggleButton"
            onMouseDown={toggleIcon}
            onClick={() => {
              toggleDarkMode();
            }}

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