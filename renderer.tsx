import React, { useState, useEffect, FC } from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar'
import App from './components/App'

import {Page} from './components/Window'
import { startPage } from './components/Window';

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