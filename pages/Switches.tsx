import React, {useState, useEffect} from 'react'
import {motion} from "framer-motion"

export default function Switches() {

    const switcherMotion = {
        active: {
            rotation:"0"
            // scale:1
        },
        inactive: {
            rotaton: 180,
            // scale:2,
            transition: { duration: 2 }
        }
    }

    const [isSwitched, setSwitched] = useState(false)
    const [isSwitchedMotion, setSwitchedMotion] = useState(false)

    function handleSwitch() {
        setSwitched(!isSwitched);
    }

    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion)
        console.log('test');
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
            

            {/* <div className='centerContainer'>
                <motion.div className='switcherDiv' 
                style={{ rotate: isSwitchedMotion? '0':'100'}}
                onMouseDown={handleSwitchMotion}
                 >
                    <div className='switcherCircle' 
                    style={{backgroundColor: "rgba(255, 255, 255, 0.5)"}}
                    />
                </motion.div>
            </div> */}
            



        </div>    
    )
}