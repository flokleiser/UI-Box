import React, { useEffect, useState } from 'react';
import {motion, useAnimation, useDragControls} from "framer-motion"

export default function Test() {

    const [resetTrigger, setResetTrigger] = useState(0);
    // const [colorChange, setColorChange] = useState(false)


    return (
        <div className="bodyCenter">
        <div>
            <h1>Test</h1>

            <div style={{display:'flex',flexDirection:'column',justifyContent:'center', alignContent:'center', marginTop:'5rem'}}>


            <div style={{display:'flex',justifyContent:'left', marginLeft:'4rem'}}>
                <motion.div className='tetherCircle' 
                    style={{cursor: "grab",
                        width:50,
                        height:50,
                        // top: window.innerHeight / 3,
                    }}
                    drag
                    dragConstraints={{ top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0}}
                    dragSnapToOrigin
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    dragElastic={0.5}
                    whileTap={{ cursor: "grabbing" }}
                />
                </div>

                <div style={{display:'flex',justifyContent:'right',marginRight:'4rem'}}>
                    <motion.div className='tetherCircle' 
                    style={{cursor: "grab",
                        width:75,
                        height:75,
                        // top: window.innerHeight / 2,
                    }}
                    drag
                    dragConstraints={{ top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0}}
                    dragSnapToOrigin
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    dragElastic={0.5}
                    whileTap={{ cursor: "grabbing" }}
                />
                </div>

                <div style={{display:'flex',justifyContent:'center'}}>
                <motion.div className='tetherCircle' 
                    style={{cursor: "grab", 
                        // top:(window.innerHeight/3)*2
                    }}
                    drag
                    dragConstraints={{ top: 0, right: window.innerWidth, bottom: window.innerHeight, left: 0}}
                    dragSnapToOrigin
                    dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                    dragElastic={0.5}
                    whileTap={{ cursor: "grabbing" }}
                />
                </div>



            </div>



        </div>
        </div>
    );
}