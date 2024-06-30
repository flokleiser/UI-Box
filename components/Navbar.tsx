import { transform } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { rootCertificates } from 'tls';

export default function Navbar() {


  const [isDark, setIsDark] = useState(false)
  function toggleIcon() {
    setIsDark(!isDark);
  }

  document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tab');
  const content = document.querySelector('.content');

  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          const activeTab = document.querySelector('.tab.active')
          // if (activeTab) {
            activeTab!.classList.remove('active');
          // }
          tab.classList.add('active');
          const tabIndex = Array.from(tabs).indexOf(tab);
          content!.innerHTML = `Content for Tab ${tabIndex + 1}`;
      });
  });
});

  return(

//   <div className="bodyCenter" style={{paddingTop:'1.5rem', paddingBottom:'0.5rem'}}>
//   <nav>
//     <div className="navbarLeft">

//       <button className="navbarButton" id="homeButton">
//         <span className="material-symbols-outlined">
//           home
//         </span>
//       </button>

//       <button className="navbarButton" id="buttonspageButton">
//         <span className="material-symbols-outlined">
//           apps
//         </span>
//       </button>

//       <button className="navbarButton" id="spinnerpageButton">
//         <span className="material-symbols-outlined">
//           {/* spoke */}
//           network_node
//         </span>
//       </button>

//       <button className="navbarButton" id="particlespageButton">
//         <span className="material-symbols-outlined">
//           lens_blur
//         </span>
//       </button>

//       <button className="navbarButton" id="switchespageButton">
//         <span className="material-symbols-outlined">
//           {/* page_info */}
//           toggle_on 
//         </span>
//       </button>

//       <button className="navbarButton" id="tetherpageButton">
//         <span className="material-symbols-outlined">
//           {/* linked_services */}
//           tenancy
//         </span>
//       </button>

//       <button className="navbarButton" id="ballpageButton">
//         <span className="material-symbols-outlined">
//           airline_stops
//         </span>
//       </button>

//       <button className="navbarButton" id="joystickpageButton">
//         <span className="material-symbols-outlined">
//           {/* keyboard_keys */}
//           joystick 
//         </span>
//       </button>

//       {/* <button className="navbarButton" id="lockpageButton">
//         <span className="material-symbols-outlined">
//             refresh
//         </span>
//       </button> */}

//       <button className="navbarButton" id="testpageButton">
//         <span className="material-symbols-outlined">
//           quiz
//         </span>
//       </button>

//       </div>

//       <div className="settingsButton">
//         <button className="settingsButton" id="darkmodeToggleButton"
//         onMouseDown={toggleIcon}
//         >
//           <span className="material-symbols-outlined" 
//           style={{transform: isDark? 'rotate(180deg)':'rotate(0deg)', transition:'transform 0.2s'}}>
//             contrast
//           </span>
//         </button>
//       </div>

//     </nav>
//     </div>
//   )
// }
<div className="bodyCenter" style={{padding:0, paddingTop:'1.5rem', paddingBottom:'0rem'}}>
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



/* active tab selector */
// document.addEventListener('DOMContentLoaded', function() {
//   const tabs = document.querySelectorAll('.tab');
//   const content = document.querySelector('.content');

//   tabs.forEach(tab => {
//       tab.addEventListener('click', function() {
//           document.querySelector('.tab.active').classList.remove('active');
//           tab.classList.add('active');
          
//           // Update content based on the active tab
//           const tabIndex = Array.from(tabs).indexOf(tab);
//           content.innerHTML = `Content for Tab ${tabIndex + 1}`;
//       });
//   });
// });