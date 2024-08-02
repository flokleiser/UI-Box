import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate, transform } from "framer-motion";

export default function Cube() {
    const [isInside, setIsInside] = useState(false);
    const [isSwitched, setIsSwitched] = useState(false)

    const springConfig = { stiffness: 150 };
    const x = useSpring(200, springConfig);
    const y = useSpring(200, springConfig);

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const tiltX = useTransform(y, [0, 400], [45, -45]);
    const tiltY = useTransform(x, [0, 400], [-45, 45]);


    const compositeRotateX = useTransform(() => rotateX.get() + tiltX.get());
    const compositeRotateY = useTransform(() => rotateY.get() + tiltY.get());

    function handleSwitchClick() {
        setIsSwitched(!isSwitched);
    }

    const handleMouse = (e: React.MouseEvent) => {
        const rect = document.getElementById("cubeContainer")!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            setIsInside(true);
            x.set(mouseX);
            y.set(mouseY);
        } else {
            setIsInside(false);
        }
    }

    function handleMouseLeave() {
        setIsInside(false);
        x.set(200);
        y.set(200);
    }



    // function animateRotation(newRotateX: number, newRotateY: number) {
    //     return new Promise<void>((resolve) => {
    //         animate(rotateX, newRotateX, {
    //             duration: 0.7,
    //             onComplete: () => {
    //                 animate(rotateY, newRotateY, {
    //                     duration: 0.7,
    //                     onComplete: resolve
    //                 });
    //             }
    //         });
    //     });
    // }

    // function animateRotation(newRotateX: number, newRotateY: number) {
    //     return new Promise<void>((resolve) => {
    //         animate(rotateY, newRotateY, {
    //             duration: 0.7,
    //             onComplete: () => {
    //                 animate(rotateX, newRotateX, {
    //                     duration: 0.7,
    //                     onComplete: resolve
    //                 });
    //             }
    //         });
    //     });
    // }


    function animateRotation(newRotateX:number, newRotateY:number) {
        return new Promise<void>((resolve) => {
            Promise.all([
                animate(rotateY, newRotateY, {duration:0.5}),
                animate(rotateX, newRotateX, {duration:0.5})
            ]).then(() => resolve())
        });
    }


    async function gridClick(event: React.MouseEvent<HTMLDivElement>) {
        if (!isSwitched) {

        const id = event.currentTarget.id;
        let newRotateX = rotateX.get(); 
        let newRotateY = rotateY.get(); 
        
        switch (id) {
            case "top-center":
                newRotateX += 180;
                break;
            case "bottom-center":
                newRotateX -= 180;
                break;
            case "center-left":
                newRotateY -= 180;
                break;
            case "center-right":
                newRotateY += 180;
                break;
            case "top-left":
                newRotateX += 180;
                newRotateY -= 135;
                break;
            case "top-right":
                newRotateX += 180;
                newRotateY += 135;
                break;
            case "bottom-left":
                newRotateX -= 180;
                newRotateY -= 135;
                break;
            case "bottom-right":
                newRotateX -= 180;
                newRotateY += 135;
                break;
            }

        await animateRotation(newRotateX, newRotateY);

        rotateX.set(0)
        rotateY.set(0)
        }
    }

    async function handleDragEnd(event:MouseEvent, info:any) {
        if (isSwitched) {
            const { offset } = info;
            let newRotateX = 0;
            let newRotateY = 0;
    
            if (Math.abs(offset.x) > Math.abs(offset.y)) {
                // Horizontal swipe
                if (offset.x > 0) {
                    newRotateY = 180; // Swipe right
                } else {
                    newRotateY = -180; // Swipe left
                }
            } else {
                // Vertical swipe
                if (offset.y > 0) {
                    newRotateX = -180; // Swipe down
                } else {
                    newRotateX = 180; // Swipe up
                }
            }

        await animateRotation(newRotateX, newRotateY);

        rotateX.set(0)
        rotateY.set(0)
        }
    }

    return (
        <div className="bodyCenter">
            <div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'start', alignItems:'center'}}> 
                <h1>Cube</h1>

                <motion.button className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)'}} onMouseDown={handleSwitchClick}>
                        <span className="material-symbols-outlined">
                        {isSwitched? "web_traffic" : "drag_pan"} 
                        </span>
                    </motion.button>

            </div>

                <div style={{display:'flex', justifyContent:'center'}}>

                    <div style={{position:"absolute", opacity:0.1, width:400, height:400}} 
                    />

                    <motion.div className="cubeContainer" id="cubeContainer"

                        style={{
                            width: 400,
                            height: 400,
                            display: "grid",
                            placeItems: "center",
                            placeContent: "center",
                            borderRadius: 30,
                            perspective: 400,
                            position: 'relative' 
                        }}
                        onMouseMove={handleMouse}
                        onMouseLeave={handleMouseLeave}
                    >
                        {["top-left", 
                        "top-center", 
                        "top-right", 
                        "center-left", 
                        "center-center", 
                        "center-right", 
                        "bottom-left", 
                        "bottom-center", 
                        "bottom-right"].map((id, index) => (
                            <div key={id} className="section" data-section={index} id={id} 
                            onMouseDown={gridClick}
                             />
                        ))}

                        <motion.div className='cube'

                            // drag
                            // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            // onDragEnd={handleDragEnd}

                            style={{
                                display:"flex",
                                // justifyContent:"center",
                                // alignItems:"center",

                                justifyContent:"flex-start",
                                alignItems:"flex-start",

                                rotateX: compositeRotateX,
                                rotateY: compositeRotateY,
                                position:'absolute',
                                transform:"translate(-50%,-50%)"
                            }}
                            whileTap={{scale:0.95}}
                        >

                        {/* <div className="cube"  */}
                            {/* style={{ position:'absolute', 
                                justifySelf:'left', 
                                backgroundColor:"rgba(50,50,50,0.5", 
                                width:50, 
                                height:50,
                                margin:6.25
                            }} 
                        /> */}


                        <motion.div className="cube"
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            onDragEnd={handleDragEnd} 

                                style={{
                                    // width: 200,
                                    // height: 200,
                                    position:'absolute',
                                    justifySelf:"center",
                                    backgroundColor:"rgba(50,50,50,0)"
                                    // transform:"translate(-50%,-50%)"

                                }}
                            />

                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}