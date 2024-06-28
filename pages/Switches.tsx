import React, {useState, useEffect} from 'react'
import {motion, useAnimation} from "framer-motion"

export default function Switches() {

    const switcherMotion = {
        active: {
            rotation:"0"
        },
        inactive: {
            rotaton: 180,
            transition: { duration: 2 }
        }
    }

    const [isSwitched, setSwitched] = useState(false)
    const [isSwitchedMotion, setSwitchedMotion] = useState(false)
    const [isSwitchedFill, setSwitchedFill] = useState(false)

    const [verticalPosition, setVerticalPosition] = useState<'top' | 'middle' | 'bottom'>('middle');
    const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });
    const controls = useAnimation();

    useEffect(() => {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch!.getBoundingClientRect();
        setConstraints({ top: -rect.height / 2, bottom: rect.height / 2 });
    }, []);
    

    function handleSwitch() {
        setSwitched(!isSwitched);
    }

    function handleSwitchFill() {
        setSwitchedFill(!isSwitchedFill);
    }

    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }

    function handleDragEnd(e:any,info: any) {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch!.getBoundingClientRect();
        const dragY = info.point.y - rect.top;

        if (dragY < rect.height / 3) {
            setVerticalPosition('top');
        } else if (dragY < (rect.height / 3) * 2) {
            setVerticalPosition('middle');
        } else {
            setVerticalPosition('bottom');
        }
    }


    return(
        <div>
            <h1> Switches </h1>


        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>

            <div style={{display:'flex', flexDirection:'column'}}>

                <div className='centerContainer'>
                    <div className='switcherDiv' 
                    style={{backgroundColor: isSwitched ?  "rgb(153,153,153)" : "#333", transition:'0.3s'}} 
                    onMouseDown={handleSwitch} 
                    >
                        <div className='switcherCircle' 
                        style={{left: isSwitched ? "0px" : "100px", transition:'0.3s', backgroundColor: isSwitched ?  "#333" : "rgba(255, 255, 255, 0.5)"}} 
                        />
                    </div>
                </div>
            

                <div className='centerContainer'>
                    <motion.div className='switcherDiv' 
                    style={{width:350}}
                    onMouseDown={handleSwitchMotion}
                    >
                    </motion.div>
                </div>


                <div className='centerContainer'>
                    <motion.div className='switcherDiv' 
                    style={{width:275, display:'flex',justifyContent:'center', backgroundColor:'#333'}}
                    onMouseDown={handleSwitchFill}
                    >
                        {/* <div className='switcherDivBorder' 
                        style={{width:275, display:'flex',justifyContent:'space-between'}}
                        onMouseDown={handleSwitchFill}
                        > */}
                            <div className='switcherDivHalf'
                            style={{backgroundColor: isSwitchedFill ?  "rgba(255, 255, 255, 0.5)" : "#333", transition:'0.05s', rotate:'180deg'}}
                            >
                            </div>
                            <div className='switcherDivHalf'
                            style={{backgroundColor: isSwitchedFill ? "#333":"rgba(255, 255, 255, 0.5)" , transition:'0.05s'}}
                            >
                            </div>
                        {/* </div> */}
                    </motion.div>
                </div>

            </div>



            <div className='centerContainer'>
                <div className="switcherDivVertical"
                >
                    <motion.div id="verticalSwitch" className='switcherDivVerticalLine' 
                    >
                        <motion.div className='switcherCircleVerticalOutline' 
                        drag="y"
                        dragConstraints={constraints}
                        dragElastic={0}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ top: "0px", transition: '0.05s' }}
                        >
                            <div className='switcherCircleVerticalFill'></div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

            </div>

        </div>    
    )
}