import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate} from "framer-motion";

export default function Cube() {
    const [isInside, setIsInside] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    const springConfig = { 
        stiffness: 150
    };
    const x = useSpring(200, springConfig)
    const y = useSpring(200, springConfig)

    const rotateX = useTransform(y, [0, 400], [90, -90]);
    const rotateY = useTransform(x, [0, 400], [-90, 90]);

// const spinVelocityX = useMotionValue(0);
// const spinVelocityY = useMotionValue(0);
// const spinVelocityX = useTransform(x, [0,400], [90, -90]);
// const spinVelocityY = useTransform(y, [0,400], [90, -90]);

const handleMouseDown = (e: React.MouseEvent) => {
    setIsSpinning(true);
    const startX = e.clientX;
    const startY = e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
        // const deltaX = moveEvent.clientX - startX;
        // const deltaY = moveEvent.clientY - startY;
        const deltaX = (moveEvent.clientX - startX)/25;
        const deltaY = (moveEvent.clientY - startY)/25;
        // const deltaX = (moveEvent.clientY - startY)/50;
        // const deltaY = (moveEvent.clientX - startX)/50;
        // spinVelocityX.set(deltaX);
        // spinVelocityY.set(deltaY);
        rotateX.set(rotateX.get() + deltaY * 0.5);
        rotateY.set(rotateY.get() + deltaX * 0.5);
    };

    const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            setIsSpinning(false);
            window.removeEventListener('mouseup', handleMouseUp);
            };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
};


// const handleMouse = (e: React.MouseEvent) => {
//         const rect = document.getElementById("cubeContainer")!.getBoundingClientRect();
//         const mouseX = e.clientX - rect.left;
//         const mouseY = e.clientY - rect.top;

//         if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
//             setIsInside(true);
//             x.set(mouseX);
//             y.set(mouseY);
//         } 
    
// }

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
            <motion.div className="cubeContainer" id="cubeContainer"
                style={{
                    // width: 500,
                    width: 400,
                    height: 400,
                    display: "flex",
                    placeItems: "center",
                    placeContent: "center",
                    borderRadius: 30,
                    // backgroundColor: "rgba(255, 255, 255, 0.05)",
                    perspective: 400
                }}
                // onMouseDown={handleSpin}
                onMouseDown={handleMouseDown}
                // onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
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
