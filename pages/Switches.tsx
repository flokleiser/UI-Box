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

    const [isSwitchedHorizontal, setSwitchedHorizontal] = useState(false)

    const [verticalPosition, setVerticalPosition] = useState<'top' | 'middle' | 'bottom'>('middle');

    const [horizontalPosition, setHorizontalPosition] = useState<'left' | 'middle' | 'right'>('right');


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

    // function handleSwitchHorizontal(e:React.MouseEvent) {
    //     const horizontalSwitch = document.getElementById('horizontalSwitch')
    //     const rect = horizontalSwitch!.getBoundingClientRect();
    //     const clickX = e.clientX - rect.left;

    //     if (clickX < rect.width/ 3) {
    //         setHorizontalPosition('left');
    //     } else if (clickX < (rect.width/ 3) * 2) {
    //         setHorizontalPosition('middle');
    //     } else {
    //         setHorizontalPosition('right');
    //     }
    // }

    function handleSwitchHorizontal2() {
        console.log('test');
        setSwitchedHorizontal(!isSwitchedHorizontal);
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

            {/* first switch */}
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
            

            {/* second switch */}
                <div className='centerContainer' id="horizontalSwitch">
                    <motion.div className='switcherDiv' 
                    style={{width:325,backgroundColor: isSwitchedHorizontal ?  "#ddd" : "#333", transition:'0.3s',height:'50px'}} 
                    onMouseDown={handleSwitchHorizontal2}
                    >
                        <motion.div className="switcherCircleHorizontal"
                        style={{border:isSwitchedHorizontal ? '3px solid #ddd' : '3px solid #333', left: isSwitchedHorizontal ? "0px" : "220px", transition:'0.2s', backgroundColor: isSwitchedHorizontal ?  "#333" : "#ddd"}} 
                        >
                        </motion.div>

                    </motion.div>
                </div>

            {/* third filled switch */}
                <div className='centerContainer'>
                    <motion.div className='switcherDivFill' 
                    style={{width:275, display:'flex', backgroundColor:'#333',borderRadius: '25px',
                        justifyContent:'center',

                    }}
                    onMouseDown={handleSwitchFill}
                    >

                        {/* old */}
                            {/* <div className='switcherDivHalf'
                            style={{
                                left: isSwitchedFill ? '-68px' : '68px' ,
                                rotate: isSwitchedFill? '180deg': '0deg',
                            }}
                        /> */}

                            <div className='switcherDivHalf'
                            style={{
                                backgroundColor: isSwitchedFill ? '#333':'#ddd',
                                scale: isSwitchedFill ? '0.9': '1',
                                rotate:'180deg',
                                transition:'0.1s',
                                width:'133px'
                            }}
                            />
                            <div className='switcherDivHalf'
                            style={{
                                backgroundColor: isSwitchedFill ? '#ddd':'#333',
                                scale: isSwitchedFill ? '1': '0.9',
                                transition:'0.1s',
                                width:'133px'
                            }}
                            />
                    </motion.div>
                </div>

            </div>



            <div className='centerContainer'>

            {/* Vertical Switch 1 */}
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
            {/* Vertical Switch 1 */}

            {/* Vertical Switch 2 */}
                <div className="switcherDivVertical"
                >
                    <motion.div id="verticalSwitch" className='switcherDivVerticalLineFilled'
                    >
                        <motion.div className='switcherCircleVerticalOutline' 
                        drag="y"
                        dragConstraints={constraints}
                        dragElastic={0}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ top: "0px", transition: '0.05s' }}
                        >
                            <div className='switcherCircleVerticalFillAlt'></div>
                        </motion.div>
                    </motion.div>
                </div>
            {/* Vertical Switch 2*/}

            </div>

            </div>

        </div>    
        </div>
    )
}