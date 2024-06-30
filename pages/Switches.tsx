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
    const [horizontalPosition, setHorizontalPosition] = useState<'left' | 'middle' | 'right'>('middle');
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

    function handleSwitchHorizontal(e:React.MouseEvent) {
        const horizontalSwitch = document.getElementById('horizontalSwitch')
        const rect = horizontalSwitch!.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX < rect.width/ 3) {
            setHorizontalPosition('left');
            console.log('left')
        } else if (clickX < (rect.width/ 3) * 2) {
            setHorizontalPosition('middle');
            console.log('middle')
        } else {
            setHorizontalPosition('right');
            console.log('right')
        }
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
        <div className="bodyCenter">
        <div>
            <h1> Switches </h1>


        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>

            <div style={{display:'flex', flexDirection:'column'}}>

                <div className='centerContainer'>
                    <div className='switcherDiv' 
                    style={{backgroundColor: isSwitched ?  "#ddd" : "#333", transition:'0.3s'}} 
                    onMouseDown={handleSwitch} 
                    >
                        <div className='switcherCircle' 
                        style={{left: isSwitched ? "0px" : "100px", transition:'0.3s', backgroundColor: isSwitched ?  "#333" : "#ddd"}} 
                        />
                    </div>
                </div>
            

                <div className='centerContainer' id="horizontalSwitch">
                    <motion.div className='switcherDiv' 
                    style={{width:350,
                        // backgroundColor: horizontalPosition === 'left' ? "#ddd" : horizontalPosition === 'right' ? "#333" : "rgba(151,151,151)",
                        backgroundColor: horizontalPosition === 'left' ? "#ddd" : horizontalPosition === 'right' ? "#333" : "rgba(255,255,255,0)",
                        backgroundImage: horizontalPosition === 'middle' ? "linear-gradient(90deg, #ddd 50%, #333 50%)" : '',
                        // opacity: horizontalPosition === 'middle' ? 1 : 0,
                        // transition:'background-color 0.3s, background-image:0.3s'
                        transition: '0.3s'
                    }}
                    onMouseDown={handleSwitchHorizontal}
                    >
                        <motion.div className="switcherCircleHorizontal"
                         style={{
                            left: horizontalPosition === 'left' ? "0px" : horizontalPosition === 'middle' ? "125px" : "250px",
                            backgroundColor: horizontalPosition === 'left' ? "#333" :horizontalPosition === 'right' ? "#ddd" : "rgba(151,151,151,0.5)",
                            backgroundImage: horizontalPosition === 'middle' ? "linear-gradient(90deg, #333 50%, #ddd 50%)" : '',
                            border: horizontalPosition === 'middle' ? "3px solid #333" : 0,
                            transition: '0.3s'
                        }}
                        >
                        </motion.div>

                    </motion.div>
                </div>


                <div className='centerContainer'>
                    <motion.div className='switcherDiv' 
                    style={{width:275, display:'flex',justifyContent:'center', backgroundColor:'#333'}}
                    onMouseDown={handleSwitchFill}
                    >
                            <div className='switcherDivHalf'
                            style={{backgroundColor: isSwitchedFill ?  "#ddd" : "#333", transition:'0.05s', rotate:'180deg'}}
                            >
                            </div>
                            <div className='switcherDivHalf'
                            style={{backgroundColor: isSwitchedFill ? "#333":"#ddd" , transition:'0.05s'}}
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
        </div>
    )
}