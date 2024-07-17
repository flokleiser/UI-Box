import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate, transform} from "framer-motion";

export default function Cube() {
    const [isInside, setIsInside] = useState(false);

    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState('');
    const [dragEnd, setDragEnd] = useState('');


    const springConfig = { 
        stiffness: 150
    };
    const x = useSpring(200, springConfig)
    const y = useSpring(200, springConfig)

    const rotateX = useTransform(y, [0, 400], [45, -45]);
    const rotateY = useTransform(x, [0, 400], [-45, 45]);

// const handleMouse = (e: React.MouseEvent) => {
const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {

    if (isDragging) {
        setDragEnd(e.currentTarget.id)
    }

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
        setIsInside(false)
        x.set(200)
        y.set(200)
}

const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart(e.currentTarget.id)
    console.log(dragStart)
};

const handleMouseUp = () => {
    console.log(dragEnd)
    if (isDragging && dragStart === 'center-left' && dragEnd ===  'center-right') {
        console.log('correct drag')
    }
    setIsDragging(false);
    setDragStart('')
    setDragEnd('')
}



    return (
        <div className="bodyCenter">
        <div>
            <h1>Cube</h1>

        <div style={{display:'flex', justifyContent:'center'}}
        >
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
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouse}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >

                <div className="section" data-section="0" id="top-left"
                onMouseEnter={() => handleMouse({currentTarget: {id:'top-left'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="1" id="top-center"
                onMouseEnter={() => handleMouse({currentTarget: {id:'top-center'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="2" id="top-right"
                onMouseEnter={() => handleMouse({currentTarget: {id:'top-right'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="3" id="center-left"
                onMouseEnter={() => handleMouse({currentTarget: {id:'center-left'}} as React.MouseEvent<HTMLDivElement>)}
                />

                <div className="section" data-section="4" id="center-center"
                onMouseEnter={() => handleMouse({currentTarget: {id:'center-center'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="5" id="center-right"
                onMouseEnter={() => handleMouse({currentTarget: {id:'center-right'}} as React.MouseEvent<HTMLDivElement>)}
                />

                <div className="section" data-section="6" id="bottom-left"
                onMouseEnter={() => handleMouse({currentTarget: {id:'bottom-left'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="7" id="bottom-center"
                onMouseEnter={() => handleMouse({currentTarget: {id:'bottom-center'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

                <div className="section" data-section="8" id="bottom-right"
                onMouseEnter={() => handleMouse({currentTarget: {id:'bottom-right'}} as React.MouseEvent<HTMLDivElement>)}
                /> 

            <motion.div className='cube'
                style={{
                    rotateX,
                    rotateY,
                    position:'absolute',
                    transform:"translate(-50%,-50%)"

                }}
                whileTap={{scale:0.8}}
            />

        </motion.div>
        </div>

        </div>
        </div>
    );
}