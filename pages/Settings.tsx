import React from 'react'
import {useState, useEffect} from "react"


export default function Settings() {

    const [activeThemeSource, setThemeSource] = useState('system')

    useEffect(() => {
        async function fetchThemeSource() {
            const currentThemeSource = await window.darkMode.getThemeSource();
            setThemeSource(currentThemeSource);
        }
        fetchThemeSource();
    }, []);

    function toggleDarkMode() {
        window.darkMode.toggle().then(() => {
            window.darkMode.getThemeSource().then(setThemeSource)
        })
    }

    function toggleSystemMode() {
        window.darkMode.system()
        window.darkMode.getThemeSource().then(setThemeSource)
        // setDarkMode(false);
        // setLightMode(true);
    }

    function themeSourceDisplay() {
        if (activeThemeSource === 'dark') {
            return 'Dark';
        } else if (activeThemeSource === 'light') {
            return 'Light';
        } else {
            return 'System';
        }
    }

    return(
        <div>
            <h1>Settings</h1>

            <p>
                Current: 
                <strong id="theme-source">
                {themeSourceDisplay()}
                </strong>
            </p>

            <button className="buttonInSettings" id="toggle-dark-mode" 
            onMouseDown={toggleDarkMode}
            >
                Toggle Dark Mode
            </button>

            <button className="buttonInSettings" id="reset-to-system" 
            onMouseDown={toggleSystemMode}
            >
                Reset to System Theme
            </button>

            <p>
                Navbar alignment:
                <strong>
                    not yet implemented
                </strong>
            </p>

        </div>
    )
}