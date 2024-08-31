"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const Navbar_1 = __importDefault(require("./components/Navbar"));
const App_1 = __importDefault(require("./components/App"));
const Window_1 = require("./components/Window");
const attachEventListeners = () => {
    const clickType = "mousedown";
    const buttons = {
        'homeButton': 'Home',
        'settingsButton': 'Settings',
        'buttonspageButton': 'Buttons',
        'spinnerpageButton': 'Spinner',
        'particlespageButton': 'Particles',
        'tetherpageButton': 'Tether',
        'switchespageButton': 'Switches',
        'ballpageButton': 'Ball',
        'joystickpageButton': 'Joystick',
        'testpageButton': 'Test',
        'cubepageButton': 'Cube',
        'musializerpageButton': 'Musializer',
    };
    const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');
    Object.entries(buttons).forEach(([buttonId, pageName]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener(clickType, () => {
                window.loadPage(pageName);
                navbarRoot.render(react_1.default.createElement(Navbar_1.default, { activePage: pageName }));
            });
        }
    });
    if (darkmodeToggleButton) {
        darkmodeToggleButton.addEventListener(clickType, () => {
            window.darkMode.toggle();
        });
    }
};
document.addEventListener('DOMContentLoaded', attachEventListeners);
const container = document.getElementById('root');
const root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(App_1.default, null));
const navbarContainer = document.getElementById('navbarRoot');
const navbarRoot = (0, client_1.createRoot)(navbarContainer);
navbarRoot.render(react_1.default.createElement(Navbar_1.default, { activePage: Window_1.startPage }));
