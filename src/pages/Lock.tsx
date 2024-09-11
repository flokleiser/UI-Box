//https://github.com/bobboteck/JoyStick?tab=readme-ov-file
import React, { useEffect, useState, useRef } from 'react';


export default function Lock() {
    const lockRef= useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);

    const [dragStartAngle, setDragStartAngle] = useState(0);
    const [initialRotation, setInitialRotation] = useState(0);

    const [velocity, setVelocity] = useState(0);
    const friction = 0.99;

    const [lastTime, setLastTime] = useState(0);
    const maxSpeed = 15
    let direction = 0

    let prevSide:string | null = null;


const handleWheel = (event:WheelEvent) => {
    // const scrollAmount = event.deltaY;
    let scrollAmount = event.deltaY;
    const rotationIncrement = 20;

    const currentSide = event.clientX < window.innerWidth / 2 ? 'left' : 'right';


    if (prevSide !==null && prevSide !== currentSide) {
        setVelocity(velocity * friction);
        direction = 0
    }

    if (prevSide === 'left') {
        direction = scrollAmount < 0 ? 1:-1
    }
    else {
        direction = scrollAmount < 0 ? -1:1
    }


    const newVelocity = Math.min(maxSpeed, Math.max(-maxSpeed, velocity + direction * rotationIncrement));
    setVelocity(newVelocity)

    prevSide = currentSide
};


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

useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => {
        window.removeEventListener('wheel', handleWheel);
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
            setVelocity(newVelocity);
        }
        setLastTime(currentTime);
    }
};

const handleMouseUp = () => {
    setIsDragging(false);
};

useEffect(() => {
    window.addEventListener('wheel', handleWheel);

    return () => {
        window.removeEventListener('wheel', handleWheel);
    };
}, []);

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
        <div className="lock"
            ref={lockRef}
            onMouseDown={handleMouseDown}
            style={{ transform: `rotate(${rotation}deg)` }}
        >

        <div className="smallerLock" style={{ top: '50%', left: '50%' }}></div>

            {/* <div className="smallerLockCircle" style={{ top: '0%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{ top: '100%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{ top: '25%', left: '93.5%' }}></div>
            <div className="smallerLockCircle" style={{ top: '25%', left: '6.5%' }}></div>
            <div className="smallerLockCircle" style={{ top: '75%', left: '6.5%' }}></div>
            <div className="smallerLockCircle" style={{ top: '75%', left: '93.5%' }}></div> */}

            <div className="smallerLockCircle" style={{ top: '15%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{ top: '85%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{ top: '32.5%', left: '80%' }}></div>
            <div className="smallerLockCircle" style={{ top: '32.5%', left: '20%' }}></div>
            <div className="smallerLockCircle" style={{ top: '67.5%', left: '20%' }}></div>
            <div className="smallerLockCircle" style={{ top: '67.5%', left: '80%' }}></div>

        </div>

        </div>

        </div>
    );
}
