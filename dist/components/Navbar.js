"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Navbar;
const react_1 = __importStar(require("react"));
function Navbar() {
    const [isDark, setIsDark] = (0, react_1.useState)(false);
    function toggleIcon() {
        setIsDark(!isDark);
    }
    document.addEventListener('DOMContentLoaded', function () {
        const tabs = document.querySelectorAll('.tab');
        const content = document.querySelector('.content');
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                const activeTab = document.querySelector('.tab.active');
                // if (activeTab) {
                activeTab.classList.remove('active');
                // }
                tab.classList.add('active');
                const tabIndex = Array.from(tabs).indexOf(tab);
                content.innerHTML = `Content for Tab ${tabIndex + 1}`;
            });
        });
    });
    return (
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
    react_1.default.createElement("div", { className: "bodyCenter", style: { padding: 0, paddingTop: '1.5rem', paddingBottom: '0rem' } },
        react_1.default.createElement("nav", null,
            react_1.default.createElement("div", { className: "tabs" },
                react_1.default.createElement("div", { className: "tab active", id: "homeButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "home"))),
                react_1.default.createElement("div", { className: "tab", id: "buttonspageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "apps"))),
                react_1.default.createElement("div", { className: "tab", id: "spinnerpageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "network_node"))),
                react_1.default.createElement("div", { className: "tab", id: "particlespageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "lens_blur"))),
                react_1.default.createElement("div", { className: "tab", id: "switchespageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "toggle_on"))),
                react_1.default.createElement("div", { className: "tab", id: "tetherpageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "tenancy"))),
                react_1.default.createElement("div", { className: "tab", id: "ballpageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "airline_stops"))),
                react_1.default.createElement("div", { className: "tab", id: "joystickpageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "joystick"))),
                react_1.default.createElement("div", { className: "tab", id: "testpageButton" },
                    react_1.default.createElement("div", { className: "tab-box" },
                        react_1.default.createElement("span", { className: "material-symbols-outlined" }, "quiz")))),
            react_1.default.createElement("div", { className: "settingsButton", style: { paddingRight: '1.5rem' } },
                react_1.default.createElement("button", { className: "settingsButton", id: "darkmodeToggleButton", onMouseDown: toggleIcon },
                    react_1.default.createElement("span", { className: "material-symbols-outlined", style: { transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }, "contrast"))))));
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
