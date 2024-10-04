import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform, animate, transform } from "framer-motion";

export default function Lights() {

    const [resetTrigger, setResetTrigger] = useState(0);
    const lightsCanvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {

        const canvasBall= lightsCanvasRef.current as HTMLCanvasElement;
        const ctx = canvasBall.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;
        const mouse = { x: 0, y: 0 };

        let ww = window.innerWidth;
        let wh = window.innerHeight;
        let centerX = (ww / 2);
        let centerY = (wh / 2);
        
        let isDragging = false;

        let animationFrameId: number;

        const darkmodeToggleButton = document.getElementById('darkmodeToggleButton');

        const onMouseMove = (e:MouseEvent) => {
            if (isDragging) {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            }
        };

        const onTouchMove = (e:TouchEvent) => {
            if (e.touches.length > 0 && isDragging) {
                mouse.x = e.touches[0].clientX;
                mouse.y = e.touches[0].clientY;
            }
        };

        const onTouchEnd = () => {
            if (isDragging) {
                isDragging = false;
            }
        };

        const onMouseDown = (e:MouseEvent) => {
            // const dist2 = Math.hypot(e.clientX - circleX2, e.clientY - circleY2);
            // if (dist2 < radius) {
            //     isDragging = true;
            // }
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
            }
        };



        // init scene
        const initscene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            isDragging = false;
            centerX = ww / 2;
            centerY = (wh / 2)
            render();
        };

        const resizeScene = () => {
            ww = canvasBall.width = window.innerWidth;
            wh = canvasBall.height = window.innerHeight;
            centerX = ww / 2;
            centerY = (wh / 5) * 3;
        }

        const render = () => {
            animationFrameId = requestAnimationFrame(render);
        };

        const handleThemeToggle = () => {resetScene()}
        window.addEventListener("resize", resizeScene);


        //buttons
        if (darkmodeToggleButton) {
            darkmodeToggleButton.addEventListener('click', handleThemeToggle);
        }

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        window.addEventListener("touchend", onTouchEnd);
        initscene();

        return () => {
            window.removeEventListener("resize", resizeScene);
            
            if (darkmodeToggleButton) {
                darkmodeToggleButton.removeEventListener('click', handleThemeToggle);
            }

            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [resetTrigger]);


    function resetScene() {
        setResetTrigger(prev => prev + 1);
    }


   
    return (
        <div className="bodyCenter">
            <div style={{display:'flex',flexDirection:'row',justifyContent:'start', alignItems:'center'}}> 
                <h1>Lights</h1>

            <div style={{display: 'flex', flexDirection: 'row'}} id='buttonDeadZone'>

            </div>
            </div>

            <canvas ref={lightsCanvasRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    position: 'absolute',
                    top:0,
                    left: 0,
                    overflow: 'hidden',
                    zIndex: -10
                }}
                id="sceneBall">
            </canvas>
        </div>
    );
}