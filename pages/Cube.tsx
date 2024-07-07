import React, { useEffect, useState } from 'react';
// import {motion, useAnimation, useDragControls} from "framer-motion"
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Cube() {

    const x = useMotionValue(300);
    const y = useMotionValue(200);


    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 500], [-45, 45]);


    function handleMouse(event:React.MouseEvent) {
        const rect = document.getElementById("cubeContainer")!.getBoundingClientRect()

        x.set(event.clientX - rect.left);
        y.set(event.clientY - rect.top);
    }


    return (
        <div className="bodyCenter">
        <div>
            <h1>Cube</h1>

        <div style={{display:'flex '}}>
            <motion.div id="cubeContainer"
            style={{
                width: 600,
                height: 400,
                display: "flex",
                placeItems: "center",
                placeContent: "center",
                borderRadius: 30,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                perspective: 400
            }}
            onMouseMove={handleMouse}
        >
            <motion.div className='cube'
                style={{
                    rotateX,
                    rotateY
                }}
            />
        </motion.div>
        </div>

        </div>
        </div>
    );
}
