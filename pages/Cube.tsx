import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";

export default function Cube() {
    const [isInside, setIsInside] = useState(false);

    const springConfig = { 
        // damping: 2,
        stiffness: 150
    };
    const x = useSpring(200, springConfig)
    const y = useSpring(200, springConfig)

    const resetX = useSpring(0, springConfig);
    const resetY = useSpring(0, springConfig);

    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 400], [-45, 45]);

    function handleMouse(event: React.MouseEvent) {
        const rect = document.getElementById("cubeContainer")!.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
            setIsInside(true);
            x.set(mouseX);
            y.set(mouseY);
        } 
        else {
            setIsInside(false);
        }
    }

    function handleMouseLeave(e:React.MouseEvent) {
        setIsInside(false)
        x.set(200)
        y.set(200)

    }

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
                    rotateX,
                    rotateY
                    // rotateX: isInside ? rotateX : 0,
                    // rotateY: isInside ? rotateY : 0,
                    // rotateX: isInside ? rotateX : rotateXSpring,
                    // rotateY: isInside ? rotateY : rotateYSpring,
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
