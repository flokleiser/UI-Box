import React, { useState, useEffect } from 'react';

export default function Navbar() {


  const newNavbar = false;
  // const newNavbar = true;

  const [isDark, setIsDark] = useState(false)
  function toggleIcon() {
    setIsDark(!isDark);
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (newNavbar) {
      const tabs = document.querySelectorAll('.tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const activeTab = document.querySelector('.tab.active')
              activeTab!.classList.remove('active');
            tab.classList.add('active');
        });
      });
    }
    else {
      const oldTabs = document.querySelectorAll('.navbarButton');
      oldTabs.forEach(oldTab => {
        oldTab.addEventListener('click', function() {
            const activeOldTab = document.querySelector('.navbarButton.active')
              activeOldTab!.classList.remove('active');
            oldTab.classList.add('active');
        });
      });
    }
});    


if (!newNavbar) {
    return (
    <div className="bodyCenter" style={{paddingTop:'1rem', paddingBottom:'0.5rem'}}>
      <nav>
        <div className="navbarLeft">

          <button className="navbarButton active" id="homeButton">
          {/* <button className="navbarButton" id="homeButton"> */}
            <span className="material-symbols-outlined">
              home
            </span>
          </button>

          <button className="navbarButton" id="buttonspageButton">
            <span className="material-symbols-outlined">
              apps
            </span>
          </button>

          <button className="navbarButton" id="spinnerpageButton">
            <span className="material-symbols-outlined">
              {/* spoke */}
              network_node
            </span>
          </button>

          <button className="navbarButton" id="particlespageButton">
            <span className="material-symbols-outlined">
              lens_blur
            </span>
          </button>

          <button className="navbarButton" id="switchespageButton">
            <span className="material-symbols-outlined">
              {/* page_info */}
              toggle_on 
            </span>
          </button>

          <button className="navbarButton" id="tetherpageButton">
            <span className="material-symbols-outlined">
              {/* linked_services */}
              tenancy
            </span>
          </button>

          <button className="navbarButton" id="ballpageButton">
            <span className="material-symbols-outlined">
              airline_stops
            </span>
          </button>

          <button className="navbarButton" id="joystickpageButton">
            <span className="material-symbols-outlined">
              {/* keyboard_keys */}
              joystick 
            </span>
          </button>

          {/* <button className="navbarButton" id="lockpageButton">
            <span className="material-symbols-outlined">
                refresh
            </span>
          </button> */}

          <button className="navbarButton" id="testpageButton">
            <span className="material-symbols-outlined">
              quiz
            </span>
          </button>

          </div>

          {/* <div className="settingsButton"> */}
            <button className="settingsButton" id="darkmodeToggleButton"
            onMouseDown={toggleIcon}
            >
              <span className="material-symbols-outlined" 
              style={{transform: isDark? 'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s'}}>
                contrast
              </span>
            </button>
          {/* </div> */}

        </nav>
      </div>
    )
  }
// }

else {
  return (
    // <div className="bodyCenter" style={{padding:0, paddingTop:'1.5rem', paddingBottom:'0rem'}}>
    <div className="bodyCenter" style={{padding:0, paddingTop:'1rem', paddingBottom:'0rem'}}>
      <nav>
        <div className="tabs">

          <div className="tab active" id="homeButton">
            <div className="tab-box">
                <span className="material-symbols-outlined">
              home
            </span>
            </div>
          </div>

          <div className="tab" id="buttonspageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              apps
            </span>
            </div>
          </div>

          <div className="tab" id="spinnerpageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              {/* spoke */}
              network_node
            </span>
            </div>
          </div>

          <div className="tab" id="particlespageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              lens_blur
            </span>
            </div>
          </div>

          <div className="tab" id="switchespageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              {/* page_info */}
              toggle_on 
            </span>
            </div>
          </div>

          <div className="tab" id="tetherpageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              {/* linked_services */}
              tenancy
            </span>
            </div>
          </div>

          <div className="tab" id="ballpageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              airline_stops
            </span>
            </div>
          </div>

          <div className="tab" id="joystickpageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              {/* keyboard_keys */}
              joystick 
            </span>
            </div>
          </div>

          {/* <div className="tab-box" id="lockpageButton">
            <span className="material-symbols-outlined">
                refresh
            </span>
          </div> */}

          <div className="tab" id="testpageButton">
          <div className="tab-box">
            <span className="material-symbols-outlined">
              quiz
            </span>
            </div>
          </div>

          </div>

          <div className="settingsButton" style={{paddingRight:'1.5rem'}}>
            <button className="settingsButton" id="darkmodeToggleButton"
            onMouseDown={toggleIcon}
            >
              <span className="material-symbols-outlined" 
              style={{transform: isDark? 'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s'}}>
                contrast
              </span>
            </button>
          </div>

      </nav>
    </div>
  )
}
}
