import React, { useState } from 'react';

export default function Navbar() {
  return(

  <nav>
    <div className="left-buttons">

      <button id="homeButton">
        <span className="material-symbols-outlined">
          home
        </span>
      </button>

      <button id="buttonspageButton">
        <span className="material-symbols-outlined">
          apps
        </span>
      </button>

      <button id="spinnerpageButton">
        <span className="material-symbols-outlined">
          {/* spoke */}
          network_node
        </span>
      </button>

      <button id="particlespageButton">
        <span className="material-symbols-outlined">
          lens_blur
        </span>
      </button>

      <button id="switchespageButton">
        <span className="material-symbols-outlined">
          {/* page_info */}
          toggle_on 
        </span>
      </button>

      <button id="tetherpageButton">
        <span className="material-symbols-outlined">
          {/* linked_services */}
          tenancy
        </span>
      </button>

      <button id="ballpageButton">
        <span className="material-symbols-outlined">
          airline_stops
        </span>
      </button>

      <button id="joystickpageButton">
        <span className="material-symbols-outlined">
          {/* keyboard_keys */}
          joystick 
        </span>
      </button>

      {/* <button id="lockpageButton">
        <span className="material-symbols-outlined">
            refresh
        </span>
      </button> */}

      </div>

      <div className="settingsButton">
        <button id="settingsButton">
          <span className="material-symbols-outlined">
            settings
          </span>
        </button>
      </div>

    </nav>
  )
}

