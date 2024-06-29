import React, { useState, useEffect, FC } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import Navbar from './components/Navbar'
// import Settings from './pages/Settings';
import Buttons from './pages/Buttons';
import Spinner from './pages/Spinner';
import Particles from './pages/Particles';
import Tether from './pages/Tether';
import Switches from './pages/Switches'
import Ball from './pages/Ball';
import Joystick from './pages/Joystick'
import Lock from './pages/Lock'

export type Page = 'Home' | 'Buttons' | 'Spinner' | 'Particles' | 'Switches' | 'Tether' | 'Ball' | 'Joystick' | 'Lock';


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


const pages: Page[] = ['Home' , 'Buttons' , 'Spinner' , 'Particles' , 'Switches' , 'Tether' , 'Ball' , 'Joystick' , 'Lock'];

const App: FC = () => {
    const [page, setPage] = useState<Page>('Ball');

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.metaKey && (event.key === '1' || event.key === '2')) {
                event.preventDefault();
                const currentIndex = pages.indexOf(page);
                if (event.key === '1') {
                    const previousPage = pages[(currentIndex - 1 + pages.length) % pages.length];
                    setPage(previousPage);
                } else if (event.key === '2') {
                    const nextPage = pages[(currentIndex + 1) % pages.length];
                    setPage(nextPage);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [page]);

    const loadPage = (newPage: Page) => {
        setPage(newPage)
    }

    let CurrentPage: React.ComponentType<{ loadPage: (page: Page) => void }>;

    switch (page) {
        case 'Home':
            CurrentPage = Home;
            break;
        // case 'Settings':
        //     CurrentPage = Settings;
        //     break;
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

    return <CurrentPage loadPage={loadPage} />;
};

const attachEventListeners = () => {

    const clickType = "mousedown";

    const homeButton = document.getElementById('homeButton');
    // const settingsButton = document.getElementById('settingsButton');
    const darkmodeToggleButton= document.getElementById('darkmodeToggleButton');
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

    // if (settingsButton) {
    //     settingsButton.addEventListener(clickType, () => window.loadPage('Settings'));
    // }

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

    if (darkmodeToggleButton) {
        darkmodeToggleButton!.addEventListener(clickType, () => {
            window.darkMode.toggle()
        });
    }
}
document.addEventListener('DOMContentLoaded', attachEventListeners);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

const navbarContainer = document.getElementById('navbarRoot');
const navbarRoot = createRoot(navbarContainer!)
navbarRoot.render(<Navbar/>)