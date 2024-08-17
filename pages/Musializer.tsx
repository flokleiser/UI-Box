import React from 'react'
import {useState, useEffect} from "react"
import motion from 'framer-motion'


export default function Musializer() {

    const [isPlaying, setIsPlaying] = useState(true)

    const songTest = new Audio("./media/sounds/check1.mp3")

    function handlePlayClick() {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            songTest.play()
            console.log('playing')
        }
        else if (!isPlaying) {
            songTest.pause()
            console.log('paused')
        }
    }


    return(
        <div className="bodyCenter">
                <h1>Musializer</h1>

                <div style={{display:"flex", justifyContent:'center'}}>                
                    <button className="playButton" style={{display:'flex', justifyContent:'center'}} onMouseDown={handlePlayClick}>
                        <span className="material-symbols-outlined" style={{fontSize: '85px'}}>
                        {isPlaying? "pause" : "play_arrow"} 
                        </span>
                </button>
                </div>

        </div>
    )
}