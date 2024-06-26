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
    const [isSwitchedVertical, setSwitchedVertical] = useState(false)

    const [isSwitchedVerticalTop, setSwitchedVerticalTop] = useState(false)
    const [isSwitchedVerticalMiddle, setSwitchedVerticalMiddle] = useState(false)
    const [isSwitchedVerticalBottom, setSwitchedVerticalBottom] = useState(false)

    function handleSwitch() {
        setSwitched(!isSwitched);
    }

    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }

    function handleSwitchVertical(e:React.MouseEvent) {
        const verticalSwitch = document.getElementById("verticalSwitch")
        verticalSwitch!.getBoundingClientRect()
        // console.log(verticalSwitch!.clientHeight)

        // const topThird = verticalSwitch!.clientHeight()/3

        if (e.clientY < verticalSwitch!.clientHeight/3) {
            console.log('top')
            // setSwitchedVerticalTop(!isSwitchedVerticalTop)
        }
        if (e.clientY > verticalSwitch!.clientHeight/3) {
            console.log('bottom')
        }
        if (e.clientY < verticalSwitch!.clientHeight && e.clientY > (verticalSwitch!.clientHeight/3)*2) {
            console.log('middle')
        }
        console.log(e.clientY)


        
        setSwitchedVertical(!isSwitchedVertical)
        // console.log('Switched', isSwitchedVertical);
    }


    return(
        <div>
            <h1> Switches </h1>


        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>

            <div style={{display:'flex', flexDirection:'column'}}>

                <div className='centerContainer'>
                    <div className='switcherDiv' 
                    style={{backgroundColor: isSwitched ?  "rgba(255, 255, 255, 0.5)" : "#333", transition:'0.3s'}} 
                    onMouseDown={handleSwitch} >
                        <div className='switcherCircle' 
                        style={{left: isSwitched ? "0px" : "100px", transition:'0.3s', backgroundColor: isSwitched ?  "#333" : "rgba(255, 255, 255, 0.5)"}} 
                        />
                    </div>
                </div>
            

                <div className='centerContainer'>
                    <motion.div className='switcherDiv' 
                    style={{width:350}}
                    // style={{width:500}}
                    onMouseDown={handleSwitchMotion}
                    >
                    </motion.div>
                </div>


                <div className='centerContainer'>
                    <motion.div className='switcherDiv' 
                    style={{width:275}}
                    onMouseDown={handleSwitchMotion}
                    >
                    </motion.div>
                </div>

            </div>



            <div className='centerContainer'>
                <div className="switcherDivVertical"
                >
                    <motion.div id="verticalSwitch" className='switcherDivVerticalLine' 
                    onMouseDown={handleSwitchVertical}
                    // style={{alignItems: isSwitchedMotion? 'center':'baseline'}} 
                    >
                        <div className='switcherCircleVerticalOutline' 
                        style={{top: isSwitchedVertical? "-150px" : "0px",transition:'0.2s'}} 
                        >
                            <div className='switcherCircleVerticalFill'></div>
                        </div>
                    </motion.div>

                </div>
            </div>

            </div>

        </div>    
    )
}