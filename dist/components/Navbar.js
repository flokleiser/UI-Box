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
const react_1 = __importStar(require("react"));
const Navbar = ({ activePage }) => {
    const [isDark, setIsDark] = (0, react_1.useState)(false);
    function toggleIcon() {
        setIsDark(!isDark);
    }
    return (react_1.default.createElement("div", { className: "bodyCenter", style: { paddingTop: '1rem', paddingBottom: '0.5rem' } },
        react_1.default.createElement("nav", null,
            react_1.default.createElement("div", { className: "navbarLeft" },
                react_1.default.createElement("button", { className: activePage === 'Home' ? "navbarButton active" : "navbarButton", id: "homeButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "home")),
                react_1.default.createElement("button", { className: activePage === 'Buttons' ? "navbarButton active" : "navbarButton", id: "buttonspageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "apps")),
                react_1.default.createElement("button", { className: activePage === 'Spinner' ? "navbarButton active" : "navbarButton", id: "spinnerpageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "network_node")),
                react_1.default.createElement("button", { className: activePage === 'Particles' ? "navbarButton active" : "navbarButton", id: "particlespageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "lens_blur")),
                react_1.default.createElement("button", { className: activePage === 'Switches' ? "navbarButton active" : "navbarButton", id: "switchespageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "toggle_on")),
                react_1.default.createElement("button", { className: activePage === 'Tether' ? "navbarButton active" : "navbarButton", id: "tetherpageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "tenancy")),
                react_1.default.createElement("button", { className: activePage === 'Ball' ? "navbarButton active" : "navbarButton", id: "ballpageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "airline_stops")),
                react_1.default.createElement("button", { className: activePage === 'Joystick' ? "navbarButton active" : "navbarButton", id: "joystickpageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "joystick")),
                react_1.default.createElement("button", { className: activePage === 'Cube' ? "navbarButton active" : "navbarButton", id: "cubepageButton" },
                    react_1.default.createElement("span", { className: "material-symbols-outlined" }, "deployed_code"))),
            react_1.default.createElement("button", { className: "settingsButton", id: "darkmodeToggleButton", onMouseDown: toggleIcon },
                react_1.default.createElement("span", { className: "material-symbols-outlined", 
                    // whileHover={{rotate:180}}
                    style: { transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' } }, "contrast")))));
};
exports.default = Navbar;
