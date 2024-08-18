import React, { useState, useEffect, FC } from 'react';
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
import Cube from './pages/Cube'
import Test from './pages/Test'
import Musializer from './pages/Musializer';

import Window from './components/Window'
import {Page} from './components/Window'


const startPage = "Musializer"

const App: FC = () => {
    const [page, setPage] = useState<Page>(startPage);
    const [active, setActive] = useState<Page>(page);

    let CurrentPage: React.ComponentType<{ loadPage: (page: Page) => void }>;

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
        // case 'Lock':
        //     CurrentPage = Lock;
        //     break;
        case 'Test':
            CurrentPage = Test
            break;
        case 'Cube':
            CurrentPage = Cube
            break;
        case 'Musializer':
            CurrentPage = Musializer 
            break;
        default:
            CurrentPage = Home;
    }

    const loadPage = (newPage: Page) => {
        setPage(newPage)
        setActive(newPage)
    }

    window.loadPage = (page: Page) => {
        setPage(page);
        setActive(page);
    };

    return (
        <>
            <CurrentPage loadPage={loadPage} />
        </>
    )
};


const attachEventListeners = () => {

    const clickType = "mousedown";

    const buttons: {[key: string] : Page} = {
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
    const darkmodeToggleButton= document.getElementById('darkmodeToggleButton');


    Object.entries(buttons).forEach(([buttonId, pageName]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener(clickType, () => {
                window.loadPage(pageName as Page);

                navbarRoot.render(<Navbar activePage={pageName} />);
            })
        }
    });

        

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
navbarRoot.render(<Navbar activePage={startPage}/>)