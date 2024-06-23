import React, {useState, useEffect} from 'react'

export default function Switches() {

    const [isSwitched, setSwitched] = useState(false)

    function handleSwitch() {
        setSwitched(!isSwitched);
    }


    return(
        <div>
            <h1> Switches </h1>

            <div className='centerContainer'>
                <div className='switcherDiv' 
                style={{backgroundColor: isSwitched ?  "rgba(255, 255, 255, 0.5)" : "#333", transition:'0.3s'}} 
                onMouseDown={handleSwitch} >
                    <div className='switcherCircle' 
                    style={{left: isSwitched ? "0px" : "100px", transition:'0.3s', backgroundColor: isSwitched ?  "#333" : "rgba(255, 255, 255, 0.5)"}} 
                    />
                </div>
            </div>
            



        </div>    
    )
}