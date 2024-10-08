import React from 'react'
import {motion} from 'framer-motion'
import icon from '../media/icon.png';
// import Lottie from 'react-lottie-player';
// import { LottiePlayer } from '@lottiefiles/lottie-player';


export default function Home() {

    const handleSettingsClick = () => {
        window.loadPage('Settings');
    };

    return (
      <div className="bodyCenter">
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
            }}
          >
            <h1> UI-Box</h1>

            <motion.button
              className="navbarButton"
              style={{ backgroundColor: 'rgba(0,0,0,0)' }}
              id="settingsButton"
              onMouseDown={handleSettingsClick}
              whileHover={{ rotate: 180 }}
            >
              <span className="material-symbols-outlined">settings</span>
            </motion.button>
          </div>

          <div className="logo">
            <img className='logoImg' src={icon} />
          </div>

        </div>
      </div>
    );
}