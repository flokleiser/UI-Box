import React from 'react'
import {useState, useEffect} from "react"
import motion from 'framer-motion'


export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(false)

    function handlePlayClick() {
        setIsPlaying(!isPlaying);
    }

    return(
        <div className="bodyCenter">
                <h1>Musializer</h1>

                <button className="playButton" style={{backgroundColor:'rgba(0,0,0,0)'}} onMouseDown={handlePlayClick}>
                        <span className="material-symbols-outlined">
                        {isPlaying? "pause" : "play_arrow"} 
                        </span>
                </button>

        </div>
    )
}