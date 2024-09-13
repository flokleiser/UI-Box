//Todo: shaking animation after 4th input

import React, { useEffect, useState, useRef } from 'react';
import {motion, useSpring, useTransform, useAnimation, useDragControls, useMotionValue, animate, Easing} from "framer-motion"
import { gsap } from 'gsap';


export default function Lock() {

    const [activeNumber, setActiveNumber] = useState<number | null>(null)

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

//old

                // setRotation((prevRotation) => {
                //     let newRotation = prevRotation - 4;

                //     if (newRotation < -360) {
                //         newRotation += 360;
                //     }
                //     if (Math.abs(newRotation) < 5 && Math.abs(newRotation) > -5) {
                //         return 0;
                //     }
                //     resetAnimationFrameId = requestAnimationFrame(resetRotation);
                //     return newRotation;
                // });


//gsap
                gsap.to({value: rotation}, {
                    // duration: 1,
                    duration: 0.75,
                    value: 0,
                    // ease: "bounce.out",
                    ease: "elastic.out",
                    onUpdate: function() {
                        setRotation(this.targets()[0].value);
                    },
                    onComplete: () => {
                        console.log('complete')
                    }
                })


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
    }, [isDragging, dragStartAngle,
        //  initialRotation
        ]);

    const calculateAngle = (x:number, y:number) => {
        if (!lockRef.current) return 0;
        const rect = lockRef.current.getBoundingClientRect();
        const lockX = rect.left + rect.width / 2;
        const lockY = rect.top + rect.height / 2;

        // return Math.atan2(y - lockY, x - lockX) * (180 / Math.PI);
        return (Math.atan2(y - lockY, x - lockX) * (180 / Math.PI) + 360) % 360;
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
                // setIsShaking(true)
                setTimeout(() => {
                    emptyCircles()
                },100)
                return prevCount - 1;
            } else {
                setIsUnfilling(false)
                // setIsShaking(false)
                return prevCount
            }
        });
    }

    const handleMouseDown = (e:React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        const angle = calculateAngle(e.clientX, e.clientY);
        setDragStartAngle(angle);
        setInitialRotation(rotation);
        // console.log(rotation)
    };

    const handleMouseMove = (e:MouseEvent) => {
        if (isDragging) {
            const currentAngle = calculateAngle(e.clientX, e.clientY);
            let angleDiff = currentAngle - dragStartAngle;

            let newRotation = initialRotation + angleDiff;
            if (newRotation < 0 && newRotation > -45) {
                console.log('check')
                newRotation = -45;
            } else if (newRotation > 360) {
                console.log('other check')
            }
            console.log(newRotation)
            setRotation(newRotation)

        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="bodyCenter" onMouseUp={() => setActiveNumber(null)} >
        {/* <div> */}
        <div style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center'}}>
            <h1>Lock</h1>

        <div style={{display: 'flex', flexDirection: 'row'}}>
            <motion.div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} 
            // custom={i} 
            // variants={variants}
            // animate={controls}
            >
                <span className="material-symbols-outlined"> {filledCircleCount >= 1? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </motion.div>
            <motion.div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount >= 2? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </motion.div>
            <motion.div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount >= 3? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </motion.div>
            <motion.div className="navbarButton" style={{backgroundColor:'rgba(0,0,0,0)', }} >
                <span className="material-symbols-outlined"> {filledCircleCount === 4? 'radio_button_checked' : 'radio_button_unchecked'} </span>
            </motion.div>
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

            <div className="smallerLockCircle" style={{ top: '50%', left: '15%' }} id="number7" onMouseDown={() => setActiveNumber(7)}/>
            <div className="smallerLockCircle" style={{ top: '15%', left: '50%' }} id="number4" onMouseDown={() => setActiveNumber(4)}/>
            <div className="smallerLockCircle" style={{ top: '50%', left: '85%' }} id="number1" onMouseDown={() => setActiveNumber(1)}/>
            <div className="smallerLockCircle" style={{ top: '85%', left: '50%' }} id="number0" onMouseDown={() => setActiveNumber(0)}/>
            <div className="smallerLockCircle" style={{ top: '32.5%', left: '80%' }} id="number2" onMouseDown={() => setActiveNumber(2)} />
            <div className="smallerLockCircle" style={{ top: '67.5%', left: '20%' }} id="number8" onMouseDown={() => setActiveNumber(8)}/>
            <div className="smallerLockCircle" style={{ top: '32.5%', left: '20%' }} id="number6" onMouseDown={() => setActiveNumber(6)}/>
            <div className="smallerLockCircle" style={{ top: '19.5%', left: '32.5%' }} id="number5" onMouseDown={() => setActiveNumber(5)} />
            <div className="smallerLockCircle" style={{ top: '80.5%', left: '32.5%' }} id="number9" onMouseDown={() => setActiveNumber(9)}/>
            <div className="smallerLockCircle" style={{ top: '19.5%', left: '67.5%' }} id="number3" onMouseDown={() => setActiveNumber(3)}/>
        </motion.div>

            <div className="smallerLockCircleInvert" style={{top: '75%', left : '75%', width:55,height:55, borderRadius:'50%', }} />
            <div className="smallerLockCircleInvert" style={{top: '75%', left : '75%', width:100,height:100, borderRadius:'50%', opacity:0,
            }} 
            onMouseOver={() =>  {isDragging? fillCircles() :' ' }}
            />
            <div className="lockText" style={{ top: '50%', left: '85%', pointerEvents:'none', opacity: activeNumber === 1 ? 1 : 0.25}}>
               1 
            </div>
            <div className="lockText" style={{ top: '85%', left: '50%', pointerEvents:'none', opacity: activeNumber === 0 ? 1 : 0.25}} >
                0 
            </div>
            <div className="lockText" style={{ top: '80.5%', left: '32.5%',pointerEvents:'none', opacity: activeNumber === 9 ? 1 : 0.25}} >
               9 
            </div>
            <div className="lockText" style={{ top: '67.5%', left: '20%',pointerEvents:'none', opacity: activeNumber === 8 ? 1 : 0.25}} >
               8 
            </div>
            <div className="lockText" style={{ top: '50%', left: '15%',pointerEvents:'none',  opacity: activeNumber === 7 ? 1 : 0.25}}>
               7 
            </div>
            <div className="lockText" style={{ top: '32.5%', left: '20%',pointerEvents:'none', opacity: activeNumber === 6 ? 1 : 0.25}} >
               6 
            </div>
            <div className="lockText" style={{ top: '19.5%', left: '32.5%',pointerEvents:'none', opacity: activeNumber === 5 ? 1 : 0.25}} >
               5 
            </div>
            <div className="lockText" style={{ top: '15%', left: '50%', pointerEvents:'none', opacity: activeNumber === 4 ? 1 : 0.25}} >
               4 
            </div>
            <div className="lockText" style={{ top: '19.5%', left: '67.5%',pointerEvents:'none', opacity: activeNumber === 3 ? 1 : 0.25}} >
               3 
            </div>
            <div className="lockText" style={{ top: '32.5%', left: '80%',pointerEvents:'none', opacity: activeNumber === 2 ? 1 : 0.25}} >
                2 
            </div>

        </div>

        </div>

        </div>
    );
}

