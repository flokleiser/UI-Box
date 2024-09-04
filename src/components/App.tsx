import'../styles.css'

import React, { useState, useEffect, FC } from 'react';
import Home from '../pages/Home';
import Navbar from './Navbar'
import Settings from '../pages/Settings';
import Buttons from '../pages/Buttons';
import Spinner from '../pages/Spinner';
import Particles from '../pages/Particles';
import Tether from '../pages/Tether';
import Switches from '../pages/Switches'
import Ball from '../pages/Ball';
import Joystick from '../pages/Joystick'
import Cube from '../pages/Cube'
import Test from '../pages/Test'
import Musializer from '../pages/Musializer';
import Lock from '../pages/Lock';

import {Page} from './Window'
import { startPage } from './Window';

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

function Content() {
    const [page, setPage] = useState<Page>(startPage);
    const [active, setActive] = useState<Page>(page);

    const [activePage, setActivePage] = useState<Page>(startPage);

    useEffect(() => {
        const handlePageChange = (event: CustomEvent) => {
            setActivePage(event.detail.page);
        }
        window.addEventListener('pageChange', handlePageChange as EventListener);
        return () => {
            window.removeEventListener('pageChange', handlePageChange as EventListener);
        }
    }, []);

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
        case 'Test':
            CurrentPage = Test
            break;
        case 'Cube':
            CurrentPage = Cube
            break;
        case 'Musializer':
            CurrentPage = Musializer 
            break;
        case 'Lock':
            CurrentPage = Lock;
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

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Content/>} />
      </Routes>
    </Router>
  );
}

