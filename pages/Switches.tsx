import React, {useState, useEffect} from 'react'
import {motion, useAnimation} from "framer-motion"

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

    // const controls = useAnimation();

    const [isSwitched, setSwitched] = useState(false)
    const [isSwitchedMotion, setSwitchedMotion] = useState(false)
    // const [isSwitchedVertical, setSwitchedVertical] = useState(false)

    // const [verticalPosition, setVerticalPosition] = useState<'top' | 'middle' | 'bottom'>('middle');

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

    function handleSwitchMotion() {
        setSwitchedMotion(!isSwitchedMotion);
    }

    function handleDragEnd(e:any,info: any) {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch!.getBoundingClientRect();
        const dragY = info.point.y - rect.top;

        if (dragY < rect.height / 3) {
            setVerticalPosition('top');
            // controls.start({ top: "-150px" });
        } else if (dragY < (rect.height / 3) * 2) {
            setVerticalPosition('middle');
            // controls.start({ top: "0px" });
        } else {
            setVerticalPosition('bottom');
            // controls.start({ top: "150px" });
        }
    }

    // function handleSwitchVertical(e:React.MouseEvent) {
    //     const verticalSwitch = document.getElementById("verticalSwitch")
    //     const rect = verticalSwitch!.getBoundingClientRect()

    //     const clickY = e.clientY - rect.top

    //     if (clickY < rect.height/3) {
    //         setVerticalPosition('top')
    //     }
    //     else if (clickY < (rect.height/3) * 2) {
    //         setVerticalPosition('middle')
    //     }
    //     else {
    //         setVerticalPosition('bottom')
    //     }
    // }


    return(
        <div>
            <h1> Switches </h1>


        <div style={{display:'flex', flexDirection:'row',justifyContent:'space-between'}}>

            <div style={{display:'flex', flexDirection:'column'}}>

                <div className='centerContainer'>
                    <div className='switcherDiv' 
                    style={{backgroundColor: isSwitched ?  "rgba(255, 255, 255, 0.5)" : "#333", transition:'0.3s'}} 
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
                    // onMouseDown={handleSwitchVertical}
                    >
                        <motion.div className='switcherCircleVerticalOutline' 
                        // style={{
                        //     top: verticalPosition === 'top' ? "-150px" : verticalPosition === 'middle' ? "0px" : "150px", transition: '0.2s'
                        // }}
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