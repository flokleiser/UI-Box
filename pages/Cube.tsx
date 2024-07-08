import React, { useEffect, useState } from 'react';
// import {motion, useAnimation, useDragControls} from "framer-motion"
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function Cube() {

    const x = useMotionValue(200);
    const y = useMotionValue(200);

    const [isInside, setIsInside] = useState(false);

    const springConfig = { 
        damping: 20,
        // stiffness: 300 
    };
    const rotateXSpring = useSpring(0, springConfig);
    const rotateYSpring = useSpring(0, springConfig);

    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 400], [-45, 45]);

    function handleMouse(event:React.MouseEvent) {
        const rect = document.getElementById("cubeContainer")!.getBoundingClientRect()
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            setIsInside(true);
            x.set(mouseX);
            y.set(mouseY);
        } else {
            setIsInside(false);
            // x.set(200);
            // y.set(200);
            // rotateXSpring.set(mouseX)
            // rotateYSpring.set(mouseY)
        }
    }

    function handleMouseLeave(e:React.MouseEvent) {
        const mouseX = e.clientX
        const mouseY = e.clientY
        setIsInside(false);
        x.set(mouseX);
        y.set(mouseY);
    }

    useEffect (() => {
        if (!isInside) {
            rotateXSpring.set(rotateX.get());
            rotateYSpring.set(rotateY.get());
            // rotateXSpring.set(0);
            // rotateYSpring.set(0);
            console.log('outside')
        }
    }, [isInside, rotateX,rotateY])

    // useEffect(() => {
    //     if (isInside) {
    //         rotateXSpring.set(rotateX.get());
    //         rotateYSpring.set(rotateY.get());
    //     } else {
    //         rotateXSpring.set(0);
    //         rotateYSpring.set(0);
    //     }
    // }, [isInside, rotateX, rotateY]);


    return (
        <div className="bodyCenter">
        <div>
            <h1>Cube</h1>

        <div style={{display:'flex', justifyContent:'center'}}
        >
            <motion.div id="cubeContainer"
                style={{
                    // width: 500,
                    width: 400,
                    height: 400,
                    display: "flex",
                    placeItems: "center",
                    placeContent: "center",
                    borderRadius: 30,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    perspective: 400
                }}
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
            >

            <motion.div className='cube'
                style={{
                    // rotateX: isInside ? rotateX : 0,
                    // rotateY: isInside ? rotateY : 0,
                    rotateX: isInside ? rotateX : rotateXSpring,
                    rotateY: isInside ? rotateY : rotateYSpring,
                    // rotateX: rotateXSpring,
                    // rotateY:rotateYSpring,
                }}
            />
        </motion.div>
        </div>

        </div>
        </div>
    );
}
