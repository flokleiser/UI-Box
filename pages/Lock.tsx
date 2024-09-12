//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
import React, { useEffect, useState, useRef } from 'react';
import {motion, useSpring, useTransform, useAnimation, useDragControls, useMotionValue} from "framer-motion"


export default function Lock() {
    const lockRef= useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);

    const [dragStartAngle, setDragStartAngle] = useState(0);
    const [initialRotation, setInitialRotation] = useState(0);

    const [velocity, setVelocity] = useState(0);
    const friction = 0.5;

    const [lastTime, setLastTime] = useState(0);
    const maxSpeed = 15


    //old mouse logic
useEffect(() => {
    let animationFrameId:number;
    const updateRotation = () => {
        setVelocity((prevVelocity) => {
            const newVelocity = prevVelocity * friction;
            if (Math.abs(newVelocity) < 0.001) {
                return 0;
            }
            setRotation((prevRotation) => prevRotation + newVelocity);
            return newVelocity;
        });
        animationFrameId = requestAnimationFrame(updateRotation);
    };
    updateRotation();
    return () => {
        cancelAnimationFrame(animationFrameId);
    };
}, []);
const calculateAngle = (x:number, y:number) => {
    if (!lockRef.current) return 0;
    const rect = lockRef.current.getBoundingClientRect();
    const spinnerX = rect.left + rect.width / 2;
    const spinnerY = rect.top + rect.height / 2;

    return Math.atan2(y - spinnerY, x - spinnerX) * (180 / Math.PI);
};
const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const angle = calculateAngle(e.clientX, e.clientY);

    setDragStartAngle(angle);
    setInitialRotation(rotation);
    setLastTime(Date.now());
};
const handleMouseMove = (e:MouseEvent) => {
    if (isDragging) {
        const currentAngle = calculateAngle(e.clientX, e.clientY);
        let angleDiff = currentAngle - dragStartAngle;
        const currentTime = Date.now();
        const timeDiff = (currentTime - lastTime); 


        if (e.clientX < window.innerWidth / 2) {
            angleDiff = -angleDiff
            setRotation(initialRotation - angleDiff);
        } else {
            setRotation(initialRotation + angleDiff);
        }

        if (timeDiff > 0) {
            const newVelocity = Math.min(maxSpeed, Math.max(-maxSpeed, angleDiff / timeDiff));
            setVelocity((newVelocity)/4);
        }
        setLastTime(currentTime);
    }
};
const handleMouseUp = () => {
    setIsDragging(false);
};
useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    };
}, [isDragging, dragStartAngle, initialRotation, lastTime]);

    return (
        <div className="bodyCenter">
        <div>
            <h1>Lock</h1>
        </div>


        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>
        <div className='lockDiv'>
        <motion.div className="lock"
            ref={lockRef}
            onMouseDown={handleMouseDown}
            style={{ transform: `rotate(${rotation}deg)` }}
        >

            <div className="lockCenter1" style={{ top: '50%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{top: '74.75%', left : '74.75%', borderRadius:'0 0 230px 0',width:200,height:200}} />

            <div className="smallerLockCircleInvert" style={{ top: '57%', left: '84.75%',  width:115,height:57.5, borderRadius:'0px 0px 57.5px 57.5px'}} />
            <div className="smallerLockCircleInvert" style={{ top: '84.75%', left: '57%', height:115,width:57.5, borderRadius:'0px 57.5px 57.5px 0px'}} />

            <div className="lockCenter2" style={{top: '50%', left: '50%'}}></div>
            <div className="lockCenter1" style={{width:165,height:165,top: '50%', left: '50%' }}></div>

            <div className="smallerLockCircle" style={{ top: '50%', left: '15%' }} />
            <div className="smallerLockCircle" style={{ top: '15%', left: '50%' }} />

            <div className="smallerLockCircle" style={{ top: '50%', left: '85%' }} />
            <div className="smallerLockCircle" style={{ top: '85%', left: '50%' }} />

            <div className="smallerLockCircle" style={{ top: '32.5%', left: '80%' }} />
            <div className="smallerLockCircle" style={{ top: '67.5%', left: '20%' }} />
            <div className="smallerLockCircle" style={{ top: '32.5%', left: '20%' }} />
            <div className="smallerLockCircle" style={{ top: '19.5%', left: '32.5%' }} />
            <div className="smallerLockCircle" style={{ top: '80.5%', left: '32.5%' }} />
            <div className="smallerLockCircle" style={{ top: '19.5%', left: '67.5%' }} />



        </motion.div>

        </div>
        </div>

        </div>
    );
}
