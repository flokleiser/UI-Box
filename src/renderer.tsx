import React, { useState, FC } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Settings from './pages/Settings';
import Buttons from './pages/Buttons';
import Spinner from './pages/Spinner';
import Particles from './pages/Particles';
import Tether from './pages/Tether';
import Switches from './pages/Switches'
import Ball from './pages/Ball';
import Joystick from './pages/Joystick'
import Lock from './pages/Lock'

type Page = 'Home' | 'Settings' | 'Buttons' | 'Spinner' | 'Particles' | 'Tether' | 'Switches' | 'Ball' | 'Joystick' | 'Lock';

declare global {
  interface Window {
      loadPage: (page: Page) => void;
      darkMode: {
            toggle: () => Promise<void>;
            system: () => Promise<void>;
            getThemeSource: () => Promise<string>;
        }
  }
}

const App: FC = () => {
    const [page, setPage] = useState<Page>('Switches');

    let CurrentPage: React.ComponentType;

    switch (page) {
        case 'Home':
            CurrentPage = Home;
            break;
            case 'Settings':
            CurrentPage = Settings;
            break;
            case 'Buttons':
            CurrentPage = Buttons;
            break;
            case 'Spinner':
            CurrentPage = Spinner;
            break;
            case 'Particles':
            CurrentPage = Particles;
            break;
            case 'Tether':
            CurrentPage = Tether;
            break;
            case 'Switches':
            CurrentPage = Switches;
            break;
            case 'Ball':
            CurrentPage = Ball;
            break;
            case 'Joystick':
            CurrentPage = Joystick;
            break;
            case 'Lock':
            CurrentPage = Lock;
            break;
            default:
                CurrentPage = Home;
    }

    window.loadPage = (page: Page) => {
        setPage(page);
    };

    return <CurrentPage />;
};

const attachEventListeners = () => {
    const clickType = "mousedown";

    const homeButton = document.getElementById('homeButton');
    const settingsButton = document.getElementById('settingsButton');
    const buttonsPageButton = document.getElementById('buttonspageButton');
    const spinnerPageButton = document.getElementById('spinnerpageButton');
    const particlesPageButton = document.getElementById('particlespageButton');
    const tetherPageButton = document.getElementById('tetherpageButton');
    const switchesPageButton = document.getElementById('switchespageButton');
    const ballPageButton = document.getElementById('ballpageButton');
    const joystickPageButton= document.getElementById('joystickpageButton');
    const lockPageButton= document.getElementById('lockpageButton');

    if (homeButton) {
        homeButton.addEventListener(clickType, () => window.loadPage('Home'));
    }

    if (settingsButton) {
        settingsButton.addEventListener(clickType, () => window.loadPage('Settings'));
    }

    if (buttonsPageButton) {
        buttonsPageButton.addEventListener(clickType, () => window.loadPage('Buttons'));
    }

    if (spinnerPageButton) {
        spinnerPageButton.addEventListener(clickType, () => window.loadPage('Spinner'));
    }

    if (particlesPageButton) {
        particlesPageButton.addEventListener(clickType, () => window.loadPage('Particles'));
    }

    if (tetherPageButton) {
        tetherPageButton.addEventListener(clickType, () => window.loadPage('Tether'));
    }

    if (switchesPageButton) {
        switchesPageButton.addEventListener(clickType, () => window.loadPage('Switches'));
    }
    if (ballPageButton) {
        ballPageButton.addEventListener(clickType, () => window.loadPage('Ball'));
    }
    if (joystickPageButton) {
        joystickPageButton.addEventListener(clickType, () => window.loadPage('Joystick'));
    }
    if (lockPageButton) {
        lockPageButton.addEventListener(clickType, () => window.loadPage('Lock'));
    }
}

document.addEventListener('DOMContentLoaded', attachEventListeners);
// document.addEventListener('DOMContentLoaded', () => {
//  attachEventListeners();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

const navbarContainer = document.getElementById('navbarRoot');
if (navbarContainer) {
    const navbarRoot = createRoot(navbarContainer)
    navbarRoot.render(<Navbar/>)
}
