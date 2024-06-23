import React, { useState, FC } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home';
import Navbar from './components/Navbar'

type Page = 'Home' | 'Settings' | 'Buttons' | 'Spinner' | 'Particles' | 'Tether' | 'Switches' | 'Ball';

declare global {
  interface Window {
      loadPage: (page: Page) => void;
  }
}

const App: FC = () => {
    const [page, setPage] = useState<Page>('Home');

    let CurrentPage: React.ComponentType;

    switch (page) {
        case 'Home':
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
}

document.addEventListener('DOMContentLoaded', attachEventListeners);

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container!);
root.render(<App />);

const navbarContainer = document.getElementById('navbarRoot') as HTMLElement;
const navbarRoot = createRoot(navbarContainer)
navbarRoot.render(<Navbar/>)
