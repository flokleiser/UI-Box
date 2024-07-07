import React, {useState, useEffect} from 'react'
import {motion, useAnimation, useDragControls} from "framer-motion"

export default function Switches() {


    const newSecondSwitch = false;

    const [isSwitched, setSwitched] = useState(false)
    const [isSwitchedFill, setSwitchedFill] = useState(false)

    const [verticalPosition, setVerticalPosition] = useState<'top' | 'middleTop' | 'middle' | 'middleBottom' | 'bottom'>('middle');

    const [horizontalPosition, setHorizontalPosition] = useState<'left' | 'middle' | 'right'>('right');
    const [isSwitchedHorizontal, setSwitchedHorizontal] = useState(false)


    const [constraints, setConstraints] = useState({ top: 0, bottom: 0 });
    const [constraints2, setConstraints2] = useState({ top: 0, bottom: 0 });
    const dragControls = useDragControls();
    const controls = useAnimation();

    const [snapTo, setSnapTo] = useState({ y: 0 });



    useEffect(() => {
        const verticalSwitch = document.getElementById("verticalSwitch");
        const rect = verticalSwitch!.getBoundingClientRect();
        setConstraints({ top: -rect.height / 2, bottom: rect.height / 2 });

        // const verticalSwitch2 = document.getElementById("verticalSwitch2");
        // const rect2 = verticalSwitch2!.getBoundingClientRect();
        // setConstraints({ top: -rect2.height / 2, bottom: rect2.height / 2 });
    }, []);
    

    function handleSwitch() {
        setSwitched(!isSwitched);
    }
    function handleSwitchFill() {
        setSwitchedFill(!isSwitchedFill);
    }

    function handleSwitchHorizontal(e:React.MouseEvent) {
        if (newSecondSwitch) {
            const horizontalSwitch = document.getElementById('horizontalSwitch')
            const rect = horizontalSwitch!.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            if (clickX < rect.width/ 3) {
                setHorizontalPosition('left');
            } else if (clickX < (rect.width/ 3) * 2) {
                setHorizontalPosition('middle');
            } else {
                setHorizontalPosition('right');
            }
        }
        else {
            setSwitchedHorizontal(!isSwitchedHorizontal)
        }
    }



    function handleDragEndTest(e:any,info:any) {
        const verticalSwitch2 = document.getElementById("verticalSwitch2");
        const rect2 = verticalSwitch2!.getBoundingClientRect();
        const dragY = info.point.y - rect2.top;

        let newPosition: 'top' |'middle' | 'bottom';
        let snapY:number;

        if (dragY < rect2.height / 3) {
            newPosition = 'top'
            snapY = -rect2.height/2
            console.log('top')
        if (dragY < rect2.height/3 && dragY > (rect2.height/3) * 2) {
            console.log('middle')
            newPosition = 'middle'
            snapY = 0
        }
        if (dragY > (rect2.height/3)*2 ){
            newPosition = 'bottom'
            console.log('bottom')
            snapY = rect2.height/2
        }
        // } else  {
        //     newPosition = 'bottom'
        //     console.log('bottom')
        //     snapY = rect2.height/2
        // }

        setVerticalPosition(newPosition)
        setSnapTo({y:snapY});


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
                    style={{width:325,backgroundColor: isSwitchedHorizontal ?  "#ddd" : "#333", transition:'0.3s',height:'50px'}} 
                    onMouseDown={handleSwitchHorizontal}
                    >
                        
                        <motion.div className="switcherCircleHorizontal"
                        style={{
                            // left: horizontalPosition === 'left' ? "0px" : horizontalPosition === 'middle' ? "112.5px" : "225px", 
                            border:isSwitchedHorizontal ? '3px solid #ddd' : '3px solid #333', 
                            left: isSwitchedHorizontal ? "0px" : "220px", 
                            transition:'0.2s', backgroundColor: isSwitchedHorizontal ?  "#333" : "#ddd"}} 
                        >
                        </motion.div>

                    </motion.div>
                </div>

                <div className='centerContainer'>
                    <motion.div className='switcherDivFill' 
                    style={{width:275, display:'flex', backgroundColor:'#333',borderRadius: '25px',
                        justifyContent:'center',

                    }}
                    onMouseDown={handleSwitchFill}
                    >
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
                <div className="switcherDivVertical"
                >
                    <motion.div id="verticalSwitch" className='switcherDivVerticalLine' 
                    >
                        <motion.div className='switcherCircleVerticalOutline' 
                        drag="y"
                        dragConstraints={constraints}
                        dragElastic={0}
                        animate={controls}
                        style={{ top: "0px", transition: '0.05s' }}
                        >
                            <div className='switcherCircleVerticalFill'></div>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="switcherDivVertical"
                >
                    <motion.div id="verticalSwitch2" className='switcherDivVerticalLineFilled'
                    >

                        <div style={{
                            display:'flex',
                            flexDirection:'column',
                            height:'350px',
                            position:'absolute', 
                            justifyContent:'space-evenly',
                            justifySelf:'center'
                        }}>
                            <div className="dividerLine"/>
                            <div className="dividerLine"/>
                            <div className="dividerLine"/>
                        </div>

                        <motion.div className='switcherCircleVerticalOutline' 
                        style={{ top: "0px",cursor: "grab"}}

                        drag="y"
                        dragConstraints={constraints}
                        dragElastic={0}
                        onDragEnd={handleDragEndTest}
                        dragControls={dragControls}
                        dragSnapToOrigin
                        animate={snapTo}
                        whileTap={{ cursor: "grabbing" }}
                        >
                            <div className='switcherCircleVerticalFillAlt'></div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>

            </div>

        </div>    
        </div>
    )
}