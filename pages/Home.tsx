import React from 'react'
import { Page } from "../renderer"

interface HomeProps {
    loadPage: (page: Page) => void;
}

export default function Home({loadPage}:HomeProps) {



    // const handleSettingsClick = () => {
    //     window.loadPage('Settings');
    // };

    return(
        <div>

            <h1> UI-Box </h1>

            {/* <div className="settingsButton" 
            style={{position:'absolute', zIndex:999}}
            >
                <button id="settingsButton" onMouseDown={handleSettingsClick}>
                    <span className="material-symbols-outlined">
                        settings
                    </span>
                </button>
            </div> */}


            <div className="logo">
                <img className="logoImg" src="./media/icon.png" />
                </div>
            </div>    
    )
}