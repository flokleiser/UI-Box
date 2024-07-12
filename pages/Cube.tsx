import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate} from "framer-motion";

export default function Cube() {
    const [isInside, setIsInside] = useState(false);

    const springConfig = { 
        // damping: 2,
        stiffness: 150
    };
    const x = useSpring(200, springConfig)
    const y = useSpring(200, springConfig)

    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 400], [-45, 45]);


//spinning experiments

const [isSpinning, setIsSpinning] = useState(false);
const spinVelocityX = useMotionValue(0);
const spinVelocityY = useMotionValue(0);


const handleSpin = (e:React.MouseEvent) => {
    setIsSpinning(true);
    // const startX = e.clientX
    // const startY = e.clientY
}

const handleMouseMove = (e: MouseEvent) => {
    if (isSpinning) {
        const startX = e.clientX
        const startY = e.clientY
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        spinVelocityX.set(deltaX);
        spinVelocityY.set(deltaY);
        rotateX.set(rotateX.get()  + deltaY * 0.5)
        rotateY.set(rotateY.get() + deltaX * 0.5)
    }
}

const handleMouseUp = () => {

    // rotateX.animate({
    animate(rotateX, rotateX.get(), {
        type: "inertia",
        velocity: spinVelocityY.get() * 0.5,
        power: 0.2,
        timeConstant: 700,
        onComplete: () => setIsSpinning(false)
    });
    // rotateY.animate({

    animate(rotateY, rotateY.get(), {
        type: "inertia",
        velocity: -spinVelocityX.get() * 0.5,
        power: 0.2,
        timeConstant: 700,
        onComplete: () => setIsSpinning(false)
    });
}



const handleMouse = (e: React.MouseEvent) => {
        const rect = document.getElementById("cubeContainer")!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

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
    if (!isSpinning) {
        setIsInside(false)
        x.set(200)
        y.set(200)
    }
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
                onMouseMove={handleMouse}
                onMouseLeave={handleMouseLeave}
            >

            <motion.div className='cube'
                style={{
                    rotateX,
                    rotateY
                    // rotateX: isSpinning ? rotateX : useTransform(y, [0, 400], [45, -45]),
                    // rotateY: isSpinning ? rotateY : useTransform(x, [0, 400], [-45, 45])
                }}
            />
        </motion.div>
        </div>

        </div>
        </div>
    );
}
