import React from 'react'
import {useState, useEffect} from "react"


export default function Settings() {

    const [activeThemeSource, setThemeSource] = useState('system')

    // const handleHomeClick= () => {
    //     window.loadPage('Home');
    // };

    const handleTestClick = () => {
        window.loadPage('Test');
    }

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
        <div className="bodyCenter">
        <div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'start', alignItems:'center'}}> 
                <h1>Settings</h1>
                
                {/* <button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)'}} id="settingsButton" onMouseDown={handleHomeClick}>
                    <span className="material-symbols-outlined">
                        home
                    </span>
                </button> */}

                <button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)'}} id="settingsButton" onMouseDown={handleTestClick}>
                        <span className="material-symbols-outlined">
                        quiz
                        </span>
                </button>

            </div>

            <p>
                Current: <strong id="theme-source"> {themeSourceDisplay()}</strong>
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

            {/* <p>
                Navbar alignment:
                <strong>
                    not yet implemented
                </strong>
            </p> */}

        </div>
        </div>
    )
}