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
          cycle
        </span>
      </button>

      <button id="particlespageButton">
        <span className="material-symbols-outlined">
          lens_blur
        </span>
      </button>

      <button id="switchespageButton">
        <span className="material-symbols-outlined">
          page_info
        </span>
      </button>

      <button id="tetherpageButton">
        <span className="material-symbols-outlined">
          linked_services
        </span>
      </button>

      <button id="ballpageButton">
        <span className="material-symbols-outlined">
          sports_basketball
        </span>
      </button>

      <button id="keyboardpageButton">
        <span className="material-symbols-outlined">
          keyboard_keys
        </span>
      </button>

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

