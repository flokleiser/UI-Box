import React, { useEffect, useState, useRef } from 'react';
import {motion, useSpring, useTransform, useAnimation, useDragControls, useMotionValue, animate} from "framer-motion"

export default function Lock() {
    const lockRef= useRef<HTMLDivElement>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [rotation, setRotation] = useState(0);

    const [dragStartAngle, setDragStartAngle] = useState(0);
    const [initialRotation, setInitialRotation] = useState(0);


    const [velocity, setVelocity] = useState(0);
    const friction = 0.1;

    let animationFrameId:number;
    let resetAnimationFrameId:number;

    const [filledCircleCount, setFilledCircleCount] = useState(0);
    const [isUnfilling, setIsUnfilling] = useState(false);

    useEffect(() => {
        if (!isDragging && rotation !== 0) {
            const resetRotation = () => {
                setRotation((prevRotation) => {
                    let newRotation = prevRotation - 4;
                    if (newRotation < -360) {
                        newRotation += 360;
                    }
                    if (Math.abs(newRotation) < 5 && Math.abs(newRotation) > -5) {
                        return 0;
                    }
                    resetAnimationFrameId = requestAnimationFrame(resetRotation);
                    return newRotation;
                });
            };
            resetRotation();
        } else if (resetAnimationFrameId) {
            cancelAnimationFrame(resetAnimationFrameId);
        }
        return () => {
            if (resetAnimationFrameId) {
                cancelAnimationFrame(resetAnimationFrameId);
            }
        };
    }, [isDragging]); 

    useEffect(() => {
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

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStartAngle, initialRotation]);

    const calculateAngle = (x:number, y:number) => {
        if (!lockRef.current) return 0;
        const rect = lockRef.current.getBoundingClientRect();
        const lockX = rect.left + rect.width / 2;
        const lockY = rect.top + rect.height / 2;

        return Math.atan2(y - lockY, x - lockX) * (180 / Math.PI);
    };


    const fillCircles = () => {
        if (isUnfilling) return;
        setFilledCircleCount((prevCount) => {
            if (prevCount <= 4) {
                if (prevCount < 4) {
                    prevCount = prevCount + 1;
                }
                if (prevCount === 4) {
                    setIsUnfilling(true)
                    setTimeout(() => {
                        emptyCircles()
                    }, 500)
                }
            }
            else {
                return 0
            }
            return prevCount
        });
    };

    const emptyCircles = () => {
        setFilledCircleCount((prevCount) => {
            if (prevCount > 0) {
                setTimeout(() => {
                    emptyCircles()
                },100)
                return prevCount - 1;
            } else {
                setIsUnfilling(false)
                return prevCount
            }
        });
    }

    // const fillCircles = () => {
    //     if (!isUnfilling && filledCircleCount < 4) {
    //         setFilledCircleCount(filledCircleCount + 1);
    //     }
    // }

    // const emptyCircles = () => {
    //     if (filledCircleCount > 0) {
    //         setTimeout(() => {
    //             setFilledCircleCount(filledCircleCount - 1);
    //             if(filledCircleCount -1 === 0) {
    //                 setIsUnfilling(false);
    //             }else{
    //                 setTimeout(emptyCircles, 500)
    //             }
    //         },500)
    //     }
    // }

    // useEffect(() => {
    //     if (filledCircleCount === 4) {
    //         setIsUnfilling(true);
    //         setTimeout(emptyCircles,1000)
    //     }
    // },[filledCircleCount])




    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const angle = calculateAngle(e.clientX, e.clientY);

        setDragStartAngle(angle);
        setInitialRotation(rotation);
    };
    const handleMouseMove = (e:MouseEvent) => {
        if (isDragging) {
            const currentAngle = calculateAngle(e.clientX, e.clientY);
            let angleDiff = currentAngle - dragStartAngle;
            // let newRotation = initialRotation + angleDiff;
            if (e.clientX < window.innerWidth / 2) {
                angleDiff = -angleDiff
                setRotation(initialRotation - angleDiff);
            } else {
                setRotation(initialRotation + angleDiff);
            }
        }
    };
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="bodyCenter">
        {/* <div> */}
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <h1>Lock</h1>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount >= 1? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </div>
            <div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount >= 2? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </div>
            <div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount >= 3? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </div>
            <div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount === 4? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </div>
        </div>
        </div>


        <div style={{justifyContent:'center', alignItems:'center', display:'flex'}}>

        <div className='lockDiv'>
        <motion.div className="lock"
            ref={lockRef}
            onMouseDown={handleMouseDown}
            style={{ transform: `rotate(${rotation}deg)` }}
        >

            <div className="lockCenter1" style={{ top: '50%', left: '50%' }}></div>
            <div className="smallerLockCircle" style={{top: '74.75%', left : '74.75%', borderRadius:'0 0 230px 0',width:200,height:200, pointerEvents:'none'}} />

            <div className="smallerLockCircleInvert" style={{ top: '57%', left: '84.75%',  width:115,height:57.5, borderRadius:'0px 0px 57.5px 57.5px'}} />
            <div className="smallerLockCircleInvert" style={{ top: '84.75%', left: '57%', height:115,width:57.5, borderRadius:'0px 57.5px 57.5px 0px'}} />

            <div className="lockCenter2" style={{top: '50%', left: '50%'}}></div>
            <div className="lockCenter1" style={{width:165,height:165,top: '50%', left: '50%' }}></div>

            <div className="smallerLockCircle" style={{ top: '50%', left: '15%' }}/>
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

            <div className="smallerLockCircleInvert" style={{top: '75%', left : '75%', width:55,height:55, borderRadius:'50%', 
            }} 
            onMouseOver={() =>  {isDragging? fillCircles() :' ' }}
            />
            <div className="lockText" style={{ top: '50%', left: '85%', pointerEvents:'none'}} >
               1 
            </div>
            <div className="lockText" style={{ top: '85%', left: '50%', pointerEvents:'none'}} >
                0 
            </div>
            <div className="lockText" style={{ top: '80.5%', left: '32.5%',pointerEvents:'none'}} >
               9 
            </div>
            <div className="lockText" style={{ top: '67.5%', left: '20%',pointerEvents:'none'}} >
               8 
            </div>
            <div className="lockText" style={{ top: '50%', left: '15%',pointerEvents:'none'}}>
               7 
            </div>
            <div className="lockText" style={{ top: '32.5%', left: '20%',pointerEvents:'none'}} >
               6 
            </div>
            <div className="lockText" style={{ top: '19.5%', left: '32.5%',pointerEvents:'none'}} >
               5 
            </div>
            <div className="lockText" style={{ top: '15%', left: '50%', pointerEvents:'none'}} >
               4 
            </div>
            <div className="lockText" style={{ top: '19.5%', left: '67.5%',pointerEvents:'none'}} >
               3 
            </div>
            <div className="lockText" style={{ top: '32.5%', left: '80%',pointerEvents:'none'}} >
                2 
            </div>

        </div>

        </div>

        </div>
    );
}